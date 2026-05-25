export type TaskStatus = 'todo' | 'in-progress' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high'
export type ThemeMode = 'sunrise' | 'midnight'

export interface TaskItem {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  completedAt: string | null
}

export interface TaskDraft {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  category: string
  tags: string[]
}

export interface TaskFilters {
  keyword: string
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  category: string
  dueDate: string
  overdue: 'all' | 'overdue' | 'on-time'
}

export interface TaskSort {
  field: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority' | 'title'
  order: 'asc' | 'desc'
}

export interface TaskStats {
  total: number
  todo: number
  inProgress: number
  completed: number
  overdue: number
  completionRate: number
  byCategory: Record<string, number>
  byPriority: Record<TaskPriority, number>
}

export interface CompletionTrendPoint {
  label: string
  value: number
}
