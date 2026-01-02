"use client"

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"
import { Card } from "@/components/ui/card"
import { PrimaryButton } from "./primary-button"
import Image from "next/image"

interface QRCodeCardProps {
  qrCodeUrl: string
  onDownloadPNG?: () => void
  onDownloadPDF?: () => void
}

export function QRCodeCard({ qrCodeUrl, onDownloadPNG, onDownloadPDF }: QRCodeCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8">
        <div className="mx-auto max-w-sm">
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <Image
              src={qrCodeUrl || "/placeholder.svg"}
              alt="Código QR del timbre"
              width={300}
              height={300}
              className="mx-auto h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="mb-4 text-center text-sm text-muted-foreground">
          <strong className="text-foreground">Escaneá para tocar timbre</strong>
          <br />
          QR único y permanente
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <PrimaryButton variant="secondary" onClick={onDownloadPNG}>
            <ArrowDownTrayIcon className="h-5 w-5" />
            Descargar PNG
          </PrimaryButton>
          <PrimaryButton variant="secondary" onClick={onDownloadPDF}>
            <ArrowDownTrayIcon className="h-5 w-5" />
            Descargar PDF
          </PrimaryButton>
        </div>
      </div>
    </Card>
  )
}
