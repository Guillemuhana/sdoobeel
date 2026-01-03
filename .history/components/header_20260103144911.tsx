"use client"

import Image from "next/image"
import { StatusBadge } from "./status-badge"

interface HeaderProps {
  title?: string
  familyName?: string
  systemStatus?: "active" | "do-not-disturb"
}

export function Header({ title, familyName, systemStatus = "active" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="S-Doorbell" width={40} height={40} className="h-10 w-auto" />
          <div>
            {title && <p className="text-lg font-bold text-foreground">{title}</p>}
            {familyName && <p className="text-sm font-semibold text-foreground">{familyName}</p>}
          </div>
        </div>
        <StatusBadge status={systemStatus} />
      </div>
    </header>
  )
}
