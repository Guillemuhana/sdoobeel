import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const username = authHeader.replace("Bearer ", "")

    const user = db.prepare("SELECT id, username, familia, direccion, localidad, codigo_postal, email, foto_fachada, qr_code FROM users WHERE username = ?").get(username)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("[v0] Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
