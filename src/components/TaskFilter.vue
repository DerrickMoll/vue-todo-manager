<script setup lang="ts">
import { ElButton, ElIcon, ElInput, ElOption, ElRadioButton, ElRadioGroup, ElSelect } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import type { TaskFilters, TaskSort } from '@/types/task'

const props = defineProps<{
  filters: TaskFilters
  sort: TaskSort
  categories: string[]
}>()

const emit = defineEmits<{
  (event: 'update:filters', value: TaskFilters): void
  (event: 'update:sort', value: TaskSort): void
  (event: 'create'): void
  (event: 'reset'): void
  (event: 'clear-completed'): void
}>()

function updateFilter<Key extends keyof TaskFilters>(key: Key, value: TaskFilters[Key]) {
  emit('update:filters', {
    ...props.filters,
    [key]: value,
  })
}

function updateSort<Key extends keyof TaskSort>(key: Key, value: TaskSort[Key]) {
  emit('update:sort', {
    ...props.sort,
    [key]: value,
  })
}

function handleKeywordChange(value: string) {
  updateFilter('keyword', value)
}

function handleStatusChange(value: TaskFilters['status']) {
  updateFilter('status', value)
}

function handlePriorityChange(value: TaskFilters['priority']) {
  updateFilter('priority', value)
}

function handleCategoryChange(value: string | undefined) {
  updateFilter('category', value ?? '')
}

function handleOverdueChange(value: TaskFilters['overdue']) {
  updateFilter('overdue', value)
}

function handleSortFieldChange(value: TaskSort['field']) {
  updateSort('field', value)
}

function handleSortOrderChange(value: string | number | boolean | undefined) {
  if (value === 'asc' || value === 'desc') {
    updateSort('order', value)
  }
}
</script>

<template>
  <section class="filter-panel surface-card">
    <div class="filter-panel__headline">
      <div>
        <span class="eyebrow">实时搜索</span>
        <h2>任务筛选与排序</h2>
        <p>支持关键词、状态、优先级、分类与逾期条件的组合筛选。</p>
      </div>
      <div class="filter-panel__actions">
        <el-button plain @click="emit('clear-completed')">清除已完成</el-button>
        <el-button type="primary" @click="emit('create')">新增任务</el-button>
      </div>
    </div>

    <div class="filter-panel__grid">
      <el-input
        :model-value="filters.keyword"
        placeholder="搜索标题、描述、分类或标签"
        clearable
        @update:model-value="handleKeywordChange"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>

      <el-select :model-value="filters.status" @change="handleStatusChange">
        <el-option label="全部状态" value="all" />
        <el-option label="待办" value="todo" />
        <el-option label="进行中" value="in-progress" />
        <el-option label="已完成" value="completed" />
      </el-select>

      <el-select :model-value="filters.priority" @change="handlePriorityChange">
        <el-option label="全部优先级" value="all" />
        <el-option label="高优先级" value="high" />
        <el-option label="中优先级" value="medium" />
        <el-option label="低优先级" value="low" />
      </el-select>

      <el-select :model-value="filters.category" clearable placeholder="全部分类" @change="handleCategoryChange">
        <el-option label="全部分类" value="" />
        <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
      </el-select>

      <el-select :model-value="filters.overdue" @change="handleOverdueChange">
        <el-option label="全部时效" value="all" />
        <el-option label="仅逾期" value="overdue" />
        <el-option label="未逾期" value="on-time" />
      </el-select>

      <el-select :model-value="sort.field" @change="handleSortFieldChange">
        <el-option label="按截止日期" value="dueDate" />
        <el-option label="按创建时间" value="createdAt" />
        <el-option label="按更新时间" value="updatedAt" />
        <el-option label="按优先级" value="priority" />
        <el-option label="按标题" value="title" />
      </el-select>
    </div>

    <div class="filter-panel__footer">
      <el-radio-group :model-value="sort.order" @change="handleSortOrderChange">
        <el-radio-button value="asc">升序</el-radio-button>
        <el-radio-button value="desc">降序</el-radio-button>
      </el-radio-group>
      <el-button plain @click="emit('reset')">重置筛选</el-button>
    </div>
  </section>
</template>

<style scoped>
.filter-panel {
  padding: 24px;
}

.filter-panel__headline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}

.filter-panel__headline h2,
.filter-panel__headline p {
  margin: 0;
}

.filter-panel__headline h2 {
  margin-top: 14px;
  font-size: 28px;
}

.filter-panel__headline p {
  margin-top: 8px;
  color: var(--muted);
}

.filter-panel__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-panel__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.filter-panel__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 18px;
}

@media (max-width: 960px) {
  .filter-panel__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .filter-panel {
    padding: 20px;
  }

  .filter-panel__headline,
  .filter-panel__footer,
  .filter-panel__grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .filter-panel__actions,
  .filter-panel__footer :deep(.el-radio-group) {
    width: 100%;
  }

  .filter-panel__actions :deep(.el-button),
  .filter-panel__footer :deep(.el-button),
  .filter-panel__footer :deep(.el-radio-group) {
    width: 100%;
  }
}
</style>
