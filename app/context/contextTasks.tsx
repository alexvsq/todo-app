'use client'
import { useState, useContext, ReactNode, createContext, useEffect } from 'react'
import { Task, actionTask, initialState, Filters } from '@/app/types/types'

interface ContextType {
    popUpTask: boolean;
    setPopUpTask: React.Dispatch<React.SetStateAction<boolean>>;
    listTasks: Task[];
    setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    taskInfo: Task;
    setTaskInfo: React.Dispatch<React.SetStateAction<Task>>;
    taskOperation: actionTask;
    setTaskOperation: React.Dispatch<React.SetStateAction<actionTask>>;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const Context = createContext<ContextType | undefined>(undefined);

function ContextTasksProvider({ children }: { children: ReactNode }) {

    const [popUpTask, setPopUpTask] = useState<boolean>(false);
    const [listTasks, setListTasks] = useState<Task[] | []>([])
    const [taskOperation, setTaskOperation] = useState<actionTask>({
        type: 'create',
        taskId: ''
    })
    const [taskInfo, setTaskInfo] = useState<Task>({
        title: '',
        description: '',
        state: 0,
        userId: ''
    })
    const [filters, setFilters] = useState<Filters>({
        search: '',
        state: 3,
        order: 0
    })

    const valuesContext: ContextType = {
        popUpTask, setPopUpTask,
        listTasks, setListTasks,
        taskInfo, setTaskInfo,
        taskOperation, setTaskOperation,
        filters, setFilters

    }
    useEffect(() => {
        if (!popUpTask) {
            setTaskOperation({ type: 'create', taskId: '' })
            setTaskInfo(initialState)
        }
    }, [popUpTask])
    return (
        <Context.Provider value={valuesContext}>
            {children}
        </Context.Provider>
    )
}

function useContextTasks() {
    const contextData = useContext(Context);

    if (!contextData) {
        throw new Error('useContextData must be used within a ContextProvider');
    }
    return contextData;
}

export { ContextTasksProvider, useContextTasks };