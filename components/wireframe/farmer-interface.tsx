"use client"

import { useState } from "react"
import { Camera, MapPin, Check, ChevronRight, QrCode, Leaf } from "lucide-react"
import { WireframeButton } from "./wireframe-button"
import { BlockchainBadge } from "./blockchain-badge"
import { SealingAnimation } from "./sealing-animation"
import { cn } from "@/lib/utils"

type FarmerScreen = "home" | "batch" | "photo" | "checklist" | "qr"

interface FarmerInterfaceProps {
  onScreenChange?: (screen: FarmerScreen) => void
}

export function FarmerInterface({ onScreenChange }: FarmerInterfaceProps) {
  const [screen, setScreen] = useState<FarmerScreen>("home")
  const [isSealing, setIsSealing] = useState(false)
  const [checklist, setChecklist] = useState({
    bananaLeaves: false,
    noBruising: false,
    properWeight: false
  })

  const handleScreenChange = (newScreen: FarmerScreen) => {
    setScreen(newScreen)
    onScreenChange?.(newScreen)
  }

  const handleSeal = () => {
    setIsSealing(true)
  }

  const handleSealComplete = () => {
    setTimeout(() => {
      setIsSealing(false)
      handleScreenChange("qr")
    }, 1500)
  }

  // Home Screen
  if (screen === "home") {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted border-2 border-foreground flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground">Welcome back</p>
              <p className="text-xs font-medium">Juan dela Cruz</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 space-y-3 overflow-auto">
          <div className="text-center py-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">DiKamaTIIS</p>
            <h1 className="text-sm font-medium mt-1">Digital Passport System</h1>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Quick Actions</p>
            
            <button 
              onClick={() => handleScreenChange("batch")}
              className="w-full p-3 bg-card border-2 border-foreground rounded-lg flex items-center justify-between hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border-2 border-dashed border-foreground flex items-center justify-center">
                  <span className="text-lg">+</span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium">New Harvest Batch</p>
                  <p className="text-[10px] text-muted-foreground">Start digital passport</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Batches */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Recent Batches</p>
            
            {[
              { id: "BTH-001", status: "sealed", date: "Mar 26" },
              { id: "BTH-002", status: "pending", date: "Mar 25" }
            ].map((batch) => (
              <div key={batch.id} className="p-2 bg-muted rounded border border-border flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono">{batch.id}</p>
                  <p className="text-[10px] text-muted-foreground">{batch.date}</p>
                </div>
                <BlockchainBadge 
                  variant={batch.status === "sealed" ? "sealed" : "pending"} 
                  size="sm" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Batch Onboarding Screen
  if (screen === "batch") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={() => handleScreenChange("home")} className="text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <p className="text-xs font-medium">New Batch</p>
        </div>

        <div className="flex-1 p-3 space-y-4 overflow-auto">
          {/* Crop Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-muted-foreground">Crop Variety</label>
            <div className="p-3 bg-muted border-2 border-foreground rounded flex items-center justify-between">
              <span className="text-xs">Kamatis Tagalog</span>
              <Check className="w-4 h-4 text-accent" />
            </div>
          </div>

          {/* Plot Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-muted-foreground">Field / Plot</label>
            <div className="p-3 bg-card border border-border rounded">
              <span className="text-xs text-muted-foreground">Plot A - North Field</span>
            </div>
          </div>

          {/* GPS Lock */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-muted-foreground">Location</label>
            <div className="p-3 bg-muted rounded border border-border flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <div>
                <p className="text-[10px]">14.5995° N, 120.9842° E</p>
                <p className="text-[10px] text-muted-foreground">Batangas City</p>
              </div>
            </div>
          </div>

          {/* Timestamp Button */}
          <div className="pt-4">
            <WireframeButton 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={() => handleScreenChange("photo")}
            >
              <MapPin className="w-3 h-3" />
              Lock Timestamp & GPS
            </WireframeButton>
            <p className="text-[9px] text-center text-muted-foreground mt-2">
              This action will seal your harvest time
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Photo Capture Screen
  if (screen === "photo") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={() => handleScreenChange("batch")} className="text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <p className="text-xs font-medium">Visual Evidence</p>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-auto">
          <p className="text-[10px] font-mono uppercase text-muted-foreground">Capture Photos</p>
          
          {/* Camera viewfinder placeholder */}
          <div className="aspect-[4/3] bg-muted border-2 border-dashed border-foreground rounded-lg flex flex-col items-center justify-center gap-2">
            <Camera className="w-8 h-8 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">Tap to capture</p>
          </div>

          {/* Photo grid placeholder */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-muted border border-border rounded flex items-center justify-center">
                {i === 1 ? (
                  <Check className="w-4 h-4 text-accent" />
                ) : (
                  <span className="text-[10px] text-muted-foreground">+</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-[9px] text-muted-foreground text-center">
            Take photos of crates showing ripeness and quantity
          </p>

          <WireframeButton 
            variant="primary" 
            className="w-full mt-4"
            onClick={() => handleScreenChange("checklist")}
          >
            Continue
          </WireframeButton>
        </div>
      </div>
    )
  }

  // Packing Checklist Screen
  if (screen === "checklist") {
    const allChecked = Object.values(checklist).every(Boolean)
    
    return (
      <div className="h-full flex flex-col">
        <SealingAnimation isSealing={isSealing} onComplete={handleSealComplete} />
        
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={() => handleScreenChange("photo")} className="text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <p className="text-xs font-medium">Packing Checklist</p>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-auto">
          <p className="text-[10px] font-mono uppercase text-muted-foreground">Quality Standards</p>
          
          {[
            { key: "bananaLeaves", label: "Crates lined with banana leaves" },
            { key: "noBruising", label: "No bruising detected" },
            { key: "properWeight", label: "Weight within standard (5-7kg/crate)" }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setChecklist(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof checklist] }))}
              className={cn(
                "w-full p-3 rounded border-2 flex items-center gap-3 transition-colors",
                checklist[item.key as keyof typeof checklist] 
                  ? "bg-accent/10 border-accent" 
                  : "bg-card border-border"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center",
                checklist[item.key as keyof typeof checklist] 
                  ? "bg-accent border-accent" 
                  : "border-muted-foreground"
              )}>
                {checklist[item.key as keyof typeof checklist] && (
                  <Check className="w-3 h-3 text-accent-foreground" />
                )}
              </div>
              <span className="text-xs text-left">{item.label}</span>
            </button>
          ))}

          <div className="pt-4">
            <WireframeButton 
              variant="primary" 
              size="lg" 
              className="w-full"
              disabled={!allChecked}
              onClick={handleSeal}
            >
              Seal Record on Blockchain
            </WireframeButton>
            <p className="text-[9px] text-center text-muted-foreground mt-2">
              {allChecked ? "Ready to seal permanently" : "Complete all checks to continue"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // QR Code Screen
  if (screen === "qr") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={() => handleScreenChange("home")} className="text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <p className="text-xs font-medium">Digital Passport</p>
        </div>

        <div className="flex-1 p-3 flex flex-col items-center justify-center gap-4 overflow-auto">
          <BlockchainBadge variant="sealed" size="lg" />
          
          <div className="w-36 h-36 bg-foreground rounded-lg p-2">
            <div className="w-full h-full bg-background rounded flex items-center justify-center">
              <QrCode className="w-20 h-20 text-foreground" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-mono text-muted-foreground">Batch ID</p>
            <p className="text-xs font-medium font-mono">BTH-2024-0327-001</p>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-mono text-muted-foreground">Transaction ID</p>
            <p className="text-[10px] font-mono text-foreground/70">0x4b2f89c3...8a9c12d7</p>
          </div>

          <div className="w-full pt-4 space-y-2">
            <WireframeButton variant="outline" className="w-full">
              Print QR Tag
            </WireframeButton>
            <WireframeButton variant="ghost" className="w-full" onClick={() => handleScreenChange("home")}>
              Done
            </WireframeButton>
          </div>
        </div>
      </div>
    )
  }

  return null
}
