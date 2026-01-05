import { type NextRequest, NextResponse } from "next/server"
import QRCode from "qrcode"
import { createCanvas, loadImage } from "canvas"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://fulfilling-commitment-production.up.railway.app"
        : "http://localhost:3000"

    const qrUrl = `${baseUrl}/visitor?username=${username}`

    // Generate QR code as buffer
    const qrBuffer = await QRCode.toBuffer(qrUrl, {
      width: 500,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })

    // Load template and QR code
    const template = await loadImage(`${process.cwd()}/public/images/qr-template.png`)
    const qrImage = await loadImage(qrBuffer)

    // Create canvas with template dimensions
    const canvas = createCanvas(template.width, template.height)
    const ctx = canvas.getContext("2d")

    // Draw template
    ctx.drawImage(template, 0, 0)

    // Calculate QR position (centered in the white area)
    const qrSize = 450
    const qrX = (template.width - qrSize) / 2
    const qrY = 280

    // Draw QR code
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize)

    const buffer = canvas.toBuffer("image/png")
    const uint8Array = new Uint8Array(buffer)

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="sdoorbell-qr-${username}.png"`,
      },
    })
  } catch (error) {
    console.error("[v0] Error generating QR template:", error)
    return NextResponse.json({ error: "Failed to generate QR template" }, { status: 500 })
  }
}
