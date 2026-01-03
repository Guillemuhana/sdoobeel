import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

const dataDir = path.join(process.cwd(), "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, "doorbell.db")
const db = new Database(dbPath)

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    familia TEXT NOT NULL,
    direccion TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    localidad TEXT NOT NULL,
    codigo_postal TEXT NOT NULL,
    foto_fachada TEXT,
    qr_code TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export default db
export { db }
