"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card } from "@/components/ui/card"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function QRPage() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserAndGenerateQR = async () => {
      try {
        const storedUsername = localStorage.getItem("username")
        if (storedUsername) {
          setUsername(storedUsername)

          // Generate QR code URL with username parameter
          const visitorUrl = `${window.location.origin}/visitor?username=${storedUsername}`
          const qrDataUrl = await QRCode.toDataURL(visitorUrl, {
            width: 400,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          })
          setQrCodeDataUrl(qrDataUrl)
        }
      } catch (error) {
        console.error("[v0] Error generating QR:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndGenerateQR()
  }, [])

  const handleDownloadPNG = async () => {
    try {
      const downloadUrl = `/api/qr/generate?username=${username}`
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `sdoorbell-qr-${username}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("[v0] Error downloading QR template:", error)
    }
  }

  const handleDownloadPDF = () => {
    console.log("[v0] Downloading PDF")
    // TODO: Implement PDF download with QR code
  }

  if (loading) {
    return (
      <AppLayout title="Código QR">
        <div className="container mx-auto p-4 flex items-center justify-center min-h-[400px]">
          <p>Cargando código QR...</p>
        </div>
      </AppLayout>
    )
  }

  const visitorUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/visitor?username=${username}`

  return (
    <AppLayout title="Código QR">
      <div className="container mx-auto space-y-6 p-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tu código QR</h1>
          <p className="text-sm text-muted-foreground">Colocá este QR en la entrada de tu casa</p>
          <p className="text-xs text-muted-foreground mt-2">URL: {visitorUrl}</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col items-center gap-6">
            {qrCodeDataUrl && (
              <div className="relative w-full max-w-md mx-auto">
                <img src="/images/qr-template.jpg" alt="Placa QR" className="w-full h-auto" />
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] aspect-square">
                  <img
                    src={qrCodeDataUrl || "/placeholder.svg"}
                    alt="Código QR"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 w-full max-w-md">
              <Button onClick={handleDownloadPNG} className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                Descargar QR
              </Button>
              <Button onClick={handleDownloadPDF} variant="outline" className="flex-1 gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Descargar PDF
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md">
              <p className="text-sm text-blue-900 font-medium mb-2">¿Cómo funciona?</p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Descarga e imprime tu código QR</li>
                <li>Colócalo en la entrada de tu casa</li>
                <li>Los visitantes lo escanean para tocar el timbre</li>
                <li>Recibirás una notificación instantánea</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
