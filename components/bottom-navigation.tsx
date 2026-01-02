"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, ClockIcon, QrCodeIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline"
import {
  HomeIcon as HomeIconSolid,
  ClockIcon as ClockIconSolid,
  QrCodeIcon as QrCodeIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Inicio", Icon: HomeIcon, IconActive: HomeIconSolid },
  { href: "/visits", label: "Visitas", Icon: ClockIcon, IconActive: ClockIconSolid },
  { href: "/qr", label: "QR", Icon: QrCodeIcon, IconActive: QrCodeIconSolid },
  { href: "/security", label: "Seguridad", Icon: ShieldCheckIcon, IconActive: ShieldCheckIconSolid },
  { href: "/profile", label: "Perfil", Icon: UserIcon, IconActive: UserIconSolid },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="container mx-auto">
        <ul className="grid grid-cols-5 gap-1">
          {navItems.map(({ href, label, Icon, IconActive }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
                    isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive ? <IconActive className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  <span>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
