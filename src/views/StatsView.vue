<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { graphic, init, use, type ECharts } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import StatPanel from '@/components/StatPanel.vue'
import { useTaskStore } from '@/stores/taskStore'

use([LineChart, PieChart, BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

const store = useTaskStore()

const trendRef = ref<HTMLDivElement | null>(null)
const categoryRef = ref<HTMLDivElement | null>(null)
const priorityRef = ref<HTMLDivElement | null>(null)

let trendChart: ECharts | null = null
let categoryChart: ECharts | null = null
let priorityChart: ECharts | null = null

const summaryItems = computed(() => [
  {
    label: '完成率',
    value: `${store.stats.completionRate}%`,
    helper: '已完成任务占总任务的比例',
    accent: 'warm' as const,
  },
  {
    label: '逾期任务',
    value: store.stats.overdue,
    helper: '尚未完成且已超过截止日期',
    accent: 'rose' as const,
  },
  {
    label: '分类数量',
    value: Object.keys(store.stats.byCategory).length,
    helper: '已使用的任务分类总数',
    accent: 'cool' as const,
  },
  {
    label: '高优先级',
    value: store.stats.byPriority.high,
    helper: '需要重点推进的关键任务',
    accent: 'gold' as const,
  },
])

const categoryEntries = computed(() => {
  return Object.entries(store.stats.byCategory).sort((left, right) => right[1] - left[1])
})

const priorityEntries = computed(() => [
  { label: '低优先级', value: store.stats.byPriority.low },
  { label: '中优先级', value: store.stats.byPriority.medium },
  { label: '高优先级', value: store.stats.byPriority.high },
])

function getPalette() {
  const styles = getComputedStyle(document.documentElement)

  return {
    text: styles.getPropertyValue('--text').trim() || '#1d2939',
    muted: styles.getPropertyValue('--muted').trim() || '#667085',
    accent: styles.getPropertyValue('--accent').trim() || '#ef6b46',
    accentSecondary: styles.getPropertyValue('--accent-secondary').trim() || '#0f766e',
  }
}

function ensureCharts() {
  if (trendRef.value && !trendChart) {
    trendChart = init(trendRef.value)
  }

  if (categoryRef.value && !categoryChart) {
    categoryChart = init(categoryRef.value)
  }

  if (priorityRef.value && !priorityChart) {
    priorityChart = init(priorityRef.value)
  }
}

function renderCharts() {
  ensureCharts()

  if (!trendChart || !categoryChart || !priorityChart) {
    return
  }

  const palette = getPalette()

  trendChart.setOption({
    backgroundColor: 'transparent',
    grid: { left: 16, right: 12, top: 28, bottom: 24, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: store.completionTrend.map((item) => item.label),
      axisLabel: { color: palette.muted },
      axisLine: { lineStyle: { color: palette.muted } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: palette.muted },
      splitLine: { lineStyle: { color: 'rgba(127, 127, 127, 0.16)' } },
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: store.completionTrend.map((item) => item.value),
        symbolSize: 10,
        itemStyle: { color: palette.accent },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(239, 107, 70, 0.34)' },
            { offset: 1, color: 'rgba(239, 107, 70, 0.02)' },
          ]),
        },
      },
    ],
  })

  categoryChart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { color: palette.muted },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '72%'],
        avoidLabelOverlap: true,
        label: { color: palette.text },
        data: categoryEntries.value.map(([name, value]) => ({ name, value })),
        color: [palette.accent, palette.accentSecondary, '#f4b740', '#ff8e72', '#7dd3fc', '#fdba74'],
      },
    ],
  })

  priorityChart.setOption({
    backgroundColor: 'transparent',
    grid: { left: 16, right: 12, top: 28, bottom: 24, containLabel: true },
    xAxis: {
      type: 'category',
      data: priorityEntries.value.map((item) => item.label),
      axisLabel: { color: palette.muted },
      axisLine: { lineStyle: { color: palette.muted } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: palette.muted },
      splitLine: { lineStyle: { color: 'rgba(127, 127, 127, 0.16)' } },
    },
    series: [
      {
        type: 'bar',
        barWidth: 42,
        itemStyle: {
          borderRadius: [18, 18, 6, 6],
          color: (params: { dataIndex: number }) => ['#7dd3fc', '#f4b740', palette.accent][params.dataIndex] ?? palette.accent,
        },
        data: priorityEntries.value.map((item) => item.value),
      },
    ],
  })
}

function resizeCharts() {
  trendChart?.resize()
  categoryChart?.resize()
  priorityChart?.resize()
}

watch([() => store.theme, categoryEntries, priorityEntries, () => store.completionTrend], async () => {
  await nextTick()
  renderCharts()
}, { deep: true, immediate: true })

onMounted(async () => {
  await nextTick()
  renderCharts()
  window.addEventListener('resize', resizeCharts)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts)
  trendChart?.dispose()
  categoryChart?.dispose()
  priorityChart?.dispose()
})
</script>

<template>
  <section class="stats-page">
    <section class="stats-page__intro surface-card">
      <span class="eyebrow">数据分析</span>
      <h2>用图表快速查看任务的推进节奏。</h2>
      <p>这里集中展示完成趋势、分类占比和优先级分布，便于你做下一步安排。</p>
    </section>

    <StatPanel :items="summaryItems" />

    <div class="stats-page__charts">
      <article class="surface-card stats-page__chart-card">
        <div class="section-heading">
          <div>
            <h3>最近 7 天完成趋势</h3>
            <p class="muted">按完成时间统计每日任务收尾情况。</p>
          </div>
        </div>
        <div ref="trendRef" class="chart-box" />
      </article>

      <article class="surface-card stats-page__chart-card">
        <div class="section-heading">
          <div>
            <h3>分类占比</h3>
            <p class="muted">查看学习、工作、生活等任务分布。</p>
          </div>
        </div>
        <div ref="categoryRef" class="chart-box" />
      </article>

      <article class="surface-card stats-page__chart-card stats-page__chart-card--wide">
        <div class="section-heading">
          <div>
            <h3>优先级分布</h3>
            <p class="muted">高优先级任务数量越高，越需要尽快安排时间处理。</p>
          </div>
        </div>
        <div ref="priorityRef" class="chart-box" />
      </article>
    </div>
  </section>
</template>

<style scoped>
.stats-page {
  display: grid;
  gap: 20px;
}

.stats-page__intro,
.stats-page__chart-card {
  padding: 24px;
}

.stats-page__intro h2,
.stats-page__intro p {
  margin: 0;
}

.stats-page__intro h2 {
  margin-top: 14px;
  font-size: 34px;
}

.stats-page__intro p {
  margin-top: 12px;
  color: var(--muted);
  line-height: 1.8;
}

.stats-page__charts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.stats-page__chart-card--wide {
  grid-column: 1 / -1;
}

@media (max-width: 1024px) {
  .stats-page__charts {
    grid-template-columns: 1fr;
  }

  .stats-page__chart-card--wide {
    grid-column: auto;
  }
}
</style>
