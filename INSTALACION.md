# 📦 Guía de Instalación - S-Doorbell

## 🎯 Descripción
S-Doorbell es un timbre inteligente digital basado en QR para viviendas. Esta guía te ayudará a instalar y configurar el proyecto completo.

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.x o superior → [Descargar](https://nodejs.org/)
- **npm** o **pnpm** (recomendado)
- **Git** → [Descargar](https://git-scm.com/)

---

## 📋 Paso a Paso

### 1. Clonar o descargar el proyecto

Si tienes el proyecto en GitHub:
```bash
git clone https://github.com/tu-usuario/s-doorbell.git
cd s-doorbell
```

Si descargaste el ZIP desde v0:
```bash
# Descomprimir el archivo ZIP
# Abrir terminal en la carpeta del proyecto
cd s-doorbell
```

---

### 2. Instalar dependencias

Abre la terminal en la carpeta del proyecto y ejecuta:

**Con npm:**
```bash
npm install
```

**Con pnpm (recomendado):**
```bash
pnpm install
```

Esto instalará todas las dependencias necesarias:
- Next.js 16
- React 19
- Tailwind CSS v4
- Heroicons
- shadcn/ui components

---

### 3. Configurar variables de entorno (opcional)

Si necesitas configurar variables de entorno, crea un archivo `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

O con pnpm:
```bash
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

---

### 5. Probar la aplicación

Una vez que el servidor esté corriendo, podés acceder a:

- **Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard (después de login)
- **QR Code**: http://localhost:3000/qr
- **Perfil**: http://localhost:3000/profile
- **Seguridad**: http://localhost:3000/security
- **Visitas**: http://localhost:3000/visits
- **Bloqueados**: http://localhost:3000/blocked
- **Visitante (web pública)**: http://localhost:3000/visitor

---

## 🏗️ Build para Producción

### Crear build optimizado:

```bash
npm run build
```

### Ejecutar build:

```bash
npm start
```

---

## 🚀 Deploy en Vercel

### Opción 1: Desde v0
1. Hacé clic en el botón **"Publish"** en v0
2. Seguí las instrucciones para conectar con Vercel
3. ¡Listo! Tu app estará en línea

### Opción 2: Desde GitHub
1. Subí tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importá tu repositorio
4. Vercel detectará automáticamente Next.js
5. Hacé clic en **"Deploy"**

### Opción 3: CLI de Vercel
```bash
npm i -g vercel
vercel login
vercel
```

---

## 📦 Dependencias Principales

Todas estas dependencias se instalan automáticamente con `npm install`:

```json
{
  "next": "^16.0.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "tailwindcss": "^4.0.0",
  "@heroicons/react": "^2.1.0",
  "typescript": "^5.0.0"
}
```

---

## 📁 Estructura del Proyecto

```
s-doorbell/
├── app/                      # Páginas de Next.js (App Router)
│   ├── login/               # Página de login
│   ├── dashboard/           # Dashboard principal
│   ├── visit/active/        # Visita activa
│   ├── profile/             # Perfil del usuario
│   ├── qr/                  # Código QR
│   ├── security/            # Configuración de seguridad
│   ├── visits/              # Historial de visitas
│   ├── blocked/             # Visitantes bloqueados
│   ├── visitor/             # Página pública para visitantes
│   ├── change-password/     # Cambiar contraseña
│   └── layout.tsx           # Layout principal
│
├── components/              # Componentes reutilizables
│   ├── app-layout.tsx       # Layout con header y navegación
│   ├── header.tsx           # Header con logo
│   ├── bottom-navigation.tsx # Navegación inferior
│   ├── status-badge.tsx     # Badge de estados
│   ├── primary-button.tsx   # Botón principal
│   ├── visit-alert-card.tsx # Tarjeta de alerta
│   ├── visit-actions.tsx    # Acciones de visita
│   ├── qr-code-card.tsx     # Tarjeta con QR
│   ├── facade-photo-uploader.tsx # Subir foto de fachada
│   ├── home-profile-form.tsx # Formulario de perfil
│   ├── security-settings.tsx # Configuración de seguridad
│   ├── visit-history-list.tsx # Lista de visitas
│   ├── blocked-visitors-list.tsx # Lista de bloqueados
│   └── ui/                  # Componentes base de shadcn
│
├── lib/                     # Utilidades
│   └── utils.ts             # Función cn() para classes
│
├── public/                  # Archivos estáticos
│   └── images/              # Logos e imágenes
│
└── package.json             # Dependencias del proyecto
```

---

## 🎨 Componentes Disponibles

### Componentes Base:
- `<AppLayout>` - Layout principal con header y navegación
- `<Header>` - Encabezado con logo y estado
- `<BottomNavigation>` - Navegación inferior móvil
- `<StatusBadge>` - Badge de estados (activo, esperando, bloqueado, etc.)
- `<PrimaryButton>` - Botón con variantes (default, danger, warning)

### Componentes Funcionales:
- `<VisitAlertCard>` - Alerta de visita en puerta
- `<VisitActions>` - Acciones (pedir ubicación, cortar, bloquear)
- `<QRCodeCard>` - Tarjeta con código QR y descargas
- `<FacadePhotoUploader>` - Subir foto de fachada
- `<HomeProfileForm>` - Formulario de información del hogar
- `<SecuritySettings>` - Configuración de seguridad
- `<VisitHistoryList>` - Lista cronológica de visitas
- `<BlockedVisitorsList>` - Lista de visitantes bloqueados

---

## 🔧 Próximos Pasos

1. **Backend**: Implementar API para autenticación, visitas y QR
2. **Base de datos**: Conectar Supabase o similar para persistencia
3. **Notificaciones**: Integrar push notifications
4. **QR Generation**: Generar QR únicos por usuario
5. **Geolocalización**: Implementar verificación de ubicación real

---

## 🆘 Problemas Comunes

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Puerto 3000 en uso
```bash
# Cambia el puerto
PORT=3001 npm run dev
```

### Tailwind no funciona
Asegúrate de que `app/globals.css` esté importado en `app/layout.tsx`

---

## 📞 Soporte

Si tenés problemas:
1. Revisá esta guía completa
2. Verificá que todas las dependencias estén instaladas
3. Asegurate de usar Node.js 18+

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado (v18+)
- [ ] Proyecto descargado/clonado
- [ ] `npm install` ejecutado correctamente
- [ ] `npm run dev` funciona
- [ ] Accediste a http://localhost:3000
- [ ] Todas las páginas cargan correctamente

---

**¡Listo! Tu instalación de S-Doorbell está completa.**

Para cualquier modificación del código, todos los componentes son reutilizables y están en la carpeta `components/`.
