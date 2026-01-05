import Database from "better-sqlite3"
import path from "path"

const dbPath = path.join(process.cwd(), "sdoorbell.db")
const db = new Database(dbPath)

console.log("=== Usuarios en la base de datos ===")
try {
  const users = db.prepare("SELECT id, username, familia, email FROM users").all()
  
  if (users.length === 0) {
    console.log("No hay usuarios en la base de datos!")
  } else {
    console.log("Total de usuarios:", users.length)
    users.forEach((user: any) => {
      console.log(`- ${user.username} (${user.familia}) - Email: ${user.email}`)
    })
  }
} catch (error) {
  console.error("Error al leer usuarios:", error)
}

db.close()
