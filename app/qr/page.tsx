'use client'
import { AppLayout } from '@/components/app-layout'
import { QRCodeCard } from '@/components/qr-code-card'

export default function QRPage() {
  const visitorUrl = typeof window !== 'undefined' 
    ? ${window.location.origin}/visitor
    : 'http://localhost:3000/visitor'

  return (
    <AppLayout title='Código QR'>
      <div className='p-4 space-y-6'>
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <h3 className='font-semibold text-blue-900 mb-2'>Cómo usar el código QR</h3>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Comparte este código con tus visitantes</li>
            <li>• Al escanearlo, accederán al timbre digital</li>
            <li>• Recibirás una notificación cuando toquen el timbre</li>
          </ul>
        </div>

        <QRCodeCard url={visitorUrl} />

        <div className='bg-white rounded-lg shadow-sm p-4'>
          <h3 className='font-semibold text-gray-900 mb-2'>URL del visitante</h3>
          <p className='text-sm text-gray-600 break-all'>{visitorUrl}</p>
        </div>
      </div>
    </AppLayout>
  )
}
