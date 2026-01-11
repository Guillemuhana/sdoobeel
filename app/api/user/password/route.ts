import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, currentPassword, newPassword } = body

    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Username, current password and new password are required" },
        { status: 400 }
      )
    }

    const result = await query("SELECT * FROM users WHERE username = $1", [username])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = result.rows[0]
    const isValidPassword = await bcrypt.compare(currentPassword, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await query("UPDATE users SET password = $1 WHERE username = $2", [hashedPassword, username])

    return NextResponse.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("Error updating password:", error)
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
  }
}
