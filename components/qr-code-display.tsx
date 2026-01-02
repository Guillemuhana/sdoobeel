'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface QRCodeDisplayProps {
  qrCode: string
  familia: string
}

export function QRCodeDisplay({ qrCode, familia }: QRCodeDisplayProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = qrCode
    link.download = `-qr.png`
    link.click()
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Tu Código QR</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <Image src={qrCode || "/placeholder.svg"} alt="Código QR" width={200} height={200} />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Los visitantes pueden escanear este código para acceder a tu timbre digital
        </p>
        <Button onClick={handleDownload} variant="outline" className="w-full">
          Descargar QR
        </Button>
      </div>
    </Card>
  )
}
