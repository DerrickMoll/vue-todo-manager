<script setup lang="ts">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import { ElButton, ElEmpty, ElMessage, ElTag } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskItem, TaskPriority, TaskStatus } from '@/types/task'

const router = useRouter()
const store = useTaskStore()
const draggingTaskId = ref('')
const activeDropStatus = ref<TaskStatus | null>(null)

const priorityTone: Record<TaskPriority, 'danger' | 'warning' | 'info'> = {
  high: 'danger',
  medium: 'warning',
  low: 'info',
}

const columnMeta: Array<{ status: TaskStatus; title: string; description: string; accent: string }> = [
  { status: 'todo', title: '待办池', description: '还未开始的任务先集中在这里。', accent: 'todo' },
  { status: 'in-progress', title: '推进中', description: '拖到这里代表你正在处理它。', accent: 'progress' },
  { status: 'completed', title: '已完成', description: '完成后立即沉淀，统计会同步更新。', accent: 'done' },
]

const boardColumns = computed(() => {
  return columnMeta.map((column) => ({
    ...column,
    tasks: [...store.tasks]
      .filter((task) => task.status === column.status)
      .sort((left, right) => {
        const leftDue = left.dueDate ? dayjs(left.dueDate).valueOf() : Number.MAX_SAFE_INTEGER
        const rightDue = right.dueDate ? dayjs(right.dueDate).valueOf() : Number.MAX_SAFE_INTEGER

        if (leftDue !== rightDue) {
          return leftDue - rightDue
        }

        return dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf()
      }),
  }))
})

function startDrag(taskId: string) {
  draggingTaskId.value = taskId
}

function finishDrag() {
  draggingTaskId.value = ''
  activeDropStatus.value = null
}

function handleDrop(nextStatus: TaskStatus) {
  if (!draggingTaskId.value) {
    return
  }

  const currentTask = store.getTaskById(draggingTaskId.value)
  if (!currentTask || currentTask.status === nextStatus) {
    finishDrag()
    return
  }

  store.updateTaskStatus(currentTask.id, nextStatus)
  ElMessage.success(`已将「${currentTask.title}」移动到${columnMeta.find((item) => item.status === nextStatus)?.title}`)
  finishDrag()
}

function editTask(taskId: string) {
  router.push(`/tasks/${taskId}/edit`)
}

function createTask() {
  router.push('/tasks/new')
}

function dueLabel(task: TaskItem) {
  return task.dueDate ? dayjs(task.dueDate).format('MM/DD') : '无截止日期'
}

function isOverdue(task: TaskItem) {
  return Boolean(task.dueDate) && task.status !== 'completed' && dayjs(task.dueDate).endOf('day').isBefore(dayjs())
}
</script>

