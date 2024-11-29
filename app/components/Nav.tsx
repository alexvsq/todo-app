'use client'
import { useState, useEffect } from 'react'
import { auth } from '@/app/firebase'
import { signOut } from "firebase/auth";
import { useContextData } from '@/app/context/contextAuth';
import { useContextTasks } from '@/app/context/contextTasks'
import { Filters } from '@/app/types/types'
import { toast } from 'react-toastify'

export default function Nav() {

    const { userInfo } = useContextData()
    const { filters, setFilters } = useContextTasks()
    const [menuShow, setMenuShow] = useState(false)

    const handleSignOut = async () => {
        try {
            await signOut(auth)

        } catch (error) {
            console.error(error)
            toast.error('Error al cerrar sesión')
        }
    }
    const handleChangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const state = parseInt(e.target.value)
        if (state == 0 || state == 1 || state == 2 || state == 3) {
            setFilters({ ...filters, state: state })
        }
    }
    const handleChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const order = parseInt(e.target.value)
        if (order == 0 || order == 1) {
            setFilters({ ...filters, order: order })
        }
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value
        setFilters({ ...filters, search: search })
    }

    return (
        <div >

            <nav className='fixed w-full bg-bluePrimary flex justify-between h-12 items-center px-4 py-2 md:hidden'>

                <div className='flex gap-2 items-center'>
                    <img
                        src={userInfo?.photoURL ? userInfo?.photoURL : '/icons/user.png'}
                        className='w-6 h-6 rounded-full'
                    />

                    <p className=' text-white text-xs'>{userInfo?.displayName ? userInfo?.displayName : ''}</p>
                </div>

                <h1 className=' text-xl font-semibold text-white'>ToDo App</h1>

                <div
                    onClick={() => setMenuShow(!menuShow)}
                    className=' w-7 h-7'>
                    <img src={'/icons/menu.png'} alt="menu" />
                </div>

            </nav>

            <div className={`md:hidden h-full w-5/6 absolute transition-all ${menuShow ? '' : 'right-full'}`}>
                <div className=' bg-bluePrimary h-full  px-5'>
                    <div className=' flex flex-col gap-5 py-4'>
                        <h3 className=' text-textGray text-lg font-medium'>Filtros</h3>

                        <article >
                            <p className='my-2 text-white'>Buscar</p>
                            <input
                                className='w-full rounded-md px-2 py-1'
                                type="text"
                                placeholder='Buscar'
                                value={filters.search}
                                onChange={(e) => handleSearch(e)}
                            />
                        </article>

                        <article >
                            <p className='my-2 text-white'>Estado</p>
                            <select
                                onChange={(e) => handleChangeState(e)}
                                className='w-full rounded-md px-2 py-1' name="" id="">
                                <option value="3">Todos</option>
                                <option value="0">Pendiente</option>
                                <option value="1">En pogreso</option>
                                <option value="2">Completado</option>
                            </select>
                        </article>

                        <article>
                            <p className='my-2 text-white'>Orden</p>
                            <select
                                onChange={(e) => handleChangeOrder(e)}
                                className='w-full rounded-md px-2 py-1' name="" id="">
                                <option value="0">Ascendete</option>
                                <option value="1">Descendente</option>
                            </select>
                        </article>

                        <article className=' my-5'>
                            <button
                                onClick={handleSignOut}
                                className='bg-bgRed text-white px-4 py-2 rounded-2xl text-sm hover:scale-105 '>Cerrar Sesión</button>
                        </article>

                    </div>
                </div>
            </div>

            <aside className='md:block bg-bluePrimary h-screen w-64 hidden p-4'>

                <header className=' py-2'>
                    <div className='flex gap-2 items-center'>
                        <img
                            src={userInfo?.photoURL ? userInfo?.photoURL : '/icons/user.png'}
                            className='w-6 h-6 rounded-full'
                        />

                        <p className=' text-white text-xs'>{userInfo?.displayName ? userInfo?.displayName : userInfo?.email}</p>
                    </div>

                    <h1 className='py-6 text-2xl font-medium text-white'>ToDo App</h1>

                </header>

                <div className=' flex flex-col gap-3 py-4'>
                    <h3 className=' text-white text-lg font-medium'>Filtros</h3>

                    <article >
                        <p className='my-2 text-textGray text-sm'>Buscar</p>
                        <input
                            className='w-full text-sm rounded-md px-2 py-1'
                            type="text"
                            placeholder='Buscar'
                            value={filters.search}
                            onChange={(e) => handleSearch(e)}
                        />
                    </article>

                    <article >
                        <p className='my-2 text-textGray text-sm'>Estado</p>
                        <select
                            onChange={(e) => handleChangeState(e)}
                            className='w-full text-sm rounded-md px-2 py-1' name="" id="">
                            <option value="3">Todos</option>
                            <option value="0">Pendiente</option>
                            <option value="1">En progreso</option>
                            <option value="2">Completado</option>
                        </select>
                    </article>

                    <article>
                        <p className='my-2 text-textGray text-sm'>Orden</p>
                        <select
                            onChange={(e) => handleChangeOrder(e)}
                            className='w-full text-sm rounded-md px-2 py-1' name="" id="">
                            <option value="0">Ascendete</option>
                            <option value="1">Descendente</option>
                        </select>
                    </article>


                    <article className=' my-5'>
                        <button
                            onClick={handleSignOut}
                            className='bg-bgRed text-white px-4 py-2 rounded-2xl text-sm hover:scale-105 '>Cerrar Sesión</button>
                    </article>

                </div>

            </aside>

        </div>
    )
}
