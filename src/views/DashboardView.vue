<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import { ElButton, ElEmpty, ElTag } from 'element-plus'
import { useRouter } from 'vue-router'
import StatPanel from '@/components/StatPanel.vue'
import { useTaskStore } from '@/stores/taskStore'

const router = useRouter()
const store = useTaskStore()

const summaryItems = computed(() => [
  {
    label: '总任务数',
    value: store.stats.total,
    helper: '所有已记录任务的总和',
    accent: 'warm' as const,
  },
  {
    label: '待办任务',
    value: store.stats.todo,
    helper: '仍待开始的事项',
    accent: 'cool' as const,
  },
  {
    label: '进行中任务',
    value: store.stats.inProgress,
    helper: '当前正推进的工作',
    accent: 'gold' as const,
  },
  {
    label: '已完成任务',
    value: store.stats.completed,
    helper: '已经顺利收尾的内容',
    accent: 'rose' as const,
  },
])

const topCategories = computed(() => {
  return Object.entries(store.stats.byCategory)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
})

function goToCreate() {
  router.push('/tasks/new')
}

function goToTasks() {
  router.push('/tasks')
}
</script>

<template>
  <section class="dashboard">
    <section class="dashboard__hero surface-card">
      <div class="dashboard__hero-copy">
        <span class="eyebrow">效率与秩序</span>
        <h2>把今天的任务节奏整理得更从容一点。</h2>
        <p>
          使用清晰的状态流、直观的优先级和截止日期提醒，把学习、工作与生活任务统一放进一个可以长期维护的系统里。
        </p>
        <div class="dashboard__hero-actions">
          <el-button type="primary" size="large" @click="goToCreate">立刻新增任务</el-button>
          <el-button plain size="large" @click="goToTasks">查看全部任务</el-button>
        </div>
      </div>

      <div class="dashboard__hero-side">
        <div class="metric-ring" :style="{ '--progress': `${store.stats.completionRate}%` }">
          <div class="metric-ring__content">
            <span class="muted">完成率</span>
            <strong>{{ store.stats.completionRate }}%</strong>
          </div>
        </div>

        <div class="dashboard__hero-mini">
          <div>
            <span>逾期任务</span>
            <strong>{{ store.stats.overdue }}</strong>
          </div>
          <div>
            <span>即将到期</span>
            <strong>{{ store.upcomingTasks.length }}</strong>
          </div>
        </div>
      </div>
    </section>

    <StatPanel :items="summaryItems" />

    <section class="dashboard__grid">
      <article class="surface-card dashboard__panel">
        <div class="section-heading">
          <div>
            <h3>即将到期</h3>
            <p class="muted">优先关注未来几天需要完成的事项。</p>
          </div>
        </div>

        <div v-if="store.upcomingTasks.length" class="dashboard__list">
          <div v-for="task in store.upcomingTasks" :key="task.id" class="dashboard__list-item">
            <div>
              <strong>{{ task.title }}</strong>
              <p>{{ task.category }} · {{ task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低' }}优先级</p>
            </div>
            <span>{{ dayjs(task.dueDate).format('M 月 D 日') }}</span>
          </div>
        </div>
        <el-empty v-else description="暂无临近截止的任务" />
      </article>

      <article class="surface-card dashboard__panel">
        <div class="section-heading">
          <div>
            <h3>近期更新</h3>
            <p class="muted">方便快速回看刚刚处理过的任务。</p>
          </div>
        </div>

        <div v-if="store.recentTasks.length" class="dashboard__timeline">
          <div v-for="task in store.recentTasks" :key="task.id" class="dashboard__timeline-item">
            <div>
              <strong>{{ task.title }}</strong>
              <p>{{ task.category }} · {{ dayjs(task.updatedAt).format('MM/DD HH:mm') }}</p>
            </div>
            <el-tag :type="task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'info'">
              {{ task.status === 'todo' ? '待办' : task.status === 'in-progress' ? '进行中' : '已完成' }}
            </el-tag>
          </div>
        </div>
        <el-empty v-else description="当前还没有任务记录" />
      </article>
    </section>

    <article class="surface-card dashboard__panel">
      <div class="section-heading">
        <div>
          <h3>分类分布</h3>
          <p class="muted">看看任务主要集中在哪些领域。</p>
        </div>
      </div>

      <div v-if="topCategories.length" class="dashboard__category-cloud">
        <div v-for="[category, count] in topCategories" :key="category" class="dashboard__category-pill">
          <strong>{{ category }}</strong>
          <span>{{ count }} 项</span>
        </div>
      </div>
      <el-empty v-else description="创建任务后将在这里展示分类统计" />
    </article>
  </section>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 20px;
}

.dashboard__hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 22px;
  padding: 28px;
}

.dashboard__hero-copy h2,
.dashboard__hero-copy p {
  margin: 0;
}

.dashboard__hero-copy h2 {
  margin-top: 16px;
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.1;
}

.dashboard__hero-copy p {
  margin-top: 12px;
  color: var(--muted);
  line-height: 1.8;
  max-width: 52ch;
}

.dashboard__hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.dashboard__hero-side {
  display: grid;
  gap: 18px;
  justify-items: center;
  align-content: center;
}

.dashboard__hero-mini {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
}

.dashboard__hero-mini div,
.dashboard__list-item,
.dashboard__timeline-item,
.dashboard__category-pill {
  padding: 16px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.06);
}

.dashboard__hero-mini span,
.dashboard__list-item p,
.dashboard__timeline-item p,
.dashboard__category-pill span {
  color: var(--muted);
}

.dashboard__hero-mini strong {
  display: block;
  margin-top: 8px;
  font-size: 28px;
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.dashboard__panel {
  padding: 24px;
}

.dashboard__list,
.dashboard__timeline {
  display: grid;
  gap: 12px;
}

.dashboard__list-item,
.dashboard__timeline-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.dashboard__list-item strong,
.dashboard__timeline-item strong {
  display: block;
}

.dashboard__list-item p,
.dashboard__timeline-item p {
  margin: 8px 0 0;
}

.dashboard__category-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.dashboard__category-pill {
  min-width: 140px;
}

.dashboard__category-pill strong {
  display: block;
  margin-bottom: 8px;
  font-size: 18px;
}

@media (max-width: 1024px) {
  .dashboard__hero,
  .dashboard__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dashboard__hero,
  .dashboard__panel {
    padding: 22px;
  }

  .dashboard__hero-mini,
  .dashboard__list-item,
  .dashboard__timeline-item {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
