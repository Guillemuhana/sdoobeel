import { NextResponse } from 'next/server'
import db from '@/lib/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    
    const user = db.prepare('SELECT id, username, familia, direccion, email, localidad, codigo_postal, foto_fachada, qr_code FROM users WHERE id = ?').get(decoded.userId)
    
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('[v0] Error getting profile:', error)
    return NextResponse.json({ error: 'Error al obtener perfil' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    const body = await request.json()

    const { familia, direccion, email, localidad, codigo_postal } = body

    db.prepare(`
      UPDATE users 
      SET familia = ?, direccion = ?, email = ?, localidad = ?, codigo_postal = ?
      WHERE id = ?
    `).run(familia, direccion, email, localidad, codigo_postal, decoded.userId)

    return NextResponse.json({ success: true, message: 'Perfil actualizado correctamente' })
  } catch (error) {
    console.error('[v0] Error updating profile:', error)
    return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 })
  }
}
