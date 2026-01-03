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

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthToken {
  userId: number
  username: string
  familia: string
}

export interface AuthResponse {
  success: boolean
  user: Omit<User, "password">
  token: string
}
