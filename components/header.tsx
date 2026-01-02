"use client"

import Image from "next/image"
import { StatusBadge } from "./status-badge"

interface HeaderProps {
  familyName?: string
  systemStatus?: "active" | "do-not-disturb"
}

export function Header({ familyName, systemStatus = "active" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="S-Doorbell" width={40} height={40} className="h-10 w-auto" />
          {familyName && (
            <div>
              <p className="text-sm font-semibold text-foreground">{familyName}</p>
            </div>
          )}
        </div>
        <StatusBadge status={systemStatus} />
      </div>
    </header>
  )
}
