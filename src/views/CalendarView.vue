<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { ElButton, ElCalendar, ElEmpty, ElTag } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskItem, TaskPriority } from '@/types/task'

const router = useRouter()
const store = useTaskStore()
const selectedDate = ref(new Date())

const priorityTone: Record<TaskPriority, 'danger' | 'warning' | 'info'> = {
  high: 'danger',
  medium: 'warning',
  low: 'info',
}

const tasksWithDueDate = computed(() => {
  return [...store.tasks]
    .filter((task) => task.dueDate)
    .sort((left, right) => dayjs(left.dueDate).valueOf() - dayjs(right.dueDate).valueOf())
})

const groupedByDate = computed(() => {
  return tasksWithDueDate.value.reduce<Record<string, TaskItem[]>>((accumulator, task) => {
    if (!accumulator[task.dueDate]) {
      accumulator[task.dueDate] = []
    }
    accumulator[task.dueDate].push(task)
    return accumulator
  }, {})
})

const selectedDateKey = computed(() => dayjs(selectedDate.value).format('YYYY-MM-DD'))

const tasksForSelectedDate = computed(() => {
  return groupedByDate.value[selectedDateKey.value] ?? []
})

const monthlyDueCount = computed(() => tasksWithDueDate.value.length)

const overdueCount = computed(() => {
  return tasksWithDueDate.value.filter((task) => task.status !== 'completed' && dayjs(task.dueDate).endOf('day').isBefore(dayjs())).length
})

const highlightedDates = computed(() => Object.keys(groupedByDate.value))

function tasksForCalendarDay(day: string) {
  return groupedByDate.value[day] ?? []
}

function isOverdue(task: TaskItem) {
  return task.status !== 'completed' && dayjs(task.dueDate).endOf('day').isBefore(dayjs())
}

function editTask(taskId: string) {
  router.push(`/tasks/${taskId}/edit`)
}

function goToCreate() {
  router.push('/tasks/new')
}

function selectToday() {
  selectedDate.value = new Date()
}
</script>

<template>
  <section class="calendar-page">
    <section class="calendar-page__hero surface-card">
      <div>
        <span class="eyebrow">拓展功能</span>
        <h2>把截止日期放进日历里，安排任务更直观。</h2>
        <p>月历能快速看到哪几天有任务压在一起，右侧则聚焦当前选中日期的任务清单，适合答辩时做时间规划展示。</p>
      </div>
      <div class="calendar-page__hero-actions">
        <el-button plain @click="selectToday">回到今天</el-button>
        <el-button plain @click="router.push('/tasks')">查看列表</el-button>
        <el-button type="primary" @click="goToCreate">新增任务</el-button>
      </div>
    </section>

    <section class="calendar-page__summary">
      <article class="calendar-page__summary-card surface-card accent-sun">
        <span>日历任务数</span>
        <strong>{{ monthlyDueCount }}</strong>
        <p>所有已设置截止日期的任务都会显示在月历中。</p>
      </article>
      <article class="calendar-page__summary-card surface-card accent-mint">
        <span>逾期任务</span>
        <strong>{{ overdueCount }}</strong>
        <p>逾期任务会在日期详情里高亮，方便优先处理。</p>
      </article>
      <article class="calendar-page__summary-card surface-card accent-sky">
        <span>任务日期点</span>
        <strong>{{ highlightedDates.length }}</strong>
        <p>表示本月中已有任务分布的日期数量。</p>
      </article>
    </section>

    <section class="calendar-page__grid">
      <article class="calendar-page__calendar surface-card">
        <el-calendar v-model="selectedDate">
          <template #date-cell="{ data }">
            <div class="calendar-page__cell">
              <span class="calendar-page__cell-day">{{ Number(data.day.split('-')[2]) }}</span>
              <div v-if="tasksForCalendarDay(data.day).length" class="calendar-page__cell-list">
                <span
                  v-for="task in tasksForCalendarDay(data.day).slice(0, 2)"
                  :key="task.id"
                  class="calendar-page__cell-chip"
                  :class="[`priority-${task.priority}`, { overdue: isOverdue(task) }]"
                >
                  {{ task.title }}
                </span>
                <span v-if="tasksForCalendarDay(data.day).length > 2" class="calendar-page__cell-more">
                  +{{ tasksForCalendarDay(data.day).length - 2 }}
                </span>
              </div>
            </div>
          </template>
        </el-calendar>
      </article>

      <aside class="calendar-page__sidebar surface-card">
        <div class="calendar-page__sidebar-header">
          <span class="eyebrow">选中日期</span>
          <h3>{{ dayjs(selectedDate).format('YYYY 年 M 月 D 日') }}</h3>
          <p>当天共有 {{ tasksForSelectedDate.length }} 项到期任务。</p>
        </div>

        <div v-if="tasksForSelectedDate.length" class="calendar-page__sidebar-list">
          <article v-for="task in tasksForSelectedDate" :key="task.id" class="calendar-page__task-card">
            <div class="calendar-page__task-top">
              <div>
                <h4>{{ task.title }}</h4>
                <p>{{ task.description || '暂无描述，可点击编辑补充。' }}</p>
              </div>
              <el-tag :type="priorityTone[task.priority]">
                {{ task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低' }}优先级
              </el-tag>
            </div>

            <div class="calendar-page__task-meta">
              <el-tag>{{ task.category }}</el-tag>
              <el-tag :type="task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'info'">
                {{ task.status === 'todo' ? '待办' : task.status === 'in-progress' ? '进行中' : '已完成' }}
              </el-tag>
              <el-tag v-if="isOverdue(task)" type="danger">已逾期</el-tag>
            </div>

            <div v-if="task.tags.length" class="calendar-page__task-tags">
              <span v-for="tag in task.tags" :key="tag"># {{ tag }}</span>
            </div>

            <el-button plain size="small" @click="editTask(task.id)">编辑任务</el-button>
          </article>
        </div>

        <el-empty v-else description="这一天没有到期任务，可以安心安排新计划。" />
      </aside>
    </section>
  </section>
</template>

<style scoped>
.calendar-page {
  display: grid;
  gap: 20px;
}

.calendar-page__hero,
.calendar-page__summary-card,
.calendar-page__calendar,
.calendar-page__sidebar {
  padding: 24px;
}

.calendar-page__hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.calendar-page__hero h2,
.calendar-page__hero p,
.calendar-page__sidebar-header h3,
.calendar-page__sidebar-header p,
.calendar-page__task-card h4,
.calendar-page__task-card p {
  margin: 0;
}

.calendar-page__hero h2 {
  margin-top: 14px;
  font-size: 34px;
}

.calendar-page__hero p,
.calendar-page__sidebar-header p,
.calendar-page__task-card p {
  margin-top: 10px;
  color: var(--muted);
  line-height: 1.8;
}

.calendar-page__hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.calendar-page__summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.calendar-page__summary-card {
  position: relative;
  overflow: hidden;
}

.calendar-page__summary-card::after {
  position: absolute;
  content: '';
  width: 120px;
  height: 120px;
  right: -28px;
  bottom: -36px;
  border-radius: 50%;
  opacity: 0.18;
}

.accent-sun::after {
  background: #f59e0b;
}

.accent-mint::after {
  background: #10b981;
}

.accent-sky::after {
  background: #38bdf8;
}

.calendar-page__summary-card span,
.calendar-page__summary-card p {
  color: var(--muted);
}

.calendar-page__summary-card strong {
  display: block;
  margin: 10px 0 6px;
  font-size: 32px;
}

.calendar-page__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.8fr);
  gap: 20px;
}

