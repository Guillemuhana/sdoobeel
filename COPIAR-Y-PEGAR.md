# GUÍA COMPLETA - COPIAR Y PEGAR ARCHIVOS

Tienes el proyecto en: `C:\Users\Acer\Desktop\s-doorbell-app`

## PASO 1: Instalar dependencias adicionales

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
npm install @heroicons/react qrcode.react
```

---

## PASO 2: Crear componentes (carpeta components/)

### Archivo: components/app-layout.tsx

```tsx
import { ReactNode } from 'react'
import { Header } from './header'
import { BottomNavigation } from './bottom-navigation'

interface AppLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showNavigation?: boolean
}

export function AppLayout({ children, showHeader = true, showNavigation = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeader && <Header />}
      <main className="flex-1 pb-20">
        {children}
      </main>
      {showNavigation && <BottomNavigation />}
    </div>
  )
}
```

---

### Archivo: components/header.tsx

```tsx
import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-center">
        <Image 
          src="/images/logo017.png" 
          alt="S-Doorbell Logo" 
          width={180} 
          height={60}
          className="h-12 w-auto"
        />
      </div>
    </header>
  )
}
```

---

### Archivo: components/bottom-navigation.tsx

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, UserCircleIcon, QrCodeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid, UserCircleIcon as UserCircleIconSolid, QrCodeIcon as QrCodeIconSolid, ShieldCheckIcon as ShieldCheckIconSolid } from '@heroicons/react/24/solid'

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Inicio', icon: HomeIcon, iconActive: HomeIconSolid },
    { href: '/profile', label: 'Perfil', icon: UserCircleIcon, iconActive: UserCircleIconSolid },
    { href: '/qr', label: 'QR', icon: QrCodeIcon, iconActive: QrCodeIconSolid },
    { href: '/security', label: 'Seguridad', icon: ShieldCheckIcon, iconActive: ShieldCheckIconSolid },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = isActive ? item.iconActive : item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
```

---

### Archivo: components/status-badge.tsx

```tsx
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'blocked'
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const styles = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    blocked: 'bg-red-100 text-red-800',
  }

  const labels = {
    active: label || 'Activo',
    inactive: label || 'Inactivo',
    blocked: label || 'Bloqueado',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
```

---

### Archivo: components/primary-button.tsx

