import { NextResponse } from "next/server"
import db from "@/lib/db"

// GET: Obtener datos del usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username requerido" }, { status: 400 })
    }

    const user = db
      .prepare(
        "SELECT id, username, familia, direccion, email, localidad, codigo_postal, foto_fachada, qr_code FROM users WHERE username = ?",
      )
      .get(username)

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("[v0] Error getting profile:", error)
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 500 })
  }
}

// PUT: Actualizar datos del usuario
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { username, familia, direccion, email, localidad, codigo_postal, foto_fachada } = body

    if (!username) {
      return NextResponse.json({ error: "Username requerido" }, { status: 400 })
    }

    const update = db.prepare(`
      UPDATE users 
      SET familia = ?, direccion = ?, email = ?, localidad = ?, codigo_postal = ?, foto_fachada = ?
      WHERE username = ?
    `)

    update.run(familia, direccion, email, localidad, codigo_postal, foto_fachada, username)

    return NextResponse.json({ success: true, message: "Perfil actualizado" })
  } catch (error) {
    console.error("[v0] Error updating profile:", error)
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 })
  }
}
