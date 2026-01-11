import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const result = await query(
      "SELECT id, username, familia, direccion, email, localidad, codigo_postal, foto_fachada, qr_code FROM users WHERE username = $1",
      [username]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: result.rows[0] })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, familia, direccion, email, localidad, codigo_postal } = body

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    await query(
      "UPDATE users SET familia = $1, direccion = $2, email = $3, localidad = $4, codigo_postal = $5 WHERE username = $6",
      [familia, direccion, email, localidad, codigo_postal, username]
    )

    const result = await query("SELECT * FROM users WHERE username = $1", [username])

    return NextResponse.json({ user: result.rows[0] })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
}
