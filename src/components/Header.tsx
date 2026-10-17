import React, { useState } from "react"
import { Volume2, VolumeX, ShieldCheck, ChevronDown, Sparkles, ArrowRight } from "lucide-react"
import { soundFx } from "../lib/audioEngine"
import { MOCK_MODELS } from "../data/mockData"

interface HeaderProps {
  activeTab: "editorial" | "dashboard" | "studio" | "reserve"
  setActiveTab: (tab: "editorial" | "dashboard" | "studio" | "reserve") => void
  selectedModel: string
  setSelectedModel: (modelId: string) => void
  onOpenReserveModal: () => void
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  onOpenReserveModal
}) => {
  const [isMuted, setIsMuted] = useState(true)
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false)

  const handleSoundToggle = () => {
    const muted = soundFx.toggleMute()
    setIsMuted(muted)
  }

  const currentModel = MOCK_MODELS.find(m => m.id === selectedModel) || MOCK_MODELS[0]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-obsidian/85 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Monogram */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              soundFx.playTick(1200)
              setActiveTab("editorial")
            }}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="relative w-8 h-8 rounded-full border border-champagne/40 flex items-center justify-center bg-obsidian-card group-hover:border-champagne transition-colors">
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse"></span>
              <div className="absolute inset-0 rounded-full border border-champagne/20 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
            <div>
              <span className="font-serif tracking-[0.25em] text-lg font-bold text-alabaster group-hover:text-champagne transition-colors">
                VALENCE
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-smoke">
                Haute Intelligence
              </span>
            </div>
          </button>

          {/* Telemetry Node Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.06] bg-obsidian-surface text-[11px] font-mono text-smoke">
            <span className="w-1.5 h-1.5 rounded-full bg-phosphor"></span>
            <span>ZRH-VAULT // 14.2ms P99</span>
            <span className="text-white/20">|</span>
            <span className="text-champagne">1.4T TENSORS</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-white/[0.07] bg-obsidian-subtle/70">
          <button
            onClick={() => {
              soundFx.playTick(1000)
              setActiveTab("editorial")
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
              activeTab === "editorial"
                ? "bg-alabaster text-obsidian shadow-sm font-semibold"
                : "text-smoke hover:text-alabaster"
            }`}
          >
            Editorial Atelier
          </button>

          <button
            onClick={() => {
              soundFx.playTick(1100)
              setActiveTab("dashboard")
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "dashboard"
                ? "bg-alabaster text-obsidian shadow-sm font-semibold"
                : "text-smoke hover:text-alabaster"
            }`}
          >
            <span>Foundry Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-phosphor"></span>
          </button>

          <button
            onClick={() => {
              soundFx.playTick(1200)
              setActiveTab("studio")
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "studio"
                ? "bg-alabaster text-obsidian shadow-sm font-semibold"
                : "text-smoke hover:text-alabaster"
            }`}
          >
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Latent Studio</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTick(1300)
              setActiveTab("reserve")
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
              activeTab === "reserve"
                ? "bg-alabaster text-obsidian shadow-sm font-semibold"
                : "text-smoke hover:text-alabaster"
            }`}
          >
            Sovereign Reserve
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Active Model Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => {
                soundFx.playTick(800)
                setModelDropdownOpen(!modelDropdownOpen)
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-obsidian-surface hover:border-champagne/40 transition-colors text-xs font-mono text-silver"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentModel.accentColor }}></div>
              <span>{currentModel.name}</span>
              <ChevronDown className="w-3 h-3 text-smoke ml-1" />
            </button>

            {modelDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-white/[0.1] bg-obsidian-elevated/95 backdrop-blur-2xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                    Synthesizer Architecture
                  </span>
                  <span className="text-xs text-silver">Select Model Weight Set</span>
                </div>
                {MOCK_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id)
                      setModelDropdownOpen(false)
                      soundFx.playNeuralBurst()
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      model.id === selectedModel
                        ? "bg-white/[0.06] text-champagne font-medium"
                        : "text-smoke hover:text-alabaster hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-alabaster">{model.name}</div>
                      <div className="font-mono text-[10px] text-smoke">{model.parameterScale}</div>
                    </div>
                    <span className="font-mono text-[10px] text-phosphor">{model.latencyMs}ms</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Ambiance Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Enable Acoustic Feedback" : "Mute Acoustic Feedback"}
            className="p-2.5 rounded-lg border border-white/[0.07] bg-obsidian-surface hover:bg-obsidian-card hover:border-champagne/30 text-smoke hover:text-champagne transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-champagne" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              soundFx.playTick(1400)
              onOpenReserveModal()
            }}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-champagne text-obsidian text-xs font-semibold tracking-wide hover:bg-champagne-light transition-all shadow-lg shadow-champagne/10 active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Request Allocation</span>
            <span className="sm:hidden">Reserve</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Mobile Subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-white/[0.06] bg-obsidian-subtle/90 px-2 py-2">
        <button
          onClick={() => setActiveTab("editorial")}
          className={`text-xs px-3 py-1 rounded-md ${activeTab === "editorial" ? "bg-white/10 text-champagne font-semibold" : "text-smoke"}`}
        >
          Editorial
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`text-xs px-3 py-1 rounded-md ${activeTab === "dashboard" ? "bg-white/10 text-champagne font-semibold" : "text-smoke"}`}
        >
          Foundry
        </button>
        <button
          onClick={() => setActiveTab("studio")}
          className={`text-xs px-3 py-1 rounded-md ${activeTab === "studio" ? "bg-white/10 text-champagne font-semibold" : "text-smoke"}`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab("reserve")}
          className={`text-xs px-3 py-1 rounded-md ${activeTab === "reserve" ? "bg-white/10 text-champagne font-semibold" : "text-smoke"}`}
        >
          Reserve
        </button>
      </div>
    </header>
  )
}
