'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import PrimaryButton from '@/components/primary-button'
import { BellIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

export default function VisitorPage() {
  const [name, setName] = useState('')
  const [notified, setNotified] = useState(false)
  const [ownerMessage, setOwnerMessage] = useState('')

  useEffect(() => {
    if (notified) {
      const interval = setInterval(() => {
        const message = localStorage.getItem('ownerMessage')
        if (message) {
          setOwnerMessage(message)
        }
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [notified])

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Notificando al propietario:', name)
    localStorage.setItem('visitorName', name)
    localStorage.setItem('visitNotification', 'true')
    localStorage.removeItem('ownerMessage')
    setNotified(true)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8'>
      <div className='max-w-md mx-auto space-y-6'>
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='relative h-48'>
            <Image
              src='/images/house-facade.jpg'
              alt='Fachada de la casa'
              fill
              className='object-cover'
            />
          </div>

          <div className='p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <Image src='/images/logo3254.png' alt='S-Doorbell' width={50} height={50} />
              <div>
                <h1 className='text-xl font-bold text-gray-900'>Casa Familia Pérez</h1>
                <p className='text-sm text-gray-600'>S-Doorbell Digital</p>
              </div>
            </div>

            <div className='bg-gray-50 rounded-lg p-4 mb-4 space-y-2'>
              <div className='flex items-start gap-2'>
                <span className='text-gray-600 text-sm font-medium min-w-[80px]'>Dirección:</span>
                <span className='text-gray-900 text-sm'>Av. Principal 1234, Capital Federal</span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-gray-600 text-sm font-medium min-w-[80px]'>Teléfono:</span>
                <span className='text-gray-900 text-sm'>+54 9 11 1234-5678</span>
              </div>
              <div className='flex items-start gap-2'>
                <span className='text-gray-600 text-sm font-medium min-w-[80px]'>Emergencia:</span>
                <span className='text-red-600 text-sm font-medium'>+54 9 11 8765-4321</span>
              </div>
            </div>

            {!notified ? (
              <form onSubmit={handleNotify} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tu Nombre
                  </label>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary] focus:border-transparent'
                    placeholder='Ingresa tu nombre'
                    required
                  />
                </div>

                <PrimaryButton type='submit' fullWidth>
                  <BellIcon className='w-5 h-5 mr-2' />
                  Tocar Timbre
                </PrimaryButton>
              </form>
            ) : (
              <div className='space-y-4'>
                <div className='bg-green-100 border border-green-400 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <CheckCircleIcon className='w-6 h-6 text-green-600' />
                    <h3 className='font-semibold text-green-900'>Notificación enviada</h3>
                  </div>
                  <p className='text-green-800 text-sm'>
                    El propietario ha sido alertado de tu llegada. Por favor espera en la puerta.
                  </p>
                </div>

                {ownerMessage && (
                  <div className='bg-blue-100 border border-blue-400 rounded-lg p-4 animate-pulse'>
                    <h3 className='font-semibold text-blue-900 mb-1'>Mensaje del propietario:</h3>
                    <p className='text-blue-800'>{ownerMessage}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='text-center text-sm text-gray-600'>
          <p>Powered by S-Doorbell</p>
        </div>
      </div>
    </div>
  )
}
