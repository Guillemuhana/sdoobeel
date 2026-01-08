import { type NextRequest, NextResponse } from "next/server"
import QRCode from "qrcode"

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

    const qrBuffer = await QRCode.toBuffer(qrUrl, {
      width: 500,
      margin: 2,
      color: {
        dark: "#0891b2",
        light: "#FFFFFF",
      },
    })

    return new NextResponse(qrBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="sdoorbell-qr-${username}.png"`,
      },
    })
  } catch (error) {
    console.error("[v0] Error generating QR:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
