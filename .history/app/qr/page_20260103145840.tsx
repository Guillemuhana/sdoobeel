"use client"

import { AppLayout } from "@/components/app-layout"
import { QRCodeCard } from "@/components/qr-code-card"

export default function QRPage() {
  const visitorUrl =
    typeof window !== "undefined" ? `${window.location.origin}/visitor` : "http://localhost:3000/visitor"

  const handleDownloadPNG = () => {
    console.log("[v0] Downloading PNG")
  }

  const handleDownloadPDF = () => {
    console.log("[v0] Downloading PDF")
  }

  return (
    <AppLayout title="Código QR">
      <div className="container mx-auto space-y-6 p-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tu código QR</h1>
          <p className="text-sm text-muted-foreground">Colocá este QR en la entrada de tu casa</p>
          <p className="text-xs text-muted-foreground mt-2">URL: {visitorUrl}</p>
        </div>

        <QRCodeCard
          qrCodeUrl="/images/trsdfhb6.png"
          onDownloadPNG={handleDownloadPNG}
          onDownloadPDF={handleDownloadPDF}
        />
      </div>
    </AppLayout>
  )
}
