import { computed, reactive, ref, watch } from 'vue';
const props = defineProps();
const emit = defineEmits();
const formRef = ref();
const tagsText = ref('');
const builtInCategories = ['学习', '工作', '生活', '项目', '健康', '阅读'];
const formModel = reactive({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    category: '学习',
    tags: [],
});
const categoryList = computed(() => {
    return Array.from(new Set([...builtInCategories, ...(props.categoryOptions ?? []), formModel.category].filter(Boolean)));
});
const submitLabel = computed(() => props.submitText ?? '保存任务');
const rules = {
    title: [{ required: true, message: '请输入任务标题', trigger: 'blur' }],
    category: [{ required: true, message: '请选择或输入分类', trigger: 'change' }],
};
watch(() => props.initialTask, (task) => {
    formModel.title = task?.title ?? '';
    formModel.description = task?.description ?? '';
    formModel.status = task?.status ?? 'todo';
    formModel.priority = task?.priority ?? 'medium';
    formModel.dueDate = task?.dueDate ?? '';
    formModel.category = task?.category ?? '学习';
    formModel.tags = task?.tags ?? [];
    tagsText.value = task?.tags.join(', ') ?? '';
}, { immediate: true });
async function handleSubmit() {
    if (!formRef.value) {
        return;
    }
    try {
        await formRef.value.validate();
        emit('save', {
            ...formModel,
            title: formModel.title.trim(),
            description: formModel.description.trim(),
            category: formModel.category.trim() || '未分类',
            tags: tagsText.value
                .split(/[，,]/)
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
    }
    catch {
        return;
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
/** @type {__VLS_StyleScopedClasses['task-form']} */ ;
/** @type {__VLS_StyleScopedClasses['task-form__grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-form surface-card" },
});
/** @type {__VLS_StyleScopedClasses['task-form']} */ ;
/** @type {__VLS_StyleScopedClasses['surface-card']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ref: "formRef",
    model: (__VLS_ctx.formModel),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
    size: "large",
}));
const __VLS_2 = __VLS_1({
    ref: "formRef",
    model: (__VLS_ctx.formModel),
    rules: (__VLS_ctx.rules),
    labelPosition: "top",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_7 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-form__grid" },
});
/** @type {__VLS_StyleScopedClasses['task-form__grid']} */ ;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    label: "任务标题",
    prop: "title",
    ...{ class: "task-form__full" },
}));
const __VLS_10 = __VLS_9({
    label: "任务标题",
    prop: "title",
    ...{ class: "task-form__full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['task-form__full']} */ ;
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    modelValue: (__VLS_ctx.formModel.title),
    placeholder: "例如：完成数据库课程报告",
    maxlength: "50",
    showWordLimit: true,
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.formModel.title),
    placeholder: "例如：完成数据库课程报告",
    maxlength: "50",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[formModel, formModel, rules,];
var __VLS_11;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    label: "任务描述",
    ...{ class: "task-form__full" },
}));
const __VLS_21 = __VLS_20({
    label: "任务描述",
    ...{ class: "task-form__full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['task-form__full']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.formModel.description),
    type: "textarea",
    rows: (4),
    placeholder: "补充任务背景、执行步骤或需要注意的事项",
    maxlength: "240",
    showWordLimit: true,
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.formModel.description),
    type: "textarea",
    rows: (4),
    placeholder: "补充任务背景、执行步骤或需要注意的事项",
    maxlength: "240",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
// @ts-ignore
[formModel,];
var __VLS_22;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    label: "任务状态",
}));
const __VLS_32 = __VLS_31({
    label: "任务状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group'] | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group']} */
elRadioGroup;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    modelValue: (__VLS_ctx.formModel.status),
    ...{ class: "task-form__group" },
}));
const __VLS_38 = __VLS_37({
    modelValue: (__VLS_ctx.formModel.status),
    ...{ class: "task-form__group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['task-form__group']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    value: "todo",
}));
const __VLS_44 = __VLS_43({
    value: "todo",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_47 } = __VLS_45.slots;
// @ts-ignore
[formModel,];
var __VLS_45;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    value: "in-progress",
}));
const __VLS_50 = __VLS_49({
    value: "in-progress",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_53 } = __VLS_51.slots;
// @ts-ignore
[];
var __VLS_51;
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    value: "completed",
}));
const __VLS_56 = __VLS_55({
    value: "completed",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
// @ts-ignore
[];
var __VLS_57;
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_33;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    label: "优先级",
}));
const __VLS_62 = __VLS_61({
    label: "优先级",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group'] | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group']} */
