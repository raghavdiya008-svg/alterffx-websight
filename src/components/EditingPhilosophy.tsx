import React from "react"
import { motion } from "framer-motion"
import { Volume2, Wand2, TrendingUp, Film } from "lucide-react"

export const EditingPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Section Header with +2pt */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C2618]/15 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Film className="w-4 h-4 text-[#E8512A]" />
            <span className="font-serif italic text-lg sm:text-xl text-[#5E6B4E]">The cutting discipline & cognitive rhythm</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C2618] tracking-tight">
            How the Story is Engineered
          </h2>
          <p className="text-[#5E6B4E] text-base sm:text-lg mt-2 max-w-2xl font-sans font-normal">
            Great editing is imperceptible while you experience it, but undeniable in its emotional impact. Here is how I approach the timeline.
          </p>
        </div>

        <div className="font-serif italic text-base text-[#5E6B4E] self-start md:self-auto font-medium">
          Avoid flat pacing • Cut with intention
        </div>
      </motion.div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento Tile 1: Large 8-column Hero Feature */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-8 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-[#E8512A] transition-colors shadow-2xs"
        >
          <div className="space-y-4 z-10">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-lg text-[#E8512A] font-medium">Pillar I: Biological Saccades</span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#CBD4B1] text-[#1C2618] border border-[#1C2618]/20 font-bold">
                +41.8% Retention Lift
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-normal text-[#1C2618] leading-snug">
              Psychological Narrative Pacing & Cognitive Saccades
            </h3>

            <p className="text-[#5E6B4E] text-base sm:text-lg leading-relaxed max-w-2xl font-sans font-normal">
              A cut should never occur in a psychological vacuum. I cut on actor eye-blinks, subtle head turns, and natural inhalation cycles. When a cut respects the biological saccade of the human eye, the audience never registers the transition—they only experience the unbroken emotional momentum.
            </p>
          </div>

          {/* Interactive Pacing Wave Diagram (+2pt text) */}
          <div className="p-4 rounded-2xl border border-[#1C2618]/15 bg-[#CBD4B1] space-y-3 z-10 font-mono text-xs">
            <div className="flex items-center justify-between text-[#5E6B4E] text-xs font-medium">
              <span>TENSION & RESOLUTION TIMELINE (BPM PACING CURVE)</span>
              <span className="text-[#E8512A] font-bold">PEAK AT 00:01:12</span>
            </div>
            
            {/* SVG Wave */}
            <svg viewBox="0 0 500 60" className="w-full h-12 stroke-[#E8512A] fill-none stroke-[2]">
              <path d="M0 45 Q 60 48, 120 30 T 240 15 T 340 5 T 420 28 T 500 38" />
              <circle cx="340" cy="5" r="4" className="fill-[#E8512A]" />
            </svg>

            <div className="flex justify-between text-xs text-[#5E6B4E]">
              <span>Scene Setup (Resting 60bpm)</span>
              <span>Subtle Micro-Cuts</span>
              <span className="text-[#1C2618] font-bold">Climax Hit (132bpm)</span>
              <span>Cadence Release</span>
            </div>
          </div>
        </motion.div>

        {/* Bento Tile 2: 4-column Sound Architecture */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="md:col-span-4 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] p-8 flex flex-col justify-between space-y-6 hover:border-[#1C2618]/40 transition-colors shadow-2xs"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-lg text-[#E8512A] font-medium">Pillar II: Audio Landscape</span>
              <Volume2 className="w-5 h-5 text-[#1C2618]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2618]">
              Multi-Stem Audio Architecture
            </h3>

            <p className="text-[#5E6B4E] text-sm sm:text-base leading-relaxed font-sans font-normal">
              50% of the image is what you hear. I deliver cuts with fully premixed dialogue stems, custom sub-bass risers, clean Foley, and license-ready temp tracks so the offline cut plays like a finished theatrical film on day one.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1] text-xs font-mono space-y-2 text-[#5E6B4E]">
            <div className="flex justify-between text-[#1C2618] font-bold">
              <span>Dialogue Polish:</span>
              <span className="text-[#2A7B88]">iZotope RX 11</span>
            </div>
            <div className="flex justify-between">
              <span>Loudness Target:</span>
              <span className="text-[#1C2618]">-14.0 LUFS Broadcast</span>
            </div>
          </div>
        </motion.div>

        {/* Bento Tile 3: 4-column Invisible VFX */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="md:col-span-4 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] p-8 flex flex-col justify-between space-y-6 hover:border-[#1C2618]/40 transition-colors shadow-2xs"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-lg text-[#E8512A] font-medium">Pillar III: Invisible VFX</span>
              <Wand2 className="w-5 h-5 text-[#B59226]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2618]">
              In-Timeline Invisible VFX
            </h3>

            <p className="text-[#5E6B4E] text-sm sm:text-base leading-relaxed font-sans font-normal">
              Screen replacements, rig cleanups, light flicker removals, and optical flow speed ramps executed directly in-timeline. Directors get locked cuts without costly VFX round-trips.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1] text-xs font-mono text-[#5E6B4E] flex items-center justify-between">
            <span>Clean Plates & Morph Cuts</span>
            <span className="text-[#1C2618] font-bold">In-Timeline Execution</span>
          </div>
        </motion.div>

        {/* Bento Tile 4: Large 8-column High-Retention Digital Storytelling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="md:col-span-8 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:border-[#E8512A] transition-colors shadow-2xs"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-lg text-[#E8512A] font-medium">Pillar IV: Audience Psychology</span>
              <TrendingUp className="w-5 h-5 text-[#1C2618]" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-normal text-[#1C2618]">
              High-Retention Digital Narrative Architecture
            </h3>

            <p className="text-[#5E6B4E] text-base sm:text-lg leading-relaxed max-w-2xl font-sans font-normal">
              Whether cutting for YouTube, TikTok, or premium connected TV, modern audiences drop off if the central conflict isn&rsquo;t established in the opening 12 seconds. I re-order scenes to build progressive intrigue without resorting to obnoxious clickbait gimmicks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1C2618]/15 text-xs font-mono">
            <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
              <span className="text-xs text-[#5E6B4E] block uppercase font-medium">First 12 Seconds</span>
              <span className="text-[#1C2618] font-sans font-bold text-sm mt-1 block">Hook & Narrative Stakes</span>
            </div>
            <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
              <span className="text-xs text-[#5E6B4E] block uppercase font-medium">Mid-Point Shift</span>
              <span className="text-[#E8512A] font-sans font-bold text-sm mt-1 block">Tension Acceleration</span>
            </div>
            <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1]">
              <span className="text-xs text-[#5E6B4E] block uppercase font-medium">Payoff Resolution</span>
              <span className="text-[#1C2618] font-sans font-bold text-sm mt-1 block">Emotional Anchor</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
