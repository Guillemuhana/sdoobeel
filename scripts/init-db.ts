import Database from "better-sqlite3"
import bcrypt from "bcryptjs"
import QRCode from "qrcode"
import path from "path"

const dbPath = path.join(process.cwd(), "sdoorbell.db")
const db = new Database(dbPath)

// Crear tablas
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
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users (id)
)`)

console.log("[v0] Database tables created")
db.close()
