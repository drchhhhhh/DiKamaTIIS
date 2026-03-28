"use client"

import { useState, useEffect } from "react"
import { Lock, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SealingAnimationProps {
  isSealing: boolean
  onComplete?: () => void
  className?: string
}

export function SealingAnimation({ isSealing, onComplete, className }: SealingAnimationProps) {
  const [stage, setStage] = useState<"idle" | "sealing" | "complete">("idle")

  useEffect(() => {
    if (isSealing) {
      setStage("sealing")
      const timer = setTimeout(() => {
        setStage("complete")
        onComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setStage("idle")
    }
  }, [isSealing, onComplete])

  if (stage === "idle") return null

  return (
    <div className={cn(
      "fixed inset-0 bg-background/90 flex flex-col items-center justify-center z-50 backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center gap-4 p-6">
        {stage === "sealing" ? (
          <>
            <div className="relative">
              <Lock className="w-12 h-12 text-foreground animate-pulse" />
              <Loader2 className="w-16 h-16 text-muted-foreground absolute -top-2 -left-2 animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-mono text-sm text-foreground">Securing record on blockchain...</p>
              <p className="text-xs text-muted-foreground mt-1">Please wait</p>
            </div>
          </>
        ) : (
          <>
            <CheckCircle className="w-12 h-12 text-accent animate-bounce" />
            <div className="text-center">
              <p className="font-mono text-sm text-foreground">Record Sealed!</p>
              <p className="text-xs text-muted-foreground mt-1">Transaction ID: 0x4b2f...8a9c</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
