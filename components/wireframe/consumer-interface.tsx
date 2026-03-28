"use client"

import { useState } from "react"
import { ScanLine, User, MapPin, ExternalLink, ShieldCheck } from "lucide-react"
import { WireframeButton } from "./wireframe-button"
import { BlockchainBadge } from "./blockchain-badge"
import { ProvenanceTimeline } from "./provenance-timeline"
import { FreshnessMeter } from "./freshness-meter"
import { cn } from "@/lib/utils"

type ConsumerScreen = "scan" | "result"

export function ConsumerInterface() {
  const [screen, setScreen] = useState<ConsumerScreen>("scan")
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setScreen("result")
    }, 1500)
  }

  // QR Scan Screen
  if (screen === "scan") {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border bg-card">
          <p className="text-[10px] font-mono text-muted-foreground">Consumer Portal</p>
          <p className="text-xs font-medium">Verify Product</p>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
          {/* Scanner viewfinder */}
          <div className={cn(
            "w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center relative",
            isScanning ? "border-accent" : "border-foreground"
          )}>
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-foreground" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-foreground" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-foreground" />
            
            {isScanning ? (
              <div className="flex flex-col items-center gap-2">
                <ScanLine className="w-8 h-8 text-accent animate-pulse" />
                <span className="text-[10px] text-accent font-mono">Scanning...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ScanLine className="w-8 h-8" />
                <span className="text-[10px]">Position QR code</span>
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs">Scan the QR tag on the product</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Verify authenticity & freshness
            </p>
          </div>

          <WireframeButton 
            variant="primary" 
            size="lg"
            onClick={handleScan}
            loading={isScanning}
          >
            {isScanning ? "Verifying..." : "Tap to Scan"}
          </WireframeButton>
        </div>
      </div>
    )
  }

  // Result Screen
  if (screen === "result") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={() => setScreen("scan")} className="text-foreground">
            <ScanLine className="w-4 h-4" />
          </button>
          <p className="text-xs font-medium">Product Details</p>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-auto">
          {/* Verification Badge */}
          <div className="flex justify-center">
            <BlockchainBadge variant="verified" size="lg" />
          </div>

          {/* Variety Badge */}
          <div className="p-3 bg-accent/10 rounded-lg border border-accent text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">100% Batangas Native</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Kamatis Tagalog Variety</p>
          </div>

          {/* Freshness Meter */}
          <div className="p-3 bg-card rounded-lg border border-border">
            <FreshnessMeter hours={8} maxHours={72} />
          </div>

          {/* Provenance Timeline */}
          <div className="p-3 bg-card rounded-lg border border-border">
            <p className="text-[10px] font-mono uppercase text-muted-foreground mb-3">Journey</p>
            <ProvenanceTimeline 
              steps={[
                { 
                  icon: "harvest", 
                  title: "Harvested", 
                  subtitle: "Juan dela Cruz Farm",
                  time: "Mar 27, 06:32 AM",
                  sealed: true 
                },
                { 
                  icon: "verify", 
                  title: "Verified", 
                  subtitle: "Inspector Maria R.",
                  time: "Mar 27, 07:15 AM",
                  sealed: true 
                },
                { 
                  icon: "transport", 
                  title: "In Transit", 
                  subtitle: "Batangas → Manila",
                  time: "Mar 27, 08:00 AM",
                  sealed: true 
                },
                { 
                  icon: "store", 
                  title: "Arrived", 
                  subtitle: "SM Supermarket BGC",
                  time: "Mar 27, 02:45 PM",
                  sealed: true 
                }
              ]}
            />
          </div>

          {/* Farm Story */}
          <div className="p-3 bg-card rounded-lg border border-border">
            <p className="text-[10px] font-mono uppercase text-muted-foreground mb-2">Farm Story</p>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium">Juan dela Cruz</p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>Batangas City</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  3rd generation tomato farmer, growing native varieties since 1985.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Proof Link */}
          <button className="w-full p-2 flex items-center justify-center gap-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink className="w-3 h-3" />
            <span className="font-mono">View on Public Ledger</span>
          </button>
        </div>
      </div>
    )
  }

  return null
}
