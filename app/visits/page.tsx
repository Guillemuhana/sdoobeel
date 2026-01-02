'use client'
import { AppLayout } from '@/components/app-layout'
import { VisitHistoryList } from '@/components/visit-history-list'

export default function VisitsPage() {
  return (
    <AppLayout title='Historial de Visitas'>
      <div className='p-4 space-y-6'>
        <div className='bg-white rounded-lg shadow-sm p-4'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Visitas Recientes</h2>
          <VisitHistoryList />
        </div>
      </div>
    </AppLayout>
  )
}
