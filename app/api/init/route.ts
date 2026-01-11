import { NextResponse } from "next/server"
import { query, initDatabase } from "@/lib/db"
import bcrypt from "bcryptjs"
import QRCode from "qrcode"

export async function POST() {
  try {
    await initDatabase()

    const users = [
      {
        username: "familia.garcia",
        password: "Garcia2025!",
        familia: "García",
        direccion: "Av. Libertador 1234",
        email: "garcia@email.com",
        localidad: "Buenos Aires",
        codigo_postal: "1425",
      },
      {
        username: "familia.rodriguez",
        password: "Rodriguez2025!",
        familia: "Rodríguez",
        direccion: "Calle San Martín 567",
        email: "rodriguez@email.com",
        localidad: "Córdoba",
        codigo_postal: "5000",
      },
      {
        username: "familia.martinez",
        password: "Martinez2025!",
        familia: "Martínez",
        direccion: "Av. Belgrano 890",
        email: "martinez@email.com",
        localidad: "Rosario",
        codigo_postal: "2000",
      },
    ]

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://fulfilling-commitment-production.up.railway.app"

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      const qrCode = await QRCode.toDataURL(`${baseUrl}/visitor?username=${user.username}`)

      await query(
        `INSERT INTO users (username, password, familia, direccion, email, localidad, codigo_postal, qr_code) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (username) DO NOTHING`,
        [
          user.username,
          hashedPassword,
          user.familia,
          user.direccion,
          user.email,
          user.localidad,
          user.codigo_postal,
          qrCode,
        ],
      )
    }

    return NextResponse.json({ success: true, message: "Database initialized" })
  } catch (error) {
    console.error("[v0] Error initializing database:", error)
    return NextResponse.json({ error: "Error initializing database: " + String(error) }, { status: 500 })
  }
}
