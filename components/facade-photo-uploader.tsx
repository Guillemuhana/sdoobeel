"use client"

import type React from "react"

import { useState } from "react"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { Card } from "@/components/ui/card"
import { PrimaryButton } from "./primary-button"
import Image from "next/image"

interface FacadePhotoUploaderProps {
  currentPhoto?: string
  onUpload?: (file: File) => void
  isLoading?: boolean
}

export function FacadePhotoUploader({ currentPhoto, onUpload, isLoading }: FacadePhotoUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(currentPhoto)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onUpload?.(file)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Foto de la fachada</h3>

      <div className="space-y-4">
        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={preview || "/placeholder.svg"} alt="Fachada de la vivienda" fill className="object-cover" />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Sin foto</p>
            </div>
          </div>
        )}

        <label htmlFor="facade-upload">
          <PrimaryButton
            variant="secondary"
            className="w-full"
            disabled={isLoading}
            type="button"
            onClick={() => document.getElementById("facade-upload")?.click()}
          >
            <PhotoIcon className="h-5 w-5" />
            {preview ? "Cambiar foto" : "Subir foto"}
          </PrimaryButton>
          <input
            id="facade-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
      </div>
    </Card>
  )
}
