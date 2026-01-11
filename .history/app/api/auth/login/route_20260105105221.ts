import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body
    
    console.log("[v0] === LOGIN ATTEMPT ===")
    console.log("[v0] Username:", username)

    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as any

    if (!user) {
      console.log("[v0] ERROR: User not found")
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    console.log("[v0] User found, checking password...")
    const passwordMatch = await bcrypt.compare(password, user.password)
    console.log("[v0] Password match:", passwordMatch)

    if (!passwordMatch) {
      console.log("[v0] ERROR: Password does not match")
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    console.log("[v0] LOGIN SUCCESS")
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        familia: user.familia
      }
    })
  } catch (error) {
    console.error("[v0] LOGIN ERROR:", error)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
