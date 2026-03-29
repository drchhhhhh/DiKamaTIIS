"use client"

import { useState } from "react"
import { ScanLine, User, MapPin, ExternalLink, ShieldCheck, X, ChevronLeft, Package } from "lucide-react"
import { WireframeButton } from "./wireframe-button"
import { BlockchainBadge } from "./blockchain-badge"
import { ProvenanceTimeline } from "./provenance-timeline"
import { FreshnessMeter } from "./freshness-meter"
import { cn } from "@/lib/utils"

type ConsumerScreen = "map" | "scan" | "farmer-batches" | "batch-detail"

// Mock farmer data with locations in Batangas
const MOCK_FARMERS = [
  {
    id: "farmer-1",
    name: "Juan dela Cruz",
    location: "Batangas City",
    coordinates: { x: 55, y: 45 },
    trustScore: 98,
    totalBatches: 24,
    batches: [
      {
        id: "BTG-2024-0892",
        variety: "Kamatis Tagalog",
        weight: "45 kg",
        harvestDate: "Mar 27, 2024",
        harvestTime: "06:32 AM",
        status: "verified",
        hoursSinceHarvest: 8,
        timeline: [
          { icon: "harvest" as const, title: "Harvested", subtitle: "Juan dela Cruz Farm", time: "Mar 27, 06:32 AM", sealed: true },
          { icon: "verify" as const, title: "Verified", subtitle: "Inspector Maria R.", time: "Mar 27, 07:15 AM", sealed: true },
          { icon: "transport" as const, title: "In Transit", subtitle: "Batangas → Manila", time: "Mar 27, 08:00 AM", sealed: true },
          { icon: "store" as const, title: "Arrived", subtitle: "SM Supermarket BGC", time: "Mar 27, 02:45 PM", sealed: true }
        ]
      },
      {
        id: "BTG-2024-0891",
        variety: "Cherry Tomato",
        weight: "20 kg",
        harvestDate: "Mar 26, 2024",
        harvestTime: "07:00 AM",
        status: "verified",
        hoursSinceHarvest: 32,
        timeline: [
          { icon: "harvest" as const, title: "Harvested", subtitle: "Juan dela Cruz Farm", time: "Mar 26, 07:00 AM", sealed: true },
          { icon: "verify" as const, title: "Verified", subtitle: "Inspector Maria R.", time: "Mar 26, 08:00 AM", sealed: true },
          { icon: "store" as const, title: "Delivered", subtitle: "Local Market", time: "Mar 26, 10:30 AM", sealed: true }
        ]
      }
    ]
  },
  {
    id: "farmer-2",
    name: "Maria Santos",
    location: "Lipa City",
    coordinates: { x: 35, y: 25 },
    trustScore: 95,
    totalBatches: 18,
    batches: [
      {
        id: "BTG-2024-0890",
        variety: "Roma Tomato",
        weight: "60 kg",
        harvestDate: "Mar 27, 2024",
        harvestTime: "05:45 AM",
        status: "verified",
        hoursSinceHarvest: 10,
        timeline: [
          { icon: "harvest" as const, title: "Harvested", subtitle: "Santos Family Farm", time: "Mar 27, 05:45 AM", sealed: true },
          { icon: "verify" as const, title: "Verified", subtitle: "Inspector Jose L.", time: "Mar 27, 06:30 AM", sealed: true },
          { icon: "transport" as const, title: "In Transit", subtitle: "Lipa → Makati", time: "Mar 27, 07:00 AM", sealed: true }
        ]
      }
    ]
  },
  {
    id: "farmer-3",
    name: "Pedro Reyes",
    location: "Tanauan",
    coordinates: { x: 45, y: 15 },
    trustScore: 92,
    totalBatches: 31,
    batches: [
      {
        id: "BTG-2024-0889",
        variety: "Kamatis Tagalog",
        weight: "35 kg",
        harvestDate: "Mar 27, 2024",
        harvestTime: "06:00 AM",
        status: "verified",
        hoursSinceHarvest: 9,
        timeline: [
          { icon: "harvest" as const, title: "Harvested", subtitle: "Reyes Organic Farm", time: "Mar 27, 06:00 AM", sealed: true },
          { icon: "verify" as const, title: "Verified", subtitle: "Inspector Ana M.", time: "Mar 27, 07:00 AM", sealed: true }
        ]
      }
    ]
  },
  {
    id: "farmer-4",
    name: "Rosa Mendoza",
    location: "San Jose",
    coordinates: { x: 70, y: 60 },
    trustScore: 97,
    totalBatches: 42,
    batches: [
      {
        id: "BTG-2024-0888",
        variety: "Beefsteak Tomato",
        weight: "50 kg",
        harvestDate: "Mar 27, 2024",
        harvestTime: "05:30 AM",
        status: "verified",
        hoursSinceHarvest: 11,
        timeline: [
          { icon: "harvest" as const, title: "Harvested", subtitle: "Mendoza Heritage Farm", time: "Mar 27, 05:30 AM", sealed: true },
          { icon: "verify" as const, title: "Verified", subtitle: "Inspector Maria R.", time: "Mar 27, 06:15 AM", sealed: true },
          { icon: "transport" as const, title: "In Transit", subtitle: "San Jose → QC", time: "Mar 27, 07:30 AM", sealed: true },
          { icon: "store" as const, title: "Arrived", subtitle: "Robinsons Galleria", time: "Mar 27, 01:00 PM", sealed: true }
        ]
      }
    ]
  },
  {
    id: "farmer-5",
    name: "Carlos Villanueva",
    location: "Nasugbu",
    coordinates: { x: 20, y: 70 },
    trustScore: 89,
    totalBatches: 15,
    batches: [
      {
        id: "BTG-2024-0887",
        variety: "Grape Tomato",
        weight: "25 kg",
        harvestDate: "Mar 27, 2024",
        harvestTime: "06:15 AM",
        status: "pending",
        hoursSinceHarvest: 9,
        timeline: [
          { icon: "harvest" as const, title: "Harvested", subtitle: "Villanueva Farm", time: "Mar 27, 06:15 AM", sealed: true },
          { icon: "verify" as const, title: "Pending Verification", subtitle: "Awaiting inspector", time: "—", sealed: false }
        ]
      }
    ]
  }
]

