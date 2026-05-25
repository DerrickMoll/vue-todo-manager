import { Search } from '@element-plus/icons-vue';
const props = defineProps();
const emit = defineEmits();
function updateFilter(key, value) {
    emit('update:filters', {
        ...props.filters,
        [key]: value,
    });
}
function updateSort(key, value) {
    emit('update:sort', {
        ...props.sort,
        [key]: value,
    });
}
function handleKeywordChange(value) {
    updateFilter('keyword', value);
}
function handleStatusChange(value) {
    updateFilter('status', value);
}
function handlePriorityChange(value) {
    updateFilter('priority', value);
}
function handleCategoryChange(value) {
    updateFilter('category', value ?? '');
}
function handleOverdueChange(value) {
    updateFilter('overdue', value);
}
function handleSortFieldChange(value) {
    updateSort('field', value);
}
function handleSortOrderChange(value) {
    if (value === 'asc' || value === 'desc') {
        updateSort('order', value);
    }
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
/** @type {__VLS_StyleScopedClasses['filter-panel__headline']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__headline']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__headline']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__headline']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__headline']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__footer']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__footer']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__footer']} */ ;
/** @type {__VLS_StyleScopedClasses['el-button']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel__footer']} */ ;
/** @type {__VLS_StyleScopedClasses['el-radio-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "filter-panel surface-card" },
});
/** @type {__VLS_StyleScopedClasses['filter-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-panel__headline" },
});
/** @type {__VLS_StyleScopedClasses['filter-panel__headline']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-panel__actions" },
});
/** @type {__VLS_StyleScopedClasses['filter-panel__actions']} */ ;
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
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('clear-completed');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
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
            __VLS_ctx.emit('create');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[];
var __VLS_11;
var __VLS_12;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-panel__grid" },
});
/** @type {__VLS_StyleScopedClasses['filter-panel__grid']} */ ;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input'] | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.filters.keyword),
    placeholder: "搜索标题、描述、分类或标签",
    clearable: true,
}));
const __VLS_18 = __VLS_17({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.filters.keyword),
    placeholder: "搜索标题、描述、分类或标签",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
const __VLS_22 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (__VLS_ctx.handleKeywordChange) });
const { default: __VLS_23 } = __VLS_19.slots;
{
    const { prefix: __VLS_24 } = __VLS_19.slots;
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_30 } = __VLS_28.slots;
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.Search} */
    Search;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({}));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    // @ts-ignore
    [filters, handleKeywordChange,];
    var __VLS_28;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_19;
