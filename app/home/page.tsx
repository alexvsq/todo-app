'use client'
import Nav from '@/app/components/Nav'
import ContentCenter from '@/app/components/ContentCenter'
import PopUpCreateTask from '@/app/components/PopUpTask'
import { ProtectedRoute } from '@/app/context/protectedRouted'
import { useContextTasks } from '@/app/context/contextTasks'

export default function page() {

    const { popUpTask } = useContextTasks()

    return (
        <ProtectedRoute>
            <div className='flex md:flex-row'>
                <Nav />
                <ContentCenter />
                <PopUpCreateTask show={popUpTask} />
            </div>
        </ProtectedRoute>
    )
}
