import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = "default" | "danger" | "warning" | "secondary"

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: "default" | "lg"
  fullWidth?: boolean
}

const variantStyles = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  danger: "bg-red-600 text-white hover:bg-red-700 border-red-700",
  warning: "bg-amber-500 text-white hover:bg-amber-600 border-amber-600",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, variant = "default", size = "default", fullWidth, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
          fullWidth && "w-full",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

PrimaryButton.displayName = "PrimaryButton"

// Export both default and named export for compatibility
export default PrimaryButton
export { PrimaryButton }
