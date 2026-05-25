<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { ElButton, ElDescriptions, ElDescriptionsItem, ElDrawer } from 'element-plus'
import type { TaskItem } from '@/types/task'

const props = defineProps<{
  modelValue: boolean
  task: TaskItem | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'edit', taskId: string): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const statusLabel = computed(() => {
  if (!props.task) {
    return ''
  }

  return {
    todo: '待办',
    'in-progress': '进行中',
    completed: '已完成',
  }[props.task.status]
})

const priorityLabel = computed(() => {
  if (!props.task) {
    return ''
  }

  return {
    low: '低',
    medium: '中',
    high: '高',
  }[props.task.priority]
})
</script>

<template>
  <el-drawer v-model="visible" size="420px" title="任务详情">
    <template v-if="task">
      <div class="detail-drawer">
        <div class="detail-drawer__hero">
          <span class="eyebrow">{{ task.category }}</span>
          <h2>{{ task.title }}</h2>
          <p>{{ task.description || '当前任务没有额外描述，可直接进入编辑页补充。' }}</p>
        </div>

        <el-descriptions :column="1" border>
          <el-descriptions-item label="状态">{{ statusLabel }}</el-descriptions-item>
          <el-descriptions-item label="优先级">{{ priorityLabel }}</el-descriptions-item>
          <el-descriptions-item label="截止日期">{{ task.dueDate || '未设置' }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ dayjs(task.createdAt).format('YYYY-MM-DD HH:mm') }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ dayjs(task.updatedAt).format('YYYY-MM-DD HH:mm') }}</el-descriptions-item>
        </el-descriptions>

        <div v-if="task.tags.length" class="detail-drawer__tags">
          <span v-for="tag in task.tags" :key="tag"># {{ tag }}</span>
        </div>

        <el-button type="primary" size="large" @click="emit('edit', task.id)">前往编辑任务</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.detail-drawer {
  display: grid;
  gap: 20px;
}

.detail-drawer__hero {
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(145deg, var(--accent-soft), rgba(255, 255, 255, 0.04));
  border: 1px solid var(--border);
}

.detail-drawer__hero h2,
.detail-drawer__hero p {
  margin: 0;
}

.detail-drawer__hero h2 {
  margin-top: 16px;
  font-size: 28px;
}

.detail-drawer__hero p {
  margin-top: 10px;
  color: var(--muted);
  line-height: 1.7;
}

.detail-drawer__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-drawer__tags span {
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--info-soft);
  color: var(--accent-secondary);
}
</style>
