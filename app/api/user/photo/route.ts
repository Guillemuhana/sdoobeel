import { NextResponse } from 'next/server'
import db from '@/lib/db'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; username: string }
    
    const formData = await request.formData()
    const file = formData.get('photo') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 })
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'El archivo debe ser una imagen' }, { status: 400 })
    }

    // Crear carpeta si no existe
    const fachadasDir = path.join(process.cwd(), 'public', 'fachadas')
    if (!fs.existsSync(fachadasDir)) {
      fs.mkdirSync(fachadasDir, { recursive: true })
    }

    // Guardar archivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `-fachada-.jpg`
    const filepath = path.join(fachadasDir, filename)
    
    fs.writeFileSync(filepath, buffer)

    // Actualizar base de datos
    const photoUrl = `/fachadas/`
    db.prepare('UPDATE users SET foto_fachada = ? WHERE id = ?').run(photoUrl, decoded.userId)

    return NextResponse.json({ success: true, photoUrl, message: 'Foto actualizada correctamente' })
  } catch (error) {
    console.error('[v0] Error uploading photo:', error)
    return NextResponse.json({ error: 'Error al subir foto' }, { status: 500 })
  }
}
