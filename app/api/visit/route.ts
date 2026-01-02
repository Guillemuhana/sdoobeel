import { NextResponse } from 'next/server'

// Almacenamiento temporal en memoria
let currentVisit: { visitorName: string; timestamp: number; ownerMessage?: string } | null = null

// Configurar headers CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  console.log('[v0] API GET - currentVisit:', currentVisit)
  return NextResponse.json({ visit: currentVisit }, { headers: corsHeaders })
}

export async function POST(request: Request) {
  const body = await request.json()
  console.log('[v0] API POST - body:', body)

  if (body.action === 'ring') {
    currentVisit = {
      visitorName: body.visitorName,
      timestamp: Date.now(),
    }
    console.log('[v0] Nueva visita registrada:', currentVisit)
  } else if (body.action === 'message') {
    if (currentVisit) {
      currentVisit.ownerMessage = body.message
      console.log('[v0] Mensaje enviado al visitante:', body.message)
    }
  } else if (body.action === 'end') {
    console.log('[v0] Finalizando visita')
    currentVisit = null
  }

  return NextResponse.json({ visit: currentVisit }, { headers: corsHeaders })
}

export async function DELETE() {
  currentVisit = null
  return NextResponse.json({ success: true }, { headers: corsHeaders })
}
