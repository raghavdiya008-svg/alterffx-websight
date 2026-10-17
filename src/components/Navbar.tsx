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
    <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-mono text-[#6D5548]">
      <span className="text-[11px] text-[#6D5548]/80 font-medium">SMPTE</span>
      <span className="text-[#241812] font-semibold tracking-wider">{timecode}</span>
      <span>•</span>
      <span className="text-[#9A7562] text-xs font-semibold">60.00 FPS UHD</span>
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? "bg-[#EDCFB5]/80 backdrop-blur-xl border-b border-white/60 shadow-sm py-3.5" 
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
            className="group flex items-center gap-3.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-xl liquid-glass flex items-center justify-center group-hover:border-[#9A7562] transition-colors shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-normal text-2xl tracking-tight text-[#241812] group-hover:text-[#9A7562] transition-colors">
                  ALTER
                </span>
                <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded-full bg-[#9A7562] font-semibold tracking-wide shadow-2xs">
                  AE24
                </span>
              </div>
              <span className="block font-light text-xs text-[#6D5548]">
                Motion Design & Editorial Suite
              </span>
            </div>
          </button>

          {/* Isolated Ticker Component */}
          <TimecodeTicker />
        </div>

        {/* Navigation Links with Thin Minimalist Montserrat Stack */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-light tracking-wide">
          <button
            onClick={() => {
              soundFx.playTick(900)
              onNavClick("works")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer"
          >
            Sample Videos
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1000)
              onNavClick("color-grade")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer"
          >
            Color Grade Loupe
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1100)
              onNavClick("philosophy")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer"
          >
            What I Offer
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1200)
              onNavClick("rates")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer"
          >
            Rates & Intake
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3.5">
          
          {/* Sound Ambiance Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Unmute Suite Foley" : "Mute Suite Foley"}
            className="p-2.5 rounded-xl liquid-glass-pill hover:border-[#9A7562] text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#9A7562]" />}
          </button>

          {/* Availability Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-mono text-[#241812] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-ping"></span>
            <span>OPEN FOR COMMISSIONS</span>
          </div>

          {/* Book Primary Button in #9A7562 */}
          <button
            onClick={() => {
              soundFx.playTick(1400)
              onOpenBooking()
            }}
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#9A7562] text-white text-xs font-medium tracking-wide hover:bg-[#86614E] transition-all shadow-md shadow-[#9A7562]/20 active:scale-95 cursor-pointer border border-white/20"
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
