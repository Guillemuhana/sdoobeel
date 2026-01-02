'use client'

import type { ReactNode } from 'react'
import { Header } from './header'
import { BottomNavigation } from './bottom-navigation'

interface AppLayoutProps {
  children: ReactNode
  title?: string
  showBottomNav?: boolean
}

export function AppLayout({ children, title, showBottomNav = true }: AppLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <Header title={title} />
      <main className='flex-1 pb-20'>{children}</main>
      {showBottomNav && <BottomNavigation />}
    </div>
  )
}
