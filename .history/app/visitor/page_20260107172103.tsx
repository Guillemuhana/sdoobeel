"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline"
import PrimaryButton from "@/components/primary-button"
import { BellIcon, CheckCircleIcon } from "@heroicons/react/24/solid"

function VisitorPageContent() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || ""

  const [visitorName, setVisitorName] = useState("")
  const [notified, setNotified] = useState(false)
  const [ownerMessage, setOwnerMessage] = useState("")
  const [houseInfo, setHouseInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHouseInfo = async () => {
      if (!username) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/user/public?username=${username}`)
        if (response.ok) {
          const data = await response.json()
          setHouseInfo(data)
        }
      } catch (error) {
        console.error("[v0] Error fetching house info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHouseInfo()
  }, [username])

  const getApiUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/api/visit`
    }
    return "/api/visit"
  }

  useEffect(() => {
    if (notified) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(getApiUrl())
          const data = await response.json()
          if (data.visit?.ownerMessage) {
            setOwnerMessage(data.visit.ownerMessage)
          }
        } catch (error) {
          console.error("[v0] Error checking for messages:", error)
        }
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [notified])

  const handleRingDoorbell = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!visitorName.trim()) {
      alert("Por favor ingresa tu nombre")
      return
    }

    try {
      console.log("[v0] Sending doorbell ring for username:", username)
      const response = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ring",
          username: username,
          visitorName: visitorName,
        }),
      })

      if (response.ok) {
        console.log("[v0] Doorbell ring successful")
        setNotified(true)
      } else {
        console.error("[v0] Doorbell ring failed:", response.status)
        alert("Error al tocar el timbre")
      }
    } catch (error) {
      console.error("[v0] Error tocando timbre:", error)
      alert("Error al tocar el timbre. Intenta nuevamente.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!username || !houseInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Código QR inválido</h2>
            <p className="text-gray-600">Por favor escanea un código QR válido de S-Doorbell</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <Image src="/images/logo0237.png" alt="S-Doorbell" width={200} height={80} className="mx-auto mb-3" />
        </div>

        {!notified ? (
          <>
            <Card className="mb-6 overflow-hidden shadow-lg">
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={houseInfo.foto_fachada || "/placeholder.svg?height=400&width=600&query=casa"}
                  alt="Fachada de la casa"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-start gap-3">
                  <MapPinIcon className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">{houseInfo.direccion}</p>
                    <p className="text-sm text-gray-600">
                      {houseInfo.localidad}, CP {houseInfo.codigo_postal}
                    </p>
                  </div>
                </div>

                {houseInfo.email && (
                  <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                    <PhoneIcon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-700">Contacto</p>
                      <p className="text-sm font-semibold text-blue-900">{houseInfo.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 shadow-lg">
              <h2 className="mb-4 text-center text-lg font-semibold text-gray-900">¿Quién está tocando el timbre?</h2>

              <form onSubmit={handleRingDoorbell} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Tu nombre completo</label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                    placeholder="Ej: María González"
                    required
                  />
                </div>

                <PrimaryButton type="submit" size="lg" className="w-full gap-2">
                  <BellIcon className="h-6 w-6" />
                  Tocar Timbre
                </PrimaryButton>
              </form>

              <p className="mt-4 text-center text-xs text-gray-500">
                Al tocar el timbre, el propietario será notificado de tu presencia
              </p>
            </Card>
          </>
        ) : (
          <Card className="p-8 shadow-lg">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>

              <h2 className="mb-2 text-xl font-bold text-gray-900">¡Timbre tocado exitosamente!</h2>
              <p className="mb-6 text-gray-600">
                Hola <span className="font-semibold">{visitorName}</span>, el propietario ha sido notificado de tu
                llegada.
              </p>

              {ownerMessage ? (
                <div className="mb-6 rounded-lg bg-blue-100 p-4 border-2 border-blue-500 shadow-md animate-pulse">
                  <p className="text-sm font-medium text-blue-900 mb-1">Mensaje del propietario:</p>
                  <p className="text-lg font-semibold text-blue-900">{ownerMessage}</p>
                </div>
              ) : (
                <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-900">Por favor espera en la puerta</p>
                  <p className="mt-1 text-xs text-yellow-700">El propietario te atenderá en breve</p>
                </div>
              )}

              <button
                onClick={() => {
                  setNotified(false)
                  setOwnerMessage("")
                }}
                className="mt-6 text-sm text-primary hover:underline"
              >
                Tocar timbre nuevamente
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function VisitorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <VisitorPageContent />
    </Suspense>
  )
}
