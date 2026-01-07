"use client"

import { AppLayout } from "@/components/app-layout"
import { UserProfileForm } from "@/components/user-profile-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QRCodeDisplay } from "@/components/qr-code-display"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  username: string
  familia: string
  direccion: string
  email: string
  localidad: string
  codigo_postal: string
  foto_fachada?: string
  qr_code: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user")
    if (!userDataFromStorage) {
      router.push("/login")
      return
    }
    setUserData(JSON.parse(userDataFromStorage))
  }, [router])

  if (!userData) {
    return null
  }

  const handleUpdate = (updatedData: User) => {
    setUserData(updatedData)
    localStorage.setItem("user", JSON.stringify(updatedData))
  }

  return (
    <AppLayout title="Mi Perfil">
      <div className="container mx-auto space-y-6 p-4 pb-24">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
          <p className="text-sm text-muted-foreground">Configura la información de tu hogar</p>
        </div>

        <UserProfileForm userData={userData} onUpdate={handleUpdate} />

        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl">Tu Código QR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comparte este código QR con tus visitantes para que puedan acceder a tu timbre digital
            </p>
            <QRCodeDisplay qrCode={userData.qr_code} familia={userData.familia} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
