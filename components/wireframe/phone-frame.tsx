"use client"

import { cn } from "@/lib/utils"

interface PhoneFrameProps {
  children: React.ReactNode
  label?: string
  className?: string
}

export function PhoneFrame({ children, label, className }: PhoneFrameProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {label && (
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
          {label}
        </span>
      )}
      <div className="relative w-[280px] h-[560px] bg-card border-2 border-foreground rounded-[2rem] shadow-lg overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-xl z-10" />
        {/* Screen content */}
        <div className="absolute inset-2 top-8 bottom-4 bg-background rounded-2xl overflow-hidden border border-border">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-foreground/50 rounded-full" />
      </div>
    </div>
  )
}
