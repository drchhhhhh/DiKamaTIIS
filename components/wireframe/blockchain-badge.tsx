"use client"

import { Lock, Shield, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlockchainBadgeProps {
  variant?: "verified" | "sealed" | "pending"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function BlockchainBadge({ variant = "verified", size = "md", className }: BlockchainBadgeProps) {
  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5 gap-1",
    md: "text-xs px-2 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2"
  }

  const iconSizes = {
    sm: 10,
    md: 12,
    lg: 14
  }

  const variants = {
    verified: {
      icon: CheckCircle,
      text: "Blockchain Verified",
      className: "bg-accent text-accent-foreground border-accent"
    },
    sealed: {
      icon: Lock,
      text: "Record Sealed",
      className: "bg-foreground text-background border-foreground"
    },
    pending: {
      icon: Shield,
      text: "Awaiting Seal",
      className: "bg-muted text-muted-foreground border-muted-foreground/30"
    }
  }

  const { icon: Icon, text, className: variantClass } = variants[variant]

  return (
    <div className={cn(
      "inline-flex items-center font-mono uppercase tracking-wide border rounded-full",
      sizeClasses[size],
      variantClass,
      className
    )}>
      <Icon size={iconSizes[size]} />
      <span>{text}</span>
    </div>
  )
}
