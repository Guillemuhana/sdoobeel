"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { VisitAlertCard } from "@/components/visit-alert-card"
import { VisitActions } from "@/components/visit-actions"
import { QuickResponseButtons } from "@/components/quick-response-buttons"
import { Card } from "@/components/ui/card"

export default function ActiveVisitPage() {
  const router = useRouter()
  const [visitStatus, setVisitStatus] = useState<"waiting" | "location-required" | "ended" | "blocked">("waiting")
  const [visitorName, setVisitorName] = useState("")
  const [messageSent, setMessageSent] = useState(false)

  useEffect(() => {
    const storedVisitor = localStorage.getItem("currentVisitor")
    if (storedVisitor) {
      setVisitorName(storedVisitor)
    }
  }, [])

  const handleSendMessage = (message: string) => {
    localStorage.setItem("ownerMessage", message)
    setMessageSent(true)
    console.log("[v0] Mensaje enviado al visitante:", message)
    setTimeout(() => setMessageSent(false), 3000)
  }

  const handleRequestLocation = () => {
    setVisitStatus("location-required")
  }

  const handleEndVisit = () => {
    setVisitStatus("ended")
    localStorage.removeItem("ownerMessage")
    localStorage.removeItem("currentVisitor")
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const handleBlockVisitor = () => {
    setVisitStatus("blocked")
    localStorage.removeItem("ownerMessage")
    localStorage.removeItem("currentVisitor")
    setTimeout(() => {
      router.push("/blocked")
    }, 1500)
  }

  return (
    <AppLayout>
      <div className="container mx-auto space-y-6 p-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Visita activa</h1>
          <p className="text-sm text-muted-foreground">
            {visitorName ? `Visitante: ${visitorName}` : "Decidí qué hacer con esta visita"}
          </p>
        </div>

        <VisitAlertCard time="Hace 2 minutos" status={visitStatus} />

        {visitStatus === "waiting" && (
          <Card className="p-6">
            <QuickResponseButtons
              onSendMessage={handleSendMessage}
              disabled={visitStatus === "ended" || visitStatus === "blocked"}
            />
            {messageSent && (
              <div className="mt-4 rounded-lg bg-green-100 border border-green-400 text-green-700 px-4 py-3 text-sm">
                ✓ Mensaje enviado al visitante
              </div>
            )}
          </Card>
        )}

        <VisitActions
          onRequestLocation={handleRequestLocation}
          onEndVisit={handleEndVisit}
          onBlockVisitor={handleBlockVisitor}
          disabled={visitStatus === "ended" || visitStatus === "blocked"}
        />
      </div>
    </AppLayout>
  )
}
