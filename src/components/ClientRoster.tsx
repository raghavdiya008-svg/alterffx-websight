import React from "react"
import { motion } from "framer-motion"
import { CLIENT_ROSTER } from "../data/editorData"
import { Sparkles, Layers } from "lucide-react"

export const ClientRoster: React.FC = () => {
  return (
    <section className="py-14 border-y border-white/50 bg-white/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <span className="font-light text-sm text-[#6D5548] block">
              Trusted by commercial brands, creators & production studios
            </span>
            <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] mt-0.5">
              Production Domains & Editing Specializations
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6D5548] liquid-glass-pill px-3.5 py-1.5 rounded-full self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-pulse"></span>
            <span className="font-medium text-[#241812]">AFTER EFFECTS 24 PIPELINE</span>
          </div>
        </motion.div>

        {/* Client & Style Badges Grid with Prominent Liquid Glass Styling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CLIENT_ROSTER.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="p-5 rounded-2xl liquid-glass-card hover:border-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-center group cursor-default"
            >
              <div>
                <div className="font-medium text-sm text-[#241812] tracking-tight group-hover:text-[#9A7562] transition-colors">
                  {client.name}
                </div>
                <div className="text-[11px] font-light text-[#6D5548] mt-1.5 leading-snug">
                  {client.division}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
