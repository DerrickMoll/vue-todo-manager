import { computed, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import TaskCard from '@/components/TaskCard.vue';
import TaskDetailDrawer from '@/components/TaskDetailDrawer.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import { useTaskStore } from '@/stores/taskStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useTaskStore();
const drawerVisible = ref(false);
const activeTaskId = ref('');
const activeTask = computed(() => store.getTaskById(activeTaskId.value));
const resultSummary = computed(() => `${store.sortedTasks.length} / ${store.tasks.length}`);
function handleCreate() {
    router.push('/tasks/new');
}
function handleEdit(taskId) {
    router.push(`/tasks/${taskId}/edit`);
}
function handleDetails(taskId) {
    activeTaskId.value = taskId;
    drawerVisible.value = true;
}
function handleStatusChange(taskId, status) {
    store.updateTaskStatus(taskId, status);
    ElMessage.success('任务状态已更新');
}
async function handleDelete(taskId) {
    try {
        await ElMessageBox.confirm('删除后将无法恢复，确定继续吗？', '删除任务', {
            type: 'warning',
            confirmButtonText: '删除',
            cancelButtonText: '取消',
        });
        store.deleteTask(taskId);
        if (activeTaskId.value === taskId) {
            drawerVisible.value = false;
        }
        ElMessage.success('任务已删除');
    }
    catch {
        return;
    }
}
async function handleClearCompleted() {
    try {
        await ElMessageBox.confirm('将永久清除所有已完成任务，是否继续？', '批量清除', {
            type: 'warning',
            confirmButtonText: '清除',
            cancelButtonText: '取消',
        });
        store.clearCompleted();
        ElMessage.success('已清除全部已完成任务');
    }
    catch {
        return;
    }
}
function handleSortChange(value) {
    store.setSort(value);
}
function handleEditFromDrawer(taskId) {
    drawerVisible.value = false;
    handleEdit(taskId);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['task-list-page__toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__empty']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__empty']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__empty']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__empty']} */ ;
/** @type {__VLS_StyleScopedClasses['task-list-page__empty-actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "task-list-page" },
});
/** @type {__VLS_StyleScopedClasses['task-list-page']} */ ;
const __VLS_0 = TaskFilter;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:filters': {} },
    ...{ 'onUpdate:sort': {} },
    ...{ 'onCreate': {} },
    ...{ 'onReset': {} },
    ...{ 'onClearCompleted': {} },
    filters: (__VLS_ctx.store.filters),
    sort: (__VLS_ctx.store.sort),
    categories: (__VLS_ctx.store.categories),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:filters': {} },
    ...{ 'onUpdate:sort': {} },
    ...{ 'onCreate': {} },
    ...{ 'onReset': {} },
    ...{ 'onClearCompleted': {} },
    filters: (__VLS_ctx.store.filters),
    sort: (__VLS_ctx.store.sort),
    categories: (__VLS_ctx.store.categories),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:filters': {} },
    { 'onUpdate:filters': (__VLS_ctx.store.setFilters) });
const __VLS_7 = ({ 'update:sort': {} },
    { 'onUpdate:sort': (__VLS_ctx.handleSortChange) });
const __VLS_8 = ({ create: {} },
    { onCreate: (__VLS_ctx.handleCreate) });
const __VLS_9 = ({ reset: {} },
    { onReset: (__VLS_ctx.store.resetFilters) });
const __VLS_10 = ({ clearCompleted: {} },
    { onClearCompleted: (__VLS_ctx.handleClearCompleted) });
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-list-page__toolbar" },
});
/** @type {__VLS_StyleScopedClasses['task-list-page__toolbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.resultSummary);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
elTag;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    type: "info",
}));
const __VLS_13 = __VLS_12({
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
// @ts-ignore
[store, store, store, store, store, handleSortChange, handleCreate, handleClearCompleted, resultSummary,];
var __VLS_14;
if (__VLS_ctx.store.sortedTasks.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "task-list-page__grid" },
    });
    /** @type {__VLS_StyleScopedClasses['task-list-page__grid']} */ ;
    for (const [task] of __VLS_vFor((__VLS_ctx.store.sortedTasks))) {
        const __VLS_17 = TaskCard;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
            ...{ 'onDetails': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDelete': {} },
            ...{ 'onStatusChange': {} },
            key: (task.id),
            task: (task),
        }));
        const __VLS_19 = __VLS_18({
            ...{ 'onDetails': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDelete': {} },
            ...{ 'onStatusChange': {} },
            key: (task.id),
            task: (task),
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
        let __VLS_22;
        const __VLS_23 = ({ details: {} },
            { onDetails: (__VLS_ctx.handleDetails) });
        const __VLS_24 = ({ edit: {} },
            { onEdit: (__VLS_ctx.handleEdit) });
        const __VLS_25 = ({ delete: {} },
            { onDelete: (__VLS_ctx.handleDelete) });
        const __VLS_26 = ({ statusChange: {} },
            { onStatusChange: (__VLS_ctx.handleStatusChange) });
        var __VLS_20;
        var __VLS_21;
        // @ts-ignore
        [store, store, handleDetails, handleEdit, handleDelete, handleStatusChange,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "task-list-page__empty surface-card" },
    });
    /** @type {__VLS_StyleScopedClasses['task-list-page__empty']} */ ;
    /** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.store.tasks.length ? '没有匹配的筛选结果' : '先创建你的第一条任务');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.store.tasks.length
        ? '你可以尝试重置筛选条件，或调整搜索关键词和排序方式。'
        : '建立标题、截止日期、优先级和分类后，这里会成为你的任务主战场。');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "task-list-page__empty-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['task-list-page__empty-actions']} */ ;
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        ...{ 'onClick': {} },
        plain: true,
    }));
    const __VLS_29 = __VLS_28({
        ...{ 'onClick': {} },
        plain: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    let __VLS_32;
    const __VLS_33 = ({ click: {} },
        { onClick: (__VLS_ctx.store.resetFilters) });
    const { default: __VLS_34 } = __VLS_30.slots;
    // @ts-ignore
    [store, store, store,];
    var __VLS_30;
    var __VLS_31;
    let __VLS_35;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_37 = __VLS_36({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    let __VLS_40;
    const __VLS_41 = ({ click: {} },
        { onClick: (__VLS_ctx.handleCreate) });
    const { default: __VLS_42 } = __VLS_38.slots;
    // @ts-ignore
    [handleCreate,];
    var __VLS_38;
    var __VLS_39;
}
const __VLS_43 = TaskDetailDrawer;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    ...{ 'onEdit': {} },
    modelValue: (__VLS_ctx.drawerVisible),
    task: (__VLS_ctx.activeTask),
}));
const __VLS_45 = __VLS_44({
    ...{ 'onEdit': {} },
    modelValue: (__VLS_ctx.drawerVisible),
    task: (__VLS_ctx.activeTask),
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_48;
const __VLS_49 = ({ edit: {} },
    { onEdit: (__VLS_ctx.handleEditFromDrawer) });
var __VLS_46;
var __VLS_47;
// @ts-ignore
[drawerVisible, activeTask, handleEditFromDrawer,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
