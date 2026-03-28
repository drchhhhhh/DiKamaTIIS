"use client"

import { Lock, Truck, Store, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineStep {
  icon: "harvest" | "verify" | "transport" | "store"
  title: string
  subtitle: string
  time: string
  sealed?: boolean
}

interface ProvenanceTimelineProps {
  steps: TimelineStep[]
  className?: string
}

const iconMap = {
  harvest: Leaf,
  verify: Lock,
  transport: Truck,
  store: Store
}

export function ProvenanceTimeline({ steps, className }: ProvenanceTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon]
          return (
            <div key={index} className="relative flex items-start gap-3 pl-1">
              <div className={cn(
                "relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center bg-background",
                step.sealed ? "border-accent" : "border-muted-foreground"
              )}>
                <Icon className={cn(
                  "w-3.5 h-3.5",
                  step.sealed ? "text-accent" : "text-muted-foreground"
                )} />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground truncate">{step.title}</span>
                  {step.sealed && (
                    <Lock className="w-2.5 h-2.5 text-accent flex-shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground truncate">{step.subtitle}</p>
                <p className="text-[10px] text-muted-foreground/70 font-mono">{step.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
