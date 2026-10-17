import React, { useState } from "react"
import { X, Play, Pause, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Project } from "../types/editor"
import { soundFx } from "../lib/audioEngine"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onBookProject: (projectTitle: string) => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onBookProject }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [dialogueActive, setDialogueActive] = useState(true)
  const [foleyActive, setFoleyActive] = useState(true)
  const [musicActive, setMusicActive] = useState(true)
  const [activeTab, setActiveTab] = useState<"edl" | "specs">("edl")

  if (!project) return null

  const handlePlayToggle = () => {
    soundFx.playTick(1200)
    setIsPlaying(!isPlaying)
  }

  const sampleEdlCuts = [
    { num: "01", tc: "00:00:00:00", type: "Hard Cut", desc: "Establishing Anamorphic Aerial (ARRI Raw)" },
    { num: "02", tc: "00:00:04:18", type: "Match Cut", desc: "Eye-saccade match into cockpit macro shot" },
    { num: "03", tc: "00:00:12:02", type: "Speed Ramp", desc: "300% deceleration to 24fps on brake caliper hit" },
    { num: "04", tc: "00:00:28:14", type: "L-Cut Audio", desc: "Dialogue extends under interior transition" },
    { num: "05", tc: "00:00:44:21", type: "Invisible Morph", desc: "Seamless clean plate transition between takes" }
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#1C2618]/70 backdrop-blur-xl overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-3xl border border-[#1C2618]/25 bg-[#E5EBD5] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] text-[#1C2618]"
        >
          
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-[#1C2618]/15 flex items-center justify-between bg-[#CBD4B1]">
            <div className="flex items-center gap-3.5">
              <span className="w-3 h-3 rounded-full bg-[#E8512A]"></span>
              <div>
                <div className="font-mono text-xs text-[#5E6B4E] uppercase tracking-wider font-bold">
                  {project.client} • {project.category}
                </div>
                {/* Project Title in italic Boska */}
                <h3 className="font-serif italic text-3xl sm:text-4xl font-normal text-[#1C2618]">
                  {project.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playTick(900)
                onClose()
              }}
              className="p-2.5 rounded-full border border-[#1C2618]/20 bg-[#D6DDBF] hover:bg-[#E0E6CE] hover:border-[#E8512A] text-[#1C2618] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Scrollable */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
            
            {/* Simulated Video Player Container */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#1C2618]/20 shadow-lg flex items-center justify-center">
              <img
                src={project.stillImage}
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? "scale-105" : "scale-100"}`}
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

              {/* Play Button */}
              <button
                onClick={handlePlayToggle}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#E8512A] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
              </button>

              {/* Live Playback State HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/95 font-medium">
                <span className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-[#CBD4B1] animate-ping" : "bg-white/50"}`}></span>
                  <span>{isPlaying ? "STREAMING PRORES PROXY" : "PAUSED AT 00:00:14:02"}</span>
                </span>

                <span>{project.duration} • {project.fps} • {project.resolution}</span>
              </div>
            </div>

            {/* Interactive Multi-Stem Audio Mixer Strip */}
            <div className="p-5 rounded-2xl border border-[#1C2618]/15 bg-[#CBD4B1] space-y-3.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#5E6B4E] font-bold">MULTI-STEM AUDIO BUS (SOLO / MUTE)</span>
                <span className="text-[#1C2618] font-bold">LCR + SUB PREMIXED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <button
                  onClick={() => {
                    soundFx.playTick(1000)
                    setDialogueActive(!dialogueActive)
                  }}
                  className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                    dialogueActive 
                      ? "border-[#1C2618] bg-[#D6DDBF] text-[#1C2618] font-bold shadow-2xs" 
                      : "border-[#1C2618]/15 bg-[#E0E6CE] text-[#5E6B4E]"
                  }`}
                >
                  <span>A1: DIALOGUE STEM</span>
                  <span>{dialogueActive ? "ACTIVE" : "MUTED"}</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playTick(1100)
                    setFoleyActive(!foleyActive)
                  }}
                  className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                    foleyActive 
                      ? "border-[#E8512A] bg-[#D6DDBF] text-[#E8512A] font-bold shadow-2xs" 
                      : "border-[#1C2618]/15 bg-[#E0E6CE] text-[#5E6B4E]"
                  }`}
                >
                  <span>A2: FOLEY & SFX</span>
                  <span>{foleyActive ? "ACTIVE" : "MUTED"}</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playTick(1200)
                    setMusicActive(!musicActive)
                  }}
                  className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                    musicActive 
                      ? "border-[#B59226] bg-[#D6DDBF] text-[#B59226] font-bold shadow-2xs" 
                      : "border-[#1C2618]/15 bg-[#E0E6CE] text-[#5E6B4E]"
                  }`}
                >
                  <span>A3: SCORE & ORCHESTRA</span>
                  <span>{musicActive ? "ACTIVE" : "MUTED"}</span>
                </button>
              </div>
            </div>

            {/* Dual Tabs: EDL Cut Marks vs Project Technical Specs */}
            <div className="space-y-4">
              <div className="flex items-center gap-5 border-b border-[#1C2618]/15 pb-2 text-sm font-mono">
                <button
                  onClick={() => setActiveTab("edl")}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === "edl"
                      ? "border-[#E8512A] text-[#1C2618] font-bold"
                      : "border-transparent text-[#5E6B4E] hover:text-[#1C2618]"
                  }`}
                >
                  Edit Decision List ({project.edlCutsCount} Cuts)
                </button>

                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === "specs"
                      ? "border-[#E8512A] text-[#1C2618] font-bold"
                      : "border-transparent text-[#5E6B4E] hover:text-[#1C2618]"
                  }`}
                >
                  Delivery Specifications & Pipeline
                </button>
              </div>

              {activeTab === "edl" ? (
                <div className="space-y-2.5 font-mono text-xs">
                  {sampleEdlCuts.map((cut, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-[#E8512A] font-bold">CUT {cut.num}</span>
                        <span className="text-[#1C2618] font-semibold">{cut.tc}</span>
                        <span className="px-2.5 py-0.5 rounded bg-[#D6DDBF] text-xs text-[#5E6B4E] font-medium">
                          {cut.type}
                        </span>
                      </div>
                      <span className="text-[#1C2618] text-xs font-sans font-medium">{cut.desc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
                    <span className="text-[#5E6B4E] text-xs block uppercase font-medium">Director</span>
                    <span className="text-[#1C2618] font-bold mt-1 block">{project.director}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
                    <span className="text-[#5E6B4E] text-xs block uppercase font-medium">Turnaround</span>
                    <span className="text-[#1C2618] font-bold mt-1 block">{project.turnaroundDays} Business Days</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
                    <span className="text-[#5E6B4E] text-xs block uppercase font-medium">Suite</span>
                    <span className="text-[#1C2618] font-bold mt-1 block">DaVinci Resolve Studio 19</span>
                  </div>
                  <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
                    <span className="text-[#5E6B4E] text-xs block uppercase font-medium">Master</span>
                    <span className="text-[#E8512A] font-bold mt-1 block">ProRes 4444 XQ</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Modal Footer CTA */}
          <div className="p-5 sm:p-6 border-t border-[#1C2618]/15 bg-[#CBD4B1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm font-serif italic text-[#5E6B4E]">
              Have a similar commercial or narrative project ready for dailies?
            </div>

            <button
              onClick={() => {
                soundFx.playTick(1300)
                onBookProject(project.title)
              }}
              className="px-7 py-3.5 rounded-xl bg-[#E8512A] text-white text-xs font-sans font-semibold uppercase tracking-wider hover:bg-[#CF401B] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Book Edit for Project Like This</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
