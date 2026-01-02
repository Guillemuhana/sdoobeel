"use client"

import { Card } from "@/components/ui/card"
import { PrimaryButton } from "./primary-button"

interface BlockedVisitor {
  id: string
  ip: string
  blockedDate: string
  reason: string
}

interface BlockedVisitorsListProps {
  visitors: BlockedVisitor[]
  onUnblock?: (id: string) => void
}

export function BlockedVisitorsList({ visitors, onUnblock }: BlockedVisitorsListProps) {
  if (visitors.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No hay visitantes bloqueados</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {visitors.map((visitor) => (
        <Card key={visitor.id} className="p-4">
          <div className="space-y-3">
            <div>
              <p className="font-mono text-sm text-muted-foreground">IP: {visitor.ip}</p>
              <p className="text-sm text-muted-foreground">Bloqueado: {visitor.blockedDate}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{visitor.reason}</p>
            </div>
            <PrimaryButton
              variant="secondary"
              size="default"
              className="w-full"
              onClick={() => onUnblock?.(visitor.id)}
            >
              Desbloquear
            </PrimaryButton>
          </div>
        </Card>
      ))}
    </div>
  )
}
