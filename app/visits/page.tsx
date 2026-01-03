'use client'

import { AppLayout } from '@/components/app-layout'
import { VisitHistoryList } from '@/components/visit-history-list'

export default function VisitsPage() {
  // Mock data - replace with real data from database
  const visits = [
    { id: '1', date: 'Hoy', time: '14:30', status: 'ended' as const },
    { id: '2', date: 'Hoy', time: '12:15', status: 'blocked' as const },
    { id: '3', date: 'Ayer', time: '18:45', status: 'ended' as const },
    { id: '4', date: 'Ayer', time: '10:20', status: 'location-required' as const },
    { id: '5', date: '23 Dic', time: '16:00', status: 'ended' as const },
  ]

  const handleVisitClick = (id: string) => {
    console.log('[v0] Visit clicked:', id)
  }

  return (
    <AppLayout title='Historial'>
      <div className='container mx-auto space-y-6 p-4'>
        <div>
          <h1 className='text-2xl font-bold text-foreground'>Historial de visitas</h1>
          <p className='text-sm text-muted-foreground'>Todas las visitas registradas</p>
        </div>

        <VisitHistoryList visits={visits} onVisitClick={handleVisitClick} />
      </div>
    </AppLayout>
  )
}
