const TASKS_STORAGE_KEY = 'flow-board:tasks';
const THEME_STORAGE_KEY = 'flow-board:theme';
const statusSet = new Set(['todo', 'in-progress', 'completed']);
const prioritySet = new Set(['low', 'medium', 'high']);
const themeSet = new Set(['sunrise', 'midnight']);
function normalizeText(value) {
    return typeof value === 'string' ? value.trim() : '';
}
function normalizeTags(value) {
    if (Array.isArray(value)) {
        return value
            .map((item) => normalizeText(item))
            .filter(Boolean);
    }
    if (typeof value === 'string') {
        return value
            .split(/[，,]/)
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return [];
}
function resolveCompletedAt(status, completedAt, updatedAt, fallbackTime) {
    if (status !== 'completed') {
        return null;
    }
    return normalizeText(completedAt) || normalizeText(updatedAt) || fallbackTime;
}
function normalizeTask(rawTask) {
    if (!rawTask || typeof rawTask !== 'object') {
        return null;
    }
    const source = rawTask;
    const now = new Date().toISOString();
    const title = normalizeText(source.title);
    if (!title) {
        return null;
    }
    const status = statusSet.has(source.status) ? source.status : 'todo';
    const priority = prioritySet.has(source.priority)
        ? source.priority
        : 'medium';
    const createdAt = normalizeText(source.createdAt) || now;
    const updatedAt = normalizeText(source.updatedAt) || createdAt;
    return {
        id: normalizeText(source.id) || crypto.randomUUID(),
        title,
        description: normalizeText(source.description),
        status,
        priority,
        dueDate: normalizeText(source.dueDate),
        category: normalizeText(source.category) || '未分类',
        tags: normalizeTags(source.tags),
        createdAt,
        updatedAt,
        completedAt: resolveCompletedAt(status, source.completedAt, source.updatedAt, updatedAt),
    };
}
export function loadTasks() {
    const rawTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!rawTasks) {
        return [];
    }
    try {
        const parsed = JSON.parse(rawTasks);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed
            .map((task) => normalizeTask(task))
            .filter((task) => Boolean(task));
    }
    catch {
        return [];
    }
}
export function saveTasks(tasks) {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
export function loadTheme() {
    const rawTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (rawTheme && themeSet.has(rawTheme)) {
        return rawTheme;
    }
    return 'sunrise';
}
export function saveTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}
export function buildExportPayload(tasks, theme) {
    return JSON.stringify({
        theme,
        exportedAt: new Date().toISOString(),
        tasks,
    }, null, 2);
}
export function importTaskPayload(rawText) {
    const parsed = JSON.parse(rawText);
    if (!Array.isArray(parsed.tasks)) {
        throw new Error('导入文件缺少 tasks 数组。');
    }
    const tasks = parsed.tasks
        .map((task) => normalizeTask(task))
        .filter((task) => Boolean(task));
    if (!tasks.length && parsed.tasks.length) {
        throw new Error('导入文件中的任务格式不正确。');
    }
    const theme = themeSet.has(parsed.theme) ? parsed.theme : undefined;
    return { tasks, theme };
}
export function createTaskRecord(taskDraft) {
    const now = new Date().toISOString();
    const status = taskDraft.status;
    return {
        id: crypto.randomUUID(),
        title: taskDraft.title.trim(),
        description: taskDraft.description.trim(),
        status,
        priority: taskDraft.priority,
        dueDate: taskDraft.dueDate,
        category: taskDraft.category.trim() || '未分类',
        tags: normalizeTags(taskDraft.tags),
        createdAt: now,
        updatedAt: now,
        completedAt: status === 'completed' ? now : null,
    };
}
