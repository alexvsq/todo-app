'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import 'firebaseui/dist/firebaseui.css'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/home')

  }, [])

}
