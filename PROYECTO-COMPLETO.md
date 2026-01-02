# S-DOORBELL - PROYECTO COMPLETO
## Guía de instalación y código fuente completo

---

## PASO 1: CREAR EL PROYECTO

Abre tu terminal y ejecuta:

```bash
npx create-next-app@latest s-doorbell
```

Cuando te pregunte, selecciona:
- ✅ TypeScript: Yes
- ✅ ESLint: Yes  
- ✅ Tailwind CSS: Yes
- ✅ src/ directory: No
- ✅ App Router: Yes
- ✅ Import alias: Yes (@/*)

Luego entra al proyecto:
```bash
cd s-doorbell
```

---

## PASO 2: INSTALAR DEPENDENCIAS

```bash
npm install @heroicons/react
```

---

## PASO 3: CREAR ESTRUCTURA DE CARPETAS

Crea estas carpetas dentro de tu proyecto:
```
s-doorbell/
├── app/
│   ├── login/
│   ├── change-password/
│   ├── dashboard/
│   ├── visit/
│   │   └── active/
│   ├── profile/
│   ├── qr/
│   ├── security/
│   ├── visits/
│   ├── blocked/
│   └── visitor/
├── components/
└── public/
```

---

## PASO 4: ARCHIVOS DE CONFIGURACIÓN

### 📄 `app/globals.css`

Reemplaza TODO el contenido con:

```css
@import 'tailwindcss';

@theme inline {
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  
  --color-primary: #0ea5e9;
  --color-primary-dark: #0284c7;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --radius: 0.5rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  background: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
}
```

---

### 📄 `app/layout.tsx`

Reemplaza TODO el contenido con:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'S-Doorbell - Timbre Digital',
  description: 'Sistema de timbre digital inteligente para tu hogar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
```

---

### 📄 `app/page.tsx`

Reemplaza TODO el contenido con:

```tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/login')
}
```

---

## PASO 5: COMPONENTES BASE

### 📄 `components/app-layout.tsx`

```tsx
'use client'

import { ReactNode } from 'react'
import Header from './header'
import BottomNavigation from './bottom-navigation'

interface AppLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showNavigation?: boolean
}

export default function AppLayout({
  children,
  showHeader = true,
  showNavigation = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {showHeader && <Header />}
      <main className="flex-1 pb-20">{children}</main>
      {showNavigation && <BottomNavigation />}
    </div>
  )
}
```

---

### 📄 `components/header.tsx`

```tsx
'use client'

import Image from 'next/image'
import { BellIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo017.png"
            alt="S-Doorbell Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <h1 className="text-lg font-bold text-[var(--color-primary)]">
              S-doorbell
            </h1>
            <p className="text-xs text-[var(--color-text-muted)]">
              Timbre Digital
            </p>
          </div>
        </div>
        <button className="relative p-2 hover:bg-[var(--color-background)] rounded-lg transition-colors">
          <BellIcon className="w-6 h-6 text-[var(--color-text)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-danger)] rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
```

---

### 📄 `components/bottom-navigation.tsx`

```tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  HomeIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  QrCodeIcon as QrCodeIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid'

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      name: 'Inicio',
      path: '/dashboard',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      name: 'QR',
      path: '/qr',
      icon: QrCodeIcon,
      activeIcon: QrCodeIconSolid,
    },
    {
      name: 'Seguridad',
      path: '/security',
      icon: ShieldCheckIcon,
      activeIcon: ShieldCheckIconSolid,
    },
    {
      name: 'Perfil',
      path: '/profile',
      icon: UserCircleIcon,
      activeIcon: UserCircleIconSolid,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] z-50">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = isActive ? item.activeIcon : item.icon

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors hover:bg-[var(--color-background)]"
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)]'
                  }`}
                />
                <span
                  className={`text-xs ${
                    isActive
                      ? 'text-[var(--color-primary)] font-semibold'
                      : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
```

---

### 📄 `components/status-badge.tsx`

```tsx
interface StatusBadgeProps {
  status: 'active' | 'waiting' | 'completed' | 'blocked'
  text: string
}

export default function StatusBadge({ status, text }: StatusBadgeProps) {
  const styles = {
    active: 'bg-green-100 text-green-700 border-green-300',
    waiting: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    completed: 'bg-blue-100 text-blue-700 border-blue-300',
    blocked: 'bg-red-100 text-red-700 border-red-300',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {text}
    </span>
  )
}
```

---

### 📄 `components/primary-button.tsx`

```tsx
'use client'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'danger' | 'success' | 'outline'
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
}

export default function PrimaryButton({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  type = 'button',
}: PrimaryButtonProps) {
  const styles = {
    primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white',
    danger: 'bg-[var(--color-danger)] hover:bg-red-600 text-white',
    success: 'bg-[var(--color-success)] hover:bg-green-600 text-white',
    outline:
      'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${styles[variant]}
        ${fullWidth ? 'w-full' : ''}
        px-6 py-3 rounded-lg font-semibold
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95
      `}
    >
      {children}
    </button>
  )
}
```

---

### 📄 `components/visit-alert-card.tsx`

```tsx
'use client'

import { BellAlertIcon, MapPinIcon } from '@heroicons/react/24/solid'
import StatusBadge from './status-badge'

interface VisitAlertCardProps {
  visitorName: string
  visitTime: string
  status: 'active' | 'waiting'
  location?: string
}

export default function VisitAlertCard({
  visitorName,
  visitTime,
  status,
  location,
}: VisitAlertCardProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)] shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-blue-600 rounded-full flex items-center justify-center">
            <BellAlertIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-text)]">
              {visitorName}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">{visitTime}</p>
          </div>
        </div>
        <StatusBadge
          status={status}
          text={status === 'active' ? 'Activa' : 'Esperando'}
        />
      </div>

      {location && (
        <div className="flex items-center gap-2 mt-3 p-3 bg-[var(--color-background)] rounded-lg">
          <MapPinIcon className="w-5 h-5 text-[var(--color-primary)]" />
          <p className="text-sm text-[var(--color-text-muted)]">{location}</p>
        </div>
      )}
    </div>
  )
}
```

---

### 📄 `components/visit-actions.tsx`

```tsx
'use client'

import {
  XMarkIcon,
  NoSymbolIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

interface VisitActionsProps {
  onCutVisit: () => void
  onBlockVisitor: () => void
  onRequestLocation: () => void
  onExtendTime: () => void
}

export default function VisitActions({
  onCutVisit,
  onBlockVisitor,
  onRequestLocation,
  onExtendTime,
}: VisitActionsProps) {
  const actions = [
    {
      label: 'Cortar Visita',
      icon: XMarkIcon,
      onClick: onCutVisit,
      variant: 'danger' as const,
    },
    {
      label: 'Bloquear',
      icon: NoSymbolIcon,
      onClick: onBlockVisitor,
      variant: 'danger' as const,
    },
    {
      label: 'Pedir Ubicación',
      icon: MapPinIcon,
      onClick: onRequestLocation,
      variant: 'primary' as const,
    },
    {
      label: 'Extender Tiempo',
      icon: ClockIcon,
      onClick: onExtendTime,
      variant: 'success' as const,
    },
  ]

  const variantStyles = {
    primary: 'bg-blue-50 text-[var(--color-primary)] hover:bg-blue-100',
    danger: 'bg-red-50 text-[var(--color-danger)] hover:bg-red-100',
    success: 'bg-green-50 text-[var(--color-success)] hover:bg-green-100',
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className={`
            ${variantStyles[action.variant]}
            p-4 rounded-xl flex flex-col items-center gap-2
            transition-all duration-200 active:scale-95
            border border-transparent hover:border-current
          `}
        >
          <action.icon className="w-7 h-7" />
          <span className="text-sm font-semibold">{action.label}</span>
        </button>
      ))}
    </div>
  )
}
```

---

### 📄 `components/qr-code-card.tsx`

```tsx
'use client'

import Image from 'next/image'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface QRCodeCardProps {
  qrImageUrl: string
  homeId: string
}

export default function QRCodeCard({ qrImageUrl, homeId }: QRCodeCardProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = qrImageUrl
    link.download = `s-doorbell-qr-${homeId}.png`
    link.click()
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-border)] shadow-sm">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
          Tu Código QR
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Escanea para tocar el timbre
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border-2 border-[var(--color-border)] mb-4">
        <Image
          src={qrImageUrl || "/placeholder.svg"}
          alt="QR Code"
          width={300}
          height={300}
          className="w-full h-auto"
        />
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <ArrowDownTrayIcon className="w-5 h-5" />
        Descargar QR
      </button>

      <p className="text-xs text-center text-[var(--color-text-muted)] mt-3">
        ID: {homeId}
      </p>
    </div>
  )
}
```

---

### 📄 `components/facade-photo-uploader.tsx`

```tsx
'use client'

import { useState } from 'react'
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface FacadePhotoUploaderProps {
  currentPhoto?: string
  onPhotoChange: (photo: string) => void
}

export default function FacadePhotoUploader({
  currentPhoto,
  onPhotoChange,
}: FacadePhotoUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onPhotoChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onPhotoChange('')
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-[var(--color-text)]">
        Foto de Fachada
      </label>

      {preview ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-[var(--color-border)]">
          <Image
            src={preview || "/placeholder.svg"}
            alt="Fachada"
            fill
            className="object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[var(--color-border)] rounded-lg cursor-pointer hover:bg-[var(--color-background)] transition-colors">
          <CameraIcon className="w-12 h-12 text-[var(--color-text-muted)] mb-2" />
          <span className="text-sm text-[var(--color-text-muted)]">
            Toca para subir foto
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  )
}
```

---

### 📄 `components/home-profile-form.tsx`

```tsx
'use client'

import { useState } from 'react'
import FacadePhotoUploader from './facade-photo-uploader'
import PrimaryButton from './primary-button'

interface HomeProfileData {
  ownerName: string
  address: string
  city: string
  phone: string
  facadePhoto: string
}

interface HomeProfileFormProps {
  initialData?: HomeProfileData
  onSave: (data: HomeProfileData) => void
}

export default function HomeProfileForm({
  initialData,
  onSave,
}: HomeProfileFormProps) {
  const [formData, setFormData] = useState<HomeProfileData>(
    initialData || {
      ownerName: '',
      address: '',
      city: '',
      phone: '',
      facadePhoto: '',
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
          Nombre del Propietario
        </label>
        <input
          type="text"
          value={formData.ownerName}
          onChange={(e) =>
            setFormData({ ...formData, ownerName: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder="Juan Pérez"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
          Dirección
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder="Calle Principal 123"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
          Ciudad
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder="Buenos Aires"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          placeholder="+54 11 1234-5678"
          required
        />
      </div>

      <FacadePhotoUploader
        currentPhoto={formData.facadePhoto}
        onPhotoChange={(photo) =>
          setFormData({ ...formData, facadePhoto: photo })
        }
      />

      <PrimaryButton type="submit" fullWidth>
        Guardar Cambios
      </PrimaryButton>
    </form>
  )
}
```

---

### 📄 `components/security-settings.tsx`

```tsx
'use client'

import { useState } from 'react'

interface SecuritySettingsProps {
  onSave: (settings: {
    autoAcceptVisits: boolean
    requireLocation: boolean
    maxVisitDuration: number
  }) => void
}

export default function SecuritySettings({ onSave }: SecuritySettingsProps) {
  const [autoAcceptVisits, setAutoAcceptVisits] = useState(false)
  const [requireLocation, setRequireLocation] = useState(true)
  const [maxVisitDuration, setMaxVisitDuration] = useState(30)

  const handleSave = () => {
    onSave({ autoAcceptVisits, requireLocation, maxVisitDuration })
  }

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[var(--color-text)]">
              Auto-aceptar Visitas
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Aceptar automáticamente nuevas visitas
            </p>
          </div>
          <button
            onClick={() => setAutoAcceptVisits(!autoAcceptVisits)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              autoAcceptVisits ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                autoAcceptVisits ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[var(--color-text)]">
              Solicitar Ubicación
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Pedir ubicación al visitante
            </p>
          </div>
          <button
            onClick={() => setRequireLocation(!requireLocation)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              requireLocation ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                requireLocation ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)]">
        <h3 className="font-semibold text-[var(--color-text)] mb-3">
          Duración Máxima de Visita
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="15"
            max="120"
            step="15"
            value={maxVisitDuration}
            onChange={(e) => setMaxVisitDuration(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-lg font-bold text-[var(--color-primary)] min-w-[60px]">
            {maxVisitDuration} min
          </span>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Guardar Configuración
      </button>
    </div>
  )
}
```

---

### 📄 `components/visit-history-list.tsx`

```tsx
'use client'

import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'
import StatusBadge from './status-badge'

interface Visit {
  id: string
  visitorName: string
  date: string
  time: string
  duration: string
  status: 'completed' | 'blocked'
  location?: string
}

interface VisitHistoryListProps {
  visits: Visit[]
}

export default function VisitHistoryList({ visits }: VisitHistoryListProps) {
  return (
    <div className="space-y-3">
      {visits.map((visit) => (
        <div
          key={visit.id}
          className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">
                {visit.visitorName}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                {visit.date} • {visit.time}
              </p>
            </div>
            <StatusBadge
              status={visit.status}
              text={visit.status === 'completed' ? 'Completada' : 'Bloqueada'}
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{visit.duration}</span>
            </div>
            {visit.location && (
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                <span>{visit.location}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

### 📄 `components/blocked-visitors-list.tsx`

```tsx
'use client'

import { NoSymbolIcon, TrashIcon } from '@heroicons/react/24/outline'

interface BlockedVisitor {
  id: string
  name: string
  blockedDate: string
  reason: string
}

interface BlockedVisitorsListProps {
  visitors: BlockedVisitor[]
  onUnblock: (id: string) => void
}

export default function BlockedVisitorsList({
  visitors,
  onUnblock,
}: BlockedVisitorsListProps) {
  return (
    <div className="space-y-3">
      {visitors.length === 0 ? (
        <div className="text-center py-12">
          <NoSymbolIcon className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-3" />
          <p className="text-[var(--color-text-muted)]">
            No hay visitantes bloqueados
          </p>
        </div>
      ) : (
        visitors.map((visitor) => (
          <div
            key={visitor.id}
            className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--color-text)]">
                  {visitor.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Bloqueado: {visitor.blockedDate}
                </p>
                <p className="text-sm text-red-600 mt-2">{visitor.reason}</p>
              </div>
              <button
                onClick={() => onUnblock(visitor.id)}
                className="p-2 text-[var(--color-danger)] hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
```

---

## PASO 6: PÁGINAS DE LA APLICACIÓN

### 📄 `app/login/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí conectarías con tu backend
    console.log('[v0] Login attempt:', { email, password })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--color-surface)] rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Image
            src="/images/logo017.png"
            alt="S-Doorbell"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            S-Doorbell
          </h1>
          <p className="text-[var(--color-text-muted)] mt-2">
            Timbre Digital Inteligente
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/change-password')}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

### 📄 `app/change-password/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí conectarías con tu backend
    console.log('[v0] Password reset request for:', email)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--color-surface)] rounded-2xl shadow-2xl p-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Volver
        </button>

        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
          Recuperar Contraseña
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          Te enviaremos un enlace para restablecer tu contraseña
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="tu@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Enviar Enlace
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
              Enlace Enviado
            </h3>
            <p className="text-[var(--color-text-muted)]">
              Revisa tu email para continuar
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

### 📄 `app/dashboard/page.tsx`

```tsx
'use client'

import { useRouter } from 'next/navigation'
import AppLayout from '@/components/app-layout'
import VisitAlertCard from '@/components/visit-alert-card'
import PrimaryButton from '@/components/primary-button'
import {
  ClockIcon,
  DocumentTextIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const router = useRouter()

  const stats = [
    { label: 'Visitas Hoy', value: '5', icon: ClockIcon },
    { label: 'Historial', value: '28', icon: DocumentTextIcon },
    { label: 'Bloqueados', value: '2', icon: NoSymbolIcon },
  ]

  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
            Bienvenido
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Panel de control de S-Doorbell
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)] text-center"
            >
              <stat.icon className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[var(--color-text)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">
            Visita Activa
          </h3>
          <VisitAlertCard
            visitorName="María González"
            visitTime="Hace 5 minutos"
            status="active"
            location="Calle Principal 123"
          />
          <PrimaryButton
            fullWidth
            onClick={() => router.push('/visit/active')}
            variant="primary"
          >
            Ver Detalles
          </PrimaryButton>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">
            Accesos Rápidos
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/visits')}
              className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] text-center hover:border-[var(--color-primary)] transition-colors"
            >
              <DocumentTextIcon className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-2" />
              <span className="text-sm font-semibold text-[var(--color-text)]">
                Historial
              </span>
            </button>
            <button
              onClick={() => router.push('/blocked')}
              className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] text-center hover:border-[var(--color-primary)] transition-colors"
            >
              <NoSymbolIcon className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-2" />
              <span className="text-sm font-semibold text-[var(--color-text)]">
                Bloqueados
              </span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
```

---

### 📄 `app/visit/active/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/app-layout'
import VisitAlertCard from '@/components/visit-alert-card'
import VisitActions from '@/components/visit-actions'

export default function ActiveVisitPage() {
  const router = useRouter()
  const [visitCut, setVisitCut] = useState(false)

  const handleCutVisit = () => {
    console.log('[v0] Cutting visit')
    setVisitCut(true)
    setTimeout(() => router.push('/dashboard'), 2000)
  }

  const handleBlockVisitor = () => {
    console.log('[v0] Blocking visitor')
    alert('Visitante bloqueado exitosamente')
    router.push('/dashboard')
  }

  const handleRequestLocation = () => {
    console.log('[v0] Requesting location')
    alert('Solicitud de ubicación enviada')
  }

  const handleExtendTime = () => {
    console.log('[v0] Extending time')
    alert('Tiempo extendido 30 minutos más')
  }

  if (visitCut) {
    return (
      <AppLayout>
        <div className="max-w-md mx-auto px-4 py-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
              Visita Finalizada
            </h3>
            <p className="text-[var(--color-text-muted)]">
              La visita ha sido cortada exitosamente
            </p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
            Visita Activa
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Gestiona la visita actual
          </p>
        </div>

        <VisitAlertCard
          visitorName="María González"
          visitTime="Hace 5 minutos"
          status="active"
          location="Calle Principal 123"
        />

        <div className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)]">
          <h3 className="font-semibold text-[var(--color-text)] mb-3">
            Tiempo Restante
          </h3>
          <div className="flex items-center justify-center">
            <div className="text-4xl font-bold text-[var(--color-primary)]">
              25:00
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--color-text)] mb-3">
            Acciones
          </h3>
          <VisitActions
            onCutVisit={handleCutVisit}
            onBlockVisitor={handleBlockVisitor}
            onRequestLocation={handleRequestLocation}
            onExtendTime={handleExtendTime}
          />
        </div>
      </div>
    </AppLayout>
  )
}
```

---

### 📄 `app/profile/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import AppLayout from '@/components/app-layout'
import HomeProfileForm from '@/components/home-profile-form'

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)

  const handleSave = (data: any) => {
    console.log('[v0] Saving profile:', data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
            Mi Perfil
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Información del hogar
          </p>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Perfil actualizado exitosamente
          </div>
        )}

        <HomeProfileForm
          initialData={{
            ownerName: 'Juan Pérez',
            address: 'Calle Principal 123',
            city: 'Buenos Aires',
            phone: '+54 11 1234-5678',
            facadePhoto: '',
          }}
          onSave={handleSave}
        />
      </div>
    </AppLayout>
  )
}
```

---

### 📄 `app/qr/page.tsx`

```tsx
'use client'

import AppLayout from '@/components/app-layout'
import QRCodeCard from '@/components/qr-code-card'

export default function QRPage() {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
            Mi Código QR
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Código único para tu timbre
          </p>
        </div>

        <QRCodeCard
          qrImageUrl="/images/logo3254.png"
          homeId="STUDIO-B2B"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Cómo usar tu código QR
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>1. Descarga e imprime el código QR</li>
            <li>2. Colócalo en la entrada de tu casa</li>
            <li>3. Los visitantes escanean el código</li>
            <li>4. Recibes una notificación instantánea</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  )
}
```

---

### 📄 `app/security/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import AppLayout from '@/components/app-layout'
import SecuritySettings from '@/components/security-settings'

export default function SecurityPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = (settings: any) => {
    console.log('[v0] Saving security settings:', settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
            Seguridad
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Configura las opciones de seguridad
          </p>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Configuración guardada exitosamente
          </div>
        )}

        <SecuritySettings onSave={handleSave} />
      </div>
    </AppLayout>
  )
}
```

---

### 📄 `app/visits/page.tsx`

```tsx
'use client'

import AppLayout from '@/components/app-layout'
import VisitHistoryList from '@/components/visit-history-list'

export default function VisitsPage() {
  const mockVisits = [
    {
      id: '1',
      visitorName: 'María González',
      date: '29/12/2025',
      time: '14:30',
      duration: '25 min',
      status: 'completed' as const,
      location: 'Verificada',
    },
    {
      id: '2',
      visitorName: 'Carlos Rodríguez',
      date: '28/12/2025',
      time: '10:15',
      duration: '30 min',
      status: 'completed' as const,
    },
    {
      id: '3',
      visitorName: 'Ana Martínez',
      date: '27/12/2025',
      time: '16:45',
      duration: '0 min',
      status: 'blocked' as const,
    },
  ]

  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
            Historial de Visitas
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Todas tus visitas registradas
          </p>
        </div>

        <VisitHistoryList visits={mockVisits} />
      </div>
    </AppLayout>
  )
}
```

---

### 📄 `app/blocked/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import AppLayout from '@/components/app-layout'
import BlockedVisitorsList from '@/components/blocked-visitors-list'

export default function BlockedPage() {
  const [blockedVisitors, setBlockedVisitors] = useState([
    {
      id: '1',
      name: 'Ana Martínez',
      blockedDate: '27/12/2025',
      reason: 'Comportamiento sospechoso',
    },
    {
      id: '2',
      name: 'Pedro Sánchez',
      blockedDate: '25/12/2025',
      reason: 'Múltiples intentos no autorizados',
    },
  ])

  const handleUnblock = (id: string) => {
    console.log('[v0] Unblocking visitor:', id)
    setBlockedVisitors(blockedVisitors.filter((v) => v.id !== id))
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
            Visitantes Bloqueados
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Gestiona los visitantes bloqueados
          </p>
        </div>

        <BlockedVisitorsList
          visitors={blockedVisitors}
          onUnblock={handleUnblock}
        />
      </div>
    </AppLayout>
  )
}
```

---

### 📄 `app/visitor/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BellIcon, MapPinIcon } from '@heroicons/react/24/solid'

export default function VisitorPage() {
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Visitor request:', { name, reason })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-blue-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[var(--color-surface)] rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            Timbre Tocado
          </h2>
          <p className="text-[var(--color-text-muted)]">
            El propietario ha sido notificado de tu visita. Por favor espera.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--color-surface)] rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Image
            src="/images/logo017.png"
            alt="S-Doorbell"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <BellIcon className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Tocar el Timbre
          </h1>
          <p className="text-[var(--color-text-muted)] mt-2">
            Por favor completa la información
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Tu Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Nombre completo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Motivo de la Visita
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
              rows={3}
              placeholder="Ej: Delivery, visita personal..."
              required
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <MapPinIcon className="w-5 h-5 text-[var(--color-primary)]" />
            <span>Tu ubicación será compartida con el propietario</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <BellIcon className="w-5 h-5" />
            Tocar Timbre
          </button>
        </form>
      </div>
    </div>
  )
}
```

---

## PASO 7: EJECUTAR EL PROYECTO

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

---

## RUTAS DE LA APLICACIÓN

- `/login` - Inicio de sesión
- `/change-password` - Recuperar contraseña
- `/dashboard` - Panel principal (requiere autenticación)
- `/visit/active` - Gestionar visita activa
- `/profile` - Perfil del hogar
- `/qr` - Código QR personal
- `/security` - Configuración de seguridad
- `/visits` - Historial de visitas
- `/blocked` - Visitantes bloqueados
- `/visitor` - Página pública para visitantes (sin navegación)

---

## PRÓXIMOS PASOS

1. Conectar con tu backend/API
2. Implementar autenticación real (JWT, sesiones)
3. Conectar base de datos (PostgreSQL, MongoDB, etc.)
4. Agregar notificaciones push
5. Implementar WebSockets para tiempo real
6. Agregar geolocalización real

---

## DEPENDENCIAS INSTALADAS

- Next.js 15.1.6
- React 19.0.0
- TypeScript
- Tailwind CSS v4
- @heroicons/react (iconos)

---

## ESTRUCTURA DEL PROYECTO

```
s-doorbell/
├── app/
│   ├── login/
│   │   └── page.tsx
│   ├── change-password/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── visit/
│   │   └── active/
│   │       └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── qr/
│   │   └── page.tsx
│   ├── security/
│   │   └── page.tsx
│   ├── visits/
│   │   └── page.tsx
│   ├── blocked/
│   │   └── page.tsx
│   ├── visitor/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── app-layout.tsx
│   ├── header.tsx
│   ├── bottom-navigation.tsx
│   ├── status-badge.tsx
│   ├── primary-button.tsx
│   ├── visit-alert-card.tsx
│   ├── visit-actions.tsx
│   ├── qr-code-card.tsx
│   ├── facade-photo-uploader.tsx
│   ├── home-profile-form.tsx
│   ├── security-settings.tsx
│   ├── visit-history-list.tsx
│   └── blocked-visitors-list.tsx
├── public/
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## FIN DEL DOCUMENTO

Todo el código está completo y listo para usar. Solo copia y pega cada archivo en su ubicación correspondiente.
