import React, { useState, useRef, useEffect } from "react"
import { 
  Sparkles, Sliders, Play, RotateCcw, Download, 
  CheckCircle2, Box, Eye, Layers, FileCode, Check
} from "lucide-react"
import { MOCK_MODELS } from "../data/mockData"
import { soundFx } from "../lib/audioEngine"

interface LatentStudioProps {
  initialModelId?: string
  onSaveToCollection?: (artifactData: unknown) => void
}

const PRESETS = [
  {
    name: "Haute Horlogerie Escapement",
    prompt: "Tri-axial spherical tourbillon cage with mirror-polished titanium bridges, blued balance spring oscillating in microgravity simulation, diamond-set pallets.",
    roughness: 0.04,
    refraction: 1.77,
    tension: 0.82,
    viscosity: 0.12,
    category: "Horology"
  },
  {
    name: "Architectural Basalt Monolith",
    prompt: "Monolithic pavilion carved from seamless honed Nordic basalt, razor acoustic skylight slicing across fluted stone wall, negative void optimization.",
    roughness: 0.45,
    refraction: 1.54,
    tension: 0.95,
    viscosity: 0.02,
    category: "Architecture"
  },
  {
    name: "Fluid Photonic Silk Gown",
    prompt: "Parametric floor-length gown sculpted from metallic organza weave with real-time aerodynamic drape under 1.2G downward deceleration, obsidian finish.",
    roughness: 0.18,
    refraction: 1.62,
    tension: 0.44,
    viscosity: 0.78,
    category: "Haute Couture"
  },
  {
    name: "Spectral Muzo Emerald Choker",
    prompt: "Generative articulated platinum collar mounting 78 cushion-cut Colombian emeralds with full-spectral Cauchy dispersion and internal iron inclusion caustics.",
    roughness: 0.02,
    refraction: 2.14,
    tension: 0.88,
    viscosity: 0.05,
    category: "High Jewelry"
  }
]

