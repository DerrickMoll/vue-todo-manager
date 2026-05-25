import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { graphic, init, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import StatPanel from '@/components/StatPanel.vue';
import { useTaskStore } from '@/stores/taskStore';
use([LineChart, PieChart, BarChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);
const store = useTaskStore();
const trendRef = ref(null);
const categoryRef = ref(null);
const priorityRef = ref(null);
let trendChart = null;
let categoryChart = null;
let priorityChart = null;
const summaryItems = computed(() => [
    {
        label: '完成率',
        value: `${store.stats.completionRate}%`,
        helper: '已完成任务占总任务的比例',
        accent: 'warm',
    },
    {
        label: '逾期任务',
        value: store.stats.overdue,
        helper: '尚未完成且已超过截止日期',
        accent: 'rose',
    },
    {
        label: '分类数量',
        value: Object.keys(store.stats.byCategory).length,
        helper: '已使用的任务分类总数',
        accent: 'cool',
    },
    {
        label: '高优先级',
        value: store.stats.byPriority.high,
        helper: '需要重点推进的关键任务',
        accent: 'gold',
    },
]);
const categoryEntries = computed(() => {
    return Object.entries(store.stats.byCategory).sort((left, right) => right[1] - left[1]);
});
const priorityEntries = computed(() => [
    { label: '低优先级', value: store.stats.byPriority.low },
    { label: '中优先级', value: store.stats.byPriority.medium },
    { label: '高优先级', value: store.stats.byPriority.high },
]);
function getPalette() {
    const styles = getComputedStyle(document.documentElement);
    return {
        text: styles.getPropertyValue('--text').trim() || '#1d2939',
        muted: styles.getPropertyValue('--muted').trim() || '#667085',
        accent: styles.getPropertyValue('--accent').trim() || '#ef6b46',
        accentSecondary: styles.getPropertyValue('--accent-secondary').trim() || '#0f766e',
    };
}
function ensureCharts() {
    if (trendRef.value && !trendChart) {
        trendChart = init(trendRef.value);
    }
    if (categoryRef.value && !categoryChart) {
        categoryChart = init(categoryRef.value);
    }
    if (priorityRef.value && !priorityChart) {
        priorityChart = init(priorityRef.value);
    }
}
function renderCharts() {
    ensureCharts();
    if (!trendChart || !categoryChart || !priorityChart) {
        return;
    }
    const palette = getPalette();
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
    });
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
    });
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
                    color: (params) => ['#7dd3fc', '#f4b740', palette.accent][params.dataIndex] ?? palette.accent,
                },
                data: priorityEntries.value.map((item) => item.value),
            },
        ],
    });
}
function resizeCharts() {
    trendChart?.resize();
    categoryChart?.resize();
    priorityChart?.resize();
}
watch([() => store.theme, categoryEntries, priorityEntries, () => store.completionTrend], async () => {
    await nextTick();
    renderCharts();
}, { deep: true, immediate: true });
onMounted(async () => {
    await nextTick();
    renderCharts();
    window.addEventListener('resize', resizeCharts);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCharts);
    trendChart?.dispose();
    categoryChart?.dispose();
    priorityChart?.dispose();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stats-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__charts']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__chart-card--wide']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "stats-page" },
});
/** @type {__VLS_StyleScopedClasses['stats-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "stats-page__intro surface-card" },
});
/** @type {__VLS_StyleScopedClasses['stats-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
const __VLS_0 = StatPanel;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    items: (__VLS_ctx.summaryItems),
}));
const __VLS_2 = __VLS_1({
    items: (__VLS_ctx.summaryItems),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stats-page__charts" },
});
/** @type {__VLS_StyleScopedClasses['stats-page__charts']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card stats-page__chart-card" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__chart-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-heading" },
});
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "muted" },
});
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ref: "trendRef",
    ...{ class: "chart-box" },
});
/** @type {__VLS_StyleScopedClasses['chart-box']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card stats-page__chart-card" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__chart-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-heading" },
});
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "muted" },
});
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ref: "categoryRef",
    ...{ class: "chart-box" },
});
/** @type {__VLS_StyleScopedClasses['chart-box']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card stats-page__chart-card stats-page__chart-card--wide" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__chart-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-page__chart-card--wide']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-heading" },
});
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "muted" },
});
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ref: "priorityRef",
    ...{ class: "chart-box" },
});
/** @type {__VLS_StyleScopedClasses['chart-box']} */ ;
// @ts-ignore
[summaryItems,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
