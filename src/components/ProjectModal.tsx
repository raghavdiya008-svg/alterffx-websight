import React, { useState } from "react"
import { X, Play, Pause, ArrowRight, Sparkles, Film } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Project } from "../types/editor"
import { soundFx } from "../lib/audioEngine"
import { CloakedVideoPlayer } from "./CloakedVideoPlayer"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onBookProject: (projectTitle: string) => void
  onOpenTheater?: (project: Project) => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onBookProject, onOpenTheater }) => {
  const [activeTab, setActiveTab] = useState<"edl" | "specs">("edl")

  if (!project) return null

  const sampleEdlCuts = [
    { num: "01", tc: "00:00:00:00", type: "Hard Cut", desc: "Establishing 3D Product Motion / Hook Opening" },
    { num: "02", tc: "00:00:02:12", type: "Match Cut", desc: "Dynamic velocity speed ramp into macro product details" },
    { num: "03", tc: "00:00:06:08", type: "Speed Ramp", desc: "300% deceleration to 60fps on impact hit" },
    { num: "04", tc: "00:00:14:18", type: "Kinetic Cut", desc: "Expression-driven typography wipe transition" },
    { num: "05", tc: "00:00:22:04", type: "Audio Hit", desc: "Tactile sub-bass drop synchronized with visual punch" }
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#241812]/60 backdrop-blur-xl overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-3xl liquid-glass-card shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-[#241812] border border-white/80"
        >
          
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-white/50 flex items-center justify-between bg-white/40 backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <span className="w-3 h-3 rounded-full bg-[#9A7562]"></span>
              <div>
                <div className="font-mono text-xs text-[#6D5548] uppercase tracking-wider font-medium">
                  {project.client} • {project.category}
                </div>
                {/* Project Title: Regular Montserrat */}
                <h3 className="font-normal text-2xl sm:text-4xl text-[#241812]">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onOpenTheater && (
                <button
                  onClick={() => {
                    soundFx.playNeuralBurst()
                    onOpenTheater(project)
                  }}
                  className="px-3.5 py-2 rounded-full liquid-glass-pill hover:border-[#9A7562] text-xs font-mono text-[#241812] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  title="Expand to Full Theatrical Screening Mode (Lights Off)"
                >
                  <Film className="w-3.5 h-3.5 text-[#9A7562]" />
                  <span className="hidden sm:inline">Cinema Mode</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundFx.playTick(900)
                  onClose()
                }}
                aria-label="Close modal"
                className="p-2.5 rounded-full liquid-glass-pill hover:border-[#9A7562] text-[#241812] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Scrollable */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
            
            {/* Cloaked Video Player (Shields YouTube branding, channel links, and watermark clickouts) */}
            <CloakedVideoPlayer
              youtubeId={project.youtubeId || "EPU8ivyiWHI"}
              videoSrc={project.videoSrc}
              title={project.title}
              category={project.category}
              duration={project.duration}
              stillImage={project.stillImage}
              aspectRatio={project.aspectRatio}
              autoPlay={true}
            />

            {/* Authentic After Effects Compositing Architecture */}
            <div className="p-5 rounded-2xl liquid-glass-pill space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#6D5548] font-light">AFTER EFFECTS COMPOSITING STACK</span>
                <span className="text-[#9A7562] font-semibold">4K 60.00 FPS DCI</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-white/40 border border-white/40 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#9A7562] text-white font-bold text-[10px]">L01</span>
                  <div>
                    <div className="font-semibold text-[#241812]">3D Camera Track & Null Rig</div>
                    <div className="text-[#6D5548] text-[10px] font-light">3D spatial solve with coordinate anchoring for titles & lighting passes</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/40 border border-white/40 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#9A7562] text-white font-bold text-[10px]">L02</span>
                  <div>
                    <div className="font-semibold text-[#241812]">Dynamic Speed Ramp Matrix</div>
                    <div className="text-[#6D5548] text-[10px] font-light">Custom velocity curves easing from 300% to 60fps on impact hits</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/40 border border-white/40 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#9A7562] text-white font-bold text-[10px]">L03</span>
                  <div>
                    <div className="font-semibold text-[#241812]">Kinetic Typography Expressions</div>
                    <div className="text-[#6D5548] text-[10px] font-light">Expression-rigged titles with elastic overshoot & motion blur</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/40 border border-white/40 flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded bg-[#9A7562] text-white font-bold text-[10px]">L04</span>
                  <div>
                    <div className="font-semibold text-[#241812]">Master Stereo & Sub-Bass Foley</div>
                    <div className="text-[#6D5548] text-[10px] font-light">Frame-accurate tactile sub hits, risers, and -14.0 LUFS dialogue mixing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Narrative Breakdown & Accomplishment */}
            <div className="space-y-4">
              <h4 className="font-normal text-2xl text-[#241812]">
                Motion Architecture & Creative Execution
              </h4>
              <p className="text-base text-[#6D5548] leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Tabbed Technical Dossier in Liquid Glass */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/50 pb-2">
                <button
                  onClick={() => setActiveTab("edl")}
                  className={`text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                    activeTab === "edl" ? "text-[#9A7562] border-b-2 border-[#9A7562] pb-2 font-bold" : "text-[#6D5548]"
                  }`}
                >
                  Sample Edit Decision List (EDL)
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                    activeTab === "specs" ? "text-[#9A7562] border-b-2 border-[#9A7562] pb-2 font-bold" : "text-[#6D5548]"
                  }`}
                >
                  Technical Specifications
                </button>
              </div>

              {activeTab === "edl" ? (
                <div className="space-y-2 font-mono text-xs">
                  {sampleEdlCuts.map((cut) => (
                    <div key={cut.num} className="p-3 rounded-xl liquid-glass-pill flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[#9A7562] font-bold">{cut.num}</span>
                        <span className="text-[#6D5548] font-light">{cut.tc}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/60 text-[#241812] font-semibold text-[10px]">{cut.type}</span>
                      </div>
                      <span className="text-[#241812] text-right truncate font-light">{cut.desc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl liquid-glass-pill space-y-1">
                    <div className="text-[#6D5548] font-light">ASPECT RATIO</div>
                    <div className="text-sm font-semibold text-[#241812]">{project.aspectRatio}</div>
                  </div>
                  <div className="p-3.5 rounded-xl liquid-glass-pill space-y-1">
                    <div className="text-[#6D5548] font-light">MASTER RESOLUTION</div>
                    <div className="text-sm font-semibold text-[#241812]">{project.resolution}</div>
                  </div>
                  <div className="p-3.5 rounded-xl liquid-glass-pill space-y-1">
                    <div className="text-[#6D5548] font-light">TIMELINE FPS</div>
                    <div className="text-sm font-semibold text-[#241812]">{project.fps}</div>
                  </div>
                  <div className="p-3.5 rounded-xl liquid-glass-pill space-y-1">
                    <div className="text-[#6D5548] font-light">EDL CUTS</div>
                    <div className="text-sm font-semibold text-[#9A7562]">{project.edlCutsCount} Locked Cuts</div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Modal Footer CTA in Liquid Glass */}
          <div className="p-5 sm:p-6 border-t border-white/50 bg-white/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#6D5548] font-light">
              COMMISSION AN EDIT SIMILAR TO <span className="font-semibold text-[#241812]">{project.title.toUpperCase()}</span>
            </div>

            <button
              onClick={() => onBookProject(project.title)}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#9A7562] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#86614E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#9A7562]/20 active:scale-95 cursor-pointer border border-white/20"
            >
              <span>Initiate Project Docket</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
