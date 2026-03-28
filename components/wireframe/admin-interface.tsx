"use client"

import { useState } from "react"
import { Check, ChevronRight, MapPin, Clock, Image, User, Search } from "lucide-react"
import { WireframeButton } from "./wireframe-button"
import { BlockchainBadge } from "./blockchain-badge"
import { cn } from "@/lib/utils"

type AdminScreen = "queue" | "detail" | "history"

export function AdminInterface() {
  const [screen, setScreen] = useState<AdminScreen>("queue")
  const [isApproving, setIsApproving] = useState(false)
  const [approved, setApproved] = useState(false)

  const handleApprove = () => {
    setIsApproving(true)
    setTimeout(() => {
      setIsApproving(false)
      setApproved(true)
    }, 1500)
  }

  // Audit Queue Screen
  if (screen === "queue") {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground">Inspector Portal</p>
              <p className="text-xs font-medium">Verification Queue</p>
            </div>
            <button 
              onClick={() => setScreen("history")}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 space-y-3 overflow-auto">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Awaiting Verification</p>
            <span className="text-[10px] font-mono bg-foreground text-background px-1.5 py-0.5 rounded">3</span>
          </div>

          {[
            { id: "BTH-001", farmer: "Juan dela Cruz", location: "Batangas City", time: "2h ago" },
            { id: "BTH-002", farmer: "Maria Santos", location: "Lipa City", time: "4h ago" },
            { id: "BTH-003", farmer: "Pedro Garcia", location: "Tanauan", time: "6h ago" }
          ].map((batch, idx) => (
            <button
              key={batch.id}
              onClick={() => setScreen("detail")}
              className={cn(
                "w-full p-3 rounded-lg border-2 text-left transition-colors hover:bg-muted",
                idx === 0 ? "border-foreground bg-card" : "border-border bg-card"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-mono font-medium">{batch.id}</p>
                    <BlockchainBadge variant="pending" size="sm" />
                  </div>
                  <p className="text-[10px] text-foreground mt-1">{batch.farmer}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{batch.location}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{batch.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Verification Detail Screen
  if (screen === "detail") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={() => { setScreen("queue"); setApproved(false); }} className="text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <p className="text-xs font-medium">Batch Review</p>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-auto">
          {/* Batch Info */}
          <div className="p-3 bg-card rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono font-medium">BTH-2024-0327-001</p>
              <BlockchainBadge variant={approved ? "verified" : "pending"} size="sm" />
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Farmer</span>
                <span>Juan dela Cruz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Variety</span>
                <span>Kamatis Tagalog</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Harvest Time</span>
                <span className="font-mono">Mar 27, 06:32 AM</span>
              </div>
            </div>
          </div>

          {/* GPS Map Placeholder */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Location Verification</p>
            <div className="aspect-video bg-muted rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {/* Grid pattern for map */}
                <div className="w-full h-full" style={{
                  backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
              </div>
              <div className="relative flex flex-col items-center gap-1">
                <MapPin className="w-6 h-6 text-accent" />
                <span className="text-[10px] font-mono">14.5995°N, 120.9842°E</span>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Visual Evidence</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded border border-border flex items-center justify-center">
                  <Image className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Quality Checks</p>
            <div className="space-y-1">
              {["Banana leaf lined", "No bruising", "Standard weight"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[10px]">
                  <Check className="w-3 h-3 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Button */}
          {!approved ? (
            <div className="pt-2">
              <WireframeButton 
                variant="primary" 
                size="lg" 
                className="w-full"
                loading={isApproving}
                onClick={handleApprove}
              >
                {isApproving ? "Signing..." : "Approve & Sign"}
              </WireframeButton>
              <p className="text-[9px] text-center text-muted-foreground mt-2">
                Your digital signature will be sealed
              </p>
            </div>
          ) : (
            <div className="p-3 bg-accent/10 rounded-lg border border-accent">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs font-medium text-accent">Verified</p>
                  <p className="text-[10px] text-muted-foreground">Signed by Inspector #042</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Registry Search Screen
  if (screen === "history") {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={() => setScreen("queue")} className="text-foreground">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <p className="text-xs font-medium">Farmer Registry</p>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search farmer..."
              className="w-full h-8 pl-8 pr-3 text-xs bg-muted border border-border rounded"
            />
          </div>

          {/* Farmer List */}
          <div className="space-y-2">
            {[
              { name: "Juan dela Cruz", batches: 24, trust: 98 },
              { name: "Maria Santos", batches: 18, trust: 95 },
              { name: "Pedro Garcia", batches: 12, trust: 92 }
            ].map((farmer) => (
              <div key={farmer.name} className="p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{farmer.name}</p>
                    <p className="text-[10px] text-muted-foreground">{farmer.batches} verified batches</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-medium text-accent">{farmer.trust}%</p>
                    <p className="text-[10px] text-muted-foreground">Trust</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}