<template>
  <section class="board-page">
    <section class="board-page__hero surface-card">
      <div>
        <span class="eyebrow">拓展功能</span>
        <h2>拖拽看板，让任务流动一眼可见。</h2>
        <p>把任务从待办拖到进行中，再拖到已完成，状态、统计和本地存储会同步更新。</p>
      </div>
      <div class="board-page__hero-actions">
        <el-button plain @click="router.push('/tasks')">切换到列表视图</el-button>
        <el-button type="primary" @click="createTask">新增任务</el-button>
      </div>
    </section>

    <div class="board-page__summary">
      <article v-for="column in boardColumns" :key="column.status" class="board-page__summary-card surface-card" :class="`accent-${column.accent}`">
        <span>{{ column.title }}</span>
        <strong>{{ column.tasks.length }}</strong>
        <p>{{ column.description }}</p>
      </article>
    </div>

    <section class="board-page__grid">
      <article
        v-for="column in boardColumns"
        :key="column.status"
        class="board-column surface-card"
        :class="[{ 'is-active-drop': activeDropStatus === column.status }, `column-${column.accent}`]"
        @dragenter.prevent="activeDropStatus = column.status"
        @dragover.prevent
        @dragleave="activeDropStatus = null"
        @drop.prevent="handleDrop(column.status)"
      >
        <div class="board-column__header">
          <div>
            <h3>{{ column.title }}</h3>
            <p>{{ column.description }}</p>
          </div>
          <el-tag effect="dark">{{ column.tasks.length }} 项</el-tag>
        </div>

        <div v-if="column.tasks.length" class="board-column__list">
          <article
            v-for="task in column.tasks"
            :key="task.id"
            class="board-task"
            draggable="true"
            @dragstart="startDrag(task.id)"
            @dragend="finishDrag"
          >
            <div class="board-task__meta">
              <el-tag :type="priorityTone[task.priority]">
                {{ task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级' }}
              </el-tag>
              <el-tag v-if="isOverdue(task)" type="danger">已逾期</el-tag>
              <el-tag>{{ task.category }}</el-tag>
            </div>

            <h4>{{ task.title }}</h4>
            <p>{{ task.description || '暂无描述，拖拽可快速变更状态。' }}</p>

            <div class="board-task__footer">
              <div>
                <span>截止</span>
                <strong :class="{ overdue: isOverdue(task) }">{{ dueLabel(task) }}</strong>
              </div>
              <el-button plain size="small" @click="editTask(task.id)">编辑</el-button>
            </div>

            <div v-if="task.tags.length" class="board-task__tags">
              <span v-for="tag in task.tags" :key="tag"># {{ tag }}</span>
            </div>
          </article>
        </div>

        <el-empty v-else description="把任务拖到这里开始流转" />
      </article>
    </section>
  </section>
</template>

<style scoped>
.board-page {
  display: grid;
  gap: 20px;
}

.board-page__hero,
.board-column,
.board-page__summary-card {
  padding: 24px;
}

.board-page__hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.board-page__hero h2,
.board-page__hero p {
  margin: 0;
}

.board-page__hero h2 {
  margin-top: 14px;
  font-size: 34px;
}

.board-page__hero p {
  margin-top: 10px;
  color: var(--muted);
  line-height: 1.8;
  max-width: 56ch;
}

.board-page__hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.board-page__summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.board-page__summary-card {
  position: relative;
  overflow: hidden;
}

.board-page__summary-card::after {
  position: absolute;
  content: '';
  width: 120px;
  height: 120px;
  right: -28px;
  bottom: -36px;
  border-radius: 50%;
  opacity: 0.18;
}

.accent-todo::after {
  background: #60a5fa;
}

.accent-progress::after {
  background: #fb923c;
}

.accent-done::after {
  background: #4ade80;
}

.board-page__summary-card span,
.board-page__summary-card p {
  color: var(--muted);
}

.board-page__summary-card strong {
  display: block;
  margin: 10px 0 6px;
  font-size: 32px;
}

.board-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  align-items: start;
}

.board-column {
  min-height: 560px;
  border: 1px solid var(--border);
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.board-column.is-active-drop {
  transform: translateY(-4px);
  border-color: var(--accent);
  background: linear-gradient(180deg, var(--accent-soft), rgba(255, 255, 255, 0.03));
}

.board-column__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.board-column__header h3,
.board-column__header p,
.board-task h4,
.board-task p {
  margin: 0;
}

.board-column__header p {
  margin-top: 8px;
  color: var(--muted);
  line-height: 1.6;
}

.board-column__list {
  display: grid;
  gap: 14px;
}

.board-task {
  display: grid;
  gap: 14px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.08);
  cursor: grab;
}

.board-task:active {
  cursor: grabbing;
}

.board-task__meta,
.board-task__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.board-task h4 {
  font-size: 20px;
}

.board-task p {
  color: var(--muted);
  line-height: 1.7;
}

.board-task__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.board-task__footer span {
  display: block;
  color: var(--muted);
  font-size: 12px;
}

.board-task__tags span {
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--info-soft);
  color: var(--accent-secondary);
  font-size: 13px;
}

.overdue {
  color: var(--danger);
}

@media (max-width: 1200px) {
  .board-page__summary,
  .board-page__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .board-page__hero {
    flex-direction: column;
    align-items: stretch;
  }

  .board-page__hero-actions,
  .board-page__hero-actions :deep(.el-button) {
    width: 100%;
  }

  .board-column,
  .board-page__summary-card,
  .board-page__hero {
    padding: 20px;
  }
}
</style>