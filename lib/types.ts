export interface User {
  id: number
  username: string
  password: string
  familia: string
  direccion: string
  email: string
  localidad: string
  codigo_postal: string
  foto_fachada: string | null
  qr_code: string
  created_at: string
}

export interface Visit {
  id: number
  user_id: number
  visitor_name: string
  visitor_phone: string
  visitor_reason: string
  visit_time: string
  status: 'pending' | 'accepted' | 'rejected'
}
