import React, { useState } from "react"
import { ShieldCheck, Check, Cpu, Server, Lock, ArrowRight, Sliders, Zap } from "lucide-react"
import { MOCK_ALLOCATION_TIERS } from "../data/mockData"
import { soundFx } from "../lib/audioEngine"

interface PrivateAllocationSectionProps {
  onOpenReserveModalWithTier: (tierName: string) => void
}

export const PrivateAllocationSection: React.FC<PrivateAllocationSectionProps> = ({
  onOpenReserveModalWithTier
}) => {
  const [computeSlider, setComputeSlider] = useState<number>(28) // in PFLOPS

  // Dynamic calculations based on slider
  const estimatedGpus = Math.round(computeSlider * 8.8)
  const monthlyPasses = (computeSlider * 4800).toLocaleString()
  const latencyGuarantee = computeSlider > 50 ? "< 8ms Ultra-Priority" : computeSlider > 20 ? "< 24ms Priority" : "< 120ms Standard"

  return (
    <section id="reserve" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-champagne">
          <Lock className="w-3.5 h-3.5 text-champagne" />
          <span>SOVEREIGN PRIVATE INFRASTRUCTURE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-alabaster tracking-tight">
          Private Dedicated Cluster Allocation
        </h2>
        <p className="text-smoke text-sm sm:text-base leading-relaxed font-light">
          Unlike public consumer AI APIs, VALENCE allocates dedicated, physically isolated GPU pods in Swiss, Japanese, and Parisian sovereign vaults with zero telemetry logging and certified air-gaps.
        </p>
      </div>

      {/* Interactive Compute Allocation Calculator */}
      <div className="p-8 sm:p-10 rounded-3xl border border-white/[0.1] bg-obsidian-card/80 backdrop-blur-xl max-w-4xl mx-auto space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-champagne block">
              Dynamic Compute Sizing Engine
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-alabaster">
              Estimate Your Maison&rsquo;s Dedicated Pod
            </h3>
          </div>
          <div className="font-mono text-right">
            <div className="text-2xl sm:text-3xl font-bold text-champagne">{computeSlider} PFLOPS</div>
            <div className="text-[11px] text-smoke uppercase">Dedicated Tensor Capacity</div>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3">
          <input
            type="range"
            min="4"
            max="120"
            step="2"
            value={computeSlider}
            onChange={(e) => {
              setComputeSlider(parseInt(e.target.value))
              soundFx.playTick(900 + parseInt(e.target.value) * 10, 0.01)
            }}
            className="w-full accent-champagne cursor-pointer bg-white/10 h-2 rounded-lg"
          />
          <div className="flex justify-between text-xs font-mono text-smoke">
            <span>4 PFLOPS (Studio Pod)</span>
            <span>28 PFLOPS (Maison Pod)</span>
            <span>120 PFLOPS (Conglomerate Pod)</span>
          </div>
        </div>

        {/* Calculated Output Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] text-xs font-mono">
          <div className="p-4 rounded-xl border border-white/[0.06] bg-obsidian-surface/60">
            <span className="text-smoke text-[10px] block uppercase">Dedicated Hardware</span>
            <div className="text-alabaster font-semibold text-base mt-1">{estimatedGpus} x NVIDIA B200 Nodes</div>
            <div className="text-[10px] text-phosphor mt-0.5">Liquid-Cooled NVLink</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.06] bg-obsidian-surface/60">
            <span className="text-smoke text-[10px] block uppercase">Monthly Synthesis Passes</span>
            <div className="text-alabaster font-semibold text-base mt-1">~{monthlyPasses} Runs</div>
            <div className="text-[10px] text-smoke mt-0.5">Full-Spectral Caustics</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.06] bg-obsidian-surface/60">
            <span className="text-smoke text-[10px] block uppercase">Inference SLA Guarantee</span>
            <div className="text-champagne font-semibold text-base mt-1">{latencyGuarantee}</div>
            <div className="text-[10px] text-smoke mt-0.5">Direct Fiber Backhaul</div>
          </div>
        </div>
      </div>

      {/* Tier Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {MOCK_ALLOCATION_TIERS.map((tier) => {
          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative ${
                tier.popular
                  ? "border-champagne bg-obsidian-card shadow-2xl shadow-champagne/10 ring-1 ring-champagne/40"
                  : "border-white/[0.08] bg-obsidian-surface/80 hover:border-white/[0.18]"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-champagne text-obsidian text-[10px] font-mono font-bold tracking-wider uppercase">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-alabaster">{tier.name}</h3>
                  <p className="text-smoke text-xs mt-1 leading-relaxed">{tier.subtitle}</p>
                </div>

                <div className="border-t border-b border-white/[0.08] py-4 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-alabaster">{tier.pricing}</span>
                    <span className="text-xs font-mono text-smoke">/{tier.billingPeriod}</span>
                  </div>
                  <div className="text-xs font-mono text-champagne">{tier.monthlyPetaFlops}</div>
                  <div className="text-[11px] font-mono text-phosphor">{tier.turnaroundTime}</div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                    Architecture Inclusions
                  </span>
                  <ul className="space-y-2.5 text-xs text-silver">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/[0.08] space-y-3">
                <div className="text-[11px] text-smoke font-light italic">
                  Best for: {tier.recommendedFor}
                </div>

                <button
                  onClick={() => {
                    soundFx.playTick(1200)
                    onOpenReserveModalWithTier(tier.name)
                  }}
                  className={`w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? "bg-champagne text-obsidian hover:bg-champagne-light shadow-lg shadow-champagne/15"
                      : "border border-white/[0.12] bg-obsidian hover:bg-white/[0.05] text-alabaster"
                  }`}
                >
                  <span>Request Private Pod</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
