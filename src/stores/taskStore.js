import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { buildExportPayload, createTaskRecord, importTaskPayload, loadTasks, loadTheme, saveTasks, saveTheme, } from '@/utils/storage';
const defaultFilters = {
    keyword: '',
    status: 'all',
    priority: 'all',
    category: '',
    overdue: 'all',
};
const defaultSort = {
    field: 'dueDate',
    order: 'asc',
};
const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1,
};
function isOverdue(task) {
    return Boolean(task.dueDate) && task.status !== 'completed' && dayjs(task.dueDate).endOf('day').isBefore(dayjs());
}
function normalizeDraft(taskDraft) {
    return {
        ...taskDraft,
        title: taskDraft.title.trim(),
        description: taskDraft.description.trim(),
        category: taskDraft.category.trim() || '未分类',
        tags: taskDraft.tags.map((item) => item.trim()).filter(Boolean),
    };
}
function resolveCompletedAt(currentTask, nextStatus) {
    if (nextStatus !== 'completed') {
        return null;
    }
    return currentTask.status === 'completed' ? currentTask.completedAt || currentTask.updatedAt : new Date().toISOString();
}
export const useTaskStore = defineStore('task', () => {
    const tasks = ref(loadTasks());
    const filters = ref({ ...defaultFilters });
    const sort = ref({ ...defaultSort });
    const theme = ref(loadTheme());
    const categories = computed(() => {
        return Array.from(new Set(tasks.value.map((task) => task.category).filter(Boolean))).sort((left, right) => left.localeCompare(right, 'zh-CN'));
    });
    const filteredTasks = computed(() => {
        const keyword = filters.value.keyword.trim().toLowerCase();
        return tasks.value.filter((task) => {
            if (keyword) {
                const searchableText = [task.title, task.description, task.category, task.tags.join(' ')].join(' ').toLowerCase();
                if (!searchableText.includes(keyword)) {
                    return false;
                }
            }
            if (filters.value.status !== 'all' && task.status !== filters.value.status) {
                return false;
            }
            if (filters.value.priority !== 'all' && task.priority !== filters.value.priority) {
                return false;
            }
            if (filters.value.category && task.category !== filters.value.category) {
                return false;
            }
            if (filters.value.overdue === 'overdue' && !isOverdue(task)) {
                return false;
            }
            if (filters.value.overdue === 'on-time' && isOverdue(task)) {
                return false;
            }
            return true;
        });
    });
    const sortedTasks = computed(() => {
        const nextTasks = [...filteredTasks.value];
        const direction = sort.value.order === 'asc' ? 1 : -1;
        nextTasks.sort((left, right) => {
            let result = 0;
            switch (sort.value.field) {
                case 'title':
                    result = left.title.localeCompare(right.title, 'zh-CN');
                    break;
                case 'priority':
                    result = priorityWeight[left.priority] - priorityWeight[right.priority];
                    break;
                case 'createdAt':
                    result = dayjs(left.createdAt).valueOf() - dayjs(right.createdAt).valueOf();
                    break;
                case 'updatedAt':
                    result = dayjs(left.updatedAt).valueOf() - dayjs(right.updatedAt).valueOf();
                    break;
                case 'dueDate': {
                    const leftTime = left.dueDate ? dayjs(left.dueDate).valueOf() : Number.MAX_SAFE_INTEGER;
                    const rightTime = right.dueDate ? dayjs(right.dueDate).valueOf() : Number.MAX_SAFE_INTEGER;
                    result = leftTime - rightTime;
                    break;
                }
            }
            if (result === 0) {
                result = dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf();
            }
            return result * direction;
        });
        return nextTasks;
    });
    const stats = computed(() => {
        const byCategory = tasks.value.reduce((accumulator, task) => {
            accumulator[task.category] = (accumulator[task.category] ?? 0) + 1;
            return accumulator;
        }, {});
        const byPriority = tasks.value.reduce((accumulator, task) => {
            accumulator[task.priority] += 1;
            return accumulator;
        }, {
            low: 0,
            medium: 0,
            high: 0,
        });
        const completed = tasks.value.filter((task) => task.status === 'completed').length;
        const inProgress = tasks.value.filter((task) => task.status === 'in-progress').length;
        const todo = tasks.value.filter((task) => task.status === 'todo').length;
        const overdue = tasks.value.filter((task) => isOverdue(task)).length;
        const total = tasks.value.length;
        return {
            total,
            todo,
            inProgress,
            completed,
            overdue,
            completionRate: total ? Math.round((completed / total) * 100) : 0,
            byCategory,
            byPriority,
        };
    });
    const recentTasks = computed(() => {
        return [...tasks.value]
            .sort((left, right) => dayjs(right.updatedAt).valueOf() - dayjs(left.updatedAt).valueOf())
            .slice(0, 6);
    });
    const upcomingTasks = computed(() => {
        return [...tasks.value]
            .filter((task) => task.dueDate && task.status !== 'completed')
            .sort((left, right) => dayjs(left.dueDate).valueOf() - dayjs(right.dueDate).valueOf())
            .slice(0, 6);
    });
    const completionTrend = computed(() => {
        return Array.from({ length: 7 }, (_, index) => {
            const dayPoint = dayjs().subtract(6 - index, 'day');
            const value = tasks.value.filter((task) => task.completedAt && dayjs(task.completedAt).isSame(dayPoint, 'day')).length;
            return {
                label: dayPoint.format('MM/DD'),
                value,
            };
        });
    });
    function persist() {
        saveTasks(tasks.value);
    }
    function applyStoredTheme() {
        document.documentElement.dataset.theme = theme.value;
    }
    function setTheme(nextTheme) {
        theme.value = nextTheme;
        saveTheme(nextTheme);
        applyStoredTheme();
    }
    function setFilters(nextFilters) {
        filters.value = nextFilters;
    }
    function resetFilters() {
        filters.value = { ...defaultFilters };
    }
    function setSort(nextSort) {
        sort.value = nextSort;
    }
    function createTask(taskDraft) {
        const task = createTaskRecord(normalizeDraft(taskDraft));
        tasks.value = [task, ...tasks.value];
        persist();
        return task;
    }
    function updateTask(taskId, taskDraft) {
        const nextDraft = normalizeDraft(taskDraft);
        const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
        if (taskIndex === -1) {
            return null;
        }
        const currentTask = tasks.value[taskIndex];
        const updatedTask = {
            ...currentTask,
            ...nextDraft,
            updatedAt: new Date().toISOString(),
            completedAt: resolveCompletedAt(currentTask, nextDraft.status),
        };
        tasks.value.splice(taskIndex, 1, updatedTask);
        tasks.value = [...tasks.value];
        persist();
        return updatedTask;
    }
    function updateTaskStatus(taskId, status) {
        const task = tasks.value.find((item) => item.id === taskId);
        if (!task) {
            return null;
        }
        task.status = status;
        task.updatedAt = new Date().toISOString();
        task.completedAt = resolveCompletedAt(task, status);
        tasks.value = [...tasks.value];
        persist();
        return task;
    }
    function deleteTask(taskId) {
        tasks.value = tasks.value.filter((task) => task.id !== taskId);
        persist();
    }
    function clearCompleted() {
        tasks.value = tasks.value.filter((task) => task.status !== 'completed');
        persist();
    }
    function clearAll() {
        tasks.value = [];
        persist();
    }
    function getTaskById(taskId) {
        return tasks.value.find((task) => task.id === taskId) ?? null;
    }
    function exportTasks() {
        return buildExportPayload(tasks.value, theme.value);
    }
    function importTasks(rawText) {
        const payload = importTaskPayload(rawText);
        tasks.value = payload.tasks;
        persist();
        if (payload.theme) {
            setTheme(payload.theme);
        }
    }
    return {
        tasks,
        filters,
        sort,
        theme,
        categories,
        filteredTasks,
        sortedTasks,
        stats,
        recentTasks,
        upcomingTasks,
        completionTrend,
        applyStoredTheme,
        setTheme,
        setFilters,
        resetFilters,
        setSort,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        clearCompleted,
        clearAll,
        getTaskById,
        exportTasks,
        importTasks,
    };
});
