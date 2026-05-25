import { ref } from 'vue';
import dayjs from 'dayjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useTaskStore } from '@/stores/taskStore';
const store = useTaskStore();
const fileInputRef = ref(null);
const themeOptions = [
    { value: 'sunrise', title: '晨曦暖色', description: '更轻盈、明亮，适合白天专注规划。' },
    { value: 'midnight', title: '深海夜色', description: '更沉静、低亮度，适合长时间浏览。' },
];
function setTheme(theme) {
    store.setTheme(theme);
    ElMessage.success('主题已切换');
}
function exportTasks() {
    const content = store.exportTasks();
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `flow-board-backup-${dayjs().format('YYYYMMDD-HHmmss')}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    ElMessage.success('任务数据已导出');
}
function triggerImport() {
    fileInputRef.value?.click();
}
async function handleImport(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
        return;
    }
    try {
        const content = await file.text();
        store.importTasks(content);
        ElMessage.success('任务数据已导入');
    }
    catch (error) {
        ElMessage.error(error instanceof Error ? error.message : '导入失败，请检查文件格式。');
    }
    finally {
        input.value = '';
    }
}
async function clearCompleted() {
    try {
        await ElMessageBox.confirm('将清空全部已完成任务，是否继续？', '清理已完成任务', {
            type: 'warning',
            confirmButtonText: '确认清理',
            cancelButtonText: '取消',
        });
        store.clearCompleted();
        ElMessage.success('已清理全部已完成任务');
    }
    catch {
        return;
    }
}
async function clearAll() {
    try {
        await ElMessageBox.confirm('这会删除本地保存的全部任务数据，且无法恢复。', '清空所有数据', {
            type: 'warning',
            confirmButtonText: '立即清空',
            cancelButtonText: '取消',
        });
        store.clearAll();
        ElMessage.success('所有任务数据已清空');
    }
    catch {
        return;
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['settings-page__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__panel']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__theme-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__theme-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__theme-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__theme-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__theme-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "settings-page" },
});
/** @type {__VLS_StyleScopedClasses['settings-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card settings-page__panel" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "settings-page__theme-grid" },
});
/** @type {__VLS_StyleScopedClasses['settings-page__theme-grid']} */ ;
for (const [option] of __VLS_vFor((__VLS_ctx.themeOptions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.setTheme(option.value);
                // @ts-ignore
                [themeOptions, setTheme,];
            } },
        key: (option.value),
        type: "button",
        ...{ class: "settings-page__theme-card" },
        ...{ class: ({ 'is-active': __VLS_ctx.store.theme === option.value }) },
    });
    /** @type {__VLS_StyleScopedClasses['settings-page__theme-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "settings-page__theme-preview" },
        ...{ class: (`theme-${option.value}`) },
    });
    /** @type {__VLS_StyleScopedClasses['settings-page__theme-preview']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (option.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (option.description);
    // @ts-ignore
    [store,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card settings-page__panel" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.store.stats.total);
(__VLS_ctx.store.stats.completed);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "settings-page__actions" },
});
/** @type {__VLS_StyleScopedClasses['settings-page__actions']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.exportTasks) });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[store, store, exportTasks,];
var __VLS_3;
var __VLS_4;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = ({ click: {} },
    { onClick: (__VLS_ctx.triggerImport) });
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[triggerImport,];
var __VLS_11;
var __VLS_12;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
const __VLS_22 = ({ click: {} },
    { onClick: (__VLS_ctx.clearCompleted) });
const { default: __VLS_23 } = __VLS_19.slots;
// @ts-ignore
[clearCompleted,];
var __VLS_19;
var __VLS_20;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    type: "danger",
    plain: true,
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    type: "danger",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_29;
const __VLS_30 = ({ click: {} },
    { onClick: (__VLS_ctx.clearAll) });
const { default: __VLS_31 } = __VLS_27.slots;
// @ts-ignore
[clearAll,];
var __VLS_27;
var __VLS_28;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleImport) },
    ref: "fileInputRef",
    ...{ class: "visually-hidden" },
    type: "file",
    accept: ".json,application/json",
});
/** @type {__VLS_StyleScopedClasses['visually-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ class: "surface-card settings-page__panel" },
});
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-page__panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "settings-page__facts" },
});
/** @type {__VLS_StyleScopedClasses['settings-page__facts']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
// @ts-ignore
[handleImport,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