```tsx
import { ReactNode } from 'react'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'danger' | 'secondary'
  disabled?: boolean
  fullWidth?: boolean
}

export function PrimaryButton({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  fullWidth = false 
}: PrimaryButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass}`}
    >
      {children}
    </button>
  )
}
```

---

### Archivo: components/visit-alert-card.tsx

```tsx
import { BellAlertIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface VisitAlertCardProps {
  visitorName: string
  time: string
  hasActiveVisit?: boolean
}

export function VisitAlertCard({ visitorName, time, hasActiveVisit = true }: VisitAlertCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <BellAlertIcon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Nueva Visita</h3>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">{visitorName}</span> está en tu puerta
          </p>
          <p className="text-sm text-gray-500">{time}</p>
          
          {hasActiveVisit && (
            <Link 
              href="/visit/active"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Visita Activa
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
```

---

### Archivo: components/visit-actions.tsx

```tsx
'use client'

import { XCircleIcon, NoSymbolIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { PrimaryButton } from './primary-button'

interface VisitActionsProps {
  onCutVisit: () => void
  onBlockVisitor: () => void
  onRequestLocation: () => void
}

export function VisitActions({ onCutVisit, onBlockVisitor, onRequestLocation }: VisitActionsProps) {
  return (
    <div className="space-y-3">
      <PrimaryButton 
        onClick={onCutVisit} 
        variant="danger" 
        fullWidth
      >
        <div className="flex items-center justify-center gap-2">
          <XCircleIcon className="h-5 w-5" />
          Cortar Visita
        </div>
      </PrimaryButton>

      <PrimaryButton 
        onClick={onBlockVisitor} 
        variant="secondary" 
        fullWidth
      >
        <div className="flex items-center justify-center gap-2">
          <NoSymbolIcon className="h-5 w-5" />
          Bloquear Visitante
        </div>
      </PrimaryButton>

      <PrimaryButton 
        onClick={onRequestLocation} 
        variant="primary" 
        fullWidth
      >
        <div className="flex items-center justify-center gap-2">
          <MapPinIcon className="h-5 w-5" />
          Pedir Ubicación
        </div>
      </PrimaryButton>
    </div>
  )
}
```

---

### Archivo: components/qr-code-card.tsx

```tsx
'use client'

import Image from 'next/image'
import { PrimaryButton } from './primary-button'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface QRCodeCardProps {
  qrImageUrl: string
  homeId: string
}

export function QRCodeCard({ qrImageUrl, homeId }: QRCodeCardProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = qrImageUrl
    link.download = `s-doorbell-qr-${homeId}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <Image 
            src={qrImageUrl || "/placeholder.svg"} 
            alt="Código QR del timbre" 
            width={300} 
            height={300}
            className="rounded-lg"
          />
        </div>
        
        <p className="text-center text-gray-600 mb-6">
          Escanea este código para acceder al timbre digital
        </p>

        <PrimaryButton onClick={handleDownload} fullWidth>
          <div className="flex items-center justify-center gap-2">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Descargar QR
          </div>
        </PrimaryButton>
      </div>
    </div>
  )
}
```

---

### Archivo: components/facade-photo-uploader.tsx

```tsx
'use client'

import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export function FacadePhotoUploader() {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Foto de Fachada
      </label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="facade-upload"
        />
        
        <label htmlFor="facade-upload" className="cursor-pointer">
          {preview ? (
            <div className="relative w-full h-48">
              <Image 
                src={preview || "/placeholder.svg"} 
                alt="Vista previa de fachada" 
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <PhotoIcon className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600">Click para subir foto</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 10MB</p>
            </div>
          )}
        </label>
      </div>
    </div>
  )
}
```

---

### Archivo: components/home-profile-form.tsx

```tsx
'use client'

import { useState } from 'react'
import { FacadePhotoUploader } from './facade-photo-uploader'
import { PrimaryButton } from './primary-button'

export function HomeProfileForm() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
    ownerName: '',
    phone: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos del formulario:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dirección
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Calle y número"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código Postal
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del Propietario
        </label>
        <input
          type="text"
          value={formData.ownerName}
          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <FacadePhotoUploader />

      <PrimaryButton type="submit" fullWidth>
        Guardar Cambios
      </PrimaryButton>
    </form>
  )
}
```

---

### Archivo: components/security-settings.tsx

```tsx
'use client'

import { useState } from 'react'
import { PrimaryButton } from './primary-button'

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    autoBlock: false,
    notifyVisit: true,
    requireApproval: false,
    locationTracking: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Configuración de seguridad:', settings)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div>
            <div className="font-medium text-gray-900">Bloqueo Automático</div>
            <div className="text-sm text-gray-500">Bloquear visitantes sospechosos</div>
          </div>
          <input
            type="checkbox"
            checked={settings.autoBlock}
            onChange={(e) => setSettings({ ...settings, autoBlock: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div>
            <div className="font-medium text-gray-900">Notificar Visitas</div>
            <div className="text-sm text-gray-500">Recibir alertas de nuevas visitas</div>
          </div>
          <input
            type="checkbox"
            checked={settings.notifyVisit}
            onChange={(e) => setSettings({ ...settings, notifyVisit: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div>
            <div className="font-medium text-gray-900">Requiere Aprobación</div>
            <div className="text-sm text-gray-500">Aprobar antes de permitir acceso</div>
          </div>
          <input
            type="checkbox"
            checked={settings.requireApproval}
            onChange={(e) => setSettings({ ...settings, requireApproval: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div>
            <div className="font-medium text-gray-900">Rastreo de Ubicación</div>
            <div className="text-sm text-gray-500">Guardar ubicación de visitantes</div>
          </div>
          <input
            type="checkbox"
            checked={settings.locationTracking}
            onChange={(e) => setSettings({ ...settings, locationTracking: e.target.checked })}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </label>
      </div>

      <PrimaryButton type="submit" fullWidth>
        Guardar Configuración
      </PrimaryButton>
    </form>
  )
}
```

---

### Archivo: components/visit-history-list.tsx

```tsx
import { StatusBadge } from './status-badge'
import { ClockIcon } from '@heroicons/react/24/outline'

interface Visit {
  id: string
  visitorName: string
  date: string
  time: string
  status: 'active' | 'inactive' | 'blocked'
}

const mockVisits: Visit[] = [
  { id: '1', visitorName: 'Juan Pérez', date: '2025-01-15', time: '14:30', status: 'inactive' },
  { id: '2', visitorName: 'María García', date: '2025-01-14', time: '10:15', status: 'inactive' },
  { id: '3', visitorName: 'Carlos López', date: '2025-01-13', time: '16:45', status: 'blocked' },
]

export function VisitHistoryList() {
  return (
    <div className="space-y-4">
      {mockVisits.map((visit) => (
        <div key={visit.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{visit.visitorName}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <ClockIcon className="h-4 w-4" />
                {visit.date} - {visit.time}
              </div>
            </div>
            <StatusBadge status={visit.status} />
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

### Archivo: components/blocked-visitors-list.tsx

```tsx
'use client'

import { NoSymbolIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface BlockedVisitor {
  id: string
  name: string
  blockedDate: string
  reason: string
}

const mockBlockedVisitors: BlockedVisitor[] = [
  { id: '1', name: 'Carlos López', blockedDate: '2025-01-13', reason: 'Comportamiento sospechoso' },
  { id: '2', name: 'Ana Martínez', blockedDate: '2025-01-10', reason: 'Múltiples visitas no autorizadas' },
]

export function BlockedVisitorsList() {
  const handleUnblock = (id: string) => {
    console.log('Desbloquear visitante:', id)
  }

  return (
    <div className="space-y-4">
      {mockBlockedVisitors.map((visitor) => (
        <div key={visitor.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <NoSymbolIcon className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">{visitor.reason}</p>
              <p className="text-xs text-gray-500">Bloqueado: {visitor.blockedDate}</p>
            </div>
            
            <button
              onClick={() => handleUnblock(visitor.id)}
              className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Desbloquear
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## PASO 3: Crear páginas (carpeta app/)

### Archivo: app/page.tsx

```tsx
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/login')
}
```

---

### Archivo: app/login/page.tsx

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { PrimaryButton } from '@/components/primary-button'
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular login exitoso
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center px-4">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <Image 
            src="/images/logo017.png" 
            alt="S-Doorbell Logo" 
            width={200} 
            height={80}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
          <p className="text-gray-600">Ingresa a tu timbre digital</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <PrimaryButton type="submit" fullWidth>
              Iniciar Sesión
            </PrimaryButton>

            <div className="text-center">
              <a href="/change-password" className="text-sm text-blue-600 hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
```

---

### Archivo: app/change-password/page.tsx

```tsx
'use client'

import { useState } from 'react'
import { PrimaryButton } from '@/components/primary-button'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Cambiar contraseña:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center px-4">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LockClosedIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cambiar Contraseña</h1>
          <p className="text-gray-600">Actualiza tu contraseña de acceso</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña Actual
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <PrimaryButton type="submit" fullWidth>
              Actualizar Contraseña
            </PrimaryButton>

            <div className="text-center">
              <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700">
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
```

---

**Continúa en el siguiente mensaje...**
