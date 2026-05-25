import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  buildExportPayload,
  createTaskRecord,
  importTaskPayload,
  loadTasks,
  loadTheme,
  saveTasks,
  saveTheme,
} from '@/utils/storage'
import type {
  CompletionTrendPoint,
  TaskDraft,
  TaskFilters,
  TaskItem,
  TaskPriority,
  TaskSort,
  TaskStats,
  TaskStatus,
  ThemeMode,
} from '@/types/task'

const defaultFilters: TaskFilters = {
  keyword: '',
  status: 'all',
  priority: 'all',
  category: '',
  overdue: 'all',
}

const defaultSort: TaskSort = {
  field: 'dueDate',
  order: 'asc',
}

const priorityWeight: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
}

function isOverdue(task: TaskItem) {
  return Boolean(task.dueDate) && task.status !== 'completed' && dayjs(task.dueDate).endOf('day').isBefore(dayjs())
}

function normalizeDraft(taskDraft: TaskDraft): TaskDraft {
  return {
    ...taskDraft,
    title: taskDraft.title.trim(),
    description: taskDraft.description.trim(),
    category: taskDraft.category.trim() || '未分类',
    tags: taskDraft.tags.map((item) => item.trim()).filter(Boolean),
  }
}

function resolveCompletedAt(currentTask: TaskItem, nextStatus: TaskStatus) {
  if (nextStatus !== 'completed') {
    return null
  }

  return currentTask.status === 'completed' ? currentTask.completedAt || currentTask.updatedAt : new Date().toISOString()
}

