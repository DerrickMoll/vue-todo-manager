import { computed } from 'vue';
import dayjs from 'dayjs';
const props = defineProps();
const emit = defineEmits();
const visible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});
const statusLabel = computed(() => {
    if (!props.task) {
        return '';
    }
    return {
        todo: '待办',
        'in-progress': '进行中',
        completed: '已完成',
    }[props.task.status];
});
const priorityLabel = computed(() => {
    if (!props.task) {
        return '';
    }
    return {
        low: '低',
        medium: '中',
        high: '高',
    }[props.task.priority];
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-drawer__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-drawer__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-drawer__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-drawer__hero']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-drawer__tags']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elDrawer | typeof __VLS_components.ElDrawer | typeof __VLS_components['el-drawer'] | typeof __VLS_components.elDrawer | typeof __VLS_components.ElDrawer | typeof __VLS_components['el-drawer']} */
elDrawer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.visible),
    size: "420px",
    title: "任务详情",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.visible),
    size: "420px",
    title: "任务详情",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.task) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-drawer" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-drawer']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-drawer__hero" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-drawer__hero']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
    (__VLS_ctx.task.category);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.task.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.task.description || '当前任务没有额外描述，可直接进入编辑页补充。');
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
    elDescriptions;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        column: (1),
        border: true,
    }));
    const __VLS_9 = __VLS_8({
        column: (1),
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
        label: "状态",
    }));
    const __VLS_15 = __VLS_14({
        label: "状态",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const { default: __VLS_18 } = __VLS_16.slots;
    (__VLS_ctx.statusLabel);
    // @ts-ignore
    [visible, task, task, task, task, statusLabel,];
    var __VLS_16;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        label: "优先级",
    }));
    const __VLS_21 = __VLS_20({
        label: "优先级",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    (__VLS_ctx.priorityLabel);
    // @ts-ignore
    [priorityLabel,];
    var __VLS_22;
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        label: "截止日期",
    }));
    const __VLS_27 = __VLS_26({
        label: "截止日期",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_30 } = __VLS_28.slots;
    (__VLS_ctx.task.dueDate || '未设置');
    // @ts-ignore
    [task,];
    var __VLS_28;
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        label: "创建时间",
    }));
    const __VLS_33 = __VLS_32({
        label: "创建时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_36 } = __VLS_34.slots;
    (__VLS_ctx.dayjs(__VLS_ctx.task.createdAt).format('YYYY-MM-DD HH:mm'));
    // @ts-ignore
    [task, dayjs,];
    var __VLS_34;
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        label: "更新时间",
    }));
    const __VLS_39 = __VLS_38({
        label: "更新时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    const { default: __VLS_42 } = __VLS_40.slots;
    (__VLS_ctx.dayjs(__VLS_ctx.task.updatedAt).format('YYYY-MM-DD HH:mm'));
    // @ts-ignore
    [task, dayjs,];
    var __VLS_40;
    // @ts-ignore
    [];
    var __VLS_10;
    if (__VLS_ctx.task.tags.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "detail-drawer__tags" },
        });
        /** @type {__VLS_StyleScopedClasses['detail-drawer__tags']} */ ;
        for (const [tag] of __VLS_vFor((__VLS_ctx.task.tags))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                key: (tag),
            });
            (tag);
            // @ts-ignore
            [task, task,];
        }
    }
    let __VLS_43;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
        ...{ 'onClick': {} },
        type: "primary",
        size: "large",
    }));
    const __VLS_45 = __VLS_44({
        ...{ 'onClick': {} },
        type: "primary",
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    let __VLS_48;
    const __VLS_49 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.task))
                    return;
                __VLS_ctx.emit('edit', __VLS_ctx.task.id);
                // @ts-ignore
                [task, emit,];
            } });
    const { default: __VLS_50 } = __VLS_46.slots;
    // @ts-ignore
    [];
    var __VLS_46;
    var __VLS_47;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
