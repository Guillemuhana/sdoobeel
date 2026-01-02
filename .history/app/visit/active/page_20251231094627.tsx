"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { VisitAlertCard } from "@/components/visit-alert-card"
import { VisitActions } from "@/components/visit-actions"
import { QuickResponseButtons } from "@/components/quick-response-buttons"
import { Card } from "@/components/ui/card"

type VisitStatusType = "waiting" | "active" | "ended" | "blocked" | "location-required"

export default function ActiveVisitPage() {
  const router = useRouter()
  const [visitStatus, setVisitStatus] = useState<VisitStatusType>("waiting")
  const [visitorName, setVisitorName] = useState("")
  const [messageSent, setMessageSent] = useState(false)

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await fetch("/api/visit")
        const data = await response.json()
        if (data.visit) {
          setVisitorName(data.visit.visitorName)
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("[v0] Error fetching visitor:", error)
      }
    }

    fetchVisitorData()
  }, [router])

  const handleSendMessage = async (message: string) => {
    try {
      await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "message", message }),
      })
      setMessageSent(true)
      setTimeout(() => setMessageSent(false), 3000)
    } catch (error) {
      console.error("[v0] Error sending message:", error)
    }
  }

  const handleRequestLocation = () => {
    setVisitStatus("location-required")
  }

  const handleEndVisit = async () => {
    setVisitStatus("ended")
    try {
      await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "end" }),
      })
    } catch (error) {
      console.error("[v0] Error ending visit:", error)
    }
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const handleBlockVisitor = async () => {
    setVisitStatus("blocked")
    try {
      await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "end" }),
      })
    } catch (error) {
      console.error("[v0] Error blocking visitor:", error)
    }
    setTimeout(() => {
      router.push("/blocked")
    }, 1500)
  }

  const isVisitEnded = visitStatus === "ended" || visitStatus === "blocked"

  return (
    <AppLayout title="Visita Activa">
      <div className="container mx-auto space-y-6 p-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Visita activa</h1>
          <p className="text-sm text-muted-foreground">
            {visitorName ? `Visitante: ${visitorName}` : "Decidí qué hacer con esta visita"}
          </p>
        </div>

        <VisitAlertCard message={visitorName || "Visitante desconocido"} time="Hace 2 minutos" status={visitStatus} />

        {visitStatus === "waiting" && (
          <Card className="p-6">
            <QuickResponseButtons onSendMessage={handleSendMessage} disabled={isVisitEnded} />
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
          disabled={isVisitEnded}
        />
      </div>
    </AppLayout>
  )
}
