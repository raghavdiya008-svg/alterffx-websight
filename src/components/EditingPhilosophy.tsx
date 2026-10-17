import React from "react"
import { motion } from "framer-motion"
import { Sparkles, Type, Wand2 } from "lucide-react"

export const EditingPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
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
            <Sparkles className="w-4 h-4 text-[#9A7562]" />
            <span className="font-light text-base sm:text-lg text-[#6D5548]">WHAT I OFFER // 01</span>
          </div>
          <h2 className="font-normal text-4xl sm:text-6xl text-[#241812] tracking-tight">
            Core Editorial & Motion Services
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Bespoke motion design, kinetic typography, and high-retention long form editing built with After Effects 24. Designed to capture, hold, and convert viewer attention.
          </p>
        </div>

        <div className="font-mono text-xs uppercase tracking-wider text-[#9A7562] font-semibold self-start md:self-auto liquid-glass-pill px-4 py-2 rounded-full">
          CONCEPT • EXECUTION • IMPACT
        </div>
      </motion.div>

      {/* Asymmetric Bento Grid in Liquid Glass Finish */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento Tile 1: Large 8-column Hero Feature - Product Commercial Animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-8 rounded-3xl liquid-glass-card p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden group shadow-xl"
        >
          <div className="space-y-4 z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#9A7562] font-semibold tracking-wider">01 // COMMERCIAL SHOWREEL</span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono liquid-glass-pill text-[#241812] font-medium">
                After Effects 24 3D
              </span>
            </div>

            <h3 className="font-normal text-3xl sm:text-4xl xl:text-5xl text-[#241812] leading-snug">
              Product Commercial Animations & 3D Spatial Renders
            </h3>

            <p className="text-[#6D5548] text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              From 3D product can reveals to dynamic speed ramps and particle bursts. I build commercial animations that elevate everyday brands into cinematic experiences with visceral camera moves and synchronized sound design.
            </p>
          </div>

          {/* Interactive Velocity Wave in Liquid Glass */}
          <div className="p-4 rounded-2xl liquid-glass-pill space-y-3 z-10 font-mono text-xs">
            <div className="flex items-center justify-between text-[#6D5548] text-xs font-light">
              <span>AFTER EFFECTS VELOCITY EASING (KEYFRAME ACCELERATION)</span>
              <span className="text-[#9A7562] font-semibold">300% SPEED RAMP</span>
            </div>
            
            <svg viewBox="0 0 500 60" className="w-full h-12 stroke-[#9A7562] fill-none stroke-[2]">
              <path d="M0 45 Q 60 48, 120 30 T 240 15 T 340 5 T 420 28 T 500 38" />
              <circle cx="340" cy="5" r="4" className="fill-[#9A7562]" />
            </svg>

            <div className="flex justify-between text-xs text-[#6D5548]">
              <span>Camera In (00:00)</span>
              <span>3D Track Lock</span>
              <span className="text-[#241812] font-semibold">Impact Hit (Peak G-Force)</span>
              <span>Smooth Decel</span>
            </div>
          </div>
        </motion.div>

        {/* Bento Tile 2: 4-column Kinetic Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="md:col-span-4 rounded-3xl liquid-glass-card p-8 flex flex-col justify-between space-y-6 shadow-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#9A7562] font-semibold tracking-wider">02 // TYPOGRAPHY</span>
              <Type className="w-5 h-5 text-[#241812]" />
            </div>

            <h3 className="font-normal text-2xl sm:text-3xl text-[#241812]">
              Kinetic Typography & Titles
            </h3>

            <p className="text-[#6D5548] text-sm sm:text-base leading-relaxed font-light">
              Words designed to grab attention. Expression-rigged kinetic title sequences, animated subtitles, and editorial title cards with elastic physics and tactile audio hits.
            </p>
          </div>

          <div className="p-4 rounded-2xl liquid-glass-pill text-xs font-mono space-y-2 text-[#6D5548]">
            <div className="flex justify-between text-[#241812] font-medium">
              <span>Typography Engine:</span>
              <span className="text-[#9A7562]">Expression Rigged</span>
            </div>
            <div className="flex justify-between">
              <span>Easing Style:</span>
              <span className="text-[#241812]">Elastic Overshoot</span>
            </div>
          </div>
        </motion.div>

        {/* Bento Tile 3: 4-column Catchy & Attention Grabbing Scenes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="md:col-span-4 rounded-3xl liquid-glass-card p-8 flex flex-col justify-between space-y-6 shadow-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#9A7562] font-semibold tracking-wider">03 // VIRAL HOOKS</span>
              <Wand2 className="w-5 h-5 text-[#B79F93]" />
            </div>

            <h3 className="font-normal text-2xl sm:text-3xl text-[#241812]">
              Attention Grabbing Hooks
            </h3>

            <p className="text-[#6D5548] text-sm sm:text-base leading-relaxed font-light">
              Sub-3-second retention hooks for Reels and Shorts. Sound-designed impacts, optical zoom transitions, and rhythmic audio ducking that stop the scroll instantly.
            </p>
          </div>

          <div className="p-4 rounded-2xl liquid-glass-pill text-xs font-mono text-[#6D5548] flex items-center justify-between">
            <span>Scroll-Stop Rate</span>
            <span className="text-[#9A7562] font-semibold">90%+ 3-Sec Hook</span>
          </div>
        </motion.div>

        {/* Bento Tile 4: Large 8-column YouTube Long Form & Podcast Edits */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="md:col-span-8 rounded-3xl liquid-glass-card p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#9A7562] font-semibold tracking-wider">04 // LONG FORM & PODCASTS</span>
              <span className="px-3.5 py-1 rounded-full liquid-glass-pill text-xs font-mono text-[#241812] font-medium">
                Retention Optimization
              </span>
            </div>

            <h3 className="font-normal text-3xl sm:text-4xl text-[#241812]">
              YouTube Long Form & Podcast Dialogue Mastercuts
            </h3>

            <p className="text-[#6D5548] text-base sm:text-lg leading-relaxed font-light">
              Multi-camera podcast switching, documentary archival pacing, and contextual infographics that turn 20-minute conversations into high-retention episodic content. Every visual cutaway reinforces the speaker's emotional point.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/50 text-xs font-mono">
            <div className="p-4 rounded-2xl liquid-glass-pill space-y-1">
              <div className="text-[#6D5548] font-light">AUDIO BALANCE</div>
              <div className="text-sm font-semibold text-[#241812]">Speech De-Essing & Level</div>
            </div>

            <div className="p-4 rounded-2xl liquid-glass-pill space-y-1">
              <div className="text-[#6D5548] font-light">RE-HOOK FREQUENCY</div>
              <div className="text-sm font-semibold text-[#9A7562]">Every 35–45s Pattern</div>
            </div>

            <div className="p-4 rounded-2xl liquid-glass-pill space-y-1">
              <div className="text-[#6D5548] font-light">DELIVERY RESOLUTION</div>
              <div className="text-sm font-semibold text-[#241812]">4K Master + Social Cuts</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
