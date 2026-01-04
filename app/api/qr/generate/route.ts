import { NextRequest, NextResponse } from "next/server"
import QRCode from "qrcode"
import sharp from "sharp"
import path from "path"
import fs from "fs"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username required" }, { status: 400 })
    }

    const baseUrl = process.env.NODE_ENV === "production"
      ? "https://fulfilling-commitment-production.up.railway.app"
      : "http://localhost:3000"
    
    const qrUrl = baseUrl + "/visitor?username=" + username

    // Generar el código QR como buffer
    const qrBuffer = await QRCode.toBuffer(qrUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF"
      }
    })

    // Cargar la plantilla
    const templatePath = path.join(process.cwd(), "public", "images", "qr-template.png")
    
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    const template = sharp(templatePath)
    const metadata = await template.metadata()

    // Calcular posición centrada del QR (ajusta estos valores según tu plantilla)
    const qrSize = 400
    const qrX = Math.floor((metadata.width! - qrSize) / 2)
    const qrY = 180 // Ajusta esta posición vertical según dónde está el espacio blanco

    // Combinar la plantilla con el QR
    const finalImage = await template
      .composite([{
        input: qrBuffer,
        top: qrY,
        left: qrX
      }])
      .png()
      .toBuffer()

    return new NextResponse(finalImage, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "attachment; filename=sdoorbell-qr-" + username + ".png"
      }
    })
  } catch (error) {
    console.error("[v0] Error generating QR template:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
