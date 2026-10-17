import React, { useState, useEffect, memo } from "react"
import { Volume2, VolumeX, Calendar, ArrowRight, Film } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

// Isolated Ticker so Navbar never re-renders on timer ticks
export const TimecodeTicker = memo(() => {
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
    <div className="flex items-center gap-2 font-mono text-[10px] text-[#6D5548]">
      <span className="text-[#6D5548]/70">SMPTE</span>
      <span className="text-[#241812] font-semibold tracking-wider bg-white/50 px-1.5 py-0.5 rounded">{timecode}</span>
      <span>•</span>
      <span className="text-[#9A7562] font-semibold">60.00 FPS UHD</span>
    </div>
  )
})
TimecodeTicker.displayName = "TimecodeTicker"

interface NavbarProps {
  onOpenBooking: () => void
  onNavClick: (sectionId: string) => void
  onOpenTheater?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavClick, onOpenTheater }) => {
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
        ? "bg-[#EDCFB5]/85 backdrop-blur-xl border-b border-white/60 shadow-sm py-3.5" 
        : "bg-transparent border-b border-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand & Studio Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              soundFx.playTick(1200)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
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
        </div>

        {/* Navigation Links with Thin Minimalist Montserrat Stack */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs lg:text-[13px] font-normal tracking-wide whitespace-nowrap">
          <button
            onClick={() => {
              soundFx.playTick(900)
              onNavClick("works")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer py-1"
          >
            Sample Videos
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1000)
              onNavClick("color-grade")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer py-1"
          >
            Color Grade Loupe
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1100)
              onNavClick("philosophy")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer py-1"
          >
            What I Offer
          </button>
          <button
            onClick={() => {
              soundFx.playTick(1200)
              onNavClick("rates")
            }}
            className="text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer py-1"
          >
            Rates & Intake
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Direct Theatrical Screening Room Trigger */}
          {onOpenTheater && (
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onOpenTheater()
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill hover:border-[#9A7562] text-xs font-mono text-[#241812] transition-all cursor-pointer shadow-2xs group whitespace-nowrap"
              title="Launch Theatrical Screening Room (Lights Off)"
            >
              <Film className="w-3.5 h-3.5 text-[#9A7562] group-hover:scale-110 transition-transform" />
              <span className="font-semibold tracking-wide">Cinema View</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A7562] animate-pulse"></span>
            </button>
          )}

          {/* Ambient BGM & Foley Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Play Ambient Cinema BGM" : "Mute Background Music"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
              !isMuted 
                ? "border-[#9A7562]/60 text-[#241812] bg-[#9A7562]/10" 
                : "text-[#6D5548] hover:text-[#241812] hover:border-[#9A7562]/40"
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#9A7562]" />
                <span className="text-[11px] font-sans font-medium tracking-wide text-[#9A7562]">BGM: ON</span>
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-2.5 bg-[#9A7562] animate-pulse"></span>
                  <span className="w-0.5 h-3.5 bg-[#9A7562] animate-pulse [animation-delay:150ms]"></span>
                  <span className="w-0.5 h-1.5 bg-[#9A7562] animate-pulse [animation-delay:300ms]"></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#6D5548]" />
                <span className="text-[11px] font-sans font-medium tracking-wide">BGM</span>
              </>
            )}
          </button>

          {/* Availability Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill text-[11px] font-mono text-[#241812] font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A7562] animate-ping"></span>
            <span>OPEN</span>
          </div>

          {/* Book Primary Button in #9A7562 */}
          <button
            onClick={() => {
              soundFx.playTick(1400)
              onOpenBooking()
            }}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9A7562] text-white text-xs font-medium tracking-wide hover:bg-[#86614E] transition-all shadow-md shadow-[#9A7562]/20 active:scale-95 cursor-pointer border border-white/20 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Edit</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </header>
  )
}
