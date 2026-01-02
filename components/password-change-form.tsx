'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function PasswordChangeForm() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.newPassword.length < 8) {
      setMessage('La contraseña debe tener al menos 8 caracteres')
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Contraseña actualizada correctamente')
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        setMessage(data.error || 'Error al cambiar contraseña')
      }
    } catch (error) {
      console.error('[v0] Error changing password:', error)
      setMessage('Error al cambiar contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="currentPassword">Contraseña Actual</Label>
          <Input
            id="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="newPassword">Nueva Contraseña</Label>
          <Input
            id="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        {message && (
          <div className={`rounded-lg px-4 py-3 text-sm `}>
            {message}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
        </Button>
      </form>
    </Card>
  )
}
