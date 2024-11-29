import { use, useEffect, useState } from 'react'
import CardTask from '@/app/components/CardTask'
import Calendar from './Calendar'
import BtnNewTask from './BtnNewTask'
import { useContextData } from '@/app/context/contextAuth'
import { useContextTasks } from '@/app/context/contextTasks'
import { Task } from '@/app/types/types'

export default function ContentCenter() {
    const { getAllTasksFromFirebase, userInfo } = useContextData()
    const { listTasks, setListTasks, filters } = useContextTasks()
    const [listFiltered, setListFiltered] = useState<Task[]>([])

    const getAndSetTasks = async () => {
        try {
            if (!userInfo) return
            const tasksFirebase = await getAllTasksFromFirebase(userInfo?.uid)
            if (tasksFirebase) {
                setListTasks(tasksFirebase)
            }
        } catch (error) {
            console.error('Error getting documents:', error);
        }
    }
    useEffect(() => {
        const { state: filterByState, order: filterByOrder, search } = filters;

        // Filtrado inicial por búsqueda
        let newListFiltered = listTasks.filter((task) => {
            const lowerSearch = search.toLowerCase();
            return (
                task.title.toLowerCase().includes(lowerSearch) ||
                (task.description && task.description.toLowerCase().includes(lowerSearch))
            );
        });

        // Filtrar por estado, si es diferente de 3
        if (filterByState == 0 || filterByState == 1 || filterByState == 2) {
            newListFiltered = newListFiltered.filter((task) => task.state === filterByState);
        }

        // Ordenar por orden inverso si se especifica
        if (filterByOrder === 1) {
            newListFiltered = [...newListFiltered].reverse(); // Crear una copia antes de invertir
        }

        // Actualizar el estado filtrado
        setListFiltered(newListFiltered);
    }, [filters, listTasks]);
    useEffect(() => {
        getAndSetTasks()
    }, [])

    return (
        <>
            <div className='p-4 md:p-8 pb-0 md:pb-0 flex flex-col h-screen w-full relative'>

                <header className=' flex justify-between items-end mt-12 mb-5 md:mt-0'>
                    <div>
                        <h3 className=' text-textGray text-xl md:text-2xl font-semibold'>Buenas Tardes</h3>
                        <h1 className='text-bluePrimary font-bold text-2xl md:text-3xl'>Lista de Tareas</h1>
                    </div>

                    <div className=' absolute bottom-8 right-4 md:static md:block'>
                        <BtnNewTask />
                    </div>

                    <div className='  md:hidden'>
                        <Calendar />
                    </div>
                </header>

                <section className='grid grid-cols-1 pb-10 md:pb-0 md:grid-cols-2 gap-3 md:gap-5 overflow-y-scroll scrollerNone'>
                    {
                        listFiltered
                            .map((task, index) => {

                                return (
                                    <CardTask key={index} task={task} />
                                )
                            })
                    }
                </section>
            </div>

            <div className='hidden lg:block w-4/12 pt-12'>
                <Calendar />
            </div>
        </>
    )
}