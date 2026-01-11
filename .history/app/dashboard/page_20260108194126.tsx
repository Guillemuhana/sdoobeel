"use client"
import { AppLayout } from "@/components/app-layout"
import { VisitAlertCard } from "@/components/visit-alert-card"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { QrCodeIcon, ClockIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export default function DashboardPage() {
  const [hasActiveVisit, setHasActiveVisit] = useState(false)
  const [visitorName, setVisitorName] = useState("")
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const previousVisitRef = useRef(false)

  useEffect(() => {
    audioRef.current = new Audio("/sounds/doorbell.mp3")
    audioRef.current.volume = 0.7
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataFromStorage = localStorage.getItem("user")
        if (userDataFromStorage) {
          setUserData(JSON.parse(userDataFromStorage))
        }
      } catch (error) {
        console.error("[v0] Error loading user:", error)
      }
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const checkForVisits = async () => {
      if (!userData) return

      try {
        const apiUrl = `${window.location.origin}/api/visit?username=${userData.username}`
        console.log("[v0] Checking for visits at:", apiUrl)
        const response = await fetch(apiUrl)
        const data = await response.json()

        console.log("[v0] Visit data received:", data)

        if (data.visit) {
          if (!previousVisitRef.current && audioRef.current) {
            console.log("[v0] New visitor detected! Playing doorbell sound")
            audioRef.current.play().catch((e) => console.log("[v0] Audio play failed:", e))
          }

          setHasActiveVisit(true)
          setVisitorName(data.visit.visitor_name)
          previousVisitRef.current = true
        } else {
          setHasActiveVisit(false)
          setVisitorName("")
          previousVisitRef.current = false
        }
      } catch (error) {
        console.error("[v0] Error checking visits:", error)
      }
    }

    checkForVisits()
    const interval = setInterval(checkForVisits, 2000)
    return () => clearInterval(interval)
  }, [userData])

  const handleViewVisit = () => {
    router.push("/visit/active")
  }

  return (
    <AppLayout title="Dashboard">
      <div className="p-4 space-y-4">
        {userData && (
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
            <div className="relative h-32 w-full">
              {userData.foto_fachada ? (
                <Image src={userData.foto_fachada || "/placeholder.svg"} alt="Fachada" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-cyan-600">
                  <QrCodeIcon className="h-16 w-16 text-white/40" />
                </div>
              )}
              <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-green-500/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></div>
                <span>Activo</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h2 className="text-lg font-bold text-white drop-shadow-md">{userData.familia || "Mi Hogar"}</h2>
                <p className="text-xs text-white/90 drop-shadow">{userData.direccion || "Configura tu dirección"}</p>
              </div>
            </div>
          </div>
        )}

        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">Visitantes Activos</h2>
          {hasActiveVisit ? (
            <div onClick={handleViewVisit} className="cursor-pointer">
              <VisitAlertCard
                message={`${visitorName || "Visitante"} está en la puerta`}
                time="Hace 1 minuto"
                status="waiting"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">No hay visitantes en este momento</p>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">Accesos Rápidos</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push("/qr")}
              className="group rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-100"
            >
              <QrCodeIcon className="mx-auto mb-2 h-7 w-7 text-gray-600 transition-colors group-hover:text-cyan-600" />
              <p className="text-center text-sm font-semibold text-gray-900">Ver QR</p>
            </button>

            <button
              onClick={() => router.push("/visits")}
              className="group rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-100"
            >
              <ClockIcon className="mx-auto mb-2 h-7 w-7 text-gray-600 transition-colors group-hover:text-cyan-600" />
              <p className="text-center text-sm font-semibold text-gray-900">Historial</p>
            </button>

            <button
              onClick={() => router.push("/security")}
              className="group rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-100"
            >
              <ShieldCheckIcon className="mx-auto mb-2 h-7 w-7 text-gray-600 transition-colors group-hover:text-cyan-600" />
              <p className="text-center text-sm font-semibold text-gray-900">Seguridad</p>
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="group rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-100"
            >
              <UserIcon className="mx-auto mb-2 h-7 w-7 text-gray-600 transition-colors group-hover:text-cyan-600" />
              <p className="text-center text-sm font-semibold text-gray-900">Perfil</p>
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
