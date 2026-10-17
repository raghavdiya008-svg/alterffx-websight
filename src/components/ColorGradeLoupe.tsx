import React, { useState } from "react"
import { Sliders, Check } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

export const ColorGradeLoupe: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(52) // percentage 0 - 100
  const [activeProfile, setActiveProfile] = useState<"kodak" | "technicolor" | "monochrome">("kodak")

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPos = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(newPos)
  }

  const profiles = {
    kodak: {
      name: "Kodak 2383 Print Emulation",
      logLabel: "ARRI Alexa 35 LogC4 (Raw Dailies)",
      gradeLabel: "35mm Film Print Stock Master",
      desc: "Subtle halation in specular highlights, dense cinematic shadow rolls, and natural organic skin tones."
    },
    technicolor: {
      name: "3-Strip Technicolor Saturation",
      logLabel: "RED V-Raptor IPP2 Log",
      gradeLabel: "Split-Tone Vibrant Grade",
      desc: "Deep cyan shadows balanced with rich tungsten golds designed for high-contrast commercial punch."
    },
    monochrome: {
      name: "Tri-X 400 Silver Nitrate",
      logLabel: "Sony VENICE 2 S-Log3",
      gradeLabel: "Silver Halide Monochrome",
      desc: "High-acutance grain structure with deep velvet blacks and luminous midtone separation."
    }
  }

  return (
    <section id="color-grade" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C2618]/15 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Sliders className="w-3.5 h-3.5 text-[#E8512A]" />
            <span className="font-serif italic text-base text-[#5E6B4E]">Celluloid emulsion development & color-correction charts</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C2618] tracking-tight">
            Before & After Color Science
          </h2>
          <p className="text-[#5E6B4E] text-sm sm:text-base mt-2 max-w-2xl font-sans font-normal">
            Drag the loupe divider to inspect how flat camera logs (ARRI LogC, RED IPP2) are developed into dense, emotional celluloid master prints.
          </p>
        </div>

        {/* Profile Selector Buttons */}
        <div className="flex items-center gap-2">
          {(["kodak", "technicolor", "monochrome"] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                soundFx.playTick(1000)
                setActiveProfile(key)
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all ${
                activeProfile === key
                  ? "bg-[#E8512A] text-white font-medium shadow-sm"
                  : "bg-[#E0E6CE] border border-[#1C2618]/15 text-[#5E6B4E] hover:text-[#1C2618]"
              }`}
            >
              {profiles[key].name.split(" ")[0]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Interactive Split Grade Container */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] p-6 sm:p-8 shadow-sm space-y-6 relative"
      >
        {/* Top Registration Crosshairs */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-[#1C2618]/30 select-none">+</div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-[#1C2618]/30 select-none">+</div>
        
        {/* Top Grade Metadata HUD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C2618]/15 pb-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-[#5E6B4E]">
              DAILIES LOG: <span className="text-[#1C2618] font-bold">{profiles[activeProfile].logLabel}</span>
            </span>
            <span className="text-[#1C2618]/30">•</span>
            <span className="text-[#5E6B4E]">
              DEVELOPED: <span className="text-[#E8512A] font-bold">{profiles[activeProfile].gradeLabel}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#1C2618] font-medium">
            <Check className="w-3.5 h-3.5 text-[#E8512A]" />
            <span>CALIBRATED DCI-P3 / SMPTE-2084</span>
          </div>
        </div>

        {/* The Split Drag Canvas */}
        <div
          onMouseMove={handleMouseMove}
          className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black cursor-ew-resize select-none border border-[#1C2618]/25 shadow-inner"
        >
          {/* Base Layer: Raw Log (Washed Out / Desaturated) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85"
              alt="Raw Log Plate"
              className="w-full h-full object-cover filter contrast-75 brightness-125 saturate-25"
            />
            {/* Raw Tag */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 border border-white/20 text-[10px] font-mono text-white backdrop-blur-md">
              CAMERA RAW (UNGRADED DAILIES)
            </div>
          </div>

          {/* Top Layer: Final Master Grade (Clipped to slider position) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85"
              alt="Master Graded Finish"
              className={`w-full h-full object-cover ${
                activeProfile === "monochrome"
                  ? "filter grayscale contrast-125 brightness-95"
                  : activeProfile === "technicolor"
                  ? "filter saturate-150 contrast-125"
                  : "filter contrast-110 saturate-110"
              }`}
            />
            {/* Master Finished Tag */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#E8512A] text-[10px] font-mono font-medium text-white shadow-lg backdrop-blur-md">
              FINISHED PRINT (KODAK 2383 D55)
            </div>
          </div>

          {/* Divider Line & Handle in Vermilion */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#1C2618] font-bold text-xs flex items-center justify-center shadow-md border-2 border-[#E8512A]">
              ↔
            </div>
          </div>

          {/* Bottom Prompt */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono text-white backdrop-blur-md pointer-events-none">
            DRAG MOUSE TO SCRUB DENSITY
          </div>
        </div>

        {/* Technical Specification Bar in Lab Chart Style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
          <div className="p-3.5 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
            <span className="text-[10px] text-[#5E6B4E] block uppercase">Film Stock Target</span>
            <span className="text-[#1C2618] font-bold mt-1 block">JV_2383_D55_Halation.cube</span>
          </div>

          <div className="p-3.5 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
            <span className="text-[10px] text-[#5E6B4E] block uppercase">Waveform Clipping Range</span>
            <span className="text-[#1C2618] font-bold mt-1 block">0 - 100 IRE (Strict Gamut)</span>
          </div>

          <div className="p-3.5 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
            <span className="text-[10px] text-[#5E6B4E] block uppercase">Master Delivery Codec</span>
            <span className="text-[#E8512A] font-bold mt-1 block">Apple ProRes 4444 XQ (12-bit)</span>
          </div>
        </div>

      </motion.div>
    </section>
  )
}
