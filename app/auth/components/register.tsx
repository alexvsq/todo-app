'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/firebase'
import { toast } from 'react-toastify';

export default function page() {

    const [logInfo, setLogInfo] = useState({
        email: '',
        password: '',
        passwordRepeat: '',
    })

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (logInfo.password !== logInfo.passwordRepeat) return toast.error('Las contraseñas no coinciden')
        try {
            const res = await createUserWithEmailAndPassword(auth, logInfo.email, logInfo.password)
            if (!res.user) toast.error('No se pudo registrar')
            toast.success('Registro exitoso')
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <form
            action="#"
            className=' flex flex-col gap-2'
            onSubmit={(e) => submitForm(e)}
        >
            <label htmlFor="email" className='text-xl text-bluePrimary font-semibold'>Correo Electrónico</label>
            <input
                onChange={(e) => setLogInfo({ ...logInfo, email: e.target.value })}
                className='bg-background rounded-2xl px-4 py-2 text-sm w-full'
                type="email" placeholder='Email'
            />
            <label htmlFor="password" className='text-xl text-bluePrimary font-semibold'>Contraseña</label>
            <input
                onChange={(e) => setLogInfo({ ...logInfo, password: e.target.value })}
                className='bg-background rounded-2xl px-4 py-2 text-sm w-full'
                type="password" name='password' placeholder='Contraseña'
            />
            <label htmlFor="repeatPassword" className='text-xl text-bluePrimary font-semibold'>Repetir Contraseña</label>
            <input
                onChange={(e) => setLogInfo({ ...logInfo, passwordRepeat: e.target.value })}
                className='bg-background rounded-2xl px-4 py-2 text-sm w-full'
                type="password" name='repeatPassword' placeholder='Repetir Contraseña'
            />
            <footer className=' my-2'>
                <button
                    type="submit"
                    className='bg-bluePrimary text-white px-4 py-2 rounded-2xl'>
                    Registrarse
                </button>
            </footer>
        </form>
    )
}
