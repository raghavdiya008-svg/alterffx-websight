import React, { useState, useEffect, memo } from "react"
import { Play, Sparkles, Film, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"
import { CloakedVideoPlayer } from "./CloakedVideoPlayer"

// Director's Screening Slate with Liquid Glass Finish
const InteractiveNLEMonitor = memo(({ onLaunchTheater }: { onLaunchTheater?: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="rounded-3xl liquid-glass-card p-5 sm:p-6 shadow-2xl space-y-4 overflow-hidden relative">
      {/* Liquid Glass Registration Marks */}
      <div className="absolute top-3 left-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
      <div className="absolute top-3 right-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
      <div className="absolute bottom-3 left-3 text-xs font-mono text-[#241812]/20 select-none">+</div>
      <div className="absolute bottom-3 right-3 text-xs font-mono text-[#241812]/20 select-none">+</div>

      {/* Monitor Header Slate */}
      <div className="flex items-center justify-between border-b border-white/50 pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-pulse"></span>
          <span className="text-[#241812] font-semibold tracking-wide">CANONICAL REEL // 2026</span>
        </div>
        <div className="flex items-center gap-2">
          {onLaunchTheater && (
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onLaunchTheater()
              }}
              className="text-[#241812] hover:text-[#9A7562] liquid-glass-pill px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Launch full lights-off cinema screening"
            >
              <Film className="w-3 h-3 text-[#9A7562]" />
              <span className="hidden sm:inline">Cinema View</span>
            </button>
          )}
          <span className="text-[#241812] liquid-glass-pill px-2.5 py-1 rounded-full font-semibold hidden sm:inline">
            60.00 FPS UHD
          </span>
        </div>
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

      {/* Technical Pipeline Inspector (Grounded in Real Craft) */}
      <div className="space-y-2 pt-1 font-sans text-xs">
        <div className="flex items-center justify-between text-[#6D5548] pb-1 border-b border-white/30 text-[11px] font-medium">
          <span className="tracking-wide">PIPELINE ARCHITECTURE</span>
          <span className="text-[#9A7562] font-semibold">AFTER EFFECTS 24.3</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2.5 rounded-xl bg-white/40 border border-white/40 space-y-1">
            <span className="text-[#6D5548] block text-[10px] uppercase tracking-wide">3D COMPOSITING</span>
            <span className="text-[#241812] font-semibold">C4D + Element 3D Passes</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/40 border border-white/40 space-y-1">
            <span className="text-[#6D5548] block text-[10px] uppercase tracking-wide">COLOR PIPELINE</span>
            <span className="text-[#241812] font-semibold">High-Contrast Commercial</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/40 border border-white/40 space-y-1">
            <span className="text-[#6D5548] block text-[10px] uppercase tracking-wide">MOTION RIGGING</span>
            <span className="text-[#241812] font-semibold">Expression Easing Curves</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/40 border border-white/40 space-y-1">
            <span className="text-[#6D5548] block text-[10px] uppercase tracking-wide">AUDIO MASTERING</span>
            <span className="text-[#241812] font-semibold">-14 LUFS Stereo Sync</span>
          </div>
        </div>
      </div>

      {/* Live Master Feed Status */}
      <div className="border-t border-white/40 pt-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#6D5548] flex items-center gap-1.5 font-light">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>NATIVE 4K STREAM READY</span>
        </span>
        <span className="text-[11px] text-[#9A7562] font-semibold">
          RUN TIME // 00:48:00
        </span>
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
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562]"></span>
            <span className="font-mono text-xs font-medium text-[#241812] uppercase tracking-wider liquid-glass-pill px-3 py-1 rounded-full">
              ALTERFFX // AE24
            </span>
            <span className="text-[#B79F93] hidden xs:inline">•</span>
            <span className="font-light text-sm sm:text-lg text-[#6D5548]">
              Cinematic Edits & Motion Design
            </span>
          </div>

          {/* Main Title Provided by Alter */}
          <h1 className="font-normal text-4xl sm:text-7xl xl:text-8xl tracking-tight text-[#241812] leading-[1.08] sm:leading-[1.02]">
            I can make it <span className="font-bold not-italic text-[#9A7562]">work.</span>
          </h1>

          {/* Exact Description Provided by Alter */}
          <p className="text-[#6D5548] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light">
            18-year-old video editor passionate about creating cinematic edits, faceless content, talking-head videos, gaming edits, commercials, music videos, and YouTube Shorts &amp; long-form videos. Always learning, experimenting, and bringing ideas to life through After Effects &amp; Premiere Pro.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onWatchReel()
              }}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl bg-[#9A7562] text-white font-medium text-xs sm:text-sm tracking-wide uppercase hover:bg-[#86614E] transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-[#9A7562]/25 active:scale-95 group cursor-pointer border border-white/20"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span>Watch Reel (0:48)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1000)
                onExploreWorks()
              }}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl liquid-glass hover:bg-white/60 text-[#241812] font-medium text-xs sm:text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer border border-[#B79F93]/40"
            >
              <Film className="w-4 h-4 text-[#9A7562]" />
              <span>Explore Works</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1200)
                onOpenBooking()
              }}
              className="w-full sm:w-auto text-center px-5 py-3 text-[#6D5548] hover:text-[#241812] font-medium text-xs sm:text-sm tracking-wide uppercase transition-colors cursor-pointer"
            >
              Commission Inquiry
            </button>
          </div>
        </motion.div>

        {/* Right Column: Isolated Memoized NLE Monitor */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <InteractiveNLEMonitor onLaunchTheater={onWatchReel} />
        </motion.div>

      </div>
    </section>
  )
}
