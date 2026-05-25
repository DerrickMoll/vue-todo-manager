const __VLS_props = defineProps();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stat-panel__card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-panel__card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-panel__card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-panel__card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-panel" },
});
/** @type {__VLS_StyleScopedClasses['stat-panel']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.items))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        key: (item.label),
        ...{ class: "stat-panel__card surface-card" },
        ...{ class: (`accent-${item.accent}`) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-panel__card']} */ ;
    /** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (item.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (item.value);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (item.helper);
    // @ts-ignore
    [items,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
