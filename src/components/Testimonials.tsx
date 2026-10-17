import React from "react"
import { motion } from "framer-motion"
import { TESTIMONIALS } from "../data/editorData"
import { Quote, CheckCircle2, MessageSquare } from "lucide-react"

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header with Thin Montserrat typography */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/50 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Quote className="w-4 h-4 text-[#9A7562]" />
            <span className="font-light text-base sm:text-lg text-[#6D5548]">
              CLIENT'S FEEDBACK // VERIFIED SOCIAL PROOF
            </span>
          </div>
          <h2 className="font-normal text-4xl sm:text-6xl text-[#241812] tracking-tight">
            Client Words & Proof of Work
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Real direct feedback and screenshots from clients, creators, and agency founders across Discord and Instagram on turnaround time, kinetic typography, and motion design impact.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#241812] font-medium liquid-glass-pill px-4 py-2 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-[#9A7562]" />
          <span>VERIFIED CLIENT SCREENSHOTS</span>
        </div>
      </motion.div>

      {/* Testimonials Cards Grid in Liquid Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((test, idx) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="rounded-3xl liquid-glass-card p-5 flex flex-col justify-between space-y-5 hover:-translate-y-1 transition-all duration-300 shadow-xl group"
          >
            <div className="space-y-3.5">
              
              {/* Actual Client Screenshot from Carrd Portfolio */}
              {test.screenshotUrl && (
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/60 bg-white/40 shadow-inner">
                  <img
                    src={test.screenshotUrl}
                    alt={`${test.author} review`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 liquid-glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-[#241812] flex items-center gap-1 font-semibold">
                    <MessageSquare className="w-3 h-3 text-[#9A7562]" />
                    <span>{test.platform || "VERIFIED // RECEIPT"}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-mono text-[#6D5548]">
                <span className="text-[#9A7562] font-semibold uppercase">{test.company}</span>
                <span className="font-light">{test.year}</span>
              </div>

              {/* Quote in Thin Montserrat */}
              <p className="font-light italic text-base text-[#241812] leading-relaxed line-clamp-3">
                &ldquo;{test.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/50 flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-[#241812]">{test.author}</div>
                <div className="text-xs font-light text-[#6D5548] mt-0.5">{test.role}</div>
              </div>

              <div className="w-8 h-8 rounded-full liquid-glass-pill flex items-center justify-center text-xs font-mono text-[#9A7562] font-bold">
                ✓
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
