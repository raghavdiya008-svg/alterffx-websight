import React, { useState, useEffect, memo } from "react"
import { Play, Sparkles, Film, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"
import { CloakedVideoPlayer } from "./CloakedVideoPlayer"

// Isolated Memoized NLE Monitor with Liquid Glass Finish
const InteractiveNLEMonitor = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrubberPos, setScrubberPos] = useState(38)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setScrubberPos((prev) => (prev >= 98 ? 2 : prev + 0.8))
    }, 60)
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newPos = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
    setScrubberPos(newPos)
    soundFx.playTick(800 + newPos * 10, 0.02)
  }

  const totalFrames = Math.floor((scrubberPos / 100) * 2400)
  const seconds = Math.floor(totalFrames / 60)
  const frames = totalFrames % 60
  const formattedTC = `00:00:${seconds.toString().padStart(2, "0")}:${frames.toString().padStart(2, "0")}`

  return (
    <div className="rounded-3xl liquid-glass-card p-5 sm:p-6 shadow-2xl space-y-4 overflow-hidden relative">
      {/* Liquid Glass Registration Marks */}
      <div className="absolute top-3 left-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
      <div className="absolute top-3 right-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
      <div className="absolute bottom-3 left-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
      <div className="absolute bottom-3 right-3 text-xs font-mono text-[#241812]/20 select-none">+</div>

      {/* Monitor Header */}
      <div className="flex items-center justify-between border-b border-white/50 pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-ping"></span>
          <span className="text-[#241812] font-semibold tracking-wide">SEQ: MONSTER_COMMERCIAL_AE24</span>
        </div>
        <span className="text-[#241812] liquid-glass-pill px-3 py-1 rounded-full font-semibold">
          {formattedTC}
        </span>
      </div>

      {/* Video Preview Canvas with Cloaked Video Player (Shields YouTube branding, channel links, and watermark clickouts) */}
      <CloakedVideoPlayer
        youtubeId="EPU8ivyiWHI"
        title="Monster Commercial Showreel"
        category="Motion Graphics"
        duration="00:48"
        stillImage="https://img.youtube.com/vi/EPU8ivyiWHI/maxresdefault.jpg"
        aspectRatio="16:9"
        autoPlay={isPlaying}
        onPlayChange={(playing) => setIsPlaying(playing)}
      />

      {/* Interactive Timeline Tracks (Scrubbable) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-[#6D5548]">
          <span className="font-light">NLE MULTI-TRACK BUS (SCRUBBABLE)</span>
          <span className="text-[#9A7562] font-medium">60.00 FPS UHD</span>
        </div>

        <div 
          onClick={handleScrub}
          className="relative h-28 w-full bg-white/35 backdrop-blur-md rounded-2xl border border-white/50 p-2 cursor-ew-resize overflow-hidden flex flex-col justify-between shadow-inner"
        >
          {/* Track V2 */}
          <div className="h-5 w-full bg-white/40 rounded-lg flex gap-1.5 p-0.5 border border-white/40">
            <div className="w-[28%] bg-[#9A7562] rounded text-[9px] font-mono text-white px-1.5 flex items-center overflow-hidden font-medium">3D_CAN_PASS</div>
            <div className="w-[10%] bg-transparent"></div>
            <div className="w-[28%] bg-[#B79F93] rounded text-[9px] font-mono text-white px-1.5 flex items-center overflow-hidden font-medium">PARTICLE_BURST</div>
            <div className="w-[34%] bg-[#9A7562] rounded text-[9px] font-mono text-white px-1.5 flex items-center overflow-hidden font-medium">SPEED_RAMP_300%</div>
          </div>

          {/* Track V1 */}
          <div className="h-6 w-full bg-white/50 rounded-lg flex gap-1.5 p-0.5 border border-white/50">
            <div className="w-[35%] bg-[#241812] rounded text-[10px] font-mono text-[#EDCFB5] px-1.5 flex items-center overflow-hidden font-medium">AE24_COMP_01</div>
            <div className="w-[25%] bg-[#6D5548] rounded text-[10px] font-mono text-white px-1.5 flex items-center overflow-hidden font-medium">3D_CAMERA_TRACK</div>
            <div className="w-[40%] bg-[#241812] rounded text-[10px] font-mono text-[#EDCFB5] px-1.5 flex items-center overflow-hidden font-medium">COLOR_GRADE_FIN</div>
          </div>

          {/* Track A1 */}
          <div className="h-5 w-full bg-white/40 rounded-lg flex gap-1.5 p-0.5 border border-white/40">
            <div className="w-[60%] bg-[#B79F93] rounded text-[9px] font-mono text-white px-1.5 flex items-center overflow-hidden font-medium">SUB_BASS_DROP_TACTILE</div>
          </div>

          {/* Track A2 */}
          <div className="h-5 w-full bg-white/40 rounded-lg flex gap-1.5 p-0.5 border border-white/40">
            <div className="w-full bg-[#9A7562] rounded text-[9px] font-mono text-white px-1.5 flex items-center overflow-hidden font-medium">PRODUCT_REVEAL_SYNTH_STEM</div>
          </div>

          {/* Moving Liquid Scrubber */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-[#9A7562] z-20 pointer-events-none transition-all duration-75 shadow-sm"
            style={{ left: `${scrubberPos}%` }}
          >
            <div className="w-3.5 h-3.5 bg-[#9A7562] border border-white rounded-full -translate-x-1.5 -translate-y-1 shadow-md"></div>
          </div>
        </div>
      </div>

      {/* Stereo Audio VU Meters */}
      <div className="border-t border-white/40 pt-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#6D5548] flex items-center gap-1.5 font-light">
          <span className="w-2 h-2 rounded-full bg-[#9A7562]"></span>
          <span>MASTER STEREO (-14.0 LUFS)</span>
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-[#6D5548]">L</span>
          <div className="w-16 h-1.5 bg-white/50 rounded-full overflow-hidden flex border border-white/40">
            <div className="w-[75%] bg-[#9A7562]"></div>
          </div>
          <span className="text-[10px] font-bold text-[#6D5548] ml-1">R</span>
          <div className="w-16 h-1.5 bg-white/50 rounded-full overflow-hidden flex border border-white/40">
            <div className="w-[70%] bg-[#9A7562]"></div>
          </div>
        </div>
      </div>
    </div>
  )
})
InteractiveNLEMonitor.displayName = "InteractiveNLEMonitor"

interface HeroProps {
  onWatchReel: () => void
  onExploreWorks: () => void
  onOpenBooking: () => void
}

export const Hero: React.FC<HeroProps> = ({ onWatchReel, onExploreWorks, onOpenBooking }) => {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-auto">
        
        {/* Left Column: Minimalist Typography with Thin Weights */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          
          {/* Eyebrow Label in Liquid Glass Pill */}
          <div className="inline-flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562]"></span>
            <span className="font-mono text-xs font-medium text-[#241812] uppercase tracking-wider liquid-glass-pill px-3 py-1 rounded-full">
              ALTERFFX // AE24
            </span>
            <span className="text-[#B79F93]">•</span>
            <span className="font-light text-base sm:text-lg text-[#6D5548]">
              Cinematic Edits & Motion Design
            </span>
          </div>

          {/* Huge Minimalist Headline with Regular Weight and Thin Italic Accent */}
          <h1 className="font-normal text-5xl sm:text-7xl xl:text-8xl tracking-tight text-[#241812] leading-[1.02]">
            Concept. Execution. <span className="font-light italic text-[#9A7562]">Impact.</span>
          </h1>

          {/* Direct Copy with Thin Montserrat */}
          <p className="text-[#6D5548] text-lg sm:text-xl leading-relaxed max-w-2xl font-light">
            An 18-year-old video editor & motion designer crafting cinematic edits, 3D product commercial animations, kinetic typography, and high-retention YouTube long form using After Effects 24. Transforming raw vision into high-impact visual stories.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onWatchReel()
              }}
              className="px-7 py-4 rounded-2xl bg-[#9A7562] text-white font-medium text-sm tracking-wide uppercase hover:bg-[#86614E] transition-all duration-200 flex items-center gap-3 shadow-lg shadow-[#9A7562]/25 active:scale-95 group cursor-pointer border border-white/20"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span>Watch Commercial Reel (0:48)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1000)
                onExploreWorks()
              }}
              className="px-7 py-4 rounded-2xl liquid-glass hover:bg-white/60 text-[#241812] font-medium text-sm tracking-wide uppercase transition-all flex items-center gap-2.5 shadow-xs cursor-pointer border border-[#B79F93]/40"
            >
              <Film className="w-4 h-4 text-[#9A7562]" />
              <span>Explore Sample Videos</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1200)
                onOpenBooking()
              }}
              className="px-5 py-4 text-[#6D5548] hover:text-[#241812] font-medium text-sm tracking-wide uppercase transition-colors cursor-pointer"
            >
              Start A Project
            </button>
          </div>

          {/* Metric Strip in Liquid Glass Panels */}
          <div className="pt-8 border-t border-white/50 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="liquid-glass-pill p-4 rounded-2xl text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-light text-[#241812]">60+</div>
              <div className="text-[11px] font-mono text-[#6D5548] mt-1 font-medium uppercase">Projects Done</div>
            </div>
            <div className="liquid-glass-pill p-4 rounded-2xl text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-light text-[#9A7562]">500K+</div>
              <div className="text-[11px] font-mono text-[#6D5548] mt-1 font-medium uppercase">Organic Views</div>
            </div>
            <div className="liquid-glass-pill p-4 rounded-2xl text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-light text-[#241812]">AE 24</div>
              <div className="text-[11px] font-mono text-[#6D5548] mt-1 font-medium uppercase">Primary Engine</div>
            </div>
            <div className="liquid-glass-pill p-4 rounded-2xl text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-light text-[#9A7562]">24h</div>
              <div className="text-[11px] font-mono text-[#6D5548] mt-1 font-medium uppercase">Rapid Delivery</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Isolated Memoized NLE Monitor */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <InteractiveNLEMonitor />
        </motion.div>

      </div>
    </section>
  )
}
