'use client'
import React from 'react'
import { useContextTasks } from '@/app/context/contextTasks'

export default function BtnNewTask() {

    const { setPopUpTask } = useContextTasks()

    const goToCreateTask = () => {
        setPopUpTask(true)
    }

    return (
        <button
            onClick={goToCreateTask}
            className=' bg-bluePrimary px-4 py-2 rounded-2xl text-white text-sm flex items-center gap-2 hover:scale-105 hover:shadow-xl'>Agregar Nueva Tarea
            <div className=' p-1 w-5 h-5 bg-white rounded-full'>
                <img src={'/icons/cross.png'} alt="cross" />
            </div>
        </button>
    )
}