elRadioGroup;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    modelValue: (__VLS_ctx.formModel.priority),
    ...{ class: "task-form__group" },
}));
const __VLS_68 = __VLS_67({
    modelValue: (__VLS_ctx.formModel.priority),
    ...{ class: "task-form__group" },
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
/** @type {__VLS_StyleScopedClasses['task-form__group']} */ ;
const { default: __VLS_71 } = __VLS_69.slots;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    value: "low",
}));
const __VLS_74 = __VLS_73({
    value: "low",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
// @ts-ignore
[formModel,];
var __VLS_75;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    value: "medium",
}));
const __VLS_80 = __VLS_79({
    value: "medium",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const { default: __VLS_83 } = __VLS_81.slots;
// @ts-ignore
[];
var __VLS_81;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    value: "high",
}));
const __VLS_86 = __VLS_85({
    value: "high",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_89 } = __VLS_87.slots;
// @ts-ignore
[];
var __VLS_87;
// @ts-ignore
[];
var __VLS_69;
// @ts-ignore
[];
var __VLS_63;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    label: "截止日期",
}));
const __VLS_92 = __VLS_91({
    label: "截止日期",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_95 } = __VLS_93.slots;
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.elDatePicker | typeof __VLS_components.ElDatePicker | typeof __VLS_components['el-date-picker']} */
elDatePicker;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    modelValue: (__VLS_ctx.formModel.dueDate),
    type: "date",
    valueFormat: "YYYY-MM-DD",
    placeholder: "选择截止日期",
    ...{ style: {} },
    clearable: true,
}));
const __VLS_98 = __VLS_97({
    modelValue: (__VLS_ctx.formModel.dueDate),
    type: "date",
    valueFormat: "YYYY-MM-DD",
    placeholder: "选择截止日期",
    ...{ style: {} },
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
// @ts-ignore
[formModel,];
var __VLS_93;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    label: "分类",
    prop: "category",
}));
const __VLS_103 = __VLS_102({
    label: "分类",
    prop: "category",
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_106 } = __VLS_104.slots;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    modelValue: (__VLS_ctx.formModel.category),
    filterable: true,
    allowCreate: true,
    defaultFirstOption: true,
    ...{ style: {} },
}));
const __VLS_109 = __VLS_108({
    modelValue: (__VLS_ctx.formModel.category),
    filterable: true,
    allowCreate: true,
    defaultFirstOption: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_112 } = __VLS_110.slots;
for (const [category] of __VLS_vFor((__VLS_ctx.categoryList))) {
    let __VLS_113;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({
        key: (category),
        label: (category),
        value: (category),
    }));
    const __VLS_115 = __VLS_114({
        key: (category),
        label: (category),
        value: (category),
    }, ...__VLS_functionalComponentArgsRest(__VLS_114));
    // @ts-ignore
    [formModel, categoryList,];
}
// @ts-ignore
[];
var __VLS_110;
// @ts-ignore
[];
var __VLS_104;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    label: "标签",
    ...{ class: "task-form__full" },
}));
const __VLS_120 = __VLS_119({
    label: "标签",
    ...{ class: "task-form__full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
/** @type {__VLS_StyleScopedClasses['task-form__full']} */ ;
const { default: __VLS_123 } = __VLS_121.slots;
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
    modelValue: (__VLS_ctx.tagsText),
    placeholder: "多个标签用逗号分隔，例如：期末, 汇报, 团队协作",
}));
const __VLS_126 = __VLS_125({
    modelValue: (__VLS_ctx.tagsText),
    placeholder: "多个标签用逗号分隔，例如：期末, 汇报, 团队协作",
}, ...__VLS_functionalComponentArgsRest(__VLS_125));
// @ts-ignore
[tagsText,];
var __VLS_121;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "task-form__actions" },
});
/** @type {__VLS_StyleScopedClasses['task-form__actions']} */ ;
let __VLS_129;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_131 = __VLS_130({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
let __VLS_134;
const __VLS_135 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.emit('cancel');
            // @ts-ignore
            [emit,];
        } });
const { default: __VLS_136 } = __VLS_132.slots;
// @ts-ignore
[];
var __VLS_132;
var __VLS_133;
let __VLS_137;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_139 = __VLS_138({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
let __VLS_142;
const __VLS_143 = ({ click: {} },
    { onClick: (__VLS_ctx.handleSubmit) });
const { default: __VLS_144 } = __VLS_140.slots;
(__VLS_ctx.submitLabel);
// @ts-ignore
[handleSubmit, submitLabel,];
var __VLS_140;
var __VLS_141;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
