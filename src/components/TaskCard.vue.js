import { computed } from 'vue';
import dayjs from 'dayjs';
import { Delete, EditPen, View } from '@element-plus/icons-vue';
const props = defineProps();
const emit = defineEmits();
const statusOptions = [
    { label: '待办', value: 'todo' },
    { label: '进行中', value: 'in-progress' },
    { label: '已完成', value: 'completed' },
];
const priorityMeta = {
    low: { label: '低优先级', tone: 'info' },
    medium: { label: '中优先级', tone: 'warning' },
    high: { label: '高优先级', tone: 'danger' },
};
const statusMeta = {
    todo: { label: '待办', tone: 'info' },
    'in-progress': { label: '进行中', tone: 'warning' },
    completed: { label: '已完成', tone: 'success' },
};
const overdue = computed(() => {
    return Boolean(props.task.dueDate) && props.task.status !== 'completed' && dayjs(props.task.dueDate).endOf('day').isBefore(dayjs());
});
const dueText = computed(() => (props.task.dueDate ? dayjs(props.task.dueDate).format('YYYY/MM/DD') : '未设置截止日期'));
function handleStatusSelect(value) {
    emit('status-change', props.task.id, value);
}
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
/** @type {__VLS_StyleScopedClasses['task-card']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card']} */ ;
/** @type {__VLS_StyleScopedClasses['is-completed']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__title-block']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__title-block']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__title-block']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__body']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__tags']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__header']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__body']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__status']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__status']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card__actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "task-card surface-card" },
    ...{ class: ([`is-${__VLS_ctx.task.status}`, `priority-${__VLS_ctx.task.priority}`]) },
});
/** @type {__VLS_StyleScopedClasses['task-card']} */ ;
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-card__header" },
});
/** @type {__VLS_StyleScopedClasses['task-card__header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('details', __VLS_ctx.task.id);
            // @ts-ignore
            [task, task, task, emit,];
        } },
    ...{ class: "task-card__title-block" },
});
/** @type {__VLS_StyleScopedClasses['task-card__title-block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-card__chips" },
});
/** @type {__VLS_StyleScopedClasses['task-card__chips']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
elTag;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    type: (__VLS_ctx.statusMeta[__VLS_ctx.task.status].tone),
    effect: "dark",
}));
const __VLS_2 = __VLS_1({
    type: (__VLS_ctx.statusMeta[__VLS_ctx.task.status].tone),
    effect: "dark",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
(__VLS_ctx.statusMeta[__VLS_ctx.task.status].label);
// @ts-ignore
[task, task, statusMeta, statusMeta,];
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
elTag;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    type: (__VLS_ctx.priorityMeta[__VLS_ctx.task.priority].tone),
}));
const __VLS_8 = __VLS_7({
    type: (__VLS_ctx.priorityMeta[__VLS_ctx.task.priority].tone),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
(__VLS_ctx.priorityMeta[__VLS_ctx.task.priority].label);
// @ts-ignore
[task, task, priorityMeta, priorityMeta,];
var __VLS_9;
if (__VLS_ctx.overdue) {
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        type: "danger",
    }));
    const __VLS_14 = __VLS_13({
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_17 } = __VLS_15.slots;
    // @ts-ignore
    [overdue,];
    var __VLS_15;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
(__VLS_ctx.task.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.task.description || '暂无详细说明，点击查看详情了解更多。');
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-card__status" },
});
/** @type {__VLS_StyleScopedClasses['task-card__status']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.task.status),
    size: "small",
    ...{ style: {} },
}));
const __VLS_20 = __VLS_19({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.task.status),
    size: "small",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
const __VLS_24 = ({ change: {} },
    { onChange: (__VLS_ctx.handleStatusSelect) });
const { default: __VLS_25 } = __VLS_21.slots;
for (const [option] of __VLS_vFor((__VLS_ctx.statusOptions))) {
    let __VLS_26;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
        key: (option.value),
        label: (option.label),
        value: (option.value),
    }));
    const __VLS_28 = __VLS_27({
        key: (option.value),
        label: (option.label),
        value: (option.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    // @ts-ignore
    [task, task, task, handleStatusSelect, statusOptions,];
}
// @ts-ignore
[];
var __VLS_21;
var __VLS_22;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-card__body" },
});
/** @type {__VLS_StyleScopedClasses['task-card__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "label" },
});
/** @type {__VLS_StyleScopedClasses['label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.task.category);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "label" },
});
/** @type {__VLS_StyleScopedClasses['label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
    ...{ class: ({ overdue: __VLS_ctx.overdue }) },
});
/** @type {__VLS_StyleScopedClasses['overdue']} */ ;
(__VLS_ctx.dueText);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "label" },
});
/** @type {__VLS_StyleScopedClasses['label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.dayjs(__VLS_ctx.task.createdAt).format('MM/DD HH:mm'));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "label" },
});
/** @type {__VLS_StyleScopedClasses['label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.dayjs(__VLS_ctx.task.updatedAt).format('MM/DD HH:mm'));
if (__VLS_ctx.task.tags.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "task-card__tags" },
    });
    /** @type {__VLS_StyleScopedClasses['task-card__tags']} */ ;
    for (const [tag] of __VLS_vFor((__VLS_ctx.task.tags))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            key: (tag),
        });
        (tag);
        // @ts-ignore
        [task, task, task, task, task, overdue, dueText, dayjs, dayjs,];
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-card__actions" },
});
/** @type {__VLS_StyleScopedClasses['task-card__actions']} */ ;
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_33 = __VLS_32({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_36;
const __VLS_37 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('details', __VLS_ctx.task.id);
            // @ts-ignore
            [task, emit,];
        } });
const { default: __VLS_38 } = __VLS_34.slots;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({}));
const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_44 } = __VLS_42.slots;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.View} */
View;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({}));
const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
// @ts-ignore
[];
var __VLS_42;
// @ts-ignore
[];
var __VLS_34;
var __VLS_35;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_55;
const __VLS_56 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('edit', __VLS_ctx.task.id);
            // @ts-ignore
            [task, emit,];
        } });
const { default: __VLS_57 } = __VLS_53.slots;
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({}));
const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.EditPen} */
EditPen;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
// @ts-ignore
[];
var __VLS_61;
// @ts-ignore
[];
var __VLS_53;
var __VLS_54;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    ...{ 'onClick': {} },
    plain: true,
    type: "danger",
}));
const __VLS_71 = __VLS_70({
    ...{ 'onClick': {} },
    plain: true,
    type: "danger",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
let __VLS_74;
const __VLS_75 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('delete', __VLS_ctx.task.id);
            // @ts-ignore
            [task, emit,];
        } });
const { default: __VLS_76 } = __VLS_72.slots;
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({}));
const __VLS_79 = __VLS_78({}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const { default: __VLS_82 } = __VLS_80.slots;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.Delete} */
Delete;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({}));
const __VLS_85 = __VLS_84({}, ...__VLS_functionalComponentArgsRest(__VLS_84));
// @ts-ignore
[];
var __VLS_80;
// @ts-ignore
[];
var __VLS_72;
var __VLS_73;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
