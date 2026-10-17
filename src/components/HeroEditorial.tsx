import React, { useEffect, useRef } from "react"
import { ArrowUpRight, Cpu, Sparkles, Layers, Sliders, Shield } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

interface HeroEditorialProps {
  onEnterStudio: () => void
  onEnterDashboard: () => void
  onExploreGallery: () => void
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  onEnterStudio,
  onEnterDashboard,
  onExploreGallery
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Interactive Sacred Geometry / Kinetic Escapement Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let angle = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.002
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.002
    }

    window.addEventListener("mousemove", handleMouseMove)

    const resize = () => {
      if (!canvas) return
      canvas.width = canvas.parentElement?.clientWidth || 600
      canvas.height = canvas.parentElement?.clientHeight || 600
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const radius = Math.min(cx, cy) * 0.72

      angle += 0.006

      // Concentric orbital rings with gold shimmer
      const rings = 4
      for (let i = 1; i <= rings; i++) {
        const r = (radius / rings) * i
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = i === rings ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.06)"
        ctx.lineWidth = i === rings ? 1.5 : 1
        ctx.stroke()
      }

      // Rotating faceted polygon (Representing Latent Manifold Geometry)
      const points = 12
      ctx.beginPath()
      for (let i = 0; i < points; i++) {
        const theta = (i / points) * Math.PI * 2 + angle + mouseX
        const variance = Math.sin(theta * 3 + angle * 2) * 18
        const r = radius * 0.85 + variance
        const x = cx + Math.cos(theta) * r
        const y = cy + Math.sin(theta) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = "rgba(212, 175, 55, 0.75)"
      ctx.lineWidth = 1.2
      ctx.stroke()

      // Cross-braced internal escapement lines
      for (let i = 0; i < points; i += 2) {
        const theta = (i / points) * Math.PI * 2 + angle + mouseX
        const thetaNext = ((i + points / 2) / points) * Math.PI * 2 + angle + mouseX
        const x1 = cx + Math.cos(theta) * (radius * 0.85)
        const y1 = cy + Math.sin(theta) * (radius * 0.85)
        const x2 = cx + Math.cos(thetaNext) * (radius * 0.85)
        const y2 = cy + Math.sin(thetaNext) * (radius * 0.85)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Orbital satellite node
      const satAngle = -angle * 1.8 + mouseY
      const satX = cx + Math.cos(satAngle) * radius
      const satY = cy + Math.sin(satAngle) * radius
      ctx.beginPath()
      ctx.arc(satX, satY, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#2DD4BF"
      ctx.shadowColor = "#2DD4BF"
      ctx.shadowBlur = 12
      ctx.fill()
      ctx.shadowBlur = 0

      // Center core tensor point
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = "#D4AF37"
      ctx.shadowColor = "#D4AF37"
      ctx.shadowBlur = 16
      ctx.fill()
      ctx.shadowBlur = 0

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] overflow-hidden">
      
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-champagne/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-phosphor/4 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        
        {/* Left Column: Haute Typography & Manifesto */}
        <div className="lg:col-span-7 space-y-8 z-10">
          
          {/* Subtle Labeling without stereotypical badges */}
          <div className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-champagne">
            <span className="w-2 h-px bg-champagne"></span>
            <span>AUTONOMOUS CREATIVE ARCHITECTURE</span>
            <span className="text-white/20">/</span>
            <span className="text-smoke">MODEL OMNI-IV</span>
          </div>

          {/* Majestic Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-alabaster leading-[1.08]">
            Where Autonomous Intelligence Meets <span className="italic font-light text-champagne">Haute Craft</span>.
          </h1>

          {/* Refined Copywriting */}
          <p className="text-smoke text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            VALENCE is the sovereign generative synthesis architecture engineered exclusively for luxury houses, master watchmakers, and computational architects. We combine sub-surface raytraced physics with 1.4-trillion parameter multimodal intelligence to produce physical-grade artifacts with micron-level tolerances.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onEnterStudio()
              }}
              className="px-6 py-3.5 rounded-lg bg-alabaster text-obsidian font-semibold text-xs tracking-wider uppercase hover:bg-champagne transition-all duration-300 flex items-center gap-2.5 shadow-xl shadow-alabaster/5 active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-obsidian" />
              <span>Launch Latent Studio</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                soundFx.playTick(900)
                onEnterDashboard()
              }}
              className="px-6 py-3.5 rounded-lg border border-white/[0.12] bg-obsidian-surface hover:bg-obsidian-card hover:border-champagne/40 text-silver font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-phosphor" />
              <span>Inspect Sovereign Telemetry</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1100)
                onExploreGallery()
              }}
              className="px-4 py-3.5 text-smoke hover:text-champagne font-mono text-xs tracking-widest uppercase transition-colors"
            >
              Exhibition Catalog ↓
            </button>
          </div>

          {/* Micro Telemetry HUD */}
          <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-semibold text-alabaster">1.4T</div>
              <div className="text-[11px] font-mono text-smoke uppercase tracking-wider mt-0.5">Parameters Scale</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-semibold text-phosphor">14.2ms</div>
              <div className="text-[11px] font-mono text-smoke uppercase tracking-wider mt-0.5">Global Latency P99</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-semibold text-champagne">0.0018mm</div>
              <div className="text-[11px] font-mono text-smoke uppercase tracking-wider mt-0.5">CAD Precision SLA</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-semibold text-silver">100%</div>
              <div className="text-[11px] font-mono text-smoke uppercase tracking-wider mt-0.5">Alpine Hydroelectric</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Kinetic Latent Manifold Canvas */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[520px] rounded-2xl border border-white/[0.08] bg-obsidian-surface/60 backdrop-blur-xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
            
            {/* Top HUD overlay */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-champagne animate-ping"></span>
                <span className="font-mono text-[11px] text-alabaster tracking-widest uppercase">
                  TENSOR HARMONIC MANIFOLD
                </span>
              </div>
              <span className="font-mono text-[10px] text-smoke">6-DOF REALTIME</span>
            </div>

            {/* Kinetic Sacred Canvas */}
            <div className="relative flex-1 w-full flex items-center justify-center my-4">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
              />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-smoke/70 pointer-events-none">
                AXIS: [X: 0.842, Y: -0.198, Z: 0.994]
              </div>
            </div>

            {/* Bottom HUD parameters */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-3 text-[11px] font-mono text-smoke z-10">
              <div>
                <span className="text-white/40 block text-[9px]">SOLVER</span>
                <span className="text-silver">NAVIER-STOKES</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px]">SEED STATE</span>
                <span className="text-champagne font-mono">0x8F3C92B4</span>
              </div>
              <div className="text-right">
                <span className="text-white/40 block text-[9px]">CAUSTICS</span>
                <span className="text-phosphor">SPECTRAL</span>
              </div>
            </div>

            {/* Subtle glow highlight on card hover */}
            <div className="absolute inset-0 rounded-2xl border border-champagne/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
