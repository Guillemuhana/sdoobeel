import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, foto_fachada } = body

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    if (!foto_fachada) {
      return NextResponse.json({ error: "Photo is required" }, { status: 400 })
    }

    await query("UPDATE users SET foto_fachada = $1 WHERE username = $2", [foto_fachada, username])

    return NextResponse.json({ 
      message: "Photo updated successfully",
      foto_fachada 
    })
  } catch (error) {
    console.error("Error updating photo:", error)
    return NextResponse.json({ error: "Failed to update photo" }, { status: 500 })
  }
}
