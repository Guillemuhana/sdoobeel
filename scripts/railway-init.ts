import Database from "better-sqlite3"
import bcrypt from "bcryptjs"
import QRCode from "qrcode"
import path from "path"

const dbPath = path.join(process.cwd(), "sdoorbell.db")
const db = new Database(dbPath)

console.log("[Railway Init] Creating database tables...")

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  familia TEXT NOT NULL,
  direccion TEXT NOT NULL,
  email TEXT NOT NULL,
  localidad TEXT NOT NULL,
  codigo_postal TEXT NOT NULL,
  foto_fachada TEXT,
  qr_code TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

db.exec(`CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  visitor_name TEXT NOT NULL,
  visitor_phone TEXT NOT NULL,
  visitor_reason TEXT NOT NULL,
  visit_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT "pending",
  FOREIGN KEY (user_id) REFERENCES users (id)
)`)

console.log("[Railway Init] Tables created successfully")

const existingUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as any

if (existingUsers.count === 0) {
  console.log("[Railway Init] Seeding database with users...")
  
  const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN 
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
    : "http://localhost:3000"
  
  const familias = [
    { username: "familia.garcia", password: "Garcia2025!", familia: "García", direccion: "Calle Principal 123", email: "garcia@email.com", localidad: "Buenos Aires", codigo_postal: "1000" },
    { username: "familia.rodriguez", password: "Rodriguez2025!", familia: "Rodríguez", direccion: "Av. Libertador 456", email: "rodriguez@email.com", localidad: "Córdoba", codigo_postal: "5000" },
    { username: "familia.martinez", password: "Martinez2025!", familia: "Martínez", direccion: "Calle San Martín 789", email: "martinez@email.com", localidad: "Rosario", codigo_postal: "2000" },
    { username: "familia.lopez", password: "Lopez2025!", familia: "López", direccion: "Av. Belgrano 321", email: "lopez@email.com", localidad: "Mendoza", codigo_postal: "5500" },
    { username: "familia.gonzalez", password: "Gonzalez2025!", familia: "González", direccion: "Calle Mitre 654", email: "gonzalez@email.com", localidad: "La Plata", codigo_postal: "1900" },
    { username: "familia.fernandez", password: "Fernandez2025!", familia: "Fernández", direccion: "Av. 9 de Julio 987", email: "fernandez@email.com", localidad: "Tucumán", codigo_postal: "4000" },
    { username: "familia.perez", password: "Perez2025!", familia: "Pérez", direccion: "Calle Sarmiento 147", email: "perez@email.com", localidad: "Salta", codigo_postal: "4400" },
    { username: "familia.sanchez", password: "Sanchez2025!", familia: "Sánchez", direccion: "Av. Rivadavia 258", email: "sanchez@email.com", localidad: "Mar del Plata", codigo_postal: "7600" },
    { username: "familia.ramirez", password: "Ramirez2025!", familia: "Ramírez", direccion: "Calle Corrientes 369", email: "ramirez@email.com", localidad: "Neuquén", codigo_postal: "8300" },
    { username: "familia.torres", password: "Torres2025!", familia: "Torres", direccion: "Av. Colón 741", email: "torres@email.com", localidad: "Santa Fe", codigo_postal: "3000" }
  ]

  const insertUser = db.prepare(`
    INSERT INTO users (username, password, familia, direccion, email, localidad, codigo_postal, qr_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const familia of familias) {
    const hashedPassword = bcrypt.hashSync(familia.password, 10)
    const qrUrl = `${baseUrl}/visitor?username=${familia.username}`
    const qrCode = await QRCode.toDataURL(qrUrl)
    
    insertUser.run(
      familia.username,
      hashedPassword,
      familia.familia,
      familia.direccion,
      familia.email,
      familia.localidad,
      familia.codigo_postal,
      qrCode
    )
    
    console.log(`[Railway Init] Created user: ${familia.username}`)
  }
  
  console.log("[Railway Init] Database seeded successfully!")
} else {
  console.log("[Railway Init] Database already has users, skipping seed")
}

db.close()
console.log("[Railway Init] Initialization complete!")
