import React from "react"
import { motion } from "framer-motion"
import { Cpu, Layers, Gamepad2, Eye, Flame, Type, Film, Mic } from "lucide-react"
import { GlassGlowCard } from "./motion/GlassGlowCard"

export const EditingPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      
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
            <Layers className="w-4 h-4 text-[#9A7562]" />
            <span className="font-light text-base sm:text-lg text-[#6D5548]">
              Bespoke Motion & Editorial Disciplines
            </span>
          </div>
          <h2 className="font-normal text-4xl sm:text-6xl text-[#241812] tracking-tight">
            Production Specializations
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Every cut is built in After Effects 24 from the ground up. No pre-made template packs—just bespoke motion rigging, velocity curves, and frame-accurate sound design.
          </p>
        </div>

        <div className="font-mono text-xs uppercase tracking-wider text-[#9A7562] font-semibold self-start md:self-auto liquid-glass-pill px-4 py-2 rounded-full shadow-2xs">
          AFTER EFFECTS 24 PIPELINE
        </div>
      </motion.div>

      {/* Bento Grid: 6 Distinct Disciplines (Including Gaming & Faceless as requested) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Discipline 1: 3D Product & Commercial Velocity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
        >
          <GlassGlowCard
            glowColor="rgba(154, 117, 98, 0.2)"
            className="h-full rounded-3xl liquid-glass-card p-7 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#9A7562] font-bold tracking-wider">01. Commercial & 3D</span>
                <Film className="w-4 h-4 text-[#9A7562]" />
              </div>

              <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-snug">
                Product Commercials & 3D Spatial Renders
              </h3>

              <p className="text-[#6D5548] text-sm leading-relaxed font-light">
                High-speed velocity easing curves that transition from 300% deceleration straight into photoreal 3D product passes. Camera moves solved in 3D space with coordinate null anchoring so titles and light reflections lock onto the physical subject.
              </p>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl liquid-glass-pill space-y-1.5 text-xs font-mono text-[#6D5548]">
              <div className="flex justify-between text-[#241812] font-medium">
                <span>Velocity Curve:</span>
                <span className="text-[#9A7562]">Cubic Bezier Easing</span>
              </div>
              <div className="flex justify-between">
                <span>Camera Tracking:</span>
                <span className="text-[#241812]">Point Cloud 3D Solve</span>
              </div>
            </div>
          </GlassGlowCard>
        </motion.div>

        {/* Discipline 2: Gaming Content & High-Octane Montages */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <GlassGlowCard
            glowColor="rgba(154, 117, 98, 0.2)"
            className="h-full rounded-3xl liquid-glass-card p-7 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-[#9A7562]"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#9A7562] font-bold tracking-wider">02. Gaming & Montages</span>
                <Gamepad2 className="w-4 h-4 text-[#9A7562]" />
              </div>

              <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-snug">
                Gaming Content & Velocity Montages
              </h3>

              <p className="text-[#6D5548] text-sm leading-relaxed font-light">
                High-octane gaming edits engineered around micro-frame synchronization. Dynamic time-remapping, velocity impacts, 3D character rotoscoping, screen shakes, and frame-synced sound design that turn gameplay clips into high-energy spectacles.
              </p>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl liquid-glass-pill space-y-1.5 text-xs font-mono text-[#6D5548]">
              <div className="flex justify-between text-[#241812] font-medium">
                <span>Sync Precision:</span>
                <span className="text-[#9A7562]">1-Frame Beat Snapping</span>
              </div>
              <div className="flex justify-between">
                <span>Time Remapping:</span>
                <span className="text-[#241812]">Speed Ramp Velocity</span>
              </div>
            </div>
          </GlassGlowCard>
        </motion.div>

        {/* Discipline 3: Faceless Content & Retention Channels */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <GlassGlowCard
            glowColor="rgba(154, 117, 98, 0.2)"
            className="h-full rounded-3xl liquid-glass-card p-7 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-[#B79F93]"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#9A7562] font-bold tracking-wider">03. Faceless & Retention</span>
                <Eye className="w-4 h-4 text-[#9A7562]" />
              </div>

              <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-snug">
                Faceless Channels & High-Retention Edits
              </h3>

              <p className="text-[#6D5548] text-sm leading-relaxed font-light">
                Visual pacing engineered for channels without talking heads. High-velocity visual pattern interrupts every 3–5 seconds, customized kinetic infographics, animated charts, archival paper tear transitions, and layered soundscapes that hold retention past the 70% threshold.
              </p>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl liquid-glass-pill space-y-1.5 text-xs font-mono text-[#6D5548]">
              <div className="flex justify-between text-[#241812] font-medium">
                <span>Pattern Interrupt:</span>
                <span className="text-[#9A7562]">Every 3–5 Seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Texture Stacks:</span>
                <span className="text-[#241812]">Analog Paper & Grain</span>
              </div>
            </div>
          </GlassGlowCard>
        </motion.div>

        {/* Discipline 4: Kinetic Typography & Title Sequences */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <GlassGlowCard
            glowColor="rgba(154, 117, 98, 0.2)"
            className="h-full rounded-3xl liquid-glass-card p-7 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#9A7562] font-bold tracking-wider">04. Kinetic Typography</span>
                <Type className="w-4 h-4 text-[#9A7562]" />
              </div>

              <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-snug">
                Kinetic Typography & Expression Rigs
              </h3>

              <p className="text-[#6D5548] text-sm leading-relaxed font-light">
                Bespoke title sequences programmed with JavaScript math expressions in After Effects. Elastic overshoots, organic letter-tracking wipes, optical motion blur, and sub-bass impact syncs that command immediate attention.
              </p>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl liquid-glass-pill space-y-1.5 text-xs font-mono text-[#6D5548]">
              <div className="flex justify-between text-[#241812] font-medium">
                <span>Type Physics:</span>
                <span className="text-[#9A7562]">Elastic Overshoot Math</span>
              </div>
              <div className="flex justify-between">
                <span>Blur Rendering:</span>
                <span className="text-[#241812]">Native AE RSMB Pro</span>
              </div>
            </div>
          </GlassGlowCard>
        </motion.div>

        {/* Discipline 5: Attention-Grabbing Hooks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <GlassGlowCard
            glowColor="rgba(154, 117, 98, 0.2)"
            className="h-full rounded-3xl liquid-glass-card p-7 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#9A7562] font-bold tracking-wider">05. Opening Hooks</span>
                <Flame className="w-4 h-4 text-[#9A7562]" />
              </div>

              <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-snug">
                Attention Grabbing Opening Hooks
              </h3>

              <p className="text-[#6D5548] text-sm leading-relaxed font-light">
                The first 3 seconds dictate video survival. High-tension intro sequences with 3D spatial reveals, velocity dips, and sensory audio stingers specifically constructed to prevent swiping or clicking off.
              </p>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl liquid-glass-pill space-y-1.5 text-xs font-mono text-[#6D5548]">
              <div className="flex justify-between text-[#241812] font-medium">
                <span>Retention Target:</span>
                <span className="text-[#9A7562]">0:00–0:05 Lock-in</span>
              </div>
              <div className="flex justify-between">
                <span>Sensory Triggers:</span>
                <span className="text-[#241812]">Sub-Bass Hits & Glints</span>
              </div>
            </div>
          </GlassGlowCard>
        </motion.div>

        {/* Discipline 6: YouTube Long Form & Podcast Dialogue Mastercuts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <GlassGlowCard
            glowColor="rgba(154, 117, 98, 0.2)"
            className="h-full rounded-3xl liquid-glass-card p-7 flex flex-col justify-between space-y-6 shadow-xl group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative z-10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#9A7562] font-bold tracking-wider">06. Long-Form & Podcasts</span>
                <Mic className="w-4 h-4 text-[#9A7562]" />
              </div>

              <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-snug">
                YouTube Long Form & Podcast Dialogue Flow
              </h3>

              <p className="text-[#6D5548] text-sm leading-relaxed font-light">
                Multi-cam dialogue editing and storytelling cuts. Rapid camera punch-ins on punchlines, kinetic subtitle placement, contextual B-roll timing, and vocal compression balanced for clear, punchy listening.
              </p>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl liquid-glass-pill space-y-1.5 text-xs font-mono text-[#6D5548]">
              <div className="flex justify-between text-[#241812] font-medium">
                <span>Dialogue Balance:</span>
                <span className="text-[#9A7562]">-14.0 LUFS Stereo</span>
              </div>
              <div className="flex justify-between">
                <span>Multi-Cam:</span>
                <span className="text-[#241812]">Automated Speaker Punch</span>
              </div>
            </div>
          </GlassGlowCard>
        </motion.div>

      </div>

      {/* Production Suite & Tooling Strip */}
      <div className="rounded-3xl liquid-glass-pill p-6 sm:p-8 border border-white/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono border-b border-white/40 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#9A7562]" />
            <span className="font-semibold text-[#241812]">WORKSTATION & PRODUCTION SUITE</span>
          </div>
          <span className="text-[#6D5548] font-light">HARDWARE ACCELERATED RENDER PIPELINE</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[#6D5548] block text-[10px]">PRIMARY VFX ENGINE</span>
            <span className="text-[#241812] font-semibold">After Effects 24 + C4D</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6D5548] block text-[10px]">COLOR GRADING & FINISH</span>
            <span className="text-[#241812] font-semibold">DaVinci Resolve Studio 19</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6D5548] block text-[10px]">MOTION & TRACKING PLUGINS</span>
            <span className="text-[#241812] font-semibold">Boris FX Mocha, Deep Glow</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6D5548] block text-[10px]">AUDIO MASTERING & FOLEY</span>
            <span className="text-[#241812] font-semibold">FabFilter Pro-Q3, -14 LUFS</span>
          </div>
        </div>
      </div>

    </section>
  )
}
