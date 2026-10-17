import React, { useState, useEffect } from "react"
import { 
  Server, Cpu, Activity, Zap, CheckCircle2, 
  Terminal, ShieldCheck, ArrowRight, Gauge, 
  RefreshCw, Globe, ChevronRight, Filter
} from "lucide-react"
import { MOCK_COMPUTE_NODES, MOCK_LIVE_TELEMETRY, MOCK_MODELS } from "../data/mockData"
import { ComputeNode } from "../types"
import { soundFx } from "../lib/audioEngine"

interface DashboardViewProps {
  onOpenReserveModal: () => void
  onEnterStudioWithModel: (modelId: string) => void
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenReserveModal,
  onEnterStudioWithModel
}) => {
  const [selectedNode, setSelectedNode] = useState<ComputeNode>(MOCK_COMPUTE_NODES[0])
  const [telemetryEvents, setTelemetryEvents] = useState(MOCK_LIVE_TELEMETRY)
  const [activePipelineStage, setActivePipelineStage] = useState<number>(1)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Live telemetry pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${Math.floor(Math.random() * 900 + 100)}`
      
      const sampleEvents = [
        { cluster: "ZRH-VAULT-01", event: "Calculated anisotropic balance spring stress: 0.0012mm tolerance", latency: "13.4ms", status: "converged" },
        { cluster: "CDG-ATELIER-02", event: "Air-gapped LVMH confidential tenant session synchronized", latency: "6.1ms", status: "optimal" },
        { cluster: "HND-QUANTUM-04", event: "Cauchy dispersion spectrum mapped for emerald micro-facets", latency: "10.8ms", status: "optimal" },
        { cluster: "JFK-PRIME-08", event: "Compiled 112,000 geometry tokens to native Parasolid CAD", latency: "28.4ms", status: "completed" },
        { cluster: "ZRH-VAULT-01", event: "Sub-surface photonic scattering convergence achieved at 0.00018 delta", latency: "15.1ms", status: "converged" }
      ]
      
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)]
      
      setTelemetryEvents(prev => [
        { time: timeStr, ...randomEvent },
        ...prev.slice(0, 7)
      ])
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    soundFx.playNeuralBurst()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 800)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header and Command Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-champagne mb-2">
            <span className="w-2 h-2 rounded-full bg-phosphor animate-ping"></span>
            <span>MISSION CONTROL // SOVEREIGN TELEMETRY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-alabaster tracking-tight">
            Foundry Platform Intelligence
          </h2>
          <p className="text-smoke text-sm sm:text-base mt-2 max-w-2xl font-light">
            Real-time telemetry, global GPU allocation, and pipeline orchestrations across our Swiss, Japanese, French, and North American private nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualRefresh}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/[0.08] bg-obsidian-surface hover:bg-obsidian-card hover:border-champagne/40 text-xs font-mono text-silver transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-champagne ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Sync Telemetry</span>
          </button>

          <button
            onClick={() => {
              soundFx.playTick(1300)
              onOpenReserveModal()
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-champagne text-obsidian text-xs font-semibold hover:bg-champagne-light transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Cluster SLA</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-white/[0.08] bg-obsidian-surface/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-smoke text-xs font-mono">
            <span>TOTAL COMPUTE</span>
            <Server className="w-4 h-4 text-champagne" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-alabaster mt-2">61.8 PFLOPS</div>
          <div className="text-[11px] font-mono text-phosphor mt-1 flex items-center gap-1">
            <span>● 10,752 GPUs ONLINE</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-white/[0.08] bg-obsidian-surface/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-smoke text-xs font-mono">
            <span>GLOBAL P99 LATENCY</span>
            <Activity className="w-4 h-4 text-phosphor" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-alabaster mt-2">14.2 ms</div>
          <div className="text-[11px] font-mono text-smoke mt-1">Direct Fiber Backhaul</div>
        </div>

        <div className="p-5 rounded-xl border border-white/[0.08] bg-obsidian-surface/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-smoke text-xs font-mono">
            <span>SYNTHESIS CALLS (24H)</span>
            <Zap className="w-4 h-4 text-champagne" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-alabaster mt-2">148,920</div>
          <div className="text-[11px] font-mono text-phosphor mt-1">99.98% Convergence SLA</div>
        </div>

        <div className="p-5 rounded-xl border border-white/[0.08] bg-obsidian-surface/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-smoke text-xs font-mono">
            <span>CAD ACCURACY TOLERANCE</span>
            <Gauge className="w-4 h-4 text-silver" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-alabaster mt-2">0.0018 mm</div>
          <div className="text-[11px] font-mono text-champagne mt-1">Physical Tolerances Verified</div>
        </div>
      </div>

      {/* Cluster Nodes & Active Tenant Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Cluster Selector & Detail */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl text-alabaster flex items-center gap-2">
              <Globe className="w-4 h-4 text-champagne" />
              <span>Sovereign Datacenter Vaults</span>
            </h3>
            <span className="text-xs font-mono text-smoke">SELECT NODE TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOCK_COMPUTE_NODES.map((node) => {
              const isSelected = node.id === selectedNode.id
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    soundFx.playTick(900)
                    setSelectedNode(node)
                  }}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-champagne bg-obsidian-card shadow-lg shadow-champagne/5 ring-1 ring-champagne/30"
                      : "border-white/[0.08] bg-obsidian-surface hover:border-white/[0.18] hover:bg-obsidian-card/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-alabaster">{node.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      node.status === "optimal"
                        ? "bg-phosphor/10 text-phosphor border border-phosphor/20"
                        : "bg-champagne/10 text-champagne border border-champagne/20"
                    }`}>
                      {node.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-smoke mt-1">{node.location}</div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-smoke">UTILIZATION</span>
                    <span className="text-silver font-semibold">{node.utilization}%</span>
                  </div>

                  {/* Utilization bar */}
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="bg-champagne h-full rounded-full transition-all duration-500" 
                      style={{ width: `${node.utilization}%` }}
                    ></div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Node Deep Inspector Card */}
          <div className="p-6 rounded-2xl border border-white/[0.1] bg-obsidian-card/80 backdrop-blur-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-champagne block">
                  Vault Deep Telemetry
                </span>
                <h4 className="font-serif text-lg text-alabaster font-semibold">{selectedNode.location} ({selectedNode.code})</h4>
              </div>
              <span className="font-mono text-xs text-phosphor px-3 py-1 rounded-full bg-phosphor/10 border border-phosphor/20 self-start sm:self-auto">
                {selectedNode.tier} Tier
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <div className="text-smoke text-[10px]">HARDWARE FABRIC</div>
                <div className="text-alabaster font-medium mt-1">{selectedNode.gpuCount.toLocaleString()} x {selectedNode.gpuType}</div>
              </div>
              <div>
                <div className="text-smoke text-[10px]">CORE THERMALS</div>
                <div className="text-alabaster font-medium mt-1">{selectedNode.temperatureC}°C (Sub-ambient)</div>
              </div>
              <div>
                <div className="text-smoke text-[10px]">FIBER PING</div>
                <div className="text-phosphor font-medium mt-1">{selectedNode.pingMs} ms</div>
              </div>
              <div>
                <div className="text-smoke text-[10px]">POWER SOURCE</div>
                <div className="text-silver font-medium mt-1">{selectedNode.powerEfficiency}</div>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-4">
              <span className="font-mono text-[10px] text-smoke uppercase tracking-wider block mb-2">
                Active Encrypted Maison Tenants
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedNode.activeClients.map((client, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded border border-white/[0.08] bg-obsidian-surface text-[11px] font-mono text-silver"
                  >
                    🔒 {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Telemetry Terminal Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl text-alabaster flex items-center gap-2">
              <Terminal className="w-4 h-4 text-phosphor" />
              <span>Realtime Synthesizer Event Stream</span>
            </h3>
            <span className="w-2 h-2 rounded-full bg-phosphor animate-pulse"></span>
          </div>

          <div className="rounded-2xl border border-white/[0.1] bg-obsidian/90 p-4 font-mono text-xs backdrop-blur-xl h-[440px] flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-[11px] text-smoke">
              <span>TIME / ORIGIN</span>
              <span>EVENT / DISPATCH</span>
              <span>LATENCY</span>
            </div>

            {/* Event list */}
            <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1">
              {telemetryEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-white/[0.04] bg-obsidian-surface/60 hover:bg-obsidian-card transition-colors flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-smoke">{evt.time}</span>
                    <span className="text-champagne font-bold">{evt.cluster}</span>
                  </div>
                  <div className="text-silver text-[11px] leading-relaxed font-sans">{evt.event}</div>
                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="text-phosphor uppercase">{evt.status}</span>
                    <span className="text-smoke">{evt.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Command Prompt Line */}
            <div className="border-t border-white/[0.08] pt-3 flex items-center gap-2 text-smoke text-[11px]">
              <span className="text-champagne">valence@sovereign:~$</span>
              <span className="text-silver animate-pulse">monitoring active latent manifolds...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Pipeline Visualizer */}
      <div className="p-8 rounded-2xl border border-white/[0.1] bg-obsidian-card/60 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-champagne block">
              Multi-Stage Computational Synthesis
            </span>
            <h3 className="font-serif text-2xl text-alabaster">Haute Pipeline Architecture</h3>
          </div>
          <span className="text-xs font-mono text-smoke">CLICK STAGE TO INSPECT INTERNAL LOGIC</span>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Multimodal Perception",
              subtitle: "Tokenizes 3D CAD, scans, historical house archives & textural briefs.",
              solver: "VO-4.2 Tensor Attention",
              tokens: "2.04M Context",
              color: "#D4AF37"
            },
            {
              step: "02",
              title: "Latent Manifold Warp",
              subtitle: "Solves non-Euclidean geometry and physical kinematic stress tensors.",
              solver: "Continuous Navier-Stokes",
              tokens: "0.0018mm Tolerance",
              color: "#2DD4BF"
            },
            {
              step: "03",
              title: "Photonic Subsurface",
              subtitle: "Full-spectral raymarching of anisotropic metals, caustics & birefringence.",
              solver: "Cauchy Spectral Solver",
              tokens: "320 Ray Passes",
              color: "#C5A880"
            },
            {
              step: "04",
              title: "Direct-to-CNC Export",
              subtitle: "Generates production-ready STEP CAD, Parasolid meshes, and 4K NeRF splats.",
              solver: "G-Code & STEP Kernel",
              tokens: "Zero Tolerance Drift",
              color: "#FAF9F6"
            }
          ].map((stage, idx) => {
            const isSelected = activePipelineStage === idx + 1
            return (
              <button
                key={idx}
                onClick={() => {
                  soundFx.playTick(1000 + idx * 100)
                  setActivePipelineStage(idx + 1)
                }}
                className={`text-left p-5 rounded-xl border transition-all duration-200 relative ${
                  isSelected
                    ? "border-champagne bg-obsidian-surface shadow-xl shadow-champagne/5 ring-1 ring-champagne/40"
                    : "border-white/[0.08] bg-obsidian/60 hover:border-white/[0.2]"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-champagne font-bold">{stage.step}</span>
                  <span className="text-[10px] text-smoke">{stage.tokens}</span>
                </div>
                <div className="font-serif text-base font-semibold text-alabaster">{stage.title}</div>
                <div className="text-xs text-smoke mt-1.5 leading-relaxed">{stage.subtitle}</div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-silver">
                  SOLVER: {stage.solver}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Model Benchmark Matrix */}
      <div className="p-8 rounded-2xl border border-white/[0.1] bg-obsidian-card/40 backdrop-blur-xl space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-champagne block">
            Industry Benchmark Comparison
          </span>
          <h3 className="font-serif text-2xl text-alabaster">Valence vs Generalist AI Architectures</h3>
          <p className="text-smoke text-sm mt-1">Why premier luxury houses cannot use generic public cloud models.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/[0.1] text-smoke">
                <th className="py-3 px-4 font-medium uppercase tracking-wider">Evaluation Vector</th>
                <th className="py-3 px-4 font-bold text-champagne uppercase tracking-wider">VALENCE OMNI-IV</th>
                <th className="py-3 px-4 font-medium uppercase tracking-wider">Midjourney v6.1</th>
                <th className="py-3 px-4 font-medium uppercase tracking-wider">Claude 3.5 Sonnet</th>
                <th className="py-3 px-4 font-medium uppercase tracking-wider">Gemini 1.5 Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-silver">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-alabaster font-sans">Physical CAD Precision Tolerance</td>
                <td className="py-3.5 px-4 text-champagne font-bold">0.0018mm (Certified)</td>
                <td className="py-3.5 px-4 text-smoke">None (2D Raster Only)</td>
                <td className="py-3.5 px-4 text-smoke">Conceptual Text</td>
                <td className="py-3.5 px-4 text-smoke">Conceptual Code</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-alabaster font-sans">Sub-surface Photonic Dispersion</td>
                <td className="py-3.5 px-4 text-phosphor font-bold">Full-Spectral Cauchy</td>
                <td className="py-3.5 px-4 text-smoke">RGB Approximation</td>
                <td className="py-3.5 px-4 text-smoke">N/A</td>
                <td className="py-3.5 px-4 text-smoke">N/A</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-alabaster font-sans">Native STEP / Parasolid Export</td>
                <td className="py-3.5 px-4 text-champagne font-bold">Direct Native Kernel</td>
                <td className="py-3.5 px-4 text-smoke">Unsupported</td>
                <td className="py-3.5 px-4 text-smoke">Unsupported</td>
                <td className="py-3.5 px-4 text-smoke">Unsupported</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-alabaster font-sans">Data Sovereignty & Air-Gap</td>
                <td className="py-3.5 px-4 text-phosphor font-bold">Swiss Vault Sovereign</td>
                <td className="py-3.5 px-4 text-smoke">Public Shared Cloud</td>
                <td className="py-3.5 px-4 text-smoke">Public Cloud API</td>
                <td className="py-3.5 px-4 text-smoke">Google Cloud Multi-tenant</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-alabaster font-sans">Inference Latency SLA</td>
                <td className="py-3.5 px-4 text-champagne font-bold">14.2ms Guaranteed</td>
                <td className="py-3.5 px-4 text-smoke">15,000ms - 45,000ms</td>
                <td className="py-3.5 px-4 text-smoke">1,200ms - 4,000ms</td>
                <td className="py-3.5 px-4 text-smoke">900ms - 3,500ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
