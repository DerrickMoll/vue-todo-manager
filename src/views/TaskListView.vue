<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { ElButton, ElMessage, ElMessageBox, ElTag } from 'element-plus'
import TaskCard from '@/components/TaskCard.vue'
import TaskDetailDrawer from '@/components/TaskDetailDrawer.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskSort, TaskStatus } from '@/types/task'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useTaskStore()
const drawerVisible = ref(false)
const activeTaskId = ref('')

const activeTask = computed(() => store.getTaskById(activeTaskId.value))
const resultSummary = computed(() => `${store.sortedTasks.length} / ${store.tasks.length}`)
const dueDateFocusText = computed(() => {
  return store.filters.dueDate ? dayjs(store.filters.dueDate).format('YYYY 年 M 月 D 日') : ''
})

watch(
  () => route.query.dueDate,
  (dueDateValue) => {
    const nextDueDate = typeof dueDateValue === 'string' ? dueDateValue : ''

    if (store.filters.dueDate !== nextDueDate) {
      store.setFilters({
        ...store.filters,
        dueDate: nextDueDate,
      })
    }
  },
  { immediate: true },
)

function handleCreate() {
  router.push('/tasks/new')
}

function handleEdit(taskId: string) {
  router.push(`/tasks/${taskId}/edit`)
}

function handleDetails(taskId: string) {
  activeTaskId.value = taskId
  drawerVisible.value = true
}

function handleStatusChange(taskId: string, status: TaskStatus) {
  store.updateTaskStatus(taskId, status)
  ElMessage.success('任务状态已更新')
}

async function handleDelete(taskId: string) {
  try {
    await ElMessageBox.confirm('删除后将无法恢复，确定继续吗？', '删除任务', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    })
    store.deleteTask(taskId)
    if (activeTaskId.value === taskId) {
      drawerVisible.value = false
    }
    ElMessage.success('任务已删除')
  } catch {
    return
  }
}

async function handleClearCompleted() {
  try {
    await ElMessageBox.confirm('将永久清除所有已完成任务，是否继续？', '批量清除', {
      type: 'warning',
      confirmButtonText: '清除',
      cancelButtonText: '取消',
    })
    store.clearCompleted()
    ElMessage.success('已清除全部已完成任务')
  } catch {
    return
  }
}

function handleSortChange(value: TaskSort) {
  store.setSort(value)
}

function handleEditFromDrawer(taskId: string) {
  drawerVisible.value = false
  handleEdit(taskId)
}

function clearDateFocus() {
  router.push({ path: '/tasks' })
}
</script>

<template>
  <section class="task-list-page">
    <TaskFilter
      :filters="store.filters"
      :sort="store.sort"
      :categories="store.categories"
      @update:filters="store.setFilters"
      @update:sort="handleSortChange"
      @create="handleCreate"
      @reset="store.resetFilters"
      @clear-completed="handleClearCompleted"
    />

    <div class="task-list-page__toolbar">
      <div>
        <strong>筛选结果 {{ resultSummary }}</strong>
        <p>
          {{
            store.filters.dueDate
              ? `当前已聚焦 ${dueDateFocusText} 的到期任务，可继续编辑和切换状态。`
              : '支持关键词、状态、优先级、分类、截止日期和逾期筛选的实时联动。'
          }}
        </p>
      </div>
      <div class="task-list-page__toolbar-tags">
        <el-tag v-if="store.filters.dueDate" type="warning" closable @close="clearDateFocus">聚焦 {{ dueDateFocusText }}</el-tag>
        <el-tag type="info">数据已自动持久化</el-tag>
      </div>
    </div>

    <div v-if="store.sortedTasks.length" class="task-list-page__grid">
      <TaskCard
        v-for="task in store.sortedTasks"
        :key="task.id"
        :task="task"
        @details="handleDetails"
        @edit="handleEdit"
        @delete="handleDelete"
        @status-change="handleStatusChange"
      />
    </div>

    <article v-else class="task-list-page__empty surface-card">
      <h2>{{ store.tasks.length ? '没有匹配的筛选结果' : '先创建你的第一条任务' }}</h2>
      <p>
        {{
          store.tasks.length
            ? '你可以尝试重置筛选条件，或调整搜索关键词和排序方式。'
            : '建立标题、截止日期、优先级和分类后，这里会成为你的任务主战场。'
        }}
      </p>
      <div class="task-list-page__empty-actions">
        <el-button plain @click="store.resetFilters">重置筛选</el-button>
        <el-button type="primary" @click="handleCreate">新建任务</el-button>
      </div>
    </article>

    <TaskDetailDrawer v-model="drawerVisible" :task="activeTask" @edit="handleEditFromDrawer" />
  </section>
</template>

<style scoped>
.task-list-page {
  display: grid;
  gap: 18px;
}

.task-list-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 6px;
}

.task-list-page__toolbar strong {
  display: block;
  font-size: 18px;
}

.task-list-page__toolbar p {
  margin: 8px 0 0;
  color: var(--muted);
}

.task-list-page__toolbar-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.task-list-page__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.task-list-page__empty {
  padding: 34px;
  text-align: center;
}

.task-list-page__empty h2,
.task-list-page__empty p {
  margin: 0;
}

.task-list-page__empty p {
  margin-top: 12px;
  color: var(--muted);
  line-height: 1.7;
}

.task-list-page__empty-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 1100px) {
  .task-list-page__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .task-list-page__toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .task-list-page__toolbar-tags {
    justify-content: flex-start;
  }

  .task-list-page__empty {
    padding: 24px;
  }

  .task-list-page__empty-actions {
    flex-direction: column;
  }
}
</style>