function buildDemoTasks() {
  const dayFormat = 'YYYY-MM-DD'
  const at = (dayOffset: number, hour: number, minute = 0) =>
    dayjs().add(dayOffset, 'day').hour(hour).minute(minute).second(0).millisecond(0).toISOString()

  return [
    {
      id: crypto.randomUUID(),
      title: '完成软件工程课程答辩稿',
      description: '梳理系统亮点、演示流程与问答要点，保证答辩展示顺畅。',
      status: 'in-progress',
      priority: 'high',
      dueDate: dayjs().add(1, 'day').format(dayFormat),
      category: '学习',
      tags: ['课程作业', '答辩', 'PPT'],
      createdAt: at(-6, 9),
      updatedAt: at(-1, 20),
      completedAt: null,
    },
    {
      id: crypto.randomUUID(),
      title: '整理项目演示截图与录屏',
      description: '补齐首页、列表、统计和设置页面截图，保留一段完整录屏用于展示。',
      status: 'todo',
      priority: 'high',
      dueDate: dayjs().add(2, 'day').format(dayFormat),
      category: '项目',
      tags: ['展示', '录屏'],
      createdAt: at(-4, 14),
      updatedAt: at(-2, 16),
      completedAt: null,
    },
    {
      id: crypto.randomUUID(),
      title: '预约队友联调时间',
      description: '确认演示当天分工，检查谁负责讲解、谁负责操作页面。',
      status: 'todo',
      priority: 'medium',
      dueDate: dayjs().subtract(1, 'day').format(dayFormat),
      category: '工作',
      tags: ['协作', '联调'],
      createdAt: at(-5, 11),
      updatedAt: at(-3, 18),
      completedAt: null,
    },
    {
      id: crypto.randomUUID(),
      title: '完善 README 与运行说明',
      description: '补充技术栈、功能清单、运行步骤、Git 查看方式和项目总结。',
      status: 'completed',
      priority: 'medium',
      dueDate: dayjs().subtract(2, 'day').format(dayFormat),
      category: '项目',
      tags: ['文档', 'README'],
      createdAt: at(-7, 10),
      updatedAt: at(-2, 21),
      completedAt: at(-2, 21),
    },
    {
      id: crypto.randomUUID(),
      title: '复盘近七天任务完成趋势',
      description: '根据统计图观察高优先级任务与逾期任务的分布情况。',
      status: 'completed',
      priority: 'low',
      dueDate: dayjs().subtract(3, 'day').format(dayFormat),
      category: '学习',
      tags: ['复盘', '图表'],
      createdAt: at(-6, 19),
      updatedAt: at(-1, 9),
      completedAt: at(-1, 9),
    },
    {
      id: crypto.randomUUID(),
      title: '购买答辩当天需要的 U 盘',
      description: '准备演示备份文件，避免现场设备兼容问题。',
      status: 'completed',
      priority: 'low',
      dueDate: dayjs().subtract(4, 'day').format(dayFormat),
      category: '生活',
      tags: ['准备', '备份'],
      createdAt: at(-8, 18),
      updatedAt: at(-4, 20),
      completedAt: at(-4, 20),
    },
    {
      id: crypto.randomUUID(),
      title: '优化移动端操作体验',
      description: '检查筛选栏、表单和统计卡片在手机宽度下的布局与触控体验。',
      status: 'in-progress',
      priority: 'medium',
      dueDate: dayjs().add(3, 'day').format(dayFormat),
      category: '项目',
      tags: ['响应式', 'UI'],
      createdAt: at(-3, 13),
      updatedAt: at(0, 10),
      completedAt: null,
    },
  ] satisfies TaskItem[]
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<TaskItem[]>(loadTasks())
  const filters = ref<TaskFilters>({ ...defaultFilters })
  const sort = ref<TaskSort>({ ...defaultSort })
  const theme = ref<ThemeMode>(loadTheme())

  const categories = computed(() => {
    return Array.from(new Set(tasks.value.map((task) => task.category).filter(Boolean))).sort((left, right) =>
      left.localeCompare(right, 'zh-CN'),
    )
  })

  const filteredTasks = computed(() => {
    const keyword = filters.value.keyword.trim().toLowerCase()

    return tasks.value.filter((task) => {
      if (keyword) {
        const searchableText = [task.title, task.description, task.category, task.tags.join(' ')].join(' ').toLowerCase()

        if (!searchableText.includes(keyword)) {
          return false
        }
      }

      if (filters.value.status !== 'all' && task.status !== filters.value.status) {
        return false
      }

      if (filters.value.priority !== 'all' && task.priority !== filters.value.priority) {
        return false
      }

      if (filters.value.category && task.category !== filters.value.category) {
        return false
      }

      if (filters.value.overdue === 'overdue' && !isOverdue(task)) {
        return false
      }

      if (filters.value.overdue === 'on-time' && isOverdue(task)) {
        return false
      }

      return true
    })
  })

  const sortedTasks = computed(() => {
    const nextTasks = [...filteredTasks.value]
    const direction = sort.value.order === 'asc' ? 1 : -1

    nextTasks.sort((left, right) => {
      let result = 0

      switch (sort.value.field) {
        case 'title':
          result = left.title.localeCompare(right.title, 'zh-CN')
          break
        case 'priority':
          result = priorityWeight[left.priority] - priorityWeight[right.priority]
          break
        case 'createdAt':
          result = dayjs(left.createdAt).valueOf() - dayjs(right.createdAt).valueOf()
          break
        case 'updatedAt':
          result = dayjs(left.updatedAt).valueOf() - dayjs(right.updatedAt).valueOf()
          break
        case 'dueDate': {
          const leftTime = left.dueDate ? dayjs(left.dueDate).valueOf() : Number.MAX_SAFE_INTEGER
          const rightTime = right.dueDate ? dayjs(right.dueDate).valueOf() : Number.MAX_SAFE_INTEGER
          result = leftTime - rightTime
          break
        }
      }

      if (result === 0) {
        result = dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf()
      }

      return result * direction
    })

    return nextTasks
  })

  const stats = computed<TaskStats>(() => {
    const byCategory = tasks.value.reduce<Record<string, number>>((accumulator, task) => {
      accumulator[task.category] = (accumulator[task.category] ?? 0) + 1
      return accumulator
    }, {})
    const byPriority = tasks.value.reduce<Record<TaskPriority, number>>(
      (accumulator, task) => {
        accumulator[task.priority] += 1
        return accumulator
      },
      {
        low: 0,
        medium: 0,
        high: 0,
      },
    )
    const completed = tasks.value.filter((task) => task.status === 'completed').length
    const inProgress = tasks.value.filter((task) => task.status === 'in-progress').length
    const todo = tasks.value.filter((task) => task.status === 'todo').length
    const overdue = tasks.value.filter((task) => isOverdue(task)).length
    const total = tasks.value.length

    return {
      total,
      todo,
      inProgress,
      completed,
      overdue,
      completionRate: total ? Math.round((completed / total) * 100) : 0,
      byCategory,
      byPriority,
    }
  })

  const recentTasks = computed(() => {
    return [...tasks.value]
      .sort((left, right) => dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf())
      .slice(0, 6)
  })

  const upcomingTasks = computed(() => {
    return [...tasks.value]
      .filter((task) => task.dueDate && task.status !== 'completed')
      .sort((left, right) => dayjs(left.dueDate).valueOf() - dayjs(right.dueDate).valueOf())
      .slice(0, 6)
  })

  const completionTrend = computed<CompletionTrendPoint[]>(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const dayPoint = dayjs().subtract(6 - index, 'day')
      const value = tasks.value.filter((task) => task.completedAt && dayjs(task.completedAt).isSame(dayPoint, 'day')).length

      return {
        label: dayPoint.format('MM/DD'),
        value,
      }
    })
  })

  function persist() {
    saveTasks(tasks.value)
  }

  function applyStoredTheme() {
    document.documentElement.dataset.theme = theme.value
  }

  function setTheme(nextTheme: ThemeMode) {
    theme.value = nextTheme
    saveTheme(nextTheme)
    applyStoredTheme()
  }

  function setFilters(nextFilters: TaskFilters) {
    filters.value = nextFilters
  }

  function resetFilters() {
    filters.value = { ...defaultFilters }
  }

  function setSort(nextSort: TaskSort) {
    sort.value = nextSort
  }

  function createTask(taskDraft: TaskDraft) {
    const task = createTaskRecord(normalizeDraft(taskDraft))
    tasks.value = [task, ...tasks.value]
    persist()
    return task
  }

  function updateTask(taskId: string, taskDraft: TaskDraft) {
    const nextDraft = normalizeDraft(taskDraft)
    const taskIndex = tasks.value.findIndex((task) => task.id === taskId)

    if (taskIndex === -1) {
      return null
    }

    const currentTask = tasks.value[taskIndex]
    const updatedTask: TaskItem = {
      ...currentTask,
      ...nextDraft,
      updatedAt: new Date().toISOString(),
      completedAt: resolveCompletedAt(currentTask, nextDraft.status),
    }

    tasks.value.splice(taskIndex, 1, updatedTask)
    tasks.value = [...tasks.value]
    persist()
    return updatedTask
  }

  function updateTaskStatus(taskId: string, status: TaskStatus) {
    const task = tasks.value.find((item) => item.id === taskId)

    if (!task) {
      return null
    }

    task.status = status
    task.updatedAt = new Date().toISOString()
    task.completedAt = resolveCompletedAt(task, status)
    tasks.value = [...tasks.value]
    persist()
    return task
  }

  function deleteTask(taskId: string) {
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
    persist()
  }

  function clearCompleted() {
    tasks.value = tasks.value.filter((task) => task.status !== 'completed')
    persist()
  }

  function clearAll() {
    tasks.value = []
    persist()
  }

  function loadDemoTasks() {
    tasks.value = buildDemoTasks()
    filters.value = { ...defaultFilters }
    sort.value = { ...defaultSort }
    persist()
    return tasks.value.length
  }

  function getTaskById(taskId: string) {
    return tasks.value.find((task) => task.id === taskId) ?? null
  }

  function exportTasks() {
    return buildExportPayload(tasks.value, theme.value)
  }

  function importTasks(rawText: string) {
    const payload = importTaskPayload(rawText)
    tasks.value = payload.tasks
    persist()

    if (payload.theme) {
      setTheme(payload.theme)
    }
  }

  return {
    tasks,
    filters,
    sort,
    theme,
    categories,
    filteredTasks,
    sortedTasks,
    stats,
    recentTasks,
    upcomingTasks,
    completionTrend,
    applyStoredTheme,
    setTheme,
    setFilters,
    resetFilters,
    setSort,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    clearCompleted,
    clearAll,
    loadDemoTasks,
    getTaskById,
    exportTasks,
    importTasks,
  }
})
