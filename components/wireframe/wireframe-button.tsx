"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface WireframeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  children: React.ReactNode
}

export function WireframeButton({ 
  variant = "primary", 
  size = "md", 
  loading = false,
  children, 
  className, 
  disabled,
  ...props 
}: WireframeButtonProps) {
  const sizeClasses = {
    sm: "h-7 px-2 text-[10px]",
    md: "h-9 px-3 text-xs",
    lg: "h-11 px-4 text-sm"
  }

  const variantClasses = {
    primary: "bg-foreground text-background border-foreground hover:bg-foreground/90",
    secondary: "bg-muted text-foreground border-border hover:bg-muted/80",
    outline: "bg-transparent text-foreground border-foreground hover:bg-muted",
    ghost: "bg-transparent text-foreground border-transparent hover:bg-muted"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wide border-2 rounded transition-all",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-3 h-3 animate-spin" />}
      {children}
    </button>
  )
}
