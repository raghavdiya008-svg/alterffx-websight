import React, { useState, useEffect, useRef, memo } from "react"
import { Volume2, VolumeX, Calendar, ArrowRight, Film, Menu, X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

// Zero-overhead direct-DOM Ticker: paused when offscreen to eliminate idle CPU drain on low-end hardware
export const TimecodeTicker = memo(() => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    let sec = 18
    let min = 24
    let hr = 1
    const pad = (n: number) => (n < 10 ? "0" + n : n.toString())
    let isVisible = true
    let intervalId: ReturnType<typeof setInterval> | null = null

    const tick = () => {
      if (document.hidden || !isVisible) return

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
    }

    intervalId = setInterval(tick, 1000 / 24)

    let observer: IntersectionObserver | null = null
    if (containerRef.current && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting
        },
        { threshold: 0.1 }
      )
      observer.observe(containerRef.current)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (observer) observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="flex items-center gap-2 font-mono text-[10px] text-[#6D5548]">
      <span className="text-[#6D5548]/70">SMPTE</span>
      <span ref={spanRef} className="text-[#241812] font-semibold tracking-wider bg-white/60 px-1.5 py-0.5 rounded shadow-2xs">01:24:18:00</span>
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

const NAV_ITEMS = [
  { id: "works", label: "Sample Videos", freq: 900 },
  { id: "color-grade", label: "Color Grade Loupe", freq: 1000 },
  { id: "philosophy", label: "What I Offer", freq: 1100 },
  { id: "rates", label: "Rates & Intake", freq: 1200 },
]

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavClick, onOpenTheater }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

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
        ? "bg-[#EDCFB5]/90 backdrop-blur-md border-b border-white/60 shadow-sm py-3" 
        : "bg-transparent border-b border-transparent py-4 sm:py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand & Studio Identity */}
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.button>
        </div>

        {/* Navigation Links with Framer Motion Micro-Pill Hover */}
        <nav 
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs lg:text-[13px] font-normal tracking-wide whitespace-nowrap p-1 rounded-full liquid-glass border border-white/60"
        >
          {NAV_ITEMS.map((item) => {
            const isHovered = hoveredNav === item.id
            return (
              <button
                key={item.id}
                onMouseEnter={() => {
                  soundFx.playTick(item.freq)
                  setHoveredNav(item.id)
                }}
                onClick={() => onNavClick(item.id)}
                className="relative px-3.5 py-1.5 rounded-full text-[#6D5548] hover:text-[#241812] transition-colors cursor-pointer select-none"
              >
                {isHovered && (
                  <motion.span
                    layoutId="navbarHoverPill"
                    className="absolute inset-0 bg-white/75 rounded-full shadow-2xs -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Direct Theatrical Screening Room Trigger */}
          {onOpenTheater && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFx.playNeuralBurst()
                onOpenTheater()
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill hover:border-[#9A7562] text-xs font-mono text-[#241812] transition-colors cursor-pointer shadow-2xs group whitespace-nowrap"
              title="Launch Theatrical Screening Room (Lights Off)"
            >
              <Film className="w-3.5 h-3.5 text-[#9A7562] group-hover:scale-110 transition-transform" />
              <span className="font-semibold tracking-wide">Cinema View</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A7562] animate-pulse"></span>
            </motion.button>
          )}

          {/* Ambient BGM & Foley Toggle */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
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
                <span className="hidden sm:inline text-[11px] font-sans font-medium tracking-wide text-[#9A7562]">BGM</span>
                <span className="flex items-center gap-0.5 h-3">
                  <motion.span animate={{ scaleY: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 h-2.5 bg-[#9A7562] rounded-full"></motion.span>
                  <motion.span animate={{ scaleY: [0.7, 0.3, 1] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 h-3 bg-[#9A7562] rounded-full"></motion.span>
                  <motion.span animate={{ scaleY: [0.3, 0.9, 0.3] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-0.5 h-2 bg-[#9A7562] rounded-full"></motion.span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#6D5548]" />
                <span className="hidden sm:inline text-[11px] font-sans font-medium tracking-wide">BGM</span>
              </>
            )}
          </motion.button>

          {/* Availability Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass-pill text-[11px] font-mono text-[#241812] font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A7562] animate-ping"></span>
            <span>OPEN</span>
          </div>

          {/* Book Primary Button in #9A7562 */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundFx.playTick(1400)
              onOpenBooking()
            }}
            className="hidden sm:inline-flex group relative items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#9A7562] text-white text-xs font-medium tracking-wide hover:bg-[#86614E] transition-colors shadow-md shadow-[#9A7562]/20 cursor-pointer border border-white/20 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Edit</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundFx.playTick(1100)
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl liquid-glass-pill hover:border-[#9A7562] text-[#241812] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Sheet with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-3 mx-4 p-5 rounded-3xl liquid-glass-card shadow-2xl border border-white/80 space-y-4 font-sans"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/40 text-xs font-semibold text-[#6D5548]">
              <span>PORTFOLIO SECTIONS</span>
              <span className="text-[#9A7562]">ALTER // AE24</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => {
                    soundFx.playTick(item.freq)
                    setMobileMenuOpen(false)
                    onNavClick(item.id)
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl hover:bg-white/60 active:bg-white/80 text-sm text-[#241812] font-medium transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#9A7562]" />
                </motion.button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/40 space-y-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundFx.playTick(1400)
                  setMobileMenuOpen(false)
                  onOpenBooking()
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#9A7562] text-white text-xs font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#9A7562]/25 cursor-pointer border border-white/20 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Edit // Instant Intake</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {onOpenTheater && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFx.playNeuralBurst()
                    setMobileMenuOpen(false)
                    onOpenTheater()
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-black/85 text-white text-xs font-medium flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:bg-black transition-colors"
                >
                  <Film className="w-4 h-4 text-[#EDCFB5]" />
                  <span>Launch Cinema View (Lights Off)</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
