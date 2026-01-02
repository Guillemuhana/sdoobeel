'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PrimaryButton from '@/components/primary-button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', email, password)
    router.push('/dashboard')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <Image
            src='/images/logo0237.png'
            alt='S-Doorbell'
            width={120}
            height={120}
            className='mx-auto mb-4'
          />
        </div>

        <form onSubmit={handleLogin} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Correo Electrónico
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='tu@email.com'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Contraseña
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='••••••••'
              required
            />
          </div>

          <PrimaryButton type='submit' fullWidth>
            Iniciar Sesión
          </PrimaryButton>
        </form>

        <div className='mt-6 text-center'>
          <a href='#' className='text-sm text-blue-600 hover:underline'>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  )
}
