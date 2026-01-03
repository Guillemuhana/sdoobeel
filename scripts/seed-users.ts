import Database from "better-sqlite3"
import bcrypt from "bcryptjs"
import QRCode from "qrcode"
import path from "path"

const dbPath = path.join(process.cwd(), "sdoorbell.db")
const db = new Database(dbPath)

// Crear tabla de usuarios
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, familia TEXT NOT NULL, direccion TEXT NOT NULL, email TEXT NOT NULL, localidad TEXT NOT NULL, codigo_postal TEXT NOT NULL, foto_fachada TEXT, qr_code TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)")

// Crear tabla de visitas
db.exec("CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, visitor_name TEXT NOT NULL, visitor_phone TEXT NOT NULL, visitor_reason TEXT NOT NULL, visit_time DATETIME DEFAULT CURRENT_TIMESTAMP, status TEXT DEFAULT 'pending', FOREIGN KEY (user_id) REFERENCES users (id))")

const users = [
  { username: "familia.garcia", password: "Garcia2025!", familia: "García", direccion: "Av. Libertador 1234", email: "garcia@email.com", localidad: "Buenos Aires", codigo_postal: "1425" },
  { username: "familia.rodriguez", password: "Rodriguez2025!", familia: "Rodríguez", direccion: "Calle San Martín 567", email: "rodriguez@email.com", localidad: "Córdoba", codigo_postal: "5000" },
  { username: "familia.martinez", password: "Martinez2025!", familia: "Martínez", direccion: "Av. Belgrano 890", email: "martinez@email.com", localidad: "Rosario", codigo_postal: "2000" },
  { username: "familia.lopez", password: "Lopez2025!", familia: "López", direccion: "Calle Mitre 234", email: "lopez@email.com", localidad: "Mendoza", codigo_postal: "5500" },
  { username: "familia.gonzalez", password: "Gonzalez2025!", familia: "González", direccion: "Av. Rivadavia 456", email: "gonzalez@email.com", localidad: "La Plata", codigo_postal: "1900" },
  { username: "familia.fernandez", password: "Fernandez2025!", familia: "Fernández", direccion: "Calle 9 de Julio 789", email: "fernandez@email.com", localidad: "Tucumán", codigo_postal: "4000" },
  { username: "familia.perez", password: "Perez2025!", familia: "Pérez", direccion: "Av. Sarmiento 123", email: "perez@email.com", localidad: "Salta", codigo_postal: "4400" },
  { username: "familia.sanchez", password: "Sanchez2025!", familia: "Sánchez", direccion: "Calle Colón 345", email: "sanchez@email.com", localidad: "Mar del Plata", codigo_postal: "7600" },
  { username: "familia.ramirez", password: "Ramirez2025!", familia: "Ramírez", direccion: "Av. Corrientes 678", email: "ramirez@email.com", localidad: "Neuquén", codigo_postal: "8300" },
  { username: "familia.torres", password: "Torres2025!", familia: "Torres", direccion: "Calle Pellegrini 901", email: "torres@email.com", localidad: "Santa Fe", codigo_postal: "3000" }
]

async function seedDatabase() {
  console.log("Iniciando seed de la base de datos...")

  for (const user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      const qrCode = await QRCode.toDataURL("https://fulfilling-commitment-production.up.railway.app/visitor?user=" + user.username)
      
      const stmt = db.prepare("INSERT OR IGNORE INTO users (username, password, familia, direccion, email, localidad, codigo_postal, qr_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      stmt.run(user.username, hashedPassword, user.familia, user.direccion, user.email, user.localidad, user.codigo_postal, qrCode)

      console.log("Usuario creado: " + user.username)
    } catch (error) {
      console.error("Error creando usuario " + user.username + ":", error)
    }
  }

  console.log("Seed completado!")
  db.close()
}

seedDatabase()
