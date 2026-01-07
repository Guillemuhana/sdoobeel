"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Camera } from "lucide-react"

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

interface UserProfileFormProps {
  userData: User
  onUpdate: (data: User) => void
}

export function UserProfileForm({ userData, onUpdate }: UserProfileFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    familia: userData.familia || "",
    direccion: userData.direccion || "",
    email: userData.email || "",
    localidad: userData.localidad || "",
    codigo_postal: userData.codigo_postal || "",
  })
  const [fotoFachada, setFotoFachada] = useState(userData.foto_fachada || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFotoFachada(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          ...formData,
          foto_fachada: fotoFachada,
        }),
      })

      if (response.ok) {
        const updatedUser: User = {
          ...userData,
          ...formData,
          foto_fachada: fotoFachada,
        }
        onUpdate(updatedUser)
        
        toast({
          title: "Perfil actualizado",
          description: "Tus cambios se han guardado correctamente",
        })
      } else {
        throw new Error("Error al actualizar")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Hogar</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Foto de Fachada */}
          <div className="space-y-2">
            <Label>Foto de la Fachada</Label>
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-48 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                {fotoFachada ? (
                  <Image src={fotoFachada || "/placeholder.svg"} alt="Fachada" fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="w-full">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Nombre de Familia */}
          <div className="space-y-2">
            <Label htmlFor="familia">Nombre de Familia</Label>
            <Input
              id="familia"
              value={formData.familia}
              onChange={(e) => setFormData({ ...formData, familia: e.target.value })}
              placeholder="Familia García"
              required
            />
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              placeholder="Calle Principal 123"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="familia@email.com"
              required
            />
          </div>

          {/* Localidad */}
          <div className="space-y-2">
            <Label htmlFor="localidad">Localidad</Label>
            <Input
              id="localidad"
              value={formData.localidad}
              onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
              placeholder="Buenos Aires"
              required
            />
          </div>

          {/* Código Postal */}
          <div className="space-y-2">
            <Label htmlFor="codigo_postal">Código Postal</Label>
            <Input
              id="codigo_postal"
              value={formData.codigo_postal}
              onChange={(e) => setFormData({ ...formData, codigo_postal: e.target.value })}
              placeholder="1000"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
