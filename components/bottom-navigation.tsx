"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Bell, QrCode, Shield, User } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Inicio" },
    { href: "/visits", icon: Bell, label: "Visitas" },
    { href: "/qr", icon: QrCode, label: "QR" },
    { href: "/security", icon: Shield, label: "Seguridad" },
    { href: "/profile", icon: User, label: "Perfil" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-4xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-cyan-600" : "text-gray-500 hover:text-cyan-500"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-xs mt-1 ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
