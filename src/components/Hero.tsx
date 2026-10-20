import React, { useState, useRef, useEffect } from "react"
import { Play, Film, ChevronDown, Activity, Sparkles } from "lucide-react"
import { motion, Variants, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"
import { CloakedVideoPlayer } from "./CloakedVideoPlayer"
import { Magnetic } from "./motion/Magnetic"

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
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export const Hero: React.FC<HeroProps> = ({ onWatchReel, onExploreWorks, onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Physics-based spring interpolation for butter-smooth 120 FPS glide on mousewheel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0005
  })

  // Phase 1: Left Text glides UP and completely vanishes BEFORE video begins expanding
  // At smoothProgress >= 0.10, text is display: none so it NEVER peeks out or overlaps
  const textOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0])
  const textY = useTransform(smoothProgress, [0, 0.10], [0, -65])
  const textDisplay = useTransform(smoothProgress, (v) => v >= 0.10 ? "none" : "block")

  // Phase 2: Video smoothly expands from right side (52% left, 48% width) to FULL 100% width
  // Starts ONLY AFTER text has completely vanished (0.10)
  const videoLeft = useTransform(smoothProgress, [0.10, 0.38], ["52%", "0%"])
  const videoWidth = useTransform(smoothProgress, [0.10, 0.38], ["48%", "100%"])

  // Subtle scroll prompt fades out immediately on first scroll
  const scrollPromptOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0])

  return (
    <section 
      ref={containerRef} 
      className="relative lg:min-h-[200vh]"
    >
      {/* Sticky Cinematic Viewport Container */}
      <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5.5rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-2 overflow-hidden w-full">
        
        {/* Main Canvas Area */}
        <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between my-auto py-2">
          
          {/* Left Column: Typography & CTAs (Fades out completely by 0.10 with display:none) */}
          <motion.div
            style={isDesktop && !shouldReduceMotion ? { 
              opacity: textOpacity, 
              y: textY,
              display: textDisplay as any
            } : undefined}
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[48%] space-y-6 sm:space-y-7 z-10 shrink-0"
          >
            {/* Eyebrow Label in Liquid Glass Pill */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-pulse"></span>
              <span className="font-mono text-xs font-medium text-[#241812] uppercase tracking-wider liquid-glass-pill px-3 py-1 rounded-full border border-white/70 shadow-2xs">
                ALTERFFX
              </span>
              <span className="text-[#B79F93] hidden xs:inline">•</span>
              <span className="font-light text-sm sm:text-base text-[#6D5548]">
                Cinematic Edits &amp; Motion Design
              </span>
            </motion.div>

            {/* Main Title Provided by Alter */}
            <motion.h1 
              variants={heroItemVariants}
              className="font-normal text-4xl sm:text-6xl xl:text-7xl tracking-tight text-[#241812] leading-[1.08] sm:leading-[1.04]"
            >
              I can make it <span className="font-bold not-italic text-[#9A7562]">work.</span>
            </motion.h1>

            {/* Description Provided by Alter */}
            <motion.p 
              variants={heroItemVariants}
              className="text-[#6D5548] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-light"
            >
              18-year-old video editor passionate about creating cinematic edits, faceless content, talking-head videos, gaming edits, commercials, music videos, and YouTube Shorts &amp; long-form videos. Always learning, experimenting, and bringing ideas to life through After Effects &amp; Premiere Pro.
            </motion.p>

            {/* Studio Guarantee & Capacity Pill */}
            <motion.div variants={heroItemVariants} className="flex items-center gap-2 text-xs font-mono text-[#6D5548]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-[#241812]">IMMEDIATE CAPACITY:</span>
              <span>24-48H FIRST CUT TURNAROUND</span>
            </motion.div>

            {/* Action Buttons with Magnetic Physics */}
            <motion.div variants={heroItemVariants} className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <Magnetic strength={0.22}>
                <motion.button
                  whileHover={{ scale: 1.025, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundFx.playNeuralBurst()
                    onWatchReel()
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#9A7562] text-white font-medium text-xs sm:text-sm tracking-wide uppercase hover:bg-[#86614E] transition-colors flex items-center justify-center gap-2.5 shadow-lg shadow-[#9A7562]/25 cursor-pointer border border-white/20 group"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                  </div>
                  <span>Watch Reel (0:40)</span>
                </motion.button>
              </Magnetic>

              <Magnetic strength={0.22}>
                <motion.button
                  whileHover={{ scale: 1.025, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundFx.playTick(1000)
                    onExploreWorks()
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl liquid-glass hover:bg-white/70 text-[#241812] font-medium text-xs sm:text-sm tracking-wide uppercase transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-[#B79F93]/40"
                >
                  <Film className="w-4 h-4 text-[#9A7562]" />
                  <span>Explore Works</span>
                </motion.button>
              </Magnetic>

              <Magnetic strength={0.16}>
                <motion.button
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFx.playTick(1200)
                    onOpenBooking()
                  }}
                  className="w-full sm:w-auto text-center px-4 py-3 text-[#6D5548] hover:text-[#241812] font-medium text-xs sm:text-sm tracking-wide uppercase transition-colors cursor-pointer rounded-2xl hover:bg-white/40"
                >
                  Commission Inquiry
                </motion.button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* 
            ====================================================================
            EXPANSIVE HORIZONTAL CINEMA PANEL (PROPER 16:9 PROPORTIONS)
            - Resting (scroll = 0): Right half (width: 48%, left: 52%)
            - On scroll: Left moves to 0%, Width expands to 100%
            - Starts ONLY after text is gone (smoothProgress >= 0.10)
            - True 16:9 aspect ratio prevents any cropping or letterbox squish!
            ====================================================================
          */}
          <motion.div
            style={isDesktop && !shouldReduceMotion ? {
              left: videoLeft,
              width: videoWidth,
            } : undefined}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:absolute lg:top-1/2 lg:-translate-y-1/2 z-20 mt-8 lg:mt-0 transform-gpu"
          >
            <div className="w-full rounded-3xl liquid-glass-card p-3 sm:p-4.5 shadow-2xl space-y-2.5 border border-white/90 relative overflow-hidden transform-gpu">
              
              {/* Registration Corner Marks */}
              <div className="absolute top-2 left-2 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>
              <div className="absolute top-2 right-2 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>
              <div className="absolute bottom-2 left-2 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>
              <div className="absolute bottom-2 right-2 text-xs font-mono text-[#241812]/20 select-none pointer-events-none">+</div>

              {/* Minimalist Top Console Slate Bar */}
              <div className="flex items-center justify-between border-b border-white/50 pb-2 text-xs font-mono px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-pulse"></span>
                  <span className="text-[#241812] font-semibold tracking-wide text-xs sm:text-sm">
                    OFFICIAL SHOWREEL • 2026
                  </span>
                  <span className="text-[#6D5548] hidden sm:inline">•</span>
                  <span className="text-[#6D5548] hidden sm:inline text-xs">DIRECTOR CUT</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#6D5548] liquid-glass-pill px-2.5 py-0.5 rounded-full font-medium hidden md:inline text-[10px]">
                    AFTER EFFECTS 24 PIPELINE
                  </span>
                  <span className="text-[#241812] liquid-glass-pill px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
                    60.00 FPS UHD
                  </span>

                  <Magnetic strength={0.2}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        soundFx.playNeuralBurst()
                        onWatchReel()
                      }}
                      className="text-[#241812] hover:text-[#9A7562] liquid-glass-pill px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 transition-colors cursor-pointer text-xs"
                      title="Launch full lights-off cinema screening"
                    >
                      <Film className="w-3.5 h-3.5 text-[#9A7562]" />
                      <span className="hidden sm:inline">Cinema View</span>
                    </motion.button>
                  </Magnetic>
                </div>
              </div>

              {/* True 16:9 Aspect Ratio Video Canvas (Zero Cropping, Zero Distortion) */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
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
                  className="w-full h-full"
                />
              </div>

              {/* Clean Bottom Status Strip */}
              <div className="flex items-center justify-between text-xs font-mono pt-1 text-[#6D5548] text-[10px] sm:text-[11px] px-1">
                <span className="flex items-center gap-1.5 font-light">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-medium text-[#241812]">NATIVE 4K STREAM READY</span>
                  <span className="hidden sm:inline">• HARDWARE ACCELERATED</span>
                </span>

                <span className="text-[#9A7562] font-semibold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#9A7562]" />
                  <span>00:40:00 • 60 FPS DCI</span>
                </span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Ambient Bottom Scroll Prompt Indicator */}
        <motion.div 
          style={isDesktop && !shouldReduceMotion ? { opacity: scrollPromptOpacity } : undefined}
          className="hidden lg:flex items-center justify-center gap-2 pt-1 text-xs font-mono text-[#6D5548] select-none"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#9A7562]" />
          </motion.div>
          <span>SCROLL TO EXPAND VIDEO</span>
        </motion.div>

      </div>
    </section>
  )
}
