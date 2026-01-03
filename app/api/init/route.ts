import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import bcrypt from "bcryptjs"
import QRCode from "qrcode"

export async function POST(request: NextRequest) {
  try {
    db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, familia TEXT NOT NULL, direccion TEXT NOT NULL, email TEXT NOT NULL, localidad TEXT NOT NULL, codigo_postal TEXT NOT NULL, foto_fachada TEXT, qr_code TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)")

    db.exec("CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, visitor_name TEXT NOT NULL, visitor_phone TEXT NOT NULL, visitor_reason TEXT NOT NULL, visit_time DATETIME DEFAULT CURRENT_TIMESTAMP, status TEXT DEFAULT 'pending', FOREIGN KEY (user_id) REFERENCES users (id))")

    const users = [
      { username: "familia.garcia", password: "Garcia2025!", familia: "García", direccion: "Av. Libertador 1234", email: "garcia@email.com", localidad: "Buenos Aires", codigo_postal: "1425" },
      { username: "familia.rodriguez", password: "Rodriguez2025!", familia: "Rodríguez", direccion: "Calle San Martín 567", email: "rodriguez@email.com", localidad: "Córdoba", codigo_postal: "5000" },
      { username: "familia.martinez", password: "Martinez2025!", familia: "Martínez", direccion: "Av. Belgrano 890", email: "martinez@email.com", localidad: "Rosario", codigo_postal: "2000" }
    ]

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      const qrCode = await QRCode.toDataURL("https://fulfilling-commitment-production.up.railway.app/visitor?username=" + user.username)
      
      db.prepare("INSERT OR IGNORE INTO users (username, password, familia, direccion, email, localidad, codigo_postal, qr_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(user.username, hashedPassword, user.familia, user.direccion, user.email, user.localidad, user.codigo_postal, qrCode)
    }

    return NextResponse.json({ success: true, message: "Database initialized with users" })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}