export const LatentStudio: React.FC<LatentStudioProps> = ({ initialModelId = "valence-omni-iv" }) => {
  const [selectedModel, setSelectedModel] = useState(initialModelId)
  const [prompt, setPrompt] = useState(PRESETS[0].prompt)
  const [roughness, setRoughness] = useState(PRESETS[0].roughness)
  const [refraction, setRefraction] = useState(PRESETS[0].refraction)
  const [tension, setTension] = useState(PRESETS[0].tension)
  const [viscosity, setViscosity] = useState(PRESETS[0].viscosity)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [streamedTokens, setStreamedTokens] = useState<string[]>([])
  const [exportedStatus, setExportedStatus] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const applyPreset = (preset: typeof PRESETS[0]) => {
    soundFx.playTick(1100)
    setPrompt(preset.prompt)
    setRoughness(preset.roughness)
    setRefraction(preset.refraction)
    setTension(preset.tension)
    setViscosity(preset.viscosity)
  }

  // Draw procedural generative preview on canvas responding to sliders
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      time += 0.015 * (1 + viscosity)

      // Background subtle mesh
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1
      const gridCount = 8
      for (let i = 0; i < gridCount; i++) {
        const y = (canvas.height / gridCount) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Mathematical Harmonic Waves reflecting tension & roughness
      const waves = 5
      for (let w = 0; w < waves; w++) {
        ctx.beginPath()
        const waveOffset = (w / waves) * Math.PI * 2
        for (let x = 0; x < canvas.width; x += 3) {
          const normX = (x / canvas.width) * Math.PI * 4
          const freq1 = Math.sin(normX * tension * 2 + time + waveOffset)
          const freq2 = Math.cos(normX * 3 - time * 0.8) * roughness * 40
          const amp = 45 * (1 - roughness * 0.5)
          const y = cy + (freq1 * amp) + freq2 + (w - waves / 2) * 18

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        // Color modulation based on refraction and model
        const alpha = 0.25 + (w / waves) * 0.6
        if (w % 2 === 0) {
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`
        } else {
          ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`
        }
        ctx.lineWidth = w === waves - 1 ? 2 : 1
        ctx.stroke()
      }

      // Central Harmonic Focal Core
      const coreRadius = 24 + refraction * 12
      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(212, 175, 55, 0.8)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      animId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animId)
  }, [roughness, refraction, tension, viscosity])

  const handleStartGeneration = () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setStreamedTokens([])
    setExportedStatus(null)
    soundFx.playNeuralBurst()

    const tokensToStream = [
      "[INIT] Dispatched tensor weights to Zurich Sovereign Vault",
      "[PERCEPTION] 48,920 multimodal tokens parsed with zero compression loss",
      `[SOLVER] Navier-Stokes dynamic tension set to ${tension.toFixed(2)}`,
      `[CAUSTICS] Subsurface scattering configured: Refraction n=${refraction.toFixed(2)}`,
      `[TOLERANCE] Micro-facet surface roughness calibrated: Ra ${roughness.toFixed(3)}μm`,
      "[RAYMARCH] 128-pass volumetric photon solver converging: Δ=0.00014mm",
      "[SYNTHESIS] Parametric STEP CAD mesh and 4K NeRF Gaussian Splat successfully generated."
    ]

    let currentStep = 0
    const progressInterval = setInterval(() => {
      currentStep++
      setGenerationProgress(Math.min(100, currentStep * 15))

      if (currentStep <= tokensToStream.length) {
        setStreamedTokens(prev => [...prev, tokensToStream[currentStep - 1]])
        soundFx.playTick(1200 + currentStep * 80)
      }

      if (currentStep > tokensToStream.length) {
        clearInterval(progressInterval)
        setIsGenerating(false)
        setGenerationProgress(100)
        soundFx.playNeuralBurst()
      }
    }, 450)
  }

  const handleExport = (type: string) => {
    soundFx.playTick(1400)
    setExportedStatus(`Exported ${type} with cryptographic certificate.`)
    setTimeout(() => {
      setExportedStatus(null)
    }, 4000)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-champagne mb-2">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>INTERACTIVE COMPUTATIONAL LABORATORY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-alabaster tracking-tight">
            Latent Synthesis Studio
          </h2>
          <p className="text-smoke text-sm sm:text-base mt-2 max-w-2xl font-light">
            Manipulate high-dimensional latent tensors in real time. Tune physical materiality, optical refraction, and kinematic tensions with sub-micron feedback.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-smoke mr-2">MAISON PRESETS:</span>
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-obsidian-surface hover:bg-obsidian-card hover:border-champagne/40 text-xs font-mono text-silver transition-all"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controls Column: Sliders, Prompts, Architecture */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Model Architecture Selector */}
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-obsidian-surface/80 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-smoke uppercase">SYNTHESIS ENGINE</span>
              <span className="text-champagne font-bold">14.2ms P99</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {MOCK_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    soundFx.playTick(900)
                    setSelectedModel(model.id)
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    model.id === selectedModel
                      ? "border-champagne bg-obsidian-card ring-1 ring-champagne/30 text-champagne"
                      : "border-white/[0.06] bg-obsidian/60 text-smoke hover:text-silver hover:bg-obsidian-surface"
                  }`}
                >
                  <div className="font-semibold text-xs text-alabaster">{model.name}</div>
                  <div className="font-mono text-[10px] text-smoke mt-0.5">{model.specialization.slice(0, 36)}...</div>
                </button>
              ))}
            </div>
          </div>

          {/* Multimodal Prompt Input */}
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-obsidian-surface/80 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-smoke uppercase">TACTILE MATERIAL PROMPT</span>
              <span className="text-smoke text-[10px]">{prompt.length} / 500 CHARS</span>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Describe physical geometry, material alloy, lighting caustics, and tolerances..."
              className="w-full bg-obsidian/80 border border-white/[0.1] rounded-xl p-3.5 text-xs text-alabaster focus:outline-none focus:border-champagne/60 transition-colors resize-none leading-relaxed font-sans"
            />
          </div>

          {/* Physical Materiality Sliders */}
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-obsidian-surface/80 backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h4 className="font-serif text-base text-alabaster font-semibold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-champagne" />
                <span>Physical Tensor Parameters</span>
              </h4>
              <button 
                onClick={() => {
                  soundFx.playTick(800)
                  setRoughness(0.04)
                  setRefraction(1.77)
                  setTension(0.82)
                  setViscosity(0.12)
                }}
                className="text-smoke hover:text-champagne text-[11px] font-mono flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Slider 1: Aesthetic Tension */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-silver">Aesthetic Kinematic Tension</span>
                <span className="text-champagne font-bold">{tension.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.01"
                value={tension}
                onChange={(e) => {
                  setTension(parseFloat(e.target.value))
                  soundFx.playTick(1000 + parseFloat(e.target.value) * 500, 0.01)
                }}
                className="w-full accent-champagne cursor-pointer bg-white/10 h-1.5 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-smoke font-mono">
                <span>Relaxed Organic Flow</span>
                <span>Hyper-Rigid Minimalist</span>
              </div>
            </div>

            {/* Slider 2: Micro-Roughness */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-silver">Micro-Facet Roughness (Ra μm)</span>
                <span className="text-phosphor font-bold">{roughness.toFixed(3)} μm</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.50"
                step="0.005"
                value={roughness}
                onChange={(e) => {
                  setRoughness(parseFloat(e.target.value))
                  soundFx.playTick(1200, 0.01)
                }}
                className="w-full accent-phosphor cursor-pointer bg-white/10 h-1.5 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-smoke font-mono">
                <span>Specular Mirror Specularity</span>
                <span>Honed Basalt Matte</span>
              </div>
            </div>

            {/* Slider 3: Cauchy Refraction Index */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-silver">Photonic Refraction (Cauchy n)</span>
                <span className="text-champagne font-bold">{refraction.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.00"
                max="2.42"
                step="0.01"
                value={refraction}
                onChange={(e) => {
                  setRefraction(parseFloat(e.target.value))
                  soundFx.playTick(1400, 0.01)
                }}
                className="w-full accent-champagne cursor-pointer bg-white/10 h-1.5 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-smoke font-mono">
                <span>1.00 (Air / Vacuum)</span>
                <span>2.42 (D-Flawless Diamond)</span>
              </div>
            </div>

            {/* Slider 4: Fluidity / Viscosity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-silver">Fluidity & Aerodynamic Drape</span>
                <span className="text-silver font-bold">{viscosity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.02"
                value={viscosity}
                onChange={(e) => {
                  setViscosity(parseFloat(e.target.value))
                  soundFx.playTick(900, 0.01)
                }}
                className="w-full accent-silver cursor-pointer bg-white/10 h-1.5 rounded-lg"
              />
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleStartGeneration}
            disabled={isGenerating}
            className={`w-full py-4 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
              isGenerating
                ? "bg-white/10 text-smoke cursor-not-allowed"
                : "bg-champagne text-obsidian hover:bg-champagne-light shadow-champagne/15 active:scale-[0.99]"
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin"></div>
                <span>Executing 128-Pass Tensor Run ({generationProgress}%)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-obsidian text-obsidian" />
                <span>Execute Sovereign Synthesis Run</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Column: Realtime Generative Viewport & Live Stream */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Realtime Generative Simulation Canvas Viewport */}
          <div className="rounded-2xl border border-white/[0.1] bg-obsidian-card p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[360px]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-phosphor"></div>
                <span className="font-mono text-xs text-alabaster tracking-wider">
                  REAL-TIME LATENT MANIFOLD VIEWPORT
                </span>
              </div>
              <span className="text-[10px] font-mono text-smoke">60 FPS HARMONIC SIMULATION</span>
            </div>

            {/* Canvas */}
            <div className="relative flex-1 w-full my-3 flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={560}
                height={260}
                className="w-full h-full object-contain"
              />
              {isGenerating && (
                <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-champagne border-t-transparent animate-spin"></div>
                  <span className="font-mono text-xs text-champagne animate-pulse">
                    SOLVING CONTINUOUS NAVIER-STOKES...
                  </span>
                </div>
              )}
            </div>

            {/* Viewport Footer HUD */}
            <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px] font-mono text-smoke z-10">
              <span>SEED: 0x7E188C9FA</span>
              <span>RENDER PASSES: 128/128</span>
              <span className="text-phosphor">0.0018mm VERIFIED</span>
            </div>
          </div>

          {/* Token Streaming Log Terminal */}
          <div className="rounded-2xl border border-white/[0.08] bg-obsidian/90 p-5 font-mono text-xs backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[11px] text-smoke">
              <span>SYNTHESIS LOG STREAM</span>
              <span className="text-champagne">SOVEREIGN ENCRYPTED</span>
            </div>

            <div className="space-y-1.5 h-36 overflow-y-auto pr-1">
              {streamedTokens.length === 0 ? (
                <div className="text-smoke/60 italic py-8 text-center">
                  Adjust parameters and click &ldquo;Execute Sovereign Synthesis Run&rdquo; to initiate streaming...
                </div>
              ) : (
                streamedTokens.map((tok, idx) => (
                  <div key={idx} className="text-silver text-[11px] flex items-start gap-2">
                    <span className="text-champagne font-bold">›</span>
                    <span>{tok}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Export Action Bar */}
          <div className="p-4 rounded-xl border border-white/[0.08] bg-obsidian-surface/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-smoke">DIRECT ARTIFACT EXPORT:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExport("STEP CAD (ISO 10303)")}
                className="px-3 py-1.5 rounded-lg border border-white/[0.1] bg-obsidian-card hover:bg-white/[0.05] hover:border-champagne/40 text-xs font-mono text-silver transition-colors flex items-center gap-1.5"
              >
                <Box className="w-3.5 h-3.5 text-champagne" />
                <span>STEP CAD</span>
              </button>

              <button
                onClick={() => handleExport("4K NeRF Volumetric Splat")}
                className="px-3 py-1.5 rounded-lg border border-white/[0.1] bg-obsidian-card hover:bg-white/[0.05] hover:border-champagne/40 text-xs font-mono text-silver transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-phosphor" />
                <span>4K NeRF Splat</span>
              </button>

              <button
                onClick={() => handleExport("Apple USDZ Spatial Scene")}
                className="px-3 py-1.5 rounded-lg border border-white/[0.1] bg-obsidian-card hover:bg-white/[0.05] hover:border-champagne/40 text-xs font-mono text-silver transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-silver" />
                <span>Apple USDZ</span>
              </button>
            </div>
          </div>

          {exportedStatus && (
            <div className="p-3 rounded-lg border border-phosphor/30 bg-phosphor/10 text-xs font-mono text-phosphor flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{exportedStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
