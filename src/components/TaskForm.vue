<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import {
  ElButton,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
} from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { TaskDraft, TaskItem } from '@/types/task'

const props = defineProps<{
  initialTask?: TaskItem | null
  submitText?: string
  categoryOptions?: string[]
}>()

const emit = defineEmits<{
  (event: 'save', payload: TaskDraft): void
  (event: 'cancel'): void
}>()

const formRef = ref<FormInstance>()
const tagsText = ref('')
const builtInCategories = ['学习', '工作', '生活', '项目', '健康', '阅读']

const formModel = reactive<TaskDraft>({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
  category: '学习',
  tags: [],
})

const categoryList = computed(() => {
  return Array.from(new Set([...builtInCategories, ...(props.categoryOptions ?? []), formModel.category].filter(Boolean)))
})

const submitLabel = computed(() => props.submitText ?? '保存任务')

const rules: FormRules = {
  title: [{ required: true, message: '请输入任务标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择或输入分类', trigger: 'change' }],
}

watch(
  () => props.initialTask,
  (task) => {
    formModel.title = task?.title ?? ''
    formModel.description = task?.description ?? ''
    formModel.status = task?.status ?? 'todo'
    formModel.priority = task?.priority ?? 'medium'
    formModel.dueDate = task?.dueDate ?? ''
    formModel.category = task?.category ?? '学习'
    formModel.tags = task?.tags ?? []
    tagsText.value = task?.tags.join(', ') ?? ''
  },
  { immediate: true },
)

async function handleSubmit() {
  if (!formRef.value) {
    return
  }

  try {
    await formRef.value.validate()
    emit('save', {
      ...formModel,
      title: formModel.title.trim(),
      description: formModel.description.trim(),
      category: formModel.category.trim() || '未分类',
      tags: tagsText.value
        .split(/[，,]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
  } catch {
    return
  }
}
</script>

<template>
  <div class="task-form surface-card">
    <el-form ref="formRef" :model="formModel" :rules="rules" label-position="top" size="large">
      <div class="task-form__grid">
        <el-form-item label="任务标题" prop="title" class="task-form__full">
          <el-input v-model="formModel.title" placeholder="例如：完成数据库课程报告" maxlength="50" show-word-limit />
        </el-form-item>

        <el-form-item label="任务描述" class="task-form__full">
          <el-input
            v-model="formModel.description"
            type="textarea"
            :rows="4"
            placeholder="补充任务背景、执行步骤或需要注意的事项"
            maxlength="240"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="任务状态">
          <el-radio-group v-model="formModel.status" class="task-form__group">
            <el-radio-button value="todo">待办</el-radio-button>
            <el-radio-button value="in-progress">进行中</el-radio-button>
            <el-radio-button value="completed">已完成</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="优先级">
          <el-radio-group v-model="formModel.priority" class="task-form__group">
            <el-radio-button value="low">低</el-radio-button>
            <el-radio-button value="medium">中</el-radio-button>
            <el-radio-button value="high">高</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="截止日期">
          <el-date-picker
            v-model="formModel.dueDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择截止日期"
            style="width: 100%"
            clearable
          />
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="formModel.category" filterable allow-create default-first-option style="width: 100%">
            <el-option v-for="category in categoryList" :key="category" :label="category" :value="category" />
          </el-select>
        </el-form-item>

        <el-form-item label="标签" class="task-form__full">
          <el-input v-model="tagsText" placeholder="多个标签用逗号分隔，例如：期末, 汇报, 团队协作" />
        </el-form-item>
      </div>

      <div class="task-form__actions">
        <el-button plain @click="emit('cancel')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">{{ submitLabel }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.task-form {
  padding: 26px;
}

.task-form__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.task-form__full {
  grid-column: 1 / -1;
}

.task-form__group {
  display: flex;
  flex-wrap: wrap;
}

.task-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .task-form {
    padding: 20px;
  }

  .task-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
