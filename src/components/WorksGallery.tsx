import React, { useState } from "react"
import { Play, Clock, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { PROJECTS } from "../data/editorData"
import { Project } from "../types/editor"
import { soundFx } from "../lib/audioEngine"

interface WorksGalleryProps {
  onSelectProject: (project: Project) => void
}

const CATEGORIES = ["All Cuts", "Commercial", "Narrative", "Music Video", "Short Form"]

export const WorksGallery: React.FC<WorksGalleryProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState("All Cuts")

  const filteredProjects = activeCategory === "All Cuts"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header with +2pt typography */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C2618]/15 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8512A]"></span>
            <span className="font-serif italic text-lg sm:text-xl text-[#5E6B4E]">Master reel index & directorial collaborations (2025–2026)</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C2618] tracking-tight">
            Commercial & Narrative Cuts
          </h2>
          <p className="text-[#5E6B4E] text-base sm:text-lg mt-2 max-w-2xl font-sans font-normal">
            Every project below was edited offline, sound-designed, and finished to strict theatrical and broadcast delivery specs. Click any cut to inspect its timeline breakdown and audio stems.
          </p>
        </div>

        {/* Category Pills (+2pt) */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playTick(900)
                  setActiveCategory(cat)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-sans transition-all ${
                  isActive
                    ? "bg-[#E8512A] text-white font-semibold shadow-xs"
                    : "bg-[#E0E6CE] border border-[#1C2618]/15 text-[#5E6B4E] hover:text-[#1C2618] hover:border-[#1C2618]/30 font-medium"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            onClick={() => {
              soundFx.playTick(1100)
              onSelectProject(project)
            }}
            className="group relative rounded-2xl border border-[#1C2618]/15 bg-[#E5EBD5] overflow-hidden cursor-pointer transition-all duration-200 hover:border-[#E8512A] hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            {/* Aspect Ratio Viewport */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <img
                src={project.stillImage}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"></div>

              {/* Floating Aspect Ratio Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded bg-black/75 border border-white/20 text-xs font-mono text-white backdrop-blur-md font-medium">
                  {project.aspectRatio}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#E8512A] text-xs font-mono font-bold text-white uppercase">
                  {project.category}
                </span>
              </div>

              {/* Play Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-[#E8512A] text-white flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Runtime & Resolution HUD */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E8512A]" />
                  <span>{project.duration}</span>
                </span>
                <span className="text-[#D6DDBF]">{project.fps} • {project.resolution}</span>
              </div>
            </div>

            {/* Information Card Body with +2pt fonts */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="text-sm font-mono text-[#5E6B4E] font-semibold tracking-wide flex items-center justify-between">
                  <span>{project.client}</span>
                  <span className="text-xs text-[#1C2618]/60 font-bold">YEAR {project.year}</span>
                </div>

                {/* Project Title: IN ITALIC BOSKA */}
                <h3 className="font-serif italic text-3xl sm:text-4xl font-normal text-[#1C2618] group-hover:text-[#E8512A] transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-[#5E6B4E] text-sm sm:text-base leading-relaxed line-clamp-2 font-sans">
                  {project.description}
                </p>
              </div>

              {/* Key Accomplishment & Tag Strip */}
              <div className="space-y-3 pt-3 border-t border-[#1C2618]/10">
                <div className="text-xs font-mono text-[#1C2618] bg-[#CBD4B1] p-3 rounded-lg border border-[#1C2618]/15 font-medium">
                  <span className="text-[#E8512A] mr-1.5 font-bold">★</span> {project.keyAccomplishment}
                </div>

                <div className="flex items-center justify-between text-xs font-sans text-[#5E6B4E] font-medium">
                  <span>Dir: {project.director.split(" ")[0]} {project.director.split(" ")[1]}</span>
                  <span className="text-[#E8512A] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-bold">
                    <span>Inspect Cut Breakdown</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