type Farmer = typeof MOCK_FARMERS[0]
type Batch = Farmer["batches"][0]

export function ConsumerInterface() {
  const [screen, setScreen] = useState<ConsumerScreen>("map")
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      // Mock: select a random batch after scanning
      const farmer = MOCK_FARMERS[0]
      const batch = farmer.batches[0]
      setSelectedFarmer(farmer)
      setSelectedBatch(batch)
      setScreen("batch-detail")
    }, 1500)
  }

  const handleFarmerClick = (farmer: Farmer) => {
    setSelectedFarmer(farmer)
    setScreen("farmer-batches")
  }

  const handleBatchClick = (batch: Batch) => {
    setSelectedBatch(batch)
    setScreen("batch-detail")
  }

  const handleBack = () => {
    if (screen === "batch-detail") {
      if (selectedFarmer) {
        setScreen("farmer-batches")
      } else {
        setScreen("map")
      }
      setSelectedBatch(null)
    } else if (screen === "farmer-batches") {
      setScreen("map")
      setSelectedFarmer(null)
    } else if (screen === "scan") {
      setScreen("map")
    }
  }

  // Map Screen (Landing)
  if (screen === "map") {
    return (
      <div className="h-full flex flex-col">
        {/* Header with QR button */}
        <div className="p-3 border-b border-border bg-card flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono text-muted-foreground">Consumer Portal</p>
            <p className="text-xs font-medium">Batangas Farmers</p>
          </div>
          <button 
            onClick={() => setScreen("scan")}
            className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center"
          >
            <ScanLine className="w-4 h-4" />
          </button>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-muted/50">
          {/* Simplified Batangas Map Outline */}
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Batangas province outline (simplified) */}
            <path 
              d="M15 20 L40 10 L60 12 L80 25 L85 45 L80 70 L60 85 L35 80 L15 65 L10 40 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
              strokeDasharray="2,2"
            />
            
            {/* Province label */}
            <text x="50" y="50" textAnchor="middle" className="text-[4px] fill-muted-foreground font-mono uppercase">
              Batangas
            </text>

            {/* Farmer location pins */}
            {MOCK_FARMERS.map((farmer) => (
              <g 
                key={farmer.id} 
                className="cursor-pointer"
                onClick={() => handleFarmerClick(farmer)}
              >
                {/* Pin shadow */}
                <ellipse 
                  cx={farmer.coordinates.x} 
                  cy={farmer.coordinates.y + 3} 
                  rx="3" 
                  ry="1" 
                  className="fill-foreground/20"
                />
                {/* Pin body */}
                <circle 
                  cx={farmer.coordinates.x} 
                  cy={farmer.coordinates.y} 
                  r="4"
                  className={cn(
                    "transition-all",
                    farmer.batches.some(b => b.status === "pending") 
                      ? "fill-warning stroke-warning" 
                      : "fill-accent stroke-accent"
                  )}
                  strokeWidth="1"
                />
                {/* Pin inner dot */}
                <circle 
                  cx={farmer.coordinates.x} 
                  cy={farmer.coordinates.y} 
                  r="1.5"
                  className="fill-background"
                />
                {/* Batch count badge */}
                <circle 
                  cx={farmer.coordinates.x + 3} 
                  cy={farmer.coordinates.y - 3} 
                  r="2.5"
                  className="fill-foreground"
                />
                <text 
                  x={farmer.coordinates.x + 3} 
                  y={farmer.coordinates.y - 2} 
                  textAnchor="middle" 
                  className="text-[2.5px] fill-background font-medium"
                >
                  {farmer.batches.length}
                </text>
              </g>
            ))}
          </svg>

          {/* Map Legend */}
          <div className="absolute bottom-2 left-2 right-2 p-2 bg-card/90 rounded-lg border border-border">
            <div className="flex items-center justify-between text-[9px]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-muted-foreground">Pending</span>
                </div>
              </div>
              <span className="text-muted-foreground font-mono">
                {MOCK_FARMERS.length} Farmers
              </span>
            </div>
          </div>
        </div>

        {/* Farmer List Preview */}
        <div className="p-2 border-t border-border bg-card">
          <p className="text-[9px] font-mono uppercase text-muted-foreground mb-2">Nearby Farmers</p>
          <div className="space-y-1.5 max-h-24 overflow-auto">
            {MOCK_FARMERS.slice(0, 3).map((farmer) => (
              <button
                key={farmer.id}
                onClick={() => handleFarmerClick(farmer)}
                className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium truncate">{farmer.name}</p>
                  <p className="text-[9px] text-muted-foreground">{farmer.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono">{farmer.batches.length}</p>
                  <p className="text-[8px] text-muted-foreground">batches</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // QR Scan Screen
  if (screen === "scan") {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={handleBack} className="text-foreground">
            <X className="w-4 h-4" />
          </button>
          <p className="text-xs font-medium">Scan QR Code</p>
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

  // Farmer Batches Screen
  if (screen === "farmer-batches" && selectedFarmer) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <button onClick={handleBack} className="text-foreground">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-xs font-medium">Farmer Profile</p>
          </div>
        </div>

        {/* Farmer Info */}
        <div className="p-3 border-b border-border bg-card">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{selectedFarmer.name}</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{selectedFarmer.location}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="text-center">
                  <p className="text-xs font-mono font-medium">{selectedFarmer.trustScore}%</p>
                  <p className="text-[8px] text-muted-foreground">Trust</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-mono font-medium">{selectedFarmer.totalBatches}</p>
                  <p className="text-[8px] text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Batches List */}
        <div className="flex-1 p-3 overflow-auto">
          <p className="text-[9px] font-mono uppercase text-muted-foreground mb-2">
            Active Batches ({selectedFarmer.batches.length})
          </p>
          <div className="space-y-2">
            {selectedFarmer.batches.map((batch) => (
              <button
                key={batch.id}
                onClick={() => handleBatchClick(batch)}
                className="w-full p-3 bg-card rounded-lg border border-border text-left hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[10px] font-mono">{batch.id}</span>
                  </div>
                  <BlockchainBadge 
                    variant={batch.status === "verified" ? "sealed" : "pending"} 
                    size="sm" 
                  />
                </div>
                <p className="text-xs font-medium">{batch.variety}</p>
                <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                  <span>{batch.weight}</span>
                  <span>{batch.harvestDate}</span>
                </div>
                {batch.status === "verified" && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <FreshnessMeter hours={batch.hoursSinceHarvest} maxHours={72} compact />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* QR Button (always accessible) */}
        <div className="p-3 border-t border-border bg-card">
          <button 
            onClick={() => setScreen("scan")}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-dashed border-border text-[10px] text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          >
            <ScanLine className="w-4 h-4" />
            <span>Or scan a product QR code</span>
          </button>
        </div>
      </div>
    )
  }

  // Batch Detail Screen
  if (screen === "batch-detail" && selectedBatch) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-border bg-card flex items-center gap-2">
          <button onClick={handleBack} className="text-foreground">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="text-xs font-medium">Batch Details</p>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-auto">
          {/* Verification Badge */}
          <div className="flex justify-center">
            <BlockchainBadge 
              variant={selectedBatch.status === "verified" ? "verified" : "pending"} 
              size="lg" 
            />
          </div>

          {/* Batch ID */}
          <div className="text-center">
            <p className="text-[10px] font-mono text-muted-foreground">Batch ID</p>
            <p className="text-xs font-mono font-medium">{selectedBatch.id}</p>
          </div>

          {/* Variety Badge */}
          <div className="p-3 bg-accent/10 rounded-lg border border-accent text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-accent">100% Batangas Native</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{selectedBatch.variety}</p>
          </div>

          {/* Freshness Meter */}
          {selectedBatch.status === "verified" && (
            <div className="p-3 bg-card rounded-lg border border-border">
              <FreshnessMeter hours={selectedBatch.hoursSinceHarvest} maxHours={72} />
            </div>
          )}

          {/* Harvest Info */}
          <div className="p-3 bg-card rounded-lg border border-border">
            <p className="text-[10px] font-mono uppercase text-muted-foreground mb-2">Harvest Info</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[9px] text-muted-foreground">Weight</p>
                <p className="text-xs font-medium">{selectedBatch.weight}</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground">Date</p>
                <p className="text-xs font-medium">{selectedBatch.harvestDate}</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground">Time</p>
                <p className="text-xs font-medium">{selectedBatch.harvestTime}</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground">Variety</p>
                <p className="text-xs font-medium">{selectedBatch.variety}</p>
              </div>
            </div>
          </div>

          {/* Provenance Timeline */}
          <div className="p-3 bg-card rounded-lg border border-border">
            <p className="text-[10px] font-mono uppercase text-muted-foreground mb-3">Journey</p>
            <ProvenanceTimeline steps={selectedBatch.timeline} />
          </div>

          {/* Farm Story (if farmer selected) */}
          {selectedFarmer && (
            <div className="p-3 bg-card rounded-lg border border-border">
              <p className="text-[10px] font-mono uppercase text-muted-foreground mb-2">Farm Story</p>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium">{selectedFarmer.name}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedFarmer.location}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Trust Score: {selectedFarmer.trustScore}%
                  </p>
                </div>
              </div>
            </div>
          )}

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
