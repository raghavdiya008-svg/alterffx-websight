import React, { useState, useRef, useCallback } from "react"
import { Sliders, Check } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

export const ColorGradeLoupe: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(52) // percentage 0 - 100
  const [activeProfile, setActiveProfile] = useState<"kodak" | "technicolor" | "monochrome">("kodak")
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const newPos = Math.max(2, Math.min(98, (x / rect.width) * 100))
    setSliderPos(newPos)
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current || e.buttons === 1) {
      updatePosition(e.clientX)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch (_) {}
  }

  const profiles = {
    kodak: {
      name: "Commercial High-Contrast Finish",
      logLabel: "After Effects Raw Render Pass",
      gradeLabel: "3D Dynamic Grade Master",
      desc: "Subtle specular glow, dense cinematic shadow rolls, high-vibrancy product reflections, and natural tactile textures."
    },
    technicolor: {
      name: "Saturated Commercial Punch",
      logLabel: "Flat Rec.709 Pass",
      gradeLabel: "Vibrant Advertising Grade",
      desc: "Deep rich contrast balanced with gold accents designed for maximum stopping power on digital feeds."
    },
    monochrome: {
      name: "Silver Halide Monochrome",
      logLabel: "Sony Venice / ARRI S-Log",
      gradeLabel: "Atmospheric Black & White",
      desc: "High-acutance grain structure with deep velvet blacks and luminous midtone separation."
    }
  }

  return (
    <section id="color-grade" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header with Thin Montserrat typography */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/50 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Sliders className="w-4 h-4 text-[#9A7562]" />
            <span className="font-light text-base sm:text-lg text-[#6D5548]">
              COLOR FINISHING & RENDER DEVELOPMENT
            </span>
          </div>
          <h2 className="font-normal text-4xl sm:text-6xl text-[#241812] tracking-tight">
            Before & After Color Science
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Drag the loupe divider across the still frame. The picture stays stationary while revealing the before and after color grade.
          </p>
        </div>

        {/* Profile Selector Buttons in Liquid Glass */}
        <div className="flex items-center gap-2.5">
          {(["kodak", "technicolor", "monochrome"] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                soundFx.playTick(1000)
                setActiveProfile(key)
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                activeProfile === key
                  ? "bg-[#9A7562] text-white shadow-md shadow-[#9A7562]/20 border border-white/30"
                  : "liquid-glass-pill text-[#6D5548] hover:text-[#241812] hover:border-white/90"
              }`}
            >
              {profiles[key].name.split(" ")[0]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Interactive Split Grade Container in Liquid Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl liquid-glass-card p-6 sm:p-8 shadow-2xl space-y-6 relative"
      >
        {/* Registration Crosshairs */}
        <div className="absolute top-3 left-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
        <div className="absolute top-3 right-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
        
        {/* Top Grade Metadata HUD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/50 pb-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-[#6D5548]">
              DAILIES LOG: <span className="text-[#241812] font-semibold">{profiles[activeProfile].logLabel}</span>
            </span>
            <span className="text-[#241812]/20">•</span>
            <span className="text-[#6D5548]">
              DEVELOPED: <span className="text-[#9A7562] font-bold">{profiles[activeProfile].gradeLabel}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#241812] font-medium">
            <Check className="w-4 h-4 text-[#9A7562]" />
            <span>CALIBRATED DCI-P3 / REC.709</span>
          </div>
        </div>

        {/* The Split Drag Canvas: Image Stays Completely Still (No Zooming) */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black cursor-ew-resize select-none border border-white/50 shadow-inner"
          style={{ touchAction: "none" }}
        >
          {/* Base Layer: Raw Log (Stationary, 100% scale, no zoom) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
            <img
              src="https://img.youtube.com/vi/EPU8ivyiWHI/maxresdefault.jpg"
              alt="Raw Log Plate"
              draggable={false}
              className="w-full h-full object-cover filter contrast-75 brightness-110 saturate-25 pointer-events-none select-none transform-none transition-none scale-100"
            />
            {/* Raw Tag */}
            <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs font-mono text-white backdrop-blur-md font-medium select-none pointer-events-none">
              RAW LOG (UNGRADED 3D PASS)
            </div>
          </div>

          {/* Top Layer: Final Master Grade with Polygon Clip Path (Stationary, 100% scale, no zoom) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
            style={{ 
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            <img
              src="https://img.youtube.com/vi/EPU8ivyiWHI/maxresdefault.jpg"
              alt="Finished Master Grade"
              draggable={false}
              className={`w-full h-full object-cover pointer-events-none select-none transform-none transition-none scale-100 ${
                activeProfile === "monochrome" 
                  ? "filter grayscale contrast-125 brightness-95" 
                  : activeProfile === "technicolor"
                  ? "filter saturate-150 contrast-110"
                  : "filter contrast-110 saturate-110"
              }`}
            />
            
            {/* Graded Tag */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#9A7562]/90 border border-white/40 text-xs font-mono text-white backdrop-blur-md font-medium shadow-md select-none pointer-events-none">
              FINISHED COMMERCIAL GRADE
            </div>
          </div>

          {/* Divider Line & Touch Drag Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-20 pointer-events-none shadow-[0_0_16px_rgba(255,255,255,0.95)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white/95 text-[#241812] border-2 border-[#9A7562] shadow-2xl flex items-center justify-center text-xs font-mono font-bold select-none">
              ↔
            </div>
          </div>
        </div>

        {/* Profile Technical Footnote */}
        <div className="p-5 rounded-2xl liquid-glass-pill border border-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#6D5548]">
          <div className="max-w-2xl font-light">
            <span className="font-semibold text-[#241812]">{profiles[activeProfile].name}: </span>
            {profiles[activeProfile].desc}
          </div>

          <div className="flex items-center gap-2 text-[#9A7562] font-semibold shrink-0">
            <span>SPLIT: {Math.round(sliderPos)}%</span>
            <span>•</span>
            <span>4K 60FPS MASTER</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
