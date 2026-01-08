import { Header } from "./header"
import { BottomNavigation } from "./bottom-navigation"
import { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
  title?: string
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomNavigation />
    </div>
  )
}
