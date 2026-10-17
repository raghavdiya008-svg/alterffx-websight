import React from "react"
import { motion } from "framer-motion"
import { TESTIMONIALS } from "../data/editorData"
import { Quote, CheckCircle2 } from "lucide-react"

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header with +2pt */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C2618]/15 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Quote className="w-4 h-4 text-[#E8512A]" />
            <span className="font-serif italic text-lg sm:text-xl text-[#5E6B4E]">Director and producer perspectives</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C2618] tracking-tight">
            Collaborators on the Cut
          </h2>
          <p className="text-[#5E6B4E] text-base sm:text-lg mt-2 max-w-2xl font-sans font-normal">
            Direct feedback from commercial directors, agency producers, and documentary showrunners who have sat across the cutting desk.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#1C2618] font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#E8512A]" />
          <span>VERIFIED PRODUCTION CREDITS</span>
        </div>
      </motion.div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((test, idx) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] p-8 flex flex-col justify-between space-y-6 hover:border-[#1C2618]/40 transition-all duration-200 shadow-2xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#5E6B4E]">
                <span className="text-[#E8512A] font-bold">PROJECT DOCKET</span>
                <span className="font-semibold">{test.year}</span>
              </div>

              <div className="text-xs font-mono text-[#1C2618] bg-[#CBD4B1] p-3 rounded-lg border border-[#1C2618]/15 font-semibold">
                <span className="text-[#E8512A] mr-1.5">🎬</span> {test.project}
              </div>

              {/* +2pt larger quote */}
              <p className="font-serif italic text-xl sm:text-2xl font-normal text-[#1C2618] leading-relaxed">
                &ldquo;{test.quote}&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-[#1C2618]/15 flex items-center justify-between">
              <div>
                <div className="font-sans font-semibold text-base text-[#1C2618]">{test.author}</div>
                <div className="text-sm font-sans text-[#5E6B4E] mt-0.5">{test.role}</div>
                <div className="text-xs font-mono text-[#E8512A] font-bold mt-0.5">{test.company}</div>
              </div>

              <div className="w-11 h-11 rounded-full border border-[#1C2618]/20 bg-[#CBD4B1] flex items-center justify-center text-sm font-mono text-[#1C2618] font-bold">
                {test.author.split(" ").map(n => n[0]).join("")}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
