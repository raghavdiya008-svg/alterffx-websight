import React, { useState, memo } from "react"
import { Play, Sparkles, Film, ArrowRight, CheckCircle2, Cpu, Activity } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { soundFx } from "../lib/audioEngine"
import { CloakedVideoPlayer } from "./CloakedVideoPlayer"

// Director's Screening Slate with Hardware-Accelerated Liquid Glass Finish
const InteractiveNLEMonitor = memo(({ onLaunchTheater }: { onLaunchTheater?: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeChip, setActiveChip] = useState<number | null>(null)

  const PIPELINE_CHIPS = [
    { title: "3D COMPOSITING", spec: "C4D + Element 3D Passes", detail: "Multi-layer depth & camera tracking" },
    { title: "COLOR PIPELINE", spec: "High-Contrast Commercial", detail: "ACEScc / DCI-P3 calibrated curve" },
    { title: "MOTION RIGGING", spec: "Expression Easing Curves", detail: "Hyper-tuned exponential speed graphs" },
    { title: "AUDIO MASTERING", spec: "-14 LUFS Stereo Sync", detail: "Dynamic range compression & Foley sync" },
  ]

  return (
    <div className="rounded-3xl liquid-glass-card p-5 sm:p-6 shadow-2xl space-y-4 overflow-hidden relative transform-gpu will-change-transform">
      {/* Liquid Glass Registration Marks */}
      <div className="absolute top-3 left-3 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>
      <div className="absolute top-3 right-3 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>
      <div className="absolute bottom-3 left-3 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>
      <div className="absolute bottom-3 right-3 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>

      {/* Monitor Header Slate */}
      <div className="flex items-center justify-between border-b border-white/50 pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-pulse"></span>
          <span className="text-[#241812] font-semibold tracking-wide">OFFICIAL SHOWREEL // 2026</span>
        </div>
        <div className="flex items-center gap-2">
          {onLaunchTheater && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundFx.playNeuralBurst()
                onLaunchTheater()
              }}
              className="text-[#241812] hover:text-[#9A7562] liquid-glass-pill px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Launch full lights-off cinema screening"
            >
              <Film className="w-3 h-3 text-[#9A7562]" />
              <span className="hidden sm:inline">Cinema View</span>
            </motion.button>
          )}
          <span className="text-[#241812] liquid-glass-pill px-2.5 py-1 rounded-full font-semibold hidden sm:inline">
            60.00 FPS UHD
          </span>
        </div>
      </div>

      {/* Video Preview Canvas with Cloaked Video Player (Shields YouTube branding, channel links, and watermark clickouts) */}
      <CloakedVideoPlayer
        youtubeId="7fP0N1iH9XU"
        videoSrc="/videos/showreel.mp4"
        title="Alternator - Official Showreel"
        category="Motion Graphics"
        duration="00:40"
        stillImage="/thumbnails/showreel-thumb.png"
        aspectRatio="16:9"
        autoPlay={isPlaying}
        onPlayChange={(playing) => setIsPlaying(playing)}
      />

      {/* Technical Pipeline Inspector with Interactive Chips */}
      <div className="space-y-2 pt-1 font-sans text-xs">
        <div className="flex items-center justify-between text-[#6D5548] pb-1 border-b border-white/30 text-[11px] font-medium">
          <span className="tracking-wide flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#9A7562]" />
            <span>PIPELINE ARCHITECTURE</span>
          </span>
          <span className="text-[#9A7562] font-semibold">AFTER EFFECTS 24.3</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {PIPELINE_CHIPS.map((chip, idx) => {
            const isActive = activeChip === idx
            return (
              <motion.div
                key={chip.title}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => {
                  soundFx.playTick(1000 + idx * 80)
                  setActiveChip(idx)
                }}
                onMouseLeave={() => setActiveChip(null)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isActive 
                    ? "bg-white/80 border-[#9A7562]/50 shadow-xs" 
                    : "bg-white/40 border-white/40 hover:bg-white/60"
                }`}
              >
                <span className="text-[#6D5548] block text-[10px] uppercase tracking-wide">
                  {chip.title}
                </span>
                <span className="text-[#241812] font-semibold block truncate">
                  {isActive ? chip.detail : chip.spec}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Live Master Feed Status */}
      <div className="border-t border-white/40 pt-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#6D5548] flex items-center gap-1.5 font-light">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>NATIVE 4K STREAM READY</span>
        </span>
        <span className="text-[11px] text-[#9A7562] font-semibold flex items-center gap-1">
          <Activity className="w-3 h-3 text-[#9A7562]" />
          <span>RUN TIME // 00:40:00</span>
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

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export const Hero: React.FC<HeroProps> = ({ onWatchReel, onExploreWorks, onOpenBooking }) => {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1 my-auto">
        
        {/* Left Column: Minimalist Typography & Micro-Interactions */}
        <motion.div 
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-7 sm:space-y-8"
        >
          
          {/* Eyebrow Label in Liquid Glass Pill */}
          <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-pulse"></span>
            <span className="font-mono text-xs font-medium text-[#241812] uppercase tracking-wider liquid-glass-pill px-3 py-1 rounded-full border border-white/70 shadow-2xs">
              ALTERFFX // AE24
            </span>
            <span className="text-[#B79F93] hidden xs:inline">•</span>
            <span className="font-light text-sm sm:text-base text-[#6D5548]">
              Cinematic Edits & Motion Design
            </span>
          </motion.div>

          {/* Main Title Provided by Alter */}
          <motion.h1 
            variants={heroItemVariants}
            className="font-normal text-4xl sm:text-7xl xl:text-8xl tracking-tight text-[#241812] leading-[1.08] sm:leading-[1.02]"
          >
            I can make it <span className="font-bold not-italic text-[#9A7562]">work.</span>
          </motion.h1>

          {/* Description Provided by Alter */}
          <motion.p 
            variants={heroItemVariants}
            className="text-[#6D5548] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light"
          >
            18-year-old video editor passionate about creating cinematic edits, faceless content, talking-head videos, gaming edits, commercials, music videos, and YouTube Shorts &amp; long-form videos. Always learning, experimenting, and bringing ideas to life through After Effects &amp; Premiere Pro.
          </motion.p>

          {/* Studio Guarantee & Turnaround Pill */}
          <motion.div variants={heroItemVariants} className="flex items-center gap-2 text-xs font-mono text-[#6D5548]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-[#241812]">IMMEDIATE CAPACITY:</span>
            <span>24-48H FIRST CUT TURNAROUND</span>
          </motion.div>

          {/* Primary Action Buttons with Framer Motion GPU Transforms */}
          <motion.div variants={heroItemVariants} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-1">
            <motion.button
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFx.playNeuralBurst()
                onWatchReel()
              }}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl bg-[#9A7562] text-white font-medium text-xs sm:text-sm tracking-wide uppercase hover:bg-[#86614E] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-[#9A7562]/25 cursor-pointer border border-white/20 group"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span>Watch Reel (0:40)</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFx.playTick(1000)
                onExploreWorks()
              }}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl liquid-glass hover:bg-white/70 text-[#241812] font-medium text-xs sm:text-sm tracking-wide uppercase transition-colors flex items-center justify-center gap-2.5 shadow-xs cursor-pointer border border-[#B79F93]/40"
            >
              <Film className="w-4 h-4 text-[#9A7562]" />
              <span>Explore Works</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundFx.playTick(1200)
                onOpenBooking()
              }}
              className="w-full sm:w-auto text-center px-5 py-3.5 text-[#6D5548] hover:text-[#241812] font-medium text-xs sm:text-sm tracking-wide uppercase transition-colors cursor-pointer rounded-2xl hover:bg-white/40"
            >
              Commission Inquiry
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: Isolated Memoized NLE Monitor */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <InteractiveNLEMonitor onLaunchTheater={onWatchReel} />
        </motion.div>

      </div>
    </section>
  )
}
