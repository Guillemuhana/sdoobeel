import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

const dataDir = path.join(process.cwd(), "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(process.cwd(), "sdoorbell.db")
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

// Create visits table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    visitor_name TEXT NOT NULL,
    visitor_phone TEXT NOT NULL,
    visitor_reason TEXT NOT NULL,
    visit_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users (id)
  )
`)import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Named export for query function
export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

export async function getClient() {
  return await pool.connect()
}

// Initialize database tables
export async function initDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      familia TEXT NOT NULL,
      direccion TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      localidad TEXT NOT NULL,
      codigo_postal TEXT NOT NULL,
      foto_fachada TEXT,
      qr_code TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await query(`
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      visitor_name TEXT NOT NULL,
      visitor_phone TEXT NOT NULL,
      visitor_reason TEXT NOT NULL,
      visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `)
}

export default pool


export default db
export { db }
