"use client"

import { Card } from "@/components/ui/card"
import { StatusBadge } from "./status-badge"

interface Visit {
  id: string
  date: string
  time: string
  status: "ended" | "blocked" | "location-required" | "waiting"
}

interface VisitHistoryListProps {
  visits: Visit[]
  onVisitClick?: (id: string) => void
}

export function VisitHistoryList({ visits, onVisitClick }: VisitHistoryListProps) {
  if (visits.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No hay visitas registradas</p>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {visits.map((visit) => (
        <Card
          key={visit.id}
          className="cursor-pointer p-4 transition-all hover:shadow-md"
          onClick={() => onVisitClick?.(visit.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{visit.date}</p>
              <p className="text-sm text-muted-foreground">{visit.time}</p>
            </div>
            <StatusBadge status={visit.status} />
          </div>
        </Card>
      ))}
    </div>
  )
}
