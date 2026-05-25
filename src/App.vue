<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { ElButton, ElConfigProvider, ElIcon } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useRoute, useRouter } from 'vue-router'
import { DataAnalysis, Document, EditPen, HomeFilled, Menu, MoonNight, Setting, Sunny } from '@element-plus/icons-vue'
import { useTaskStore } from '@/stores/taskStore'

dayjs.locale('zh-cn')

const store = useTaskStore()
const route = useRoute()
const router = useRouter()
const mobileMenuOpen = ref(false)
const locale = zhCn

const navigationItems = [
  { name: 'dashboard', label: '仪表盘', to: '/', icon: HomeFilled },
  { name: 'tasks', label: '任务列表', to: '/tasks', icon: Document },
  { name: 'stats', label: '统计分析', to: '/stats', icon: DataAnalysis },
  { name: 'settings', label: '设置中心', to: '/settings', icon: Setting },
]

const pageTitle = computed(() => (typeof route.meta.title === 'string' ? route.meta.title : '任务管理系统'))
const todayLabel = computed(() => dayjs().format('YYYY 年 M 月 D 日 dddd'))
const focusTasks = computed(() => store.stats.todo + store.stats.inProgress)

function goToCreate() {
  router.push('/tasks/new')
}

function toggleTheme() {
  store.setTheme(store.theme === 'sunrise' ? 'midnight' : 'sunrise')
}

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  },
)

onMounted(() => {
  store.applyStoredTheme()
})
</script>

<template>
  <el-config-provider :locale="locale">
    <div class="shell">
      <aside class="shell__sidebar surface-card" :class="{ 'is-open': mobileMenuOpen }">
        <div class="shell__brand">
          <div class="shell__brand-mark">FB</div>
          <div>
            <strong>Flow Board</strong>
            <p>清晰、好看、可持续的任务节奏</p>
          </div>
        </div>

        <nav class="shell__nav">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            class="shell__nav-link"
            :class="{ 'is-active': route.name === item.name }"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>

        <div class="shell__aside-card">
          <span class="eyebrow">本周概览</span>
          <h3>已完成 {{ store.stats.completed }} 项</h3>
          <p>当前还有 {{ focusTasks }} 项任务等待推进，逾期 {{ store.stats.overdue }} 项。</p>
          <div class="shell__aside-meta">
            <div>
              <strong>{{ store.stats.completionRate }}%</strong>
              <span>完成率</span>
            </div>
            <div>
              <strong>{{ store.stats.total }}</strong>
              <span>总任务</span>
            </div>
          </div>
        </div>
      </aside>

      <div v-if="mobileMenuOpen" class="shell__overlay" @click="mobileMenuOpen = false" />

      <section class="shell__main">
        <header class="shell__header">
          <div class="shell__header-main">
            <el-button class="shell__menu-button" circle plain @click="mobileMenuOpen = true">
              <el-icon><Menu /></el-icon>
            </el-button>
            <div>
              <span class="eyebrow">{{ todayLabel }}</span>
              <h1>{{ pageTitle }}</h1>
              <p>数据实时保存到本地，刷新页面后仍可继续你的节奏。</p>
            </div>
          </div>

          <div class="shell__header-actions">
            <div class="shell__progress-pill">
              <strong>{{ store.stats.completionRate }}%</strong>
              <span>当前完成率</span>
            </div>
            <el-button plain @click="toggleTheme">
              <el-icon>
                <component :is="store.theme === 'sunrise' ? MoonNight : Sunny" />
              </el-icon>
              切换主题
            </el-button>
            <el-button type="primary" @click="goToCreate">
              <el-icon><EditPen /></el-icon>
              新建任务
            </el-button>
          </div>
        </header>

        <main class="shell__content">
          <RouterView v-slot="{ Component }">
            <Transition name="page" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </main>
      </section>
    </div>
  </el-config-provider>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  min-height: 100vh;
  gap: 24px;
  padding: 24px;
}

.shell__sidebar {
  position: sticky;
  top: 24px;
  align-self: start;
  padding: 24px;
}

.shell__brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.shell__brand-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  color: white;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.shell__brand strong {
  display: block;
  font-size: 20px;
}

.shell__brand p,
.shell__aside-card p,
.shell__header-main p {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.shell__nav {
  display: grid;
  gap: 10px;
}

.shell__nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 18px;
  color: var(--muted);
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.shell__nav-link:hover,
.shell__nav-link.is-active {
  background: var(--accent-soft);
  color: var(--accent);
  transform: translateX(4px);
}

.shell__aside-card {
  margin-top: 28px;
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(180deg, var(--accent-soft) 0%, rgba(255, 255, 255, 0.06) 100%);
  border: 1px solid var(--border);
}

.shell__aside-card h3 {
  margin: 16px 0 0;
  font-size: 26px;
}

.shell__aside-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.shell__aside-meta div {
  padding: 14px;
  border-radius: 18px;
  background: var(--surface-strong);
}

.shell__aside-meta strong {
  display: block;
  font-size: 20px;
}

.shell__aside-meta span,
.shell__progress-pill span {
  color: var(--muted);
  font-size: 13px;
}

.shell__main {
  min-width: 0;
}

.shell__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 6px 26px;
}

.shell__header-main {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.shell__header-main h1 {
  margin: 14px 0 0;
  font-size: clamp(32px, 4vw, 44px);
  line-height: 1.05;
}

.shell__header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.shell__progress-pill {
  min-width: 150px;
  padding: 14px 18px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.shell__progress-pill strong {
  display: block;
  font-size: 22px;
}

.shell__content {
  padding-bottom: 24px;
}

.shell__menu-button,
.shell__overlay {
  display: none;
}

@media (max-width: 1100px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .shell__sidebar {
    position: fixed;
    inset: 20px auto 20px 20px;
    width: min(320px, calc(100vw - 40px));
    z-index: 25;
    transform: translateX(-120%);
    transition: transform 0.24s ease;
  }

  .shell__sidebar.is-open {
    transform: translateX(0);
  }

  .shell__overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(5, 13, 20, 0.34);
    z-index: 20;
  }

  .shell__menu-button {
    display: inline-flex;
    margin-top: 8px;
  }
}

@media (max-width: 768px) {
  .shell {
    padding: 16px;
    gap: 16px;
  }

  .shell__header {
    padding: 8px 0 20px;
    flex-direction: column;
    align-items: stretch;
  }

  .shell__header-main {
    width: 100%;
  }

  .shell__header-actions {
    justify-content: stretch;
  }

  .shell__header-actions :deep(.el-button),
  .shell__progress-pill {
    width: 100%;
  }
}
</style>