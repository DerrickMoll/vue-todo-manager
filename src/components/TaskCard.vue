<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { ElButton, ElIcon, ElOption, ElSelect, ElTag } from 'element-plus'
import { Delete, EditPen, View } from '@element-plus/icons-vue'
import type { TaskItem, TaskPriority, TaskStatus } from '@/types/task'

type TagTone = 'primary' | 'success' | 'warning' | 'info' | 'danger'

const props = defineProps<{
  task: TaskItem
}>()

const emit = defineEmits<{
  (event: 'edit', taskId: string): void
  (event: 'delete', taskId: string): void
  (event: 'details', taskId: string): void
  (event: 'status-change', taskId: string, status: TaskStatus): void
}>()

const statusOptions: Array<{ label: string; value: TaskStatus }> = [
  { label: '待办', value: 'todo' },
  { label: '进行中', value: 'in-progress' },
  { label: '已完成', value: 'completed' },
]

const priorityMeta: Record<TaskPriority, { label: string; tone: TagTone }> = {
  low: { label: '低优先级', tone: 'info' },
  medium: { label: '中优先级', tone: 'warning' },
  high: { label: '高优先级', tone: 'danger' },
}

const statusMeta: Record<TaskStatus, { label: string; tone: TagTone }> = {
  todo: { label: '待办', tone: 'info' },
  'in-progress': { label: '进行中', tone: 'warning' },
  completed: { label: '已完成', tone: 'success' },
}

const overdue = computed(() => {
  return Boolean(props.task.dueDate) && props.task.status !== 'completed' && dayjs(props.task.dueDate).endOf('day').isBefore(dayjs())
})

const dueText = computed(() => (props.task.dueDate ? dayjs(props.task.dueDate).format('YYYY/MM/DD') : '未设置截止日期'))

function handleStatusSelect(value: string) {
  emit('status-change', props.task.id, value as TaskStatus)
}
</script>

<template>
  <article class="task-card surface-card" :class="[`is-${task.status}`, `priority-${task.priority}`]">
    <div class="task-card__header">
      <div class="task-card__title-block" @click="emit('details', task.id)">
        <div class="task-card__chips">
          <el-tag :type="statusMeta[task.status].tone" effect="dark">{{ statusMeta[task.status].label }}</el-tag>
          <el-tag :type="priorityMeta[task.priority].tone">{{ priorityMeta[task.priority].label }}</el-tag>
          <el-tag v-if="overdue" type="danger">已逾期</el-tag>
        </div>
        <h3>{{ task.title }}</h3>
        <p>{{ task.description || '暂无详细说明，点击查看详情了解更多。' }}</p>
      </div>

      <div class="task-card__status">
        <span>状态切换</span>
        <el-select
          :model-value="task.status"
          size="small"
          style="width: 140px"
          @change="handleStatusSelect"
        >
          <el-option v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </div>
    </div>

    <div class="task-card__body">
      <div>
        <span class="label">分类</span>
        <strong>{{ task.category }}</strong>
      </div>
      <div>
        <span class="label">截止</span>
        <strong :class="{ overdue }">{{ dueText }}</strong>
      </div>
      <div>
        <span class="label">创建时间</span>
        <strong>{{ dayjs(task.createdAt).format('MM/DD HH:mm') }}</strong>
      </div>
      <div>
        <span class="label">更新时间</span>
        <strong>{{ dayjs(task.updatedAt).format('MM/DD HH:mm') }}</strong>
      </div>
    </div>

    <div v-if="task.tags.length" class="task-card__tags">
      <span v-for="tag in task.tags" :key="tag"># {{ tag }}</span>
    </div>

    <div class="task-card__actions">
      <el-button plain @click="emit('details', task.id)">
        <el-icon><View /></el-icon>
        详情
      </el-button>
      <el-button plain @click="emit('edit', task.id)">
        <el-icon><EditPen /></el-icon>
        编辑
      </el-button>
      <el-button plain type="danger" @click="emit('delete', task.id)">
        <el-icon><Delete /></el-icon>
        删除
      </el-button>
    </div>
  </article>
</template>

<style scoped>
.task-card {
  display: grid;
  gap: 18px;
  padding: 22px;
  border-radius: 24px;
}

.task-card.is-completed {
  opacity: 0.84;
}

.task-card.is-completed .task-card__title-block h3 {
  text-decoration: line-through;
}

.task-card__header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.task-card__title-block {
  min-width: 0;
  cursor: pointer;
}

.task-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.task-card__title-block h3 {
  margin: 0;
  font-size: 22px;
}

.task-card__title-block p {
  margin: 10px 0 0;
  color: var(--muted);
  line-height: 1.7;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.task-card__status {
  display: grid;
  gap: 8px;
  color: var(--muted);
  justify-items: end;
}

.task-card__body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.task-card__body div {
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
}

.label {
  display: block;
  margin-bottom: 6px;
  color: var(--muted);
  font-size: 13px;
}

.overdue {
  color: var(--danger);
}

.task-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.task-card__tags span {
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--info-soft);
  color: var(--accent-secondary);
  font-size: 13px;
}

.task-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 768px) {
  .task-card__header,
  .task-card__body {
    grid-template-columns: 1fr;
    display: grid;
  }

  .task-card__status {
    justify-items: stretch;
  }

  .task-card__status :deep(.el-select) {
    width: 100% !important;
  }

  .task-card__actions :deep(.el-button) {
    flex: 1 1 120px;
  }
}
</style>
