"use client"

import { BellAlertIcon } from "@heroicons/react/24/solid"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "./status-badge"

interface VisitAlertCardProps {
  message?: string
  time: string
  status: "waiting" | "active" | "ended" | "blocked" | "location-required"
  onClick?: () => void
}

export function VisitAlertCard({ message = "Alguien está en tu puerta", time, status, onClick }: VisitAlertCardProps) {
  return (
    <Card
      className="cursor-pointer border-2 border-primary bg-primary/5 transition-all hover:border-primary/80 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary p-3">
            <BellAlertIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{message}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{time}</p>
            <div className="mt-3">
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
