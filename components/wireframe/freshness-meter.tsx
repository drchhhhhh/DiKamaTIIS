"use client"

import { cn } from "@/lib/utils"

interface FreshnessMeterProps {
  hours: number
  maxHours?: number
  className?: string
}

export function FreshnessMeter({ hours, maxHours = 72, className }: FreshnessMeterProps) {
  const percentage = Math.min((hours / maxHours) * 100, 100)
  
  const getColor = () => {
    if (percentage < 33) return "bg-accent" // Green - Fresh
    if (percentage < 66) return "bg-warning" // Yellow - OK
    return "bg-destructive" // Red - Old
  }

  const getLabel = () => {
    if (percentage < 33) return "SARIWA"
    if (percentage < 66) return "OK"
    return "HINDI NA SARIWA"
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-mono uppercase tracking-wide text-muted-foreground">Freshness Index</span>
        <span className="font-mono font-medium text-foreground">{hours}h since harvest</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
        <div 
          className={cn("h-full transition-all duration-500 rounded-full", getColor())}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-[9px] font-mono text-muted-foreground">
        <span>0h</span>
        <span className={cn(
          "font-medium uppercase",
          percentage < 33 ? "text-accent" : percentage < 66 ? "text-warning" : "text-destructive"
        )}>
          {getLabel()}
        </span>
        <span>{maxHours}h</span>
      </div>
    </div>
  )
}
