import React, { useState, useEffect } from "react"
import { 
  X, Play, Pause, Maximize2, Sparkles, Volume2, Film, ArrowRight, 
  Eye, EyeOff, ChevronLeft, ChevronRight, Sliders, Monitor, Layers, Check
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CloakedVideoPlayer } from "./CloakedVideoPlayer"
import { soundFx } from "../lib/audioEngine"
import { Project } from "../types/editor"
import { PROJECTS } from "../data/editorData"

interface CinematicTheaterProps {
  isOpen: boolean
  onClose: () => void
  onBookProject: (title: string) => void
  initialProject?: Project | null
}

type LightingMode = "theater" | "ambient" | "mastering"
type AspectMode = "16:9" | "2.39:1"

export const CinematicTheater: React.FC<CinematicTheaterProps> = ({
  isOpen,
  onClose,
  onBookProject,
  initialProject
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [lightingMode, setLightingMode] = useState<LightingMode>("theater")
  const [aspectMode, setAspectMode] = useState<AspectMode>("16:9")
  const [showHUD, setShowHUD] = useState(true)
  const [showReelDrawer, setShowReelDrawer] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)

  // Initialize or update active project when initialProject changes
  useEffect(() => {
    if (initialProject) {
      const idx = PROJECTS.findIndex(p => p.id === initialProject.id)
      if (idx !== -1) {
        setCurrentProjectIndex(idx)
      }
    } else {
      setCurrentProjectIndex(0)
    }
  }, [initialProject, isOpen])

  const activeProject = PROJECTS[currentProjectIndex] || PROJECTS[0]

  const videoId = activeProject.youtubeId || "7fP0N1iH9XU"
  const videoTitle = activeProject.title
  const videoCategory = activeProject.category
  const videoDuration = activeProject.duration
  const videoFps = activeProject.fps || "60.00 fps"
  const videoResolution = activeProject.resolution || "4K UHD"

  // Standardized technical editorial chapters
  const chapters = [
    { tc: "00:00:00", name: "01 • Hook Opening & 3D Spatial Tracking" },
    { tc: "00:00:14", name: "02 • Velocity Deceleration & Macro Particles" },
    { tc: "00:00:28", name: "03 • Expression Typography & Sub-Bass Punch" },
    { tc: "00:00:42", name: "04 • Final Grade & Master Out" }
  ]

  // Keyboard navigation: Escape to exit, Left/Right for project reels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        handlePrevReel()
      } else if (e.key === "ArrowRight") {
        handleNextReel()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentProjectIndex])

  const handlePrevReel = () => {
    soundFx.playTick(950)
    setCurrentProjectIndex(prev => (prev === 0 ? PROJECTS.length - 1 : prev - 1))
    setActiveChapter(0)
  }

  const handleNextReel = () => {
    soundFx.playTick(1050)
    setCurrentProjectIndex(prev => (prev === PROJECTS.length - 1 ? 0 : prev + 1))
    setActiveChapter(0)
  }

  const handleSelectReel = (index: number) => {
    soundFx.playTick(1150)
    setCurrentProjectIndex(index)
    setActiveChapter(0)
    setShowReelDrawer(false)
  }

  if (!isOpen) return null

  // Background styling depending on active lighting preset
  const getLightingBg = () => {
    switch (lightingMode) {
      case "theater":
        return "bg-[#090706]"
      case "ambient":
        return "bg-[#1E140E]"
      case "mastering":
        return "bg-[#121316]"
      default:
        return "bg-[#090706]"
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto transition-colors duration-700 ${getLightingBg()}`}
      >
        
        {/* Top Theatrical Control Bar */}
        <div className="relative z-30 flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          
          {/* Left: Slate Title & Timecode Specs */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-3 h-3 rounded-full bg-[#9A7562] animate-pulse"></div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-[#EDCFB5] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-[#9A7562]/30 border border-[#9A7562]/50">
                  THEATRICAL SCREENING ROOM
                </span>
                <span className="text-white/40 text-xs hidden sm:inline">•</span>
                <span className="text-xs font-mono text-white/70 hidden sm:inline">
                  REEL {String(currentProjectIndex + 1).padStart(2, "0")} OF {String(PROJECTS.length).padStart(2, "0")}
                </span>
                <span className="text-white/40 text-xs hidden md:inline">•</span>
                <span className="text-xs font-mono text-[#EDCFB5] hidden md:inline">
                  {videoCategory}
                </span>
              </div>
              <h2 className="text-white font-normal text-base sm:text-xl tracking-wide mt-0.5 truncate max-w-[210px] sm:max-w-md">
                {videoTitle}
              </h2>
            </div>
          </div>

          {/* Right: Theater Environment Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Reel Drawer Toggle */}
            <button
              onClick={() => {
                soundFx.playTick(1000)
                setShowReelDrawer(!showReelDrawer)
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                showReelDrawer 
                  ? "bg-[#9A7562] text-white border-white/40" 
                  : "bg-white/10 hover:bg-white/20 text-white/90 border-white/20"
              }`}
              title="Browse All Repertoire Cuts"
            >
              <Film className="w-3.5 h-3.5 text-[#EDCFB5]" />
              <span className="hidden sm:inline">Reels ({PROJECTS.length})</span>
            </button>

            {/* Scope / Aspect Ratio Toggle */}
            <button
              onClick={() => {
                soundFx.playTick(1100)
                setAspectMode(prev => prev === "16:9" ? "2.39:1" : "16:9")
              }}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-mono flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              title="Toggle 2.39:1 Cinemascope Letterbox"
            >
              <Monitor className="w-3.5 h-3.5 text-[#EDCFB5]" />
              <span className="hidden md:inline">{aspectMode === "16:9" ? "16:9 DCI" : "2.39:1 Scope"}</span>
            </button>

            {/* Lighting Mode Selector */}
            <button
              onClick={() => {
                soundFx.playTick(1200)
                setLightingMode(prev => {
                  if (prev === "theater") return "ambient"
                  if (prev === "ambient") return "mastering"
                  return "theater"
                })
              }}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-mono flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              title="Cycle Ambient Lighting Mode"
            >
              <span className="w-2 h-2 rounded-full bg-[#EDCFB5]"></span>
              <span className="hidden sm:inline">
                {lightingMode === "theater" && "Lights: Midnight"}
                {lightingMode === "ambient" && "Lights: Studio"}
                {lightingMode === "mastering" && "Lights: D65 Grade"}
              </span>
            </button>

            {/* HUD Toggle */}
            <button
              onClick={() => {
                soundFx.playTick(1300)
                setShowHUD(!showHUD)
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-mono flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              title="Toggle Metadata HUD"
            >
              {showHUD ? <EyeOff className="w-3.5 h-3.5 text-[#EDCFB5]" /> : <Eye className="w-3.5 h-3.5 text-[#EDCFB5]" />}
              <span className="hidden md:inline">{showHUD ? "Hide HUD" : "Show HUD"}</span>
            </button>

            {/* Exit Theater Button */}
            <button
              onClick={() => {
                soundFx.playTick(900)
                onClose()
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#9A7562] hover:bg-[#86614E] text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer border border-white/20 shadow-lg active:scale-95"
              aria-label="Exit Cinema Mode"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>

        {/* Central Cinema Canvas with Dynamic Ambient Projector Glow */}
        <div className="relative flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 my-auto">
          
          {/* Ambient Projector Wall Glow */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 flex items-center justify-center ${
              lightingMode === "theater" ? "opacity-25" : lightingMode === "ambient" ? "opacity-60" : "opacity-15"
            }`}
          >
            <div className="w-[85vw] max-w-6xl h-[60vh] bg-gradient-to-r from-[#9A7562]/35 via-[#EDCFB5]/25 to-[#9A7562]/35 blur-[140px] rounded-full"></div>
          </div>

          {/* Reel Switcher Drawer (When open) */}
          <AnimatePresence>
            {showReelDrawer && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-2 left-4 right-4 max-w-5xl mx-auto z-40 bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/20 p-4 shadow-2xl space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-white/80 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-[#EDCFB5]" />
                    <span className="font-semibold text-white">SELECT REPERTOIRE CUT TO SCREEN</span>
                  </div>
                  <span className="text-[11px] text-[#EDCFB5]">{PROJECTS.length} CUTS LOADED</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {PROJECTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectReel(idx)}
                      className={`group p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        currentProjectIndex === idx
                          ? "bg-[#9A7562] text-white border-white/50 shadow-md"
                          : "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                      }`}
                    >
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-2 bg-black">
                        <img 
                          src={p.stillImage} 
                          alt={p.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        {currentProjectIndex === idx && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EDCFB5] text-[#241812] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white">
                          {p.duration}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium leading-tight truncate">{p.title}</div>
                      <div className="text-[9px] font-mono text-[#EDCFB5] uppercase mt-0.5 truncate">{p.category}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Theatrical Cinema Frame with Next/Prev Controls */}
          <div className="relative w-full max-w-5xl z-10 flex items-center">
            
            {/* Previous Reel Navigation Arrow */}
            <button
              onClick={handlePrevReel}
              className="absolute -left-3 sm:-left-6 z-25 p-2 sm:p-3 rounded-full bg-black/80 hover:bg-[#9A7562] text-white border border-white/20 shadow-xl transition-all hover:scale-110 cursor-pointer -translate-x-1/2 hidden sm:flex"
              title="Previous Reel (Left Arrow)"
              aria-label="Previous Reel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Main Video Viewport */}
            <div className={`relative w-full rounded-3xl overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.95)] border border-white/25 bg-black transition-all duration-500 ${
              aspectMode === "2.39:1" ? "py-4 sm:py-8" : ""
            }`}>
              
              {/* 2.39:1 Scope Letterbox Matte Overlay (Top bar) */}
              {aspectMode === "2.39:1" && (
                <div className="absolute top-0 left-0 right-0 h-6 sm:h-10 bg-black z-35 pointer-events-none border-b border-white/10 flex items-center justify-center">
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                    ANAMORPHIC CINEMASCOPE 2.39:1
                  </span>
                </div>
              )}

              {/* Cloaked Video Player with Hardened Top & Bottom Shields */}
              <CloakedVideoPlayer
                key={activeProject.id}
                youtubeId={videoId}
                videoSrc={activeProject.videoSrc}
                title={videoTitle}
                category={videoCategory}
                duration={videoDuration}
                autoPlay={true}
                aspectRatio="16:9"
                className="w-full aspect-video"
              />

              {/* 2.39:1 Scope Letterbox Matte Overlay (Bottom bar) */}
              {aspectMode === "2.39:1" && (
                <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-10 bg-black z-35 pointer-events-none border-t border-white/10 flex items-center justify-center">
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                    ALTER STUDIO MASTER CUT // AFTER EFFECTS 24
                  </span>
                </div>
              )}

              {/* Cinematic Heads-Up Display (Overlay when active) */}
              {showHUD && (
                <div className="pointer-events-none absolute bottom-14 left-4 right-4 z-25 flex items-center justify-between text-[11px] font-mono text-white/90 bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 hidden sm:flex">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>FORMAT // {videoResolution}</span>
                    <span className="text-white/30">•</span>
                    <span>COLOR // REC.709 DCI</span>
                    <span className="text-white/30">•</span>
                    <span>AUDIO // -14.0 LUFS STEREO</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#EDCFB5] font-semibold">
                      AFTER EFFECTS 24 // {videoFps}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70">
                      CUT {currentProjectIndex + 1}/{PROJECTS.length}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Next Reel Navigation Arrow */}
            <button
              onClick={handleNextReel}
              className="absolute -right-3 sm:-right-6 z-25 p-2 sm:p-3 rounded-full bg-black/80 hover:bg-[#9A7562] text-white border border-white/20 shadow-xl transition-all hover:scale-110 cursor-pointer translate-x-1/2 hidden sm:flex"
              title="Next Reel (Right Arrow)"
              aria-label="Next Reel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Chapter Timeline Scrubbing Bar */}
          <div className="w-full max-w-5xl mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 z-10">
            {chapters.map((chap, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFx.playTick(1000 + idx * 50)
                  setActiveChapter(idx)
                }}
                className={`p-2.5 rounded-xl text-left border text-xs font-mono transition-all cursor-pointer ${
                  activeChapter === idx
                    ? "bg-[#9A7562] text-white border-white/40 shadow-md"
                    : "bg-black/60 hover:bg-black/90 text-white/60 border-white/10"
                }`}
              >
                <div className="text-[10px] text-[#EDCFB5] font-light">{chap.tc}</div>
                <div className="truncate font-medium mt-0.5">{chap.name}</div>
              </button>
            ))}
          </div>

        </div>

        {/* Bottom Theatrical Action Docket */}
        <div className="relative z-30 p-4 sm:p-5 border-t border-white/10 bg-black/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 text-xs font-mono text-white/70 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#9A7562]"></span>
            <div>
              <span className="text-[#EDCFB5] font-semibold">NEED AN EDIT IN THIS TONE?</span>
              <span className="hidden sm:inline"> // Current turnaround 48h. ProRes masters provided.</span>
            </div>
          </div>

          {/* Action Buttons: Next Reel & Direct Docket Booking */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleNextReel}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <span>Next Cut</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onClose()
                onBookProject(videoTitle)
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#9A7562] hover:bg-[#86614E] text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer shadow-lg shadow-[#9A7562]/30 active:scale-95"
            >
              <span>Book This Style Docket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  )
}
