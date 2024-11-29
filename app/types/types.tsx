export interface actionTask {
    type: 'update' | 'create'
    taskId?: string
}

export interface Task {
    id?: string
    userId: string
    title: string
    description?: string
    state: 0 | 1 | 2
    createdAt?: string
}

export interface Filters {
    search: string
    state: 0 | 1 | 2 | 3
    order: 0 | 1
}

export const initialState: Task = {
    id: '',
    userId: '',
    title: '',
    description: '',
    state: 0,
}
