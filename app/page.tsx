"use client"

import { useState } from "react"
import { PhoneFrame } from "@/components/wireframe/phone-frame"
import { FarmerInterface } from "@/components/wireframe/farmer-interface"
import { AdminInterface } from "@/components/wireframe/admin-interface"
import { ConsumerInterface } from "@/components/wireframe/consumer-interface"
import { Lock, Leaf, Shield, ScanLine, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "farmer" | "admin" | "consumer"

export default function DiKamaTIISPrototype() {
  const [activeTab, setActiveTab] = useState<Tab>("farmer")
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const tabs: { id: Tab; label: string; icon: React.ReactNode; description: string }[] = [
    { 
      id: "farmer", 
      label: "Farmer", 
      icon: <Leaf className="w-4 h-4" />,
      description: "Log harvests & generate digital passports"
    },
    { 
      id: "admin", 
      label: "Inspector", 
      icon: <Shield className="w-4 h-4" />,
      description: "Verify & digitally sign batch records"
    },
    { 
      id: "consumer", 
      label: "Consumer", 
      icon: <ScanLine className="w-4 h-4" />,
      description: "Scan QR to verify authenticity"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">DiKamaTIIS</h1>
                <p className="text-xs text-muted-foreground font-mono">Lo-Fi Prototype</p>
              </div>
            </div>
            
            {/* Desktop tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                    activeTab === tab.id 
                      ? "bg-foreground text-background" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm"
            >
              {tabs.find(t => t.id === activeTab)?.icon}
              {tabs.find(t => t.id === activeTab)?.label}
              <ChevronDown className={cn("w-4 h-4 transition-transform", showMobileMenu && "rotate-180")} />
            </button>
          </div>

          {/* Mobile menu */}
          {showMobileMenu && (
            <nav className="md:hidden mt-3 pt-3 border-t border-border space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setShowMobileMenu(false); }}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-sm text-left flex items-center gap-2 transition-colors",
                    activeTab === tab.id 
                      ? "bg-foreground text-background" 
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="mb-8 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium">Blockchain as a Notary Service</h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Once a farmer logs a harvest, the record is &quot;sealed&quot; on the blockchain. 
                No one can edit the weight, date, or location — ensuring trust and transparency 
                throughout the supply chain.
              </p>
            </div>
          </div>
        </div>

        {/* Active Interface Description */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-1">
            {tabs.find(t => t.id === activeTab)?.label} Interface
          </h2>
          <p className="text-sm text-muted-foreground">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Phone Preview - Single view on mobile, all three on desktop */}
        <div className="flex justify-center">
          {/* Mobile: Show only active */}
          <div className="md:hidden">
            <PhoneFrame label={tabs.find(t => t.id === activeTab)?.label}>
              {activeTab === "farmer" && <FarmerInterface />}
              {activeTab === "admin" && <AdminInterface />}
              {activeTab === "consumer" && <ConsumerInterface />}
            </PhoneFrame>
          </div>

          {/* Desktop: Show all three */}
          <div className="hidden md:flex items-start gap-8">
            <div className={cn(
              "transition-all duration-300",
              activeTab === "farmer" ? "scale-105 z-10" : "opacity-60 scale-95 hover:opacity-80"
            )}>
              <PhoneFrame label="Farmer" className={activeTab !== "farmer" ? "cursor-pointer" : ""}>
                <div onClick={() => activeTab !== "farmer" && setActiveTab("farmer")}>
                  <FarmerInterface />
                </div>
              </PhoneFrame>
            </div>

            <div className={cn(
              "transition-all duration-300",
              activeTab === "admin" ? "scale-105 z-10" : "opacity-60 scale-95 hover:opacity-80"
            )}>
              <PhoneFrame label="Inspector" className={activeTab !== "admin" ? "cursor-pointer" : ""}>
                <div onClick={() => activeTab !== "admin" && setActiveTab("admin")}>
                  <AdminInterface />
                </div>
              </PhoneFrame>
            </div>

            <div className={cn(
              "transition-all duration-300",
              activeTab === "consumer" ? "scale-105 z-10" : "opacity-60 scale-95 hover:opacity-80"
            )}>
              <PhoneFrame label="Consumer" className={activeTab !== "consumer" ? "cursor-pointer" : ""}>
                <div onClick={() => activeTab !== "consumer" && setActiveTab("consumer")}>
                  <ConsumerInterface />
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* Feature Legend */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            title="Immutable Records"
            description="Harvest data is permanently sealed on the blockchain — no edits possible."
            icon={<Lock className="w-5 h-5" />}
          />
          <FeatureCard
            title="Digital Signatures"
            description="Inspectors add their verification as a cryptographic signature."
            icon={<Shield className="w-5 h-5" />}
          />
          <FeatureCard
            title="QR Traceability"
            description="Consumers scan to verify authenticity and view the crop's journey."
            icon={<ScanLine className="w-5 h-5" />}
          />
        </div>

        {/* UX Notes */}
        <div className="mt-12 p-6 bg-muted rounded-lg border border-border">
          <h3 className="text-sm font-mono uppercase tracking-wide text-muted-foreground mb-4">
            UI/UX Notes for Figma
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-medium mb-2">Trust Indicators</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• &quot;Sealing&quot; animation when submitting harvest data</li>
                <li>• Transaction ID shown as digital receipt</li>
                <li>• Lock icons next to sealed timeline entries</li>
                <li>• &quot;Blockchain Verified&quot; badge prominence</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">User Experience</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Offline-capable for field use (farmer)</li>
                <li>• Large touch targets for outdoor use</li>
                <li>• Sariwa (Freshness) meter for quick assessment</li>
                <li>• Farm story creates emotional buyer connection</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>DiKamaTIIS — Digital Kamatis Traceability & Integrity Information System</p>
            <p className="font-mono">Lo-Fi Prototype v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
