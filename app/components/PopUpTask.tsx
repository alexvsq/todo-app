'use client'
import { useContextData } from '@/app/context/contextAuth'
import { useContextTasks } from '@/app/context/contextTasks'
import { toast } from 'react-toastify';

type Props = {
    show: boolean;
    taskOperation?: 'create' | 'edit';
}

export default function PopUpCreateTask({ show = false }: Props) {

    const { addTaskToFirebase, updateTaskToFirebase, deleteTaskToFirebase } = useContextData()
    const { setPopUpTask, setTaskInfo, taskInfo, taskOperation, setListTasks, listTasks, } = useContextTasks()

    const closePopUp = () => {
        setPopUpTask(false)
    }

    const handleBtnSave = async () => {
        try {
            const resId = await addTaskToFirebase(taskInfo)
            if (resId) {
                const newListTasks = [...listTasks, { ...taskInfo, id: resId, createdAt: (Date.now() / 1000).toString() }]
                setListTasks(newListTasks)
                setPopUpTask(false)
                toast.success('Tarea guardada exitosamente')
            }
        } catch (error) {
            console.error('Error getting documents:', error);
            toast.error('Error al guardar la tarea')
        }
    }
    const handleBtnDelete = async () => {
        try {
            if (!taskInfo.id) return
            await deleteTaskToFirebase(taskInfo.id)
            const newListTasks = listTasks.filter(task => task.id !== taskInfo.id)
            setListTasks(newListTasks)
            setPopUpTask(false)
            toast.success('Tarea eliminada exitosamente')
        } catch (error) {
            console.error('Error al eliminar el documento:', error);
            toast.error('Error al eliminar la tarea')
        }
    }
    const handleBtnUpdate = async () => {
        try {
            if (!taskInfo.id) return
            await updateTaskToFirebase(taskInfo.id, taskInfo)
            const newListTasks = listTasks.map(task => {
                if (task.id === taskInfo.id) {
                    return { ...taskInfo, createdAt: (Date.now() / 1000).toString() }
                }
                return task
            })
            setListTasks(newListTasks)
            setPopUpTask(false)
            toast.success('Tarea actualizada exitosamente')

        } catch (error) {
            console.error('Error al actualizar el documento:', error);
            toast.error('Error al actualizar la tarea')
        }
    }
    const handleTaskState = () => {
        let currentState = taskInfo.state
        if (currentState === 0) {
            setTaskInfo({ ...taskInfo, state: 1 })
        }
        else if (currentState === 1) {
            setTaskInfo({ ...taskInfo, state: 2 })
        } else {
            setTaskInfo({ ...taskInfo, state: 0 })
        }
    }

    if (!show) return null
    return (
        <section className=' absolute h-screen w-screen bg-black/20 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col justify-between bg-white rounded-2xl w-11/12 h-5/6 md:w-2/3 md:h-2/3 overflow-hidden'>

                <header className=' bg-bluePrimary flex justify-between items-center px-5 py-3'>
                    <h3 className='text-white text-lg'>{taskOperation.type == 'create' ? 'Nueva Tarea 🆕' : 'Editar Tarea ✏️'}</h3>

                    <button
                        onClick={closePopUp}
                        className=' bg-white hover:bg-slate-300 p-1 w-6 h-6 rounded-full'>
                        <img className='rotate-45' src="/icons/cross.png" alt="cross" />
                    </button>
                </header>

                <div className='p-4 flex flex-col md:flex-row gap-5'>
                    <div className=' flex flex-col md:w-2/3 gap-4'>
                        <article className=' flex flex-col gap-2'>
                            <h3 className=' text-xl text-bluePrimary font-semibold'>Titulo</h3>
                            <input
                                className='bg-background rounded-2xl px-4 py-2 text-sm w-full'
                                type="text"
                                placeholder='Titulo de la tarea'
                                value={taskInfo.title}
                                onChange={(e) => setTaskInfo({ ...taskInfo, title: e.target.value })}
                            />
                        </article>
                        <article className=' flex flex-col gap-2'>
                            <h3 className=' text-xl text-bluePrimary font-semibold'>Descripción</h3>
                            <textarea
                                className='bg-background rounded-2xl px-4 py-2 text-sm w-full'
                                placeholder='Descripción de la tarea'
                                name="" id=""
                                rows={8}
                                value={taskInfo.description}
                                onChange={(e) => setTaskInfo({ ...taskInfo, description: e.target.value })}
                            />
                        </article>
                    </div>
                    <aside>
                        <article className=' flex flex-col gap-2'>
                            <h3 className=' text-xl text-bluePrimary font-semibold'>Estado</h3>
                            <button
                                onClick={handleTaskState}
                                className={` rounded-full text-sm px-2 py-1 ${taskInfo.state === 0 ? 'bg-bgRed' : taskInfo.state == 1 ? 'bg-bgYellow' : taskInfo.state == 2 ? 'bg-bgGreen' : 'bg-black'} text-white`}
                            >{taskInfo.state === 0 ? 'Pendiente' : taskInfo.state == 1 ? 'En progreso' : 'Finalizada'}</button>
                        </article>
                    </aside>
                </div>
                <footer className='flex justify-end items-end gap-3 p-4'>
                    {
                        taskOperation.type == 'update' &&
                        <button
                            onClick={handleBtnDelete}
                            className='bg-bgRed text-white px-4 py-2 rounded-2xl'
                        >
                            Eliminar Tarea
                        </button>
                    }
                    {
                        taskOperation.type == 'update'
                            ?
                            <button
                                onClick={handleBtnUpdate}
                                className='bg-bluePrimary text-white px-4 py-2 rounded-2xl'>
                                Actualizar Tarea
                            </button>

                            :
                            <button
                                onClick={handleBtnSave}
                                className='bg-bluePrimary text-white px-4 py-2 rounded-2xl'>
                                Guardar
                            </button>
                    }
                </footer>

            </div>
        </section>
    )
}