var __VLS_20;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.status),
}));
const __VLS_38 = __VLS_37({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
const __VLS_42 = ({ change: {} },
    { onChange: (__VLS_ctx.handleStatusChange) });
const { default: __VLS_43 } = __VLS_39.slots;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    label: "全部状态",
    value: "all",
}));
const __VLS_46 = __VLS_45({
    label: "全部状态",
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    label: "待办",
    value: "todo",
}));
const __VLS_51 = __VLS_50({
    label: "待办",
    value: "todo",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    label: "进行中",
    value: "in-progress",
}));
const __VLS_56 = __VLS_55({
    label: "进行中",
    value: "in-progress",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    label: "已完成",
    value: "completed",
}));
const __VLS_61 = __VLS_60({
    label: "已完成",
    value: "completed",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
// @ts-ignore
[filters, handleStatusChange,];
var __VLS_39;
var __VLS_40;
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.priority),
}));
const __VLS_66 = __VLS_65({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.priority),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_69;
const __VLS_70 = ({ change: {} },
    { onChange: (__VLS_ctx.handlePriorityChange) });
const { default: __VLS_71 } = __VLS_67.slots;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    label: "全部优先级",
    value: "all",
}));
const __VLS_74 = __VLS_73({
    label: "全部优先级",
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    label: "高优先级",
    value: "high",
}));
const __VLS_79 = __VLS_78({
    label: "高优先级",
    value: "high",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    label: "中优先级",
    value: "medium",
}));
const __VLS_84 = __VLS_83({
    label: "中优先级",
    value: "medium",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    label: "低优先级",
    value: "low",
}));
const __VLS_89 = __VLS_88({
    label: "低优先级",
    value: "low",
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
// @ts-ignore
[filters, handlePriorityChange,];
var __VLS_67;
var __VLS_68;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.category),
    clearable: true,
    placeholder: "全部分类",
}));
const __VLS_94 = __VLS_93({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.category),
    clearable: true,
    placeholder: "全部分类",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_97;
const __VLS_98 = ({ change: {} },
    { onChange: (__VLS_ctx.handleCategoryChange) });
const { default: __VLS_99 } = __VLS_95.slots;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    label: "全部分类",
    value: "",
}));
const __VLS_102 = __VLS_101({
    label: "全部分类",
    value: "",
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
for (const [category] of __VLS_vFor((__VLS_ctx.categories))) {
    let __VLS_105;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
        key: (category),
        label: (category),
        value: (category),
    }));
    const __VLS_107 = __VLS_106({
        key: (category),
        label: (category),
        value: (category),
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    // @ts-ignore
    [filters, handleCategoryChange, categories,];
}
// @ts-ignore
[];
var __VLS_95;
var __VLS_96;
let __VLS_110;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.overdue),
}));
const __VLS_112 = __VLS_111({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.filters.overdue),
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = ({ change: {} },
    { onChange: (__VLS_ctx.handleOverdueChange) });
const { default: __VLS_117 } = __VLS_113.slots;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    label: "全部时效",
    value: "all",
}));
const __VLS_120 = __VLS_119({
    label: "全部时效",
    value: "all",
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_123;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
    label: "仅逾期",
    value: "overdue",
}));
const __VLS_125 = __VLS_124({
    label: "仅逾期",
    value: "overdue",
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
let __VLS_128;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({
    label: "未逾期",
    value: "on-time",
}));
const __VLS_130 = __VLS_129({
    label: "未逾期",
    value: "on-time",
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
// @ts-ignore
[filters, handleOverdueChange,];
var __VLS_113;
var __VLS_114;
let __VLS_133;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.sort.field),
}));
const __VLS_135 = __VLS_134({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.sort.field),
}, ...__VLS_functionalComponentArgsRest(__VLS_134));
let __VLS_138;
const __VLS_139 = ({ change: {} },
    { onChange: (__VLS_ctx.handleSortFieldChange) });
const { default: __VLS_140 } = __VLS_136.slots;
let __VLS_141;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
    label: "按截止日期",
    value: "dueDate",
}));
const __VLS_143 = __VLS_142({
    label: "按截止日期",
    value: "dueDate",
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
let __VLS_146;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
    label: "按创建时间",
    value: "createdAt",
}));
const __VLS_148 = __VLS_147({
    label: "按创建时间",
    value: "createdAt",
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
let __VLS_151;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent1(__VLS_151, new __VLS_151({
    label: "按更新时间",
    value: "updatedAt",
}));
const __VLS_153 = __VLS_152({
    label: "按更新时间",
    value: "updatedAt",
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
let __VLS_156;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
    label: "按优先级",
    value: "priority",
}));
const __VLS_158 = __VLS_157({
    label: "按优先级",
    value: "priority",
}, ...__VLS_functionalComponentArgsRest(__VLS_157));
let __VLS_161;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({
    label: "按标题",
    value: "title",
}));
const __VLS_163 = __VLS_162({
    label: "按标题",
    value: "title",
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
// @ts-ignore
[sort, handleSortFieldChange,];
var __VLS_136;
var __VLS_137;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-panel__footer" },
});
/** @type {__VLS_StyleScopedClasses['filter-panel__footer']} */ ;
let __VLS_166;
/** @ts-ignore @type { | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group'] | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group']} */
elRadioGroup;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.sort.order),
}));
const __VLS_168 = __VLS_167({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.sort.order),
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
let __VLS_171;
const __VLS_172 = ({ change: {} },
    { onChange: (__VLS_ctx.handleSortOrderChange) });
const { default: __VLS_173 } = __VLS_169.slots;
let __VLS_174;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
    value: "asc",
}));
const __VLS_176 = __VLS_175({
    value: "asc",
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
const { default: __VLS_179 } = __VLS_177.slots;
// @ts-ignore
[sort, handleSortOrderChange,];
var __VLS_177;
let __VLS_180;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({
    value: "desc",
}));
const __VLS_182 = __VLS_181({
    value: "desc",
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
const { default: __VLS_185 } = __VLS_183.slots;
// @ts-ignore
[];
var __VLS_183;
// @ts-ignore
[];
var __VLS_169;
var __VLS_170;
let __VLS_186;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_188 = __VLS_187({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
let __VLS_191;
const __VLS_192 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('reset');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_193 } = __VLS_189.slots;
// @ts-ignore
[];
var __VLS_189;
var __VLS_190;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
