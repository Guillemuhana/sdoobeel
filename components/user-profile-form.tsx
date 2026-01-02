'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { User } from '@/lib/types'

interface UserProfileFormProps {
  user: User
  onUpdate: () => void
}

export function UserProfileForm({ user, onUpdate }: UserProfileFormProps) {
  const [formData, setFormData] = useState({
    familia: user.familia,
    direccion: user.direccion,
    email: user.email,
    localidad: user.localidad,
    codigo_postal: user.codigo_postal,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Perfil actualizado correctamente')
        onUpdate()
      } else {
        setMessage(data.error || 'Error al actualizar perfil')
      }
    } catch (error) {
      console.error('[v0] Error updating profile:', error)
      setMessage('Error al actualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Información Personal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="familia">Nombre de Familia</Label>
          <Input
            id="familia"
            value={formData.familia}
            onChange={(e) => setFormData({ ...formData, familia: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="localidad">Localidad</Label>
            <Input
              id="localidad"
              value={formData.localidad}
              onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="codigo_postal">Código Postal</Label>
            <Input
              id="codigo_postal"
              value={formData.codigo_postal}
              onChange={(e) => setFormData({ ...formData, codigo_postal: e.target.value })}
              required
            />
          </div>
        </div>

        {message && (
          <div className={`rounded-lg px-4 py-3 text-sm `}>
            {message}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </form>
    </Card>
  )
}