.calendar-page__calendar :deep(.el-calendar-table td) {
  border-radius: 16px;
}

.calendar-page__calendar :deep(.el-calendar-table .el-calendar-day) {
  height: 120px;
  padding: 10px;
}

.calendar-page__cell {
  display: grid;
  gap: 8px;
  height: 100%;
}

.calendar-page__cell-day {
  font-weight: 700;
}

.calendar-page__cell-list {
  display: grid;
  gap: 6px;
}

.calendar-page__cell-chip,
.calendar-page__cell-more,
.calendar-page__task-tags span {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  line-height: 1.35;
}

.calendar-page__cell-chip {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calendar-page__cell-more {
  color: var(--muted);
  background: rgba(255, 255, 255, 0.08);
}

.calendar-page__cell-chip.priority-high {
  border-color: rgba(239, 68, 68, 0.35);
}

.calendar-page__cell-chip.priority-medium {
  border-color: rgba(245, 158, 11, 0.35);
}

.calendar-page__cell-chip.priority-low {
  border-color: rgba(56, 189, 248, 0.35);
}

.calendar-page__cell-chip.overdue {
  color: var(--danger);
}

.calendar-page__sidebar {
  display: grid;
  gap: 16px;
}

.calendar-page__sidebar-list {
  display: grid;
  gap: 12px;
}

.calendar-page__task-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.08);
}

.calendar-page__task-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.calendar-page__task-top h4 {
  font-size: 18px;
}

.calendar-page__task-meta,
.calendar-page__task-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.calendar-page__task-tags span {
  background: var(--info-soft);
  color: var(--accent-secondary);
}

@media (max-width: 1200px) {
  .calendar-page__summary,
  .calendar-page__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .calendar-page__hero {
    flex-direction: column;
    align-items: stretch;
  }

  .calendar-page__hero-actions,
  .calendar-page__hero-actions :deep(.el-button) {
    width: 100%;
  }

  .calendar-page__hero,
  .calendar-page__summary-card,
  .calendar-page__calendar,
  .calendar-page__sidebar {
    padding: 20px;
  }

  .calendar-page__calendar :deep(.el-calendar-table .el-calendar-day) {
    height: 94px;
    padding: 8px;
  }

  .calendar-page__task-top {
    flex-direction: column;
  }
}
</style>