import React, { useState } from "react"
import { Play, Clock, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { PROJECTS } from "../data/editorData"
import { Project } from "../types/editor"
import { soundFx } from "../lib/audioEngine"

interface WorksGalleryProps {
  onSelectProject: (project: Project) => void
}

const CATEGORIES = ["All Cuts", "Motion Graphics", "YouTube Long Form", "Podcast Edits", "Narrative", "Short Form"]

export const WorksGallery: React.FC<WorksGalleryProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState("All Cuts")

  const filteredProjects = activeCategory === "All Cuts"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header with Thin Montserrat typography */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/50 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562]"></span>
            <span className="font-light text-base sm:text-lg text-[#6D5548]">
              SAMPLE VIDEOS & COMMISSIONS // AFTER EFFECTS 24
            </span>
          </div>
          <h2 className="font-normal text-4xl sm:text-6xl text-[#241812] tracking-tight">
            Selected Works & Motion Repertoire
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Every cut below features real embedded video streams—from 3D commercial animations and kinetic typography to viral retention hooks and YouTube documentaries. Click any project to stream in 4K.
          </p>
        </div>

        {/* Category Pills in Liquid Glass */}
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
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#9A7562] text-white shadow-md shadow-[#9A7562]/20 border border-white/30"
                    : "liquid-glass-pill text-[#6D5548] hover:text-[#241812] hover:border-white/90"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Grid of Projects in Liquid Glass Cards */}
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
            className="group relative rounded-3xl liquid-glass-card overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Aspect Ratio Viewport */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/85">
              <img
                src={project.stillImage}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* Floating Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white font-medium">
                  {project.aspectRatio}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#9A7562] text-[11px] font-mono font-medium text-white uppercase shadow-sm">
                  {project.category}
                </span>
              </div>

              {/* Play Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-[#9A7562]/90 border border-white/80 backdrop-blur-md text-white flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-7 h-7 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Runtime & Resolution HUD */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/95 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#EDCFB5]" />
                  <span>{project.duration}</span>
                </span>
                <span className="text-[#EDCFB5]">{project.fps} • {project.resolution}</span>
              </div>
            </div>

            {/* Information Card Body with Thin Fonts */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#6D5548] font-medium tracking-wide flex items-center justify-between">
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

              {/* Key Accomplishment & Tag Strip in Liquid Pill */}
              <div className="space-y-3 pt-3 border-t border-white/50">
                <div className="text-xs font-mono text-[#241812] liquid-glass-pill p-3 rounded-xl border border-white/70 font-medium">
                  <span className="text-[#9A7562] mr-1.5 font-bold">★</span> {project.keyAccomplishment}
                </div>

                <div className="flex items-center justify-between text-xs font-light text-[#6D5548]">
                  <span>Dir: {project.director}</span>
                  <span className="text-[#9A7562] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
                    <span>Stream in 4K</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
