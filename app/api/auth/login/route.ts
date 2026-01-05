import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Login attempt started")
    const body = await request.json()
    const { username, password } = body
    
    console.log("[v0] Username received:", username)

    if (!username || !password) {
      console.log("[v0] Missing credentials")
      return NextResponse.json({ error: "Usuario y contraseña requeridos" }, { status: 400 })
    }

    console.log("[v0] Querying database for user:", username)
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as any

    if (!user) {
      console.log("[v0] User not found:", username)
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    console.log("[v0] User found, comparing passwords")
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      console.log("[v0] Password does not match")
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    console.log("[v0] Login successful for:", username)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        familia: user.familia,
        direccion: user.direccion,
        localidad: user.localidad,
        codigo_postal: user.codigo_postal,
        email: user.email
      }
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Error del servidor: " + String(error) }, { status: 500 })
  }
}
