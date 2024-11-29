'use client'
import { useState } from 'react'
import Regiter from '@/app/auth/components/register'
import Login from '@/app/auth/components/login'

export default function page() {

    const [register, setRegister] = useState(true)

    return (
        <section className=' absolute h-screen w-screen bg-black/20 backdrop-blur-sm flex justify-center items-center'>
            <div className=' bg-white rounded-2xl w-11/12 h-5/6 md:w-2/3 md:h-2/3 overflow-hidden'>

                <header className=' bg-bluePrimary flex justify-center items-center px-5 py-3'>
                    <h3 className='text-white'>Iniciar Sesión</h3>
                </header>

                <nav className='flex justify-center items-center gap-4 my-2'>
                    <button
                        onClick={() => setRegister(true)}
                        className=' bg-blue-950 text-white px-4 py-2 rounded-2xl' >Register</button>
                    <button
                        onClick={() => setRegister(false)}
                        className=' bg-blue-950 text-white px-4 py-2 rounded-2xl'>Login</button>
                </nav>
                <div className=' h-full p-4'>
                    {

                        register
                            ? <Regiter />
                            : <Login />
                    }
                </div>
            </div>
        </section>
    )
}
