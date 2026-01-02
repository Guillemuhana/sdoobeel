"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { BellAlertIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline"
import { PrimaryButton } from "@/components/primary-button"

export default function VisitorPage() {
  const [visitorName, setVisitorName] = useState("")
  const [notified, setNotified] = useState(false)
  const [ownerMessage, setOwnerMessage] = useState("")

  const houseInfo = {
    address: "Av. Corrientes 1234",
    city: "Buenos Aires, Argentina",
    owner: "Juan Pérez",
    emergencyPhone: "+54 9 11 1234-5678",
    facadeImage: "/images/house-facade.jpg",
  }

  useEffect(() => {
    if (notified) {
      const interval = setInterval(() => {
        // Simulate checking for messages (in real app, call API)
        const storedMessage = localStorage.getItem("ownerMessage")
        if (storedMessage) {
          setOwnerMessage(storedMessage)
        }
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [notified])

  const handleRingDoorbell = (e: React.FormEvent) => {
    e.preventDefault()
    if (!visitorName.trim()) {
      alert("Por favor ingresa tu nombre")
      return
    }
    console.log("[v0] Timbre tocado por:", visitorName)
    localStorage.setItem("currentVisitor", visitorName)
    setNotified(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <Image src="/images/logo017.png" alt="S-Doorbell" width={80} height={80} className="mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">S-Doorbell</h1>
          <p className="text-sm text-gray-600">Timbre Digital</p>
        </div>

        {!notified ? (
          <>
            <Card className="mb-6 overflow-hidden">
              {/* Imagen de la fachada */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={houseInfo.facadeImage || "/placeholder.svg"}
                  alt="Fachada de la casa"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Información de la casa */}
              <div className="p-6">
                <div className="mb-4 flex items-start gap-3">
                  <MapPinIcon className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">{houseInfo.address}</p>
                    <p className="text-sm text-gray-600">{houseInfo.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                  <PhoneIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-700">Contacto de emergencia</p>
                    <p className="text-sm font-semibold text-blue-900">{houseInfo.emergencyPhone}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
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
                  <BellAlertIcon className="h-6 w-6" />
                  Tocar Timbre
                </PrimaryButton>
              </form>

              <p className="mt-4 text-center text-xs text-gray-500">
                Al tocar el timbre, el propietario será notificado de tu presencia
              </p>
            </Card>
          </>
        ) : (
          <Card className="p-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <BellAlertIcon className="h-8 w-8 text-green-600" />
              </div>

              <h2 className="mb-2 text-xl font-bold text-gray-900">¡Timbre tocado exitosamente!</h2>
              <p className="mb-6 text-gray-600">
                Hola <span className="font-semibold">{visitorName}</span>, el propietario ha sido notificado de tu
                llegada.
              </p>

              {ownerMessage ? (
                <div className="mb-6 rounded-lg bg-blue-100 p-4 border-2 border-blue-500">
                  <p className="text-sm font-medium text-blue-900 mb-1">Mensaje del propietario:</p>
                  <p className="text-lg font-semibold text-blue-900">{ownerMessage}</p>
                </div>
              ) : (
                <div className="rounded-lg bg-yellow-50 p-4">
                  <p className="text-sm font-medium text-yellow-900">Por favor espera en la puerta</p>
                  <p className="mt-1 text-xs text-yellow-700">El propietario te atenderá en breve</p>
                </div>
              )}

              <button
                onClick={() => {
                  setNotified(false)
                  setOwnerMessage("")
                  localStorage.removeItem("ownerMessage")
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
