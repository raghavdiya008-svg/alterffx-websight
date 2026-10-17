import React, { useState, useEffect, useRef, memo } from "react"
import { Volume2, VolumeX, Calendar, ArrowRight, Film, Menu, X, Sparkles, MessageSquare } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

// Zero-overhead direct-DOM Ticker: zero React re-renders on mobile CPUs
export const TimecodeTicker = memo(() => {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0
    let sec = 18
    let min = 24
    let hr = 1
    const pad = (n: number) => (n < 10 ? "0" + n : n.toString())

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
      if (spanRef.current) {
        spanRef.current.textContent = `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frame)}`
      }
    }, 1000 / 24)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 font-mono text-[10px] text-[#6D5548]">
      <span className="text-[#6D5548]/70">SMPTE</span>
      <span ref={spanRef} className="text-[#241812] font-semibold tracking-wider bg-white/50 px-1.5 py-0.5 rounded">01:24:18:00</span>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <span className="hidden sm:block font-light text-xs text-[#6D5548]">
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
          
          {/* Direct Theatrical Screening Room Trigger (Desktop/Tablet) */}
          {onOpenTheater && (
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onOpenTheater()
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill hover:border-[#9A7562] text-xs font-mono text-[#241812] transition-all cursor-pointer shadow-2xs group whitespace-nowrap"
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
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full liquid-glass-pill transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
              !isMuted 
                ? "border-[#9A7562]/60 text-[#241812] bg-[#9A7562]/10" 
                : "text-[#6D5548] hover:text-[#241812] hover:border-[#9A7562]/40"
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#9A7562]" />
                <span className="hidden sm:inline text-[11px] font-sans font-medium tracking-wide text-[#9A7562]">BGM</span>
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-[#9A7562] animate-pulse"></span>
                  <span className="w-0.5 h-3 bg-[#9A7562] animate-pulse [animation-delay:150ms]"></span>
                  <span className="w-0.5 h-1.5 bg-[#9A7562] animate-pulse [animation-delay:300ms]"></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#6D5548]" />
                <span className="hidden sm:inline text-[11px] font-sans font-medium tracking-wide">BGM</span>
              </>
            )}
          </button>

          {/* Availability Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill text-[11px] font-mono text-[#241812] font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A7562] animate-ping"></span>
            <span>OPEN</span>
          </div>

          {/* Book Primary Button in #9A7562 (Visible from sm up; on mobile it's prominent in the drawer) */}
          <button
            onClick={() => {
              soundFx.playTick(1400)
              onOpenBooking()
            }}
            className="hidden sm:inline-flex group relative items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#9A7562] text-white text-xs font-medium tracking-wide hover:bg-[#86614E] transition-all shadow-md shadow-[#9A7562]/20 active:scale-95 cursor-pointer border border-white/20 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Edit</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Mobile Menu Toggle Button (Visible only on mobile < md) */}
          <button
            onClick={() => {
              soundFx.playTick(1100)
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl liquid-glass-pill hover:border-[#9A7562] text-[#241812] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-3xl liquid-glass-card shadow-2xl border border-white/80 space-y-4 animate-fade-in font-sans">
          <div className="flex items-center justify-between pb-3 border-b border-white/40 text-xs font-semibold text-[#6D5548]">
            <span>PORTFOLIO SECTIONS</span>
            <span className="text-[#9A7562]">ALTER // AE24</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => {
                soundFx.playTick(900)
                setMobileMenuOpen(false)
                onNavClick("works")
              }}
              className="w-full text-left px-4 py-3 rounded-2xl hover:bg-white/60 text-sm text-[#241812] font-medium transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Sample Videos</span>
              <ArrowRight className="w-4 h-4 text-[#9A7562]" />
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1000)
                setMobileMenuOpen(false)
                onNavClick("color-grade")
              }}
              className="w-full text-left px-4 py-3 rounded-2xl hover:bg-white/60 text-sm text-[#241812] font-medium transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Color Grade Loupe</span>
              <ArrowRight className="w-4 h-4 text-[#9A7562]" />
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1100)
                setMobileMenuOpen(false)
                onNavClick("philosophy")
              }}
              className="w-full text-left px-4 py-3 rounded-2xl hover:bg-white/60 text-sm text-[#241812] font-medium transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>What I Offer</span>
              <ArrowRight className="w-4 h-4 text-[#9A7562]" />
            </button>

            <button
              onClick={() => {
                soundFx.playTick(1200)
                setMobileMenuOpen(false)
                onNavClick("rates")
              }}
              className="w-full text-left px-4 py-3 rounded-2xl hover:bg-white/60 text-sm text-[#241812] font-medium transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Rates & Commission Intake</span>
              <ArrowRight className="w-4 h-4 text-[#9A7562]" />
            </button>
          </div>

          <div className="pt-2 border-t border-white/40 space-y-2">
            <button
              onClick={() => {
                soundFx.playTick(1400)
                setMobileMenuOpen(false)
                onOpenBooking()
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#9A7562] text-white text-xs font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#9A7562]/25 cursor-pointer border border-white/20 active:scale-[0.98] transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Edit // Instant Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenTheater && (
              <button
                onClick={() => {
                  soundFx.playNeuralBurst()
                  setMobileMenuOpen(false)
                  onOpenTheater()
                }}
                className="w-full py-3 px-4 rounded-2xl bg-black/85 text-white text-xs font-medium flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:bg-black transition-colors"
              >
                <Film className="w-4 h-4 text-[#EDCFB5]" />
                <span>Launch Cinema View (Lights Off)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
