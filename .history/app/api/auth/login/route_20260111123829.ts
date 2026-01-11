import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    console.log("[v0] Login attempt for username:", username)

    const result = await query("SELECT * FROM users WHERE username = $1", [username])
    const user = result.rows[0]

    if (!user) {
      console.log("[v0] User not found:", username)
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
    }

    console.log("[v0] User found, checking password")
    

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      console.log("[v0] Password mismatch for:", username)
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
    }

    console.log("[v0] Login successful for:", user.username)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        familia: user.familia,
        direccion: user.direccion,
        localidad: user.localidad,
        codigo_postal: user.codigo_postal,
        email: user.email,
        qr_code: user.qr_code,
        foto_fachada: user.foto_fachada,
      },
      token: user.username,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Error al iniciar sesión: " + String(error) }, { status: 500 })
  }
}
