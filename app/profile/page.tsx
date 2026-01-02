'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/app-layout'
import { UserProfileForm } from '@/components/user-profile-form'
import { PasswordChangeForm } from '@/components/password-change-form'
import { QRCodeDisplay } from '@/components/qr-code-display'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { User } from '@/lib/types'
import Image from 'next/image'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/user/profile', {
        headers: {
          Authorization: `Bearer `,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('[v0] Error fetching user:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadMessage('')

    try {
      const formData = new FormData()
      formData.append('photo', file)

      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/photo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer `,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setUploadMessage('Foto actualizada correctamente')
        fetchUserData()
      } else {
        setUploadMessage(data.error || 'Error al subir foto')
      }
    } catch (error) {
      console.error('[v0] Error uploading photo:', error)
      setUploadMessage('Error al subir foto')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <AppLayout title="Mi Perfil">
        <div className="container mx-auto p-4">
          <div className="text-center">Cargando...</div>
        </div>
      </AppLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <AppLayout title="Mi Perfil">
      <div className="container mx-auto p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
          <p className="text-sm text-muted-foreground">
            Usuario: {user.username}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <UserProfileForm user={user} onUpdate={fetchUserData} />
            <PasswordChangeForm />
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Foto de Fachada</h2>
              <div className="space-y-4">
                {user.foto_fachada && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={user.foto_fachada || "/placeholder.svg"}
                      alt="Fachada"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="photo">Cambiar Foto</Label>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                    className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
                {uploadMessage && (
                  <div className={`rounded-lg px-4 py-3 text-sm `}>
                    {uploadMessage}
                  </div>
                )}
              </div>
            </Card>

            <QRCodeDisplay qrCode={user.qr_code} familia={user.familia} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
