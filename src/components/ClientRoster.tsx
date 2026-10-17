import React from "react"
import { motion } from "framer-motion"
import { CLIENT_ROSTER } from "../data/editorData"
import { HardDrive, Cpu, ShieldCheck, MonitorCheck } from "lucide-react"

export const ClientRoster: React.FC = () => {
  return (
    <section className="py-16 border-y border-white/50 bg-white/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <span className="font-light text-sm text-[#6D5548] block">
              Trusted by creators, commercial brands & YouTube networks
            </span>
            <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] mt-0.5">
              Production Styles & Domains Cut in This Suite
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6D5548] liquid-glass-pill px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-pulse"></span>
            <span className="font-medium text-[#241812]">AFTER EFFECTS 24 ACCELERATED</span>
          </div>
        </motion.div>

        {/* Client Badges Grid in Liquid Glass */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CLIENT_ROSTER.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="p-4 rounded-2xl liquid-glass-pill hover:border-white/95 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="font-medium text-sm text-[#241812] tracking-tight">{client.name}</div>
              <div className="text-[11px] font-light text-[#6D5548] mt-1">{client.division}</div>
              <div className="mt-2 text-[10px] font-mono text-[#9A7562] font-semibold">
                {client.projectCount} DELIVERIES
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Suite Guarantee Strip */}
        <div className="pt-6 border-t border-white/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono text-[#6D5548]">
          <div className="flex items-center gap-3">
            <HardDrive className="w-4 h-4 text-[#9A7562]" />
            <div>
              <div className="text-[#241812] font-medium">High-Speed NVMe Storage</div>
              <div className="text-[10px] text-[#6D5548] font-light">Zero Latency 4K Timeline Scrubbing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-[#B79F93]" />
            <div>
              <div className="text-[#241812] font-medium">After Effects 24 Rigs</div>
              <div className="text-[10px] text-[#6D5548] font-light">Multi-Threaded 60fps Renders</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MonitorCheck className="w-4 h-4 text-[#9A7562]" />
            <div>
              <div className="text-[#241812] font-medium">Calibrated Color Grading</div>
              <div className="text-[10px] text-[#6D5548] font-light">DCI-P3 & Rec.709 Precision</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#B79F93]" />
            <div>
              <div className="text-[#241812] font-medium">Private Cloud Handoff</div>
              <div className="text-[10px] text-[#6D5548] font-light">Encrypted Google Drive / Frame.io</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
