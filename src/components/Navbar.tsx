import React, { useState, useEffect, memo } from "react"
import { Volume2, VolumeX, Calendar, ArrowRight } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

// Isolated Ticker so Navbar never re-renders on timer ticks
const TimecodeTicker = memo(() => {
  const [timecode, setTimecode] = useState("01:24:18:00")

  useEffect(() => {
    let frame = 0
    let sec = 18
    let min = 24
    let hr = 1

    const interval = setInterval(() => {
      // Pause if tab is hidden to save CPU/battery
      if (document.hidden) return

      frame++
      if (frame >= 24) {
        frame = 0
        sec++
        if (sec >= 60) {
          sec = 0
          min++
          if (min >= 60) {
            min = 0
            hr++
          }
        }
      }
      const pad = (n: number) => n.toString().padStart(2, "0")
      setTimecode(`${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frame)}`)
    }, 1000 / 24)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded border border-[#1C2618]/15 bg-[#E0E6CE]/90 text-xs font-mono text-[#5E6B4E]">
      <span className="text-[11px] text-[#5E6B4E]/90 font-medium">SMPTE</span>
      <span className="text-[#1C2618] font-bold tracking-wider">{timecode}</span>
      <span>•</span>
      <span className="text-[#1C2618] text-xs font-semibold">24.00 FPS DCI</span>
    </div>
  )
})
TimecodeTicker.displayName = "TimecodeTicker"

interface NavbarProps {
  onOpenBooking: () => void
  onNavClick: (sectionId: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavClick }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll listener with passive flag for smooth 60fps scrolling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSoundToggle = () => {
    const muted = soundFx.toggleMute()
    setIsMuted(muted)
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled 
        ? "bg-[#D6DDBF]/95 backdrop-blur-md border-b border-[#1C2618]/15 shadow-sm py-3.5" 
        : "bg-transparent border-b border-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand & Studio Identity */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              soundFx.playTick(1200)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="group flex items-center gap-3.5 text-left focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-md border border-[#1C2618]/25 bg-[#E0E6CE] flex items-center justify-center group-hover:border-[#E8512A] transition-colors shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8512A] animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-normal tracking-tight text-[#1C2618] group-hover:text-[#E8512A] transition-colors">
                  Julian Vance
                </span>
                <span className="text-xs font-mono text-[#E8512A] px-2 py-0.5 rounded bg-[#E8512A]/10 border border-[#E8512A]/30 font-bold tracking-tight">
                  ROLL 24P
                </span>
              </div>
              <span className="block font-sans text-xs text-[#5E6B4E] font-medium">
                Film Editorial & Color Grading Suite
              </span>
            </div>
          </button>

          {/* Isolated Ticker Component */}
          <TimecodeTicker />
        </div>

        {/* Navigation Links with increased font size */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-semibold tracking-wide">
          <button
            onClick={() => {
              soundFx.playTick(900)
              onNavClick("works")
            }}
            className="text-[#5E6B4E] hover:text-[#1C2618] transition-colors"
          >
            Selected Works
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1000)
              onNavClick("color-grade")
            }}
            className="text-[#5E6B4E] hover:text-[#1C2618] transition-colors"
          >
            Color Grade Loupe
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1100)
              onNavClick("philosophy")
            }}
            className="text-[#5E6B4E] hover:text-[#1C2618] transition-colors"
          >
            Cutting Discipline
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1200)
              onNavClick("rates")
            }}
            className="text-[#5E6B4E] hover:text-[#1C2618] transition-colors"
          >
            Scope & Estimates
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3.5">
          
          {/* Sound Ambiance Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Unmute Suite Foley" : "Mute Suite Foley"}
            className="p-2.5 rounded-md border border-[#1C2618]/20 bg-[#E0E6CE] hover:border-[#E8512A]/40 text-[#5E6B4E] hover:text-[#1C2618] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E8512A]" />}
          </button>

          {/* Availability Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#1C2618]/20 bg-[#CBD4B1] text-xs font-mono text-[#1C2618] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#1C2618] animate-ping"></span>
            <span>OPEN FOR COMMISSIONS</span>
          </div>

          {/* Book Primary Button */}
          <button
            onClick={() => {
              soundFx.playTick(1400)
              onOpenBooking()
            }}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#E8512A] text-white text-xs font-sans font-semibold tracking-wide hover:bg-[#CF401B] transition-all shadow-sm active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Edit</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </header>
  )
}
