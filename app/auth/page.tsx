'use client'
import { useState } from 'react'
import Regiter from '@/app/auth/components/register'
import Login from '@/app/auth/components/login'
import { useContextData } from '@/app/context/contextAuth'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function page() {

    const router = useRouter()

    const { signInWithGoogle } = useContextData()
    const [currentAuth, setCurrentAuth] = useState<0 | 1>(0)
    let currentAuthPage = [<Regiter />, <Login />]

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle()
            router.replace('/')
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <section className=' absolute h-screen w-screen bg-black/20 backdrop-blur-sm flex justify-center items-center'>
            <div className=' bg-white rounded-2xl w-11/12 h-5/6 md:w-2/3 md:h-2/3 overflow-hidden'>

                <header className=' bg-bluePrimary flex justify-center items-center px-5 py-3'>
                    <h3 className='text-white'>Bienvenido a ToDo App</h3>
                </header>
                <nav className='flex justify-center items-center  my-2 '>
                    <section className='flex gap-4  bg-background  overflow-hidden text-sm rounded-2xl '>
                        <button
                            onClick={() => setCurrentAuth(0)}
                            className={`${currentAuth == 0 ? 'bg-bluePrimary text-white' : 'text-bluePrimary'} px-4 py-2 font-medium`}>Registrarse</button>
                        <button
                            onClick={() => setCurrentAuth(1)}
                            className={`${currentAuth == 1 ? 'bg-bluePrimary text-white' : 'text-bluePrimary'} px-4 py-2 font-medium`}>Iniciar Sesión</button>
                        <button
                            onClick={handleSignInWithGoogle}
                            className={` text-bluePrimary px-4 py-2 font-medium hover:bg-bluePrimary hover:text-white`}>Iniciar Sesión con Google</button>
                    </section>
                </nav>
                <div className=' h-full p-4'>
                    {
                        currentAuthPage[currentAuth]
                    }
                </div>
            </div>
        </section>
    )
}
