import { Task } from '@/app/types/types'
import { useContextTasks } from '@/app/context/contextTasks'

export default function CardTask({ task }: { task: Task }) {

    const { setTaskOperation, setPopUpTask, setTaskInfo, listTasks } = useContextTasks()
    const stateString = ['Pendiente', 'En progreso', 'Finalizada']

    const timestampInSeconds = () => {
        if (!task.createdAt) return '';

        const timeFirebase = Number(task.createdAt);
        const date = new Date(timeFirebase * 1000);

        const formattedDate = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        });

        const formattedTime = date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedTime} - ${formattedDate}`;
    };

    const descriptionCut = (description?: string) => {
        if (!description) return ''
        if (description.length > 50) {
            return description.slice(0, 50) + '...'
        }
        return description
    }

    const handleTaskAction = () => {
        const taskToUpdate = listTasks.find(taskFind => taskFind.id === task.id)
        if (!taskToUpdate) return
        setTaskOperation({ type: 'update', taskId: task.id })
        setTaskInfo(taskToUpdate)
        setPopUpTask(true)
    }


    return (
        <article
            onClick={handleTaskAction}
            className='flex flex-col gap-1 bg-white rounded-2xl p-4 hover:bg-slate-100 hover:cursor-pointer hover:shadow-lg transition '>
            <aside className=' flex justify-between '>

                <h3 className=' font-semibold text-lg'>{task.title}</h3>

                <p className=' text-textGray text-xs'>{timestampInSeconds()}</p>

            </aside>
            <footer className=' flex justify-between gap-4 items-start'>
                <p className=' text-xs  text-textGray'>{descriptionCut(task.description)}</p>
                <div className=' flex items-center justify-center'>
                    <button
                        className={` rounded-full text-sm px-2 py-1 ${task.state === 0 ? 'bg-bgRed' : task.state == 1 ? 'bg-bgYellow' : task.state == 2 ? 'bg-bgGreen' : 'bg-black'} text-white`}>{stateString[task.state]}</button>
                </div>
            </footer>
        </article>
    )
}
