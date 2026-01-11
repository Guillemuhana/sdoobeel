import { query, initDatabase } from "../lib/db"
import bcrypt from "bcryptjs"
import QRCode from "qrcode"

async function initializeRailway() {
  console.log("[Railway Init] Starting database initialization...")

  try {
    await initDatabase()
    console.log("[Railway Init] Tables created successfully")

    const result = await query("SELECT COUNT(*) as count FROM users")
    const userCount = result.rows[0].count

    if (Number.parseInt(userCount) === 0) {
      console.log("[Railway Init] No users found, creating seed data...")

      const familias = [
        { apellido: "Garcia", direccion: "Calle Principal 123", localidad: "Buenos Aires", cp: "1000" },
        { apellido: "Rodriguez", direccion: "Av. Libertador 456", localidad: "Córdoba", cp: "5000" },
        { apellido: "Martinez", direccion: "San Martin 789", localidad: "Rosario", cp: "2000" },
      ]

      const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

      for (const familia of familias) {
        const username = `familia.${familia.apellido.toLowerCase()}`
        const password = bcrypt.hashSync(`${familia.apellido}2025!`, 10)
        const email = `${familia.apellido.toLowerCase()}@email.com`

        const qrUrl = `${baseUrl}/visitor?username=${username}`
        const qrCode = await QRCode.toDataURL(qrUrl)

        await query(
          `INSERT INTO users (username, password, familia, direccion, email, localidad, codigo_postal, qr_code)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (username) DO NOTHING`,
          [
            username,
            password,
            `Familia ${familia.apellido}`,
            familia.direccion,
            email,
            familia.localidad,
            familia.cp,
            qrCode,
          ],
        )
        console.log(`[Railway Init] Created user: ${username}`)
      }

      console.log("[Railway Init] Seed data created successfully!")
    } else {
      console.log(`[Railway Init] Database already has ${userCount} users, skipping seed`)
    }

    console.log("[Railway Init] Database initialization complete!")
    process.exit(0)
  } catch (error) {
    console.error("[Railway Init] Error:", error)
    process.exit(1)
  }
}

initializeRailway()
