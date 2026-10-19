import React, { useState } from "react"
import { Play, Clock, ArrowUpRight, Film, Layers, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PROJECTS } from "../data/editorData"
import { Project } from "../types/editor"
import { soundFx } from "../lib/audioEngine"

interface WorksGalleryProps {
  onSelectProject: (project: Project) => void
  onOpenTheater?: (project: Project) => void
}

const CATEGORIES = ["All Cuts", "Motion Graphics", "YouTube Long Form", "Podcast Edits", "Narrative", "Short Form"]

export const WorksGallery: React.FC<WorksGalleryProps> = ({ onSelectProject, onOpenTheater }) => {
  const [activeCategory, setActiveCategory] = useState("All Cuts")
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)

  const filteredProjects = activeCategory === "All Cuts"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <section id="works" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      
      {/* Section Header with Thin Montserrat typography */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/50 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-pulse"></span>
            <span className="font-light text-sm sm:text-base text-[#6D5548] tracking-wide">
              SAMPLE VIDEOS & COMMISSIONS // AFTER EFFECTS 24
            </span>
          </div>
          <h2 className="font-normal text-3xl sm:text-5xl lg:text-6xl text-[#241812] tracking-tight">
            Selected Works & Motion Repertoire
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Every cut below features real embedded video streams—from 3D commercial animations and kinetic typography to viral retention hooks, gaming edits, and YouTube long form. Click to screen in 4K or launch full theater mode.
          </p>
        </div>

        {/* Category Pills with Smooth Sliding Spring Indicator */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl liquid-glass border border-white/60">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playTick(900)
                  setActiveCategory(cat)
                }}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-colors cursor-pointer select-none ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-[#6D5548] hover:text-[#241812]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#9A7562] rounded-xl shadow-md shadow-[#9A7562]/20 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Grid of Projects with Hardware-Accelerated Spotlight Effect */}
      <motion.div 
        layout
        onMouseLeave={() => setHoveredProjectId(null)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isAnyHovered = hoveredProjectId !== null
            const isThisHovered = hoveredProjectId === project.id

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ 
                  opacity: isAnyHovered && !isThisHovered ? 0.45 : 1,
                  scale: isAnyHovered && !isThisHovered ? 0.985 : 1,
                  y: 0
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onClick={() => {
                  soundFx.playTick(1100)
                  onSelectProject(project)
                }}
                className="group relative rounded-3xl liquid-glass-card overflow-hidden cursor-pointer flex flex-col justify-between shadow-xl transform-gpu will-change-transform contain-content"
              >
                {/* Aspect Ratio Viewport */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#140D0A] flex items-center justify-center">
                  {/* Subtle GPU-friendly Ambient Vignette Backing */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(154,117,98,0.2)_0%,rgba(20,13,10,0.95)_100%)] pointer-events-none" />

                  {/* Main Project Poster Image */}
                  <img
                    src={project.stillImage}
                    alt={project.title}
                    decoding="async"
                    loading="lazy"
                    className={`relative z-1 transition-transform duration-500 ease-out group-hover:scale-[1.04] transform-gpu will-change-transform ${
                      project.aspectRatio.includes("9:16") || project.id === "proj-03" || project.id === "proj-06"
                        ? "max-h-full max-w-full object-contain object-center"
                        : "w-full h-full object-cover object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-2" />

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 border border-white/20 text-[10px] font-sans text-white font-medium shadow-xs">
                      {project.aspectRatio}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#9A7562] text-[10px] font-sans font-medium text-white uppercase tracking-wider shadow-xs">
                      {project.category}
                    </span>
                  </div>

                  {/* Direct Theatrical Screening Trigger Button in Top Right */}
                  {onOpenTheater && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        soundFx.playNeuralBurst()
                        onOpenTheater(project)
                      }}
                      className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/80 hover:bg-[#9A7562] border border-white/30 text-[11px] font-sans text-[#EDCFB5] hover:text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg"
                      title="Screen in Theatrical Cinema Mode"
                    >
                      <Film className="w-3 h-3 text-[#EDCFB5]" />
                      <span className="hidden sm:inline">Screen Reel</span>
                    </motion.button>
                  )}

                  {/* Play Hover Overlay with Direct Cinema & Inspect actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/45 z-10">
                    <div className="flex items-center gap-3">
                      {onOpenTheater && (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            soundFx.playNeuralBurst()
                            onOpenTheater(project)
                          }}
                          className="px-4 py-2 rounded-2xl bg-[#9A7562] hover:bg-[#86614E] text-white text-xs font-sans font-medium flex items-center gap-2 shadow-2xl border border-white/40 cursor-pointer transition-colors"
                        >
                          <Film className="w-3.5 h-3.5 text-[#EDCFB5]" />
                          <span>Theater Mode</span>
                        </motion.button>
                      )}

                      <div className="w-12 h-12 rounded-full bg-white/25 border border-white/90 text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-200">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Runtime & Resolution HUD */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-sans text-white/95 font-medium z-10">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#EDCFB5]" />
                      <span>{project.duration}</span>
                    </span>
                    <span className="text-[#EDCFB5]">{project.fps} • {project.resolution}</span>
                  </div>
                </div>

                {/* Information Card Body with Montserrat Typography */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between font-sans">
                  <div className="space-y-2">
                    <div className="text-xs font-sans text-[#6D5548] font-medium tracking-wide flex items-center justify-between">
                      <span>{project.client}</span>
                      <span className="text-[#9A7562] font-semibold">{project.year}</span>
                    </div>

                    {/* Project Title: Regular Headings */}
                    <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-[#6D5548] text-sm leading-relaxed line-clamp-2 font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Accomplishment & Tag Strip in Clean Liquid Pill (Montserrat) */}
                  <div className="space-y-3 pt-3 border-t border-white/50">
                    <div className="text-xs font-sans text-[#241812] liquid-glass-pill p-3 rounded-xl border border-white/70 font-normal leading-relaxed">
                      <span className="text-[#9A7562] mr-1.5 font-bold">★</span> {project.keyAccomplishment}
                    </div>

                    <div className="flex items-center justify-between text-xs font-sans font-light text-[#6D5548]">
                      <span>Dir: {project.director}</span>
                      <span className="text-[#9A7562] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-medium">
                        <span>Stream & Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
