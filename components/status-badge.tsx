import { cn } from "@/lib/utils"

type StatusType = "active" | "waiting" | "ended" | "blocked" | "location-required" | "do-not-disturb"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig = {
  active: { label: "Activo", className: "bg-green-100 text-green-800 border-green-300" },
  waiting: { label: "Esperando", className: "bg-blue-100 text-blue-800 border-blue-300" },
  ended: { label: "Cortado", className: "bg-gray-100 text-gray-800 border-gray-300" },
  blocked: { label: "Bloqueado", className: "bg-red-100 text-red-800 border-red-300" },
  "location-required": { label: "Ubicación requerida", className: "bg-amber-100 text-amber-800 border-amber-300" },
  "do-not-disturb": { label: "No molestar", className: "bg-purple-100 text-purple-800 border-purple-300" },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
