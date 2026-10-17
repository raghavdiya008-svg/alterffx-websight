import React, { useState, useRef, useCallback } from "react"
import { Sliders, Check } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

export const ColorGradeLoupe: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(52) // percentage 0 - 100
  const [activeProfile, setActiveProfile] = useState<"kodak" | "technicolor" | "monochrome">("kodak")
  const animFrameRef = useRef<number | null>(null)

  // Smooth 60fps loupe drag using requestAnimationFrame
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPos = Math.max(5, Math.min(95, (x / rect.width) * 100))
    
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
    }
    animFrameRef.current = requestAnimationFrame(() => {
      setSliderPos(newPos)
    })
  }, [])

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
            Drag the liquid loupe divider to inspect how flat camera renders and 3D passes are calibrated into high-impact commercial masters.
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

        {/* The Split Drag Canvas with hardware acceleration */}
        <div
          onMouseMove={handleMouseMove}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black cursor-ew-resize select-none border border-white/50 shadow-inner will-change-transform"
        >
          {/* Base Layer: Raw Log */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://img.youtube.com/vi/EPU8ivyiWHI/maxresdefault.jpg"
              alt="Raw Log Plate"
              className="w-full h-full object-cover filter contrast-75 brightness-110 saturate-25"
            />
            {/* Raw Tag */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs font-mono text-white backdrop-blur-md font-medium">
              RAW LOG (UNGRADED 3D PASS)
            </div>
          </div>

          {/* Top Layer: Final Master Grade */}
          <div
            className="absolute inset-0 h-full overflow-hidden will-change-[width]"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full" style={{ width: "100%", minWidth: "100%" }}>
              <img
                src="https://img.youtube.com/vi/EPU8ivyiWHI/maxresdefault.jpg"
                alt="Finished Master Grade"
                className={`w-full h-full object-cover ${
                  activeProfile === "monochrome" 
                    ? "filter grayscale contrast-125 brightness-95" 
                    : activeProfile === "technicolor"
                    ? "filter saturate-150 contrast-110"
                    : "filter contrast-110 saturate-110"
                }`}
                style={{ width: "100vw", maxWidth: "none", minWidth: "100%" }}
              />
            </div>
            
            {/* Graded Tag */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#9A7562]/90 border border-white/40 text-xs font-mono text-white backdrop-blur-md font-medium shadow-md">
              FINISHED COMMERCIAL GRADE
            </div>
          </div>

          {/* Divider Handle with Liquid Glass Ring */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/90 z-20 pointer-events-none shadow-[0_0_16px_rgba(255,255,255,0.9)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full liquid-glass border-2 border-white shadow-2xl flex items-center justify-center text-[#241812] text-xs font-mono font-bold">
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
            <span>POSITION: {Math.round(sliderPos)}%</span>
            <span>•</span>
            <span>4K 60FPS MASTER</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
