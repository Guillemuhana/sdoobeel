import Database from "better-sqlite3"
import bcrypt from "bcryptjs"
import path from "path"

const dbPath = path.join(process.cwd(), "sdoorbell.db")
const db = new Database(dbPath)

const username = "familia.garcia"
const password = "Garcia2025!"

console.log("=== Verificando login para:", username, "===")

const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as any

if (user) {
  console.log("Usuario encontrado:", user.username)
  console.log("Hash en DB:", user.password.substring(0, 20) + "...")
  
  bcrypt.compare(password, user.password).then((match) => {
    console.log("Contraseña coincide:", match)
    if (!match) {
      console.log("La contraseña NO coincide. Regenerando hash...")
      const newHash = bcrypt.hashSync(password, 10)
      console.log("Nuevo hash:", newHash.substring(0, 20) + "...")
    }
  })
} else {
  console.log("Usuario NO encontrado")
}

db.close()
