import { computed } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import StatPanel from '@/components/StatPanel.vue';
import { useTaskStore } from '@/stores/taskStore';
const router = useRouter();
const store = useTaskStore();
const summaryItems = computed(() => [
    {
        label: '总任务数',
        value: store.stats.total,
        helper: '所有已记录任务的总和',
        accent: 'warm',
    },
    {
        label: '待办任务',
        value: store.stats.todo,
        helper: '仍待开始的事项',
        accent: 'cool',
    },
    {
        label: '进行中任务',
        value: store.stats.inProgress,
        helper: '当前正推进的工作',
        accent: 'gold',
    },
    {
        label: '已完成任务',
        value: store.stats.completed,
        helper: '已经顺利收尾的内容',
        accent: 'rose',
    },
]);
const topCategories = computed(() => {
    return Object.entries(store.stats.byCategory)
        .sort((left, right) => right[1] - left[1])
        .slice(0, 6);
});
function goToCreate() {
    router.push('/tasks/new');
}
function goToTasks() {
    router.push('/tasks');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dashboard__hero-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero-mini']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero-mini']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__timeline-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__category-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero-mini']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__timeline-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__timeline-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__timeline-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__category-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__category-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__hero-mini']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__list-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__timeline-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "dashboard" },
});
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "dashboard__hero surface-card" },
});
/** @type {__VLS_StyleScopedClasses['dashboard__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "dashboard__hero-copy" },
});
/** @type {__VLS_StyleScopedClasses['dashboard__hero-copy']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "dashboard__hero-actions" },
});
/** @type {__VLS_StyleScopedClasses['dashboard__hero-actions']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.goToCreate) });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[goToCreate,];
var __VLS_3;
var __VLS_4;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    plain: true,
    size: "large",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    plain: true,
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = ({ click: {} },
    { onClick: (__VLS_ctx.goToTasks) });
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[goToTasks,];
var __VLS_11;
var __VLS_12;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "dashboard__hero-side" },
});
/** @type {__VLS_StyleScopedClasses['dashboard__hero-side']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "metric-ring" },
    ...{ style: ({ '--progress': `${__VLS_ctx.store.stats.completionRate}%` }) },
});
/** @type {__VLS_StyleScopedClasses['metric-ring']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "metric-ring__content" },
});
/** @type {__VLS_StyleScopedClasses['metric-ring__content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "muted" },
});
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.store.stats.completionRate);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "dashboard__hero-mini" },
});
/** @type {__VLS_StyleScopedClasses['dashboard__hero-mini']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.store.stats.overdue);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.store.upcomingTasks.length);
const __VLS_16 = StatPanel;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    items: (__VLS_ctx.summaryItems),
}));
const __VLS_18 = __VLS_17({
    items: (__VLS_ctx.summaryItems),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "dashboard__grid" },
});
/** @type {__VLS_StyleScopedClasses['dashboard__grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card dashboard__panel" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__panel']} */ ;
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
if (__VLS_ctx.store.upcomingTasks.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dashboard__list" },
    });
    /** @type {__VLS_StyleScopedClasses['dashboard__list']} */ ;
    for (const [task] of __VLS_vFor((__VLS_ctx.store.upcomingTasks))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (task.id),
            ...{ class: "dashboard__list-item" },
        });
        /** @type {__VLS_StyleScopedClasses['dashboard__list-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (task.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (task.category);
        (task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低');
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.dayjs(task.dueDate).format('M 月 D 日'));
        // @ts-ignore
        [store, store, store, store, store, store, summaryItems, dayjs,];
    }
}
else {
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        description: "暂无临近截止的任务",
    }));
    const __VLS_23 = __VLS_22({
        description: "暂无临近截止的任务",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card dashboard__panel" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__panel']} */ ;
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
if (__VLS_ctx.store.recentTasks.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dashboard__timeline" },
    });
    /** @type {__VLS_StyleScopedClasses['dashboard__timeline']} */ ;
    for (const [task] of __VLS_vFor((__VLS_ctx.store.recentTasks))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (task.id),
            ...{ class: "dashboard__timeline-item" },
        });
        /** @type {__VLS_StyleScopedClasses['dashboard__timeline-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (task.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (task.category);
        (__VLS_ctx.dayjs(task.updatedAt).format('MM/DD HH:mm'));
        let __VLS_26;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
            type: (task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'info'),
        }));
        const __VLS_28 = __VLS_27({
            type: (task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'info'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_27));
        const { default: __VLS_31 } = __VLS_29.slots;
        (task.status === 'todo' ? '待办' : task.status === 'in-progress' ? '进行中' : '已完成');
        // @ts-ignore
        [store, store, dayjs,];
        var __VLS_29;
        // @ts-ignore
        [];
    }
}
else {
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        description: "当前还没有任务记录",
    }));
    const __VLS_34 = __VLS_33({
        description: "当前还没有任务记录",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card dashboard__panel" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard__panel']} */ ;
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
if (__VLS_ctx.topCategories.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dashboard__category-cloud" },
    });
    /** @type {__VLS_StyleScopedClasses['dashboard__category-cloud']} */ ;
    for (const [[category, count]] of __VLS_vFor((__VLS_ctx.topCategories))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (category),
            ...{ class: "dashboard__category-pill" },
        });
        /** @type {__VLS_StyleScopedClasses['dashboard__category-pill']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (category);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (count);
        // @ts-ignore
        [topCategories, topCategories,];
    }
}
else {
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        description: "创建任务后将在这里展示分类统计",
    }));
    const __VLS_39 = __VLS_38({
        description: "创建任务后将在这里展示分类统计",
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
