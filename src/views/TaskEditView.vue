<script setup lang="ts">
import { computed } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskDraft } from '@/types/task'

const route = useRoute()
const router = useRouter()
const store = useTaskStore()

const isEditMode = computed(() => Boolean(route.params.id))
const taskId = computed(() => String(route.params.id ?? ''))
const currentTask = computed(() => (isEditMode.value ? store.getTaskById(taskId.value) : null))

const tips = [
  '标题和分类建议写得简洁，方便后续快速搜索。',
  '进行中任务尽量附上清晰的描述，方便随时继续。',
  '截止日期会参与排序和逾期统计，建议尽量填写。',
]

function handleCancel() {
  router.push('/tasks')
}

function handleSave(payload: TaskDraft) {
  if (isEditMode.value && currentTask.value) {
    store.updateTask(currentTask.value.id, payload)
    ElMessage.success('任务已更新')
  } else {
    store.createTask(payload)
    ElMessage.success('任务已创建')
  }

  router.push('/tasks')
}
</script>

<template>
  <section class="task-edit-page">
    <template v-if="!isEditMode || currentTask">
      <div class="task-edit-page__main">
        <section class="task-edit-page__intro surface-card">
          <span class="eyebrow">{{ isEditMode ? '编辑任务' : '创建任务' }}</span>
          <h2>{{ isEditMode ? '更新任务内容与当前进度' : '建立一条新的任务记录' }}</h2>
          <p>
            {{
              isEditMode
                ? '完善描述、优先级和截止日期，让任务列表和统计视图保持同步。'
                : '输入任务关键信息后，数据会自动保存到浏览器本地存储中。'
            }}
          </p>
        </section>

        <TaskForm
          :initial-task="currentTask"
          :submit-text="isEditMode ? '保存修改' : '创建任务'"
          :category-options="store.categories"
          @save="handleSave"
          @cancel="handleCancel"
        />
      </div>

      <aside class="task-edit-page__aside surface-card">
        <h3>填写建议</h3>
        <div v-for="tip in tips" :key="tip" class="task-edit-page__tip">
          <strong>0{{ tips.indexOf(tip) + 1 }}</strong>
          <p>{{ tip }}</p>
        </div>
      </aside>
    </template>

    <article v-else class="task-edit-page__missing surface-card">
      <h2>没有找到要编辑的任务</h2>
      <p>这条任务可能已经被删除，或者当前链接中的任务编号无效。</p>
      <el-button type="primary" @click="router.push('/tasks')">返回任务列表</el-button>
    </article>
  </section>
</template>

<style scoped>
.task-edit-page {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) 320px;
  gap: 20px;
}

.task-edit-page__main {
  display: grid;
  gap: 18px;
}

.task-edit-page__intro,
.task-edit-page__aside,
.task-edit-page__missing {
  padding: 24px;
}

.task-edit-page__intro h2,
.task-edit-page__intro p,
.task-edit-page__missing h2,
.task-edit-page__missing p {
  margin: 0;
}

.task-edit-page__intro h2 {
  margin-top: 14px;
  font-size: 34px;
}

.task-edit-page__intro p,
.task-edit-page__missing p {
  margin-top: 12px;
  color: var(--muted);
  line-height: 1.7;
}

.task-edit-page__aside h3 {
  margin: 0 0 16px;
  font-size: 24px;
}

.task-edit-page__tip {
  padding: 16px 0;
  border-top: 1px solid var(--border);
}

.task-edit-page__tip:first-of-type {
  border-top: 0;
  padding-top: 0;
}

.task-edit-page__tip strong {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
}

.task-edit-page__tip p {
  margin: 10px 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.task-edit-page__missing {
  text-align: center;
}

.task-edit-page__missing :deep(.el-button) {
  margin-top: 20px;
}

@media (max-width: 1080px) {
  .task-edit-page {
    grid-template-columns: 1fr;
  }
}
</style>
