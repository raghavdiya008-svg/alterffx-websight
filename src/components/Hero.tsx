import React, { useState, useEffect, memo } from "react"
import { Play, Film, Volume2 } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

// Isolated memoized NLE Monitor component so Hero copy never re-renders on playback frames
const InteractiveNLEMonitor = memo(() => {
  const [scrubberPos, setScrubberPos] = useState(38)
  const [isPlaying, setIsPlaying] = useState(true)
  const [audioMeterLeft, setAudioMeterLeft] = useState(65)
  const [audioMeterRight, setAudioMeterRight] = useState(68)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      if (document.hidden) return
      setScrubberPos((prev) => (prev >= 98 ? 4 : prev + 0.35))
      setAudioMeterLeft(Math.floor(Math.random() * 35 + 50))
      setAudioMeterRight(Math.floor(Math.random() * 35 + 48))
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
  const seconds = Math.floor(totalFrames / 24)
  const frames = totalFrames % 24
  const formattedTC = `00:01:${seconds.toString().padStart(2, "0")}:${frames.toString().padStart(2, "0")}`

  return (
    <div className="rounded-2xl border border-[#1C2618]/25 bg-[#E5EBD5] p-5 shadow-lg space-y-4 overflow-hidden relative">
      {/* Registration Crosshairs */}
      <div className="absolute top-2 left-2 text-xs font-mono text-[#1C2618]/30 select-none">+</div>
      <div className="absolute top-2 right-2 text-xs font-mono text-[#1C2618]/30 select-none">+</div>
      <div className="absolute bottom-2 left-2 text-xs font-mono text-[#1C2618]/30 select-none">+</div>
      <div className="absolute bottom-2 right-2 text-xs font-mono text-[#1C2618]/30 select-none">+</div>

      {/* Monitor Header */}
      <div className="flex items-center justify-between border-b border-[#1C2618]/15 pb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8512A] animate-ping"></span>
          <span className="text-[#1C2618] font-bold tracking-wide">SEQ: POLESTAR_HERO_V04</span>
        </div>
        <span className="text-[#1C2618] bg-[#D6DDBF] px-2.5 py-0.5 rounded border border-[#1C2618]/15 font-semibold">
          {formattedTC}
        </span>
      </div>

      {/* Video Preview Canvas */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#1C2618]/20 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
          alt="Sequence Preview"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Top Left Codec HUD */}
        <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/20 text-white font-medium">
          <span>ARRI ALEXA 35</span>
          <span>•</span>
          <span className="text-[#CBD4B1]">PRORES 4444 XQ</span>
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          onClick={() => {
            soundFx.playTick(1000)
            setIsPlaying(!isPlaying)
          }}
          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1C2618]/85 border border-white/35 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:border-[#E8512A] transition-all shadow-xl"
        >
          {isPlaying ? <span className="text-xs font-mono font-bold tracking-wider">PAUSE</span> : <Play className="w-6 h-6 fill-white ml-0.5" />}
        </button>

        {/* Bottom Scrubber Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/95">
          <span>IN: 00:00:00:00</span>
          <span className="text-[#E8512A] font-bold">PLAYHEAD ACTIVE</span>
          <span>OUT: 00:01:45:00</span>
        </div>
      </div>

      {/* Interactive Timeline Tracks (Scrubbable) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-mono text-[#5E6B4E]">
          <span className="font-medium">NLE MULTI-TRACK BUS (SCRUBBABLE)</span>
          <span>24.00 FPS DCI</span>
        </div>

        <div 
          onClick={handleScrub}
          className="relative h-28 w-full bg-[#CBD4B1] rounded-xl border border-[#1C2618]/20 p-1.5 cursor-ew-resize overflow-hidden flex flex-col justify-between"
        >
          {/* Track V2 */}
          <div className="h-5 w-full bg-[#D6DDBF] rounded flex gap-1 p-0.5 border border-[#1C2618]/10">
            <div className="w-[18%] bg-[#5E6B4E] rounded text-[9px] font-mono text-white px-1 flex items-center overflow-hidden font-semibold">CUTAWAY</div>
            <div className="w-[12%] bg-transparent"></div>
            <div className="w-[28%] bg-[#5E6B4E] rounded text-[9px] font-mono text-white px-1 flex items-center overflow-hidden font-semibold">MACRO WHEEL</div>
            <div className="w-[22%] bg-[#E8512A] rounded text-[9px] font-mono text-white px-1 flex items-center overflow-hidden font-bold">RAMP 300%</div>
          </div>

          {/* Track V1 */}
          <div className="h-6 w-full bg-[#DEE3CB] rounded flex gap-1 p-0.5 border border-[#1C2618]/10">
            <div className="w-[35%] bg-[#1C2618] rounded text-[10px] font-mono text-[#D6DDBF] px-1 flex items-center overflow-hidden font-bold">A001_C004_RAW</div>
            <div className="w-[25%] bg-[#1C2618] rounded text-[10px] font-mono text-[#D6DDBF] px-1 flex items-center overflow-hidden font-bold">A001_C012_RAW</div>
            <div className="w-[40%] bg-[#1C2618] rounded text-[10px] font-mono text-[#D6DDBF] px-1 flex items-center overflow-hidden font-bold">A002_C008_FIN</div>
          </div>

          {/* Track A1 */}
          <div className="h-5 w-full bg-[#D6DDBF] rounded flex gap-1 p-0.5 border border-[#1C2618]/10">
            <div className="w-[60%] bg-[#2A7B88] rounded text-[9px] font-mono text-white px-1 flex items-center overflow-hidden font-semibold">VO_MASTER_DENOISED</div>
          </div>

          {/* Track A2 */}
          <div className="h-5 w-full bg-[#D6DDBF] rounded flex gap-1 p-0.5 border border-[#1C2618]/10">
            <div className="w-full bg-[#B59226] rounded text-[9px] font-mono text-white px-1 flex items-center overflow-hidden font-semibold">FULL_SCORE_ORCHESTRAL_STEM</div>
          </div>

          {/* Moving Playhead Scrubber */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-[#E8512A] z-20 pointer-events-none transition-all duration-75"
            style={{ left: `${scrubberPos}%` }}
          >
            <div className="w-3.5 h-3.5 bg-[#E8512A] rounded-full -translate-x-1.5 -translate-y-1 shadow-md"></div>
          </div>
        </div>
      </div>

      {/* Stereo Audio VU Meters */}
      <div className="border-t border-[#1C2618]/15 pt-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#5E6B4E] flex items-center gap-1.5 font-medium">
          <Volume2 className="w-4 h-4 text-[#1C2618]" />
          <span>MASTER STEREO (-14.2 LUFS)</span>
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#5E6B4E] font-bold">L</span>
            <div className="w-20 h-2.5 bg-[#CBD4B1] rounded-full overflow-hidden border border-[#1C2618]/15">
              <div 
                className="h-full bg-gradient-to-r from-[#2A7B88] via-[#B59226] to-[#E8512A] transition-all duration-75"
                style={{ width: `${audioMeterLeft}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#5E6B4E] font-bold">R</span>
            <div className="w-20 h-2.5 bg-[#CBD4B1] rounded-full overflow-hidden border border-[#1C2618]/15">
              <div 
                className="h-full bg-gradient-to-r from-[#2A7B88] via-[#B59226] to-[#E8512A] transition-all duration-75"
                style={{ width: `${audioMeterRight}%` }}
              ></div>
            </div>
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
    <section className="relative min-h-[88vh] flex flex-col justify-between pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-auto">
        
        {/* Left Column: Bold Boska Typography with +2pt sizing */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          
          {/* Eyebrow Label (+2pt larger) */}
          <div className="inline-flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8512A]"></span>
            <span className="font-mono text-xs font-bold text-[#1C2618] uppercase tracking-wider bg-[#E0E6CE] px-2.5 py-1 rounded border border-[#1C2618]/20">
              LAB REPORT 26-B
            </span>
            <span className="text-[#5E6B4E]">•</span>
            <span className="font-serif italic text-lg sm:text-xl text-[#5E6B4E]">
              The craft of offline rhythm & color calibration
            </span>
          </div>

          {/* Huge Confident Editorial Headline with Boska */}
          <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-normal tracking-tight text-[#1C2618] leading-[0.98]">
            Every millisecond is an <em className="italic font-normal text-[#E8512A]">emotional decision</em>.
          </h1>

          {/* Direct Copy (+2pt larger for effortless reading) */}
          <p className="text-[#5E6B4E] text-lg sm:text-xl leading-relaxed max-w-2xl font-sans font-normal">
            I shape high-stakes commercial cuts, documentary narratives, and viral campaigns for directors and brands who cannot afford boring pacing. 148 cuts delivered across 11 timezones with an integrated workflow covering offline assembly, invisible VFX, multi-stem sound design, and custom film-print color science.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onWatchReel()
              }}
              className="px-7 py-4 rounded-xl bg-[#E8512A] text-white font-sans font-semibold text-sm tracking-wider uppercase hover:bg-[#CF401B] transition-all duration-150 flex items-center gap-3 shadow-md shadow-[#E8512A]/20 active:scale-95 group"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </div>
              <span>Watch 2026 Showreel (2:14)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1000)
                onExploreWorks()
              }}
              className="px-7 py-4 rounded-xl border border-[#1C2618]/25 bg-[#E0E6CE] hover:bg-[#E8EDD7] text-[#1C2618] font-sans font-semibold text-sm tracking-wider uppercase transition-all flex items-center gap-2.5 shadow-2xs"
            >
              <Film className="w-4 h-4 text-[#E8512A]" />
              <span>Explore Selected Works</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1200)
                onOpenBooking()
              }}
              className="px-5 py-4 text-[#5E6B4E] hover:text-[#1C2618] font-sans text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              Check Availability
            </button>
          </div>

          {/* Metric Strip (+2pt larger numbers and labels) */}
          <div className="pt-8 border-t border-[#1C2618]/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="border-l-2 border-[#1C2618] pl-3.5">
              <div className="text-4xl sm:text-5xl font-serif text-[#1C2618]">148</div>
              <div className="text-xs font-mono text-[#5E6B4E] mt-1 font-semibold uppercase">Cuts Delivered</div>
            </div>
            <div className="border-l-2 border-[#E8512A] pl-3.5">
              <div className="text-4xl sm:text-5xl font-serif text-[#E8512A]">42.6M</div>
              <div className="text-xs font-mono text-[#5E6B4E] mt-1 font-semibold uppercase">Organic Views</div>
            </div>
            <div className="border-l-2 border-[#2A7B88] pl-3.5">
              <div className="text-4xl sm:text-5xl font-serif text-[#1C2618]">+41.8%</div>
              <div className="text-xs font-mono text-[#5E6B4E] mt-1 font-semibold uppercase">Retention Lift</div>
            </div>
            <div className="border-l-2 border-[#B59226] pl-3.5">
              <div className="text-4xl sm:text-5xl font-serif text-[#1C2618]">72h</div>
              <div className="text-xs font-mono text-[#5E6B4E] mt-1 font-semibold uppercase">Rough Cut SLA</div>
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
