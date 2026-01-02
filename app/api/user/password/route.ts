import { NextResponse } from 'next/server'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    const body = await request.json()

    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })
    }

    const user = db.prepare('SELECT password FROM users WHERE id = ?').get(decoded.userId) as { password: string }
    
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    
    if (!isValid) {
      return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 401 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, decoded.userId)

    return NextResponse.json({ success: true, message: 'Contraseña actualizada correctamente' })
  } catch (error) {
    console.error('[v0] Error changing password:', error)
    return NextResponse.json({ error: 'Error al cambiar contraseña' }, { status: 500 })
  }
}
