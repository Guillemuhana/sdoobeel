"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { VisitorForm } from "@/components/visitor-form"

function VisitorPageContent() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username")
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (username) {
      fetch("/api/user/public?username=" + username)
        .then(res => res.json())
        .then(data => {
          setUserData(data)
          setLoading(false)
        })
        .catch(err => {
          console.error("Error loading user data:", err)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [username])

  const handleSubmit = async (data: any) => {
    console.log("[v0] Visitor form submitted:", data)
    
    try {
      const response = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          visitor_name: data.name,
          visitor_phone: data.phone,
          visitor_reason: data.reason
        })
      })

      if (response.ok) {
        alert("Timbre enviado! El propietario fue notificado.")
      } else {
        alert("Error al enviar el timbre. Intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error sending visit:", error)
      alert("Error al enviar el timbre.")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Código QR inválido. Falta el usuario.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <VisitorForm 
        onSubmit={handleSubmit}
        houseAddress={userData?.direccion || "Cargando..."}
        houseImage={userData?.foto_fachada || "/placeholder.svg?height=400&width=600"}
        familyName={userData?.familia || ""}
      />
    </div>
  )
}

export default function VisitorPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <VisitorPageContent />
    </Suspense>
  )
}
