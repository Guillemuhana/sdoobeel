'use client'
import { AppLayout } from '@/components/app-layout'
import { VisitAlertCard } from '@/components/visit-alert-card'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [hasActiveVisit, setHasActiveVisit] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkForVisits = () => {
      const notification = localStorage.getItem('visitNotification')
      setHasActiveVisit(notification === 'true')
    }

    checkForVisits()
    const interval = setInterval(checkForVisits, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleViewVisit = () => {
    router.push('/visit/active')
  }

  return (
    <AppLayout title='Dashboard'>
      <div className='p-4 space-y-6'>
        <section>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Visitantes Activos</h2>
          {hasActiveVisit ? (
            <div onClick={handleViewVisit} className='cursor-pointer'>
              <VisitAlertCard
                visitorName={localStorage.getItem('visitorName') || 'Visitante'}
                time='Hace 1 minuto'
                status='pending'
              />
            </div>
          ) : (
            <div className='bg-gray-50 rounded-lg p-6 text-center'>
              <p className='text-gray-600'>No hay visitantes en este momento</p>
            </div>
          )}
        </section>

        <section>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Accesos Rápidos</h2>
          <div className='grid grid-cols-2 gap-4'>
            <button
              onClick={() => router.push('/qr')}
              className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors'
            >
              <div className='text-2xl mb-2'>📱</div>
              <p className='font-medium text-gray-900'>Ver QR</p>
            </button>
            <button
              onClick={() => router.push('/visits')}
              className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors'
            >
              <div className='text-2xl mb-2'>📋</div>
              <p className='font-medium text-gray-900'>Historial</p>
            </button>
            <button
              onClick={() => router.push('/security')}
              className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors'
            >
              <div className='text-2xl mb-2'>🔒</div>
              <p className='font-medium text-gray-900'>Seguridad</p>
            </button>
            <button
              onClick={() => router.push('/profile')}
              className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors'
            >
              <div className='text-2xl mb-2'>👤</div>
              <p className='font-medium text-gray-900'>Perfil</p>
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
