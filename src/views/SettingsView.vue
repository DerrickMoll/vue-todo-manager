<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { useTaskStore } from '@/stores/taskStore'
import type { ThemeMode } from '@/types/task'

const store = useTaskStore()
const fileInputRef = ref<HTMLInputElement | null>(null)

const themeOptions: Array<{ value: ThemeMode; title: string; description: string }> = [
  { value: 'sunrise', title: '晨曦暖色', description: '更轻盈、明亮，适合白天专注规划。' },
  { value: 'midnight', title: '深海夜色', description: '更沉静、低亮度，适合长时间浏览。' },
]

function setTheme(theme: ThemeMode) {
  store.setTheme(theme)
  ElMessage.success('主题已切换')
}

function exportTasks() {
  const content = store.exportTasks()
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `flow-board-backup-${dayjs().format('YYYYMMDD-HHmmss')}.json`
  anchor.click()
  URL.revokeObjectURL(url)
  ElMessage.success('任务数据已导出')
}

function triggerImport() {
  fileInputRef.value?.click()
}

async function loadDemoTasks() {
  try {
    await ElMessageBox.confirm(
      store.stats.total
        ? '加载演示数据会覆盖当前本地任务，用于答辩展示会更直观，是否继续？'
        : '将写入一组演示任务，用于快速展示看板、统计和筛选效果。',
      '加载演示数据',
      {
        type: 'warning',
        confirmButtonText: '加载演示数据',
        cancelButtonText: '取消',
      },
    )
    const count = store.loadDemoTasks()
    ElMessage.success(`已加载 ${count} 条演示任务`)
  } catch {
    return
  }
}

async function handleImport(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  try {
    const content = await file.text()
    store.importTasks(content)
    ElMessage.success('任务数据已导入')
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '导入失败，请检查文件格式。')
  } finally {
    input.value = ''
  }
}

async function clearCompleted() {
  try {
    await ElMessageBox.confirm('将清空全部已完成任务，是否继续？', '清理已完成任务', {
      type: 'warning',
      confirmButtonText: '确认清理',
      cancelButtonText: '取消',
    })
    store.clearCompleted()
    ElMessage.success('已清理全部已完成任务')
  } catch {
    return
  }
}

async function clearAll() {
  try {
    await ElMessageBox.confirm('这会删除本地保存的全部任务数据，且无法恢复。', '清空所有数据', {
      type: 'warning',
      confirmButtonText: '立即清空',
      cancelButtonText: '取消',
    })
    store.clearAll()
    ElMessage.success('所有任务数据已清空')
  } catch {
    return
  }
}
</script>

<template>
  <section class="settings-page">
    <article class="surface-card settings-page__panel">
      <span class="eyebrow">个性主题</span>
      <h2>切换你喜欢的界面氛围</h2>
      <p>主题选择会自动保存，下次打开项目时仍会保持当前风格。</p>

      <div class="settings-page__theme-grid">
        <button
          v-for="option in themeOptions"
          :key="option.value"
          type="button"
          class="settings-page__theme-card"
          :class="{ 'is-active': store.theme === option.value }"
          @click="setTheme(option.value)"
        >
          <div class="settings-page__theme-preview" :class="`theme-${option.value}`" />
          <strong>{{ option.title }}</strong>
          <span>{{ option.description }}</span>
        </button>
      </div>
    </article>

    <article class="surface-card settings-page__panel">
      <span class="eyebrow">数据管理</span>
      <h2>备份、导入与清理</h2>
      <p>当前本地共保存 {{ store.stats.total }} 条任务，其中已完成 {{ store.stats.completed }} 条。</p>

      <div class="settings-page__actions">
        <el-button type="primary" @click="loadDemoTasks">加载演示数据</el-button>
        <el-button plain @click="exportTasks">导出 JSON 数据</el-button>
        <el-button plain @click="triggerImport">导入备份文件</el-button>
        <el-button plain @click="clearCompleted">清理已完成任务</el-button>
        <el-button type="danger" plain @click="clearAll">清空全部数据</el-button>
      </div>

      <input ref="fileInputRef" class="visually-hidden" type="file" accept=".json,application/json" @change="handleImport" />
    </article>

    <article class="surface-card settings-page__panel">
      <span class="eyebrow">高分展示</span>
      <h2>一键生成演示场景</h2>
      <p>如果答辩现场需要快速展示完整功能，可以一键加载带分类、优先级、逾期和完成趋势的演示任务。</p>
    </article>

    <article class="surface-card settings-page__panel">
      <span class="eyebrow">持久化方案</span>
      <h2>当前使用 localStorage 本地存储</h2>
      <ul class="settings-page__facts">
        <li>新增、编辑、删除和状态切换后会立即写入浏览器本地存储。</li>
        <li>刷新页面后数据不会丢失，适合课程作业演示和个人使用。</li>
        <li>支持导出备份和导入恢复，便于迁移或提交项目时展示数据。</li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
.settings-page {
  display: grid;
  gap: 20px;
}

.settings-page__panel {
  padding: 24px;
}

.settings-page__panel h2,
.settings-page__panel p {
  margin: 0;
}

.settings-page__panel h2 {
  margin-top: 14px;
  font-size: 32px;
}

.settings-page__panel p {
  margin-top: 10px;
  color: var(--muted);
  line-height: 1.7;
}

.settings-page__theme-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 22px;
}

.settings-page__theme-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 24px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.settings-page__theme-card:hover,
.settings-page__theme-card.is-active {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: var(--shadow);
}

.settings-page__theme-preview {
  height: 88px;
  border-radius: 18px;
}

.theme-sunrise {
  background:
    radial-gradient(circle at top left, rgba(255, 180, 120, 0.9), transparent 40%),
    linear-gradient(135deg, #fff6eb, #fde3cd);
}

.theme-midnight {
  background:
    radial-gradient(circle at top left, rgba(87, 209, 191, 0.7), transparent 35%),
    linear-gradient(135deg, #081521, #17354d);
}

.settings-page__theme-card strong {
  font-size: 20px;
}

.settings-page__theme-card span {
  color: var(--muted);
  line-height: 1.6;
}

.settings-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.settings-page__facts {
  margin: 22px 0 0;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.9;
}

@media (max-width: 768px) {
  .settings-page__theme-grid {
    grid-template-columns: 1fr;
  }

  .settings-page__actions {
    flex-direction: column;
  }
}
</style>