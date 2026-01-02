"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PrimaryButton } from "./primary-button"

interface HomeProfile {
  familyName: string
  address: string
  neighborhood: string
  city: string
}

interface HomeProfileFormProps {
  initialData?: HomeProfile
  onSave?: (data: HomeProfile) => void
  isLoading?: boolean
}

export function HomeProfileForm({ initialData, onSave, isLoading }: HomeProfileFormProps) {
  const [formData, setFormData] = useState<HomeProfile>(
    initialData || {
      familyName: "",
      address: "",
      neighborhood: "",
      city: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.(formData)
  }

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Información del hogar</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="familyName">Nombre de la familia</Label>
          <Input
            id="familyName"
            value={formData.familyName}
            onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
            placeholder="Ej: Familia González"
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Ej: Calle Principal 123"
            required
          />
        </div>

        <div>
          <Label htmlFor="neighborhood">Barrio</Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood}
            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
            placeholder="Ej: Centro"
          />
        </div>

        <div>
          <Label htmlFor="city">Localidad / Ciudad</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Ej: Buenos Aires"
            required
          />
        </div>

        <PrimaryButton type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </PrimaryButton>
      </form>
    </Card>
  )
}
