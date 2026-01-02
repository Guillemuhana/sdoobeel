"use client"
import { AppLayout } from "@/components/app-layout"
import { VisitAlertCard } from "@/components/visit-alert-card"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { QrCodeIcon, ClockIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline"

export default function DashboardPage() {
  const [hasActiveVisit, setHasActiveVisit] = useState(false)
  const [visitorName, setVisitorName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const checkForVisits = () => {
      const notification = localStorage.getItem("visitNotification")
      const name = localStorage.getItem("visitorName")
      console.log("[v0] Dashboard checking - notification:", notification, "name:", name)
      setHasActiveVisit(notification === "true")
      if (name) setVisitorName(name)
    }

    checkForVisits()
    const interval = setInterval(checkForVisits, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleViewVisit = () => {
    router.push("/visit/active")
  }

  return (
    <AppLayout title="Dashboard">
      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Visitantes Activos</h2>
          {hasActiveVisit ? (
            <div onClick={handleViewVisit} className="cursor-pointer">
              <VisitAlertCard
                message={`${visitorName || "Visitante"} está en la puerta`}
                time="Hace 1 minuto"
                status="waiting"
              />
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
              <p className="text-gray-500">No hay visitantes en este momento</p>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Accesos Rápidos</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/qr")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
            >
              <QrCodeIcon className="w-8 h-8 text-gray-600 mb-3 mx-auto group-hover:text-blue-600 transition-colors" />
              <p className="font-semibold text-gray-900 text-center">Ver QR</p>
            </button>

            <button
              onClick={() => router.push("/visits")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
            >
              <ClockIcon className="w-8 h-8 text-gray-600 mb-3 mx-auto group-hover:text-blue-600 transition-colors" />
              <p className="font-semibold text-gray-900 text-center">Historial</p>
            </button>

            <button
              onClick={() => router.push("/security")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
            >
              <ShieldCheckIcon className="w-8 h-8 text-gray-600 mb-3 mx-auto group-hover:text-blue-600 transition-colors" />
              <p className="font-semibold text-gray-900 text-center">Seguridad</p>
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
            >
              <UserIcon className="w-8 h-8 text-gray-600 mb-3 mx-auto group-hover:text-blue-600 transition-colors" />
              <p className="font-semibold text-gray-900 text-center">Perfil</p>
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
