import { computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import TaskForm from '@/components/TaskForm.vue';
import { useTaskStore } from '@/stores/taskStore';
const route = useRoute();
const router = useRouter();
const store = useTaskStore();
const isEditMode = computed(() => Boolean(route.params.id));
const taskId = computed(() => String(route.params.id ?? ''));
const currentTask = computed(() => (isEditMode.value ? store.getTaskById(taskId.value) : null));
const tips = [
    '标题和分类建议写得简洁，方便后续快速搜索。',
    '进行中任务尽量附上清晰的描述，方便随时继续。',
    '截止日期会参与排序和逾期统计，建议尽量填写。',
];
function handleCancel() {
    router.push('/tasks');
}
function handleSave(payload) {
    if (isEditMode.value && currentTask.value) {
        store.updateTask(currentTask.value.id, payload);
        ElMessage.success('任务已更新');
    }
    else {
        store.createTask(payload);
        ElMessage.success('任务已创建');
    }
    router.push('/tasks');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['task-edit-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__missing']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__missing']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__intro']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__missing']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__aside']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__tip']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__tip']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__tip']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__missing']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page__missing']} */ ;
/** @type {__VLS_StyleScopedClasses['task-edit-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "task-edit-page" },
});
/** @type {__VLS_StyleScopedClasses['task-edit-page']} */ ;
if (!__VLS_ctx.isEditMode || __VLS_ctx.currentTask) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "task-edit-page__main" },
    });
    /** @type {__VLS_StyleScopedClasses['task-edit-page__main']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "task-edit-page__intro surface-card" },
    });
    /** @type {__VLS_StyleScopedClasses['task-edit-page__intro']} */ ;
    /** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
    (__VLS_ctx.isEditMode ? '编辑任务' : '创建任务');
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.isEditMode ? '更新任务内容与当前进度' : '建立一条新的任务记录');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.isEditMode
        ? '完善描述、优先级和截止日期，让任务列表和统计视图保持同步。'
        : '输入任务关键信息后，数据会自动保存到浏览器本地存储中。');
    const __VLS_0 = TaskForm;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onSave': {} },
        ...{ 'onCancel': {} },
        initialTask: (__VLS_ctx.currentTask),
        submitText: (__VLS_ctx.isEditMode ? '保存修改' : '创建任务'),
        categoryOptions: (__VLS_ctx.store.categories),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onSave': {} },
        ...{ 'onCancel': {} },
        initialTask: (__VLS_ctx.currentTask),
        submitText: (__VLS_ctx.isEditMode ? '保存修改' : '创建任务'),
        categoryOptions: (__VLS_ctx.store.categories),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ save: {} },
        { onSave: (__VLS_ctx.handleSave) });
    const __VLS_7 = ({ cancel: {} },
        { onCancel: (__VLS_ctx.handleCancel) });
    var __VLS_3;
    var __VLS_4;
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "task-edit-page__aside surface-card" },
    });
    /** @type {__VLS_StyleScopedClasses['task-edit-page__aside']} */ ;
    /** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    for (const [tip] of __VLS_vFor((__VLS_ctx.tips))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (tip),
            ...{ class: "task-edit-page__tip" },
        });
        /** @type {__VLS_StyleScopedClasses['task-edit-page__tip']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (__VLS_ctx.tips.indexOf(tip) + 1);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (tip);
        // @ts-ignore
        [isEditMode, isEditMode, isEditMode, isEditMode, isEditMode, currentTask, currentTask, store, handleSave, handleCancel, tips, tips,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "task-edit-page__missing surface-card" },
    });
    /** @type {__VLS_StyleScopedClasses['task-edit-page__missing']} */ ;
    /** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.isEditMode || __VLS_ctx.currentTask))
                    return;
                __VLS_ctx.router.push('/tasks');
                // @ts-ignore
                [router,];
            } });
    const { default: __VLS_15 } = __VLS_11.slots;
    // @ts-ignore
    [];
    var __VLS_11;
    var __VLS_12;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
