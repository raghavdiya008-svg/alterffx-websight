import React from "react"
import { motion } from "framer-motion"
import { CLIENT_ROSTER } from "../data/editorData"
import { ShieldCheck, Cpu, HardDrive, MonitorCheck } from "lucide-react"

export const ClientRoster: React.FC = () => {
  return (
    <section className="py-16 border-y border-[#1C2618]/15 bg-[#CBD4B1]/40">
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
            <span className="font-serif italic text-base text-[#5E6B4E] block">
              Trusted by commercial directors & network showrunners
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C2618] mt-0.5">
              Production Houses & Studios Cut in This Suite
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5E6B4E]">
            <span className="w-2 h-2 rounded-full bg-[#E8512A]"></span>
            <span className="font-semibold text-[#1C2618]">FRAME.IO ENTERPRISE PRO VAULT</span>
          </div>
        </motion.div>

        {/* Client Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CLIENT_ROSTER.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="p-3.5 rounded-xl border border-[#1C2618]/15 bg-[#E0E6CE] hover:border-[#E8512A] hover:bg-[#E8EDD7] transition-all flex flex-col justify-between shadow-2xs"
            >
              <div className="font-serif text-base font-normal text-[#1C2618] tracking-tight">{client.name}</div>
              <div className="text-[10px] font-sans text-[#5E6B4E] mt-1">{client.division}</div>
              <div className="mt-2 text-[9px] font-mono text-[#E8512A] font-bold">
                {client.projectCount} DELIVERIES
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Suite Guarantee Strip */}
        <div className="pt-6 border-t border-[#1C2618]/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono text-[#5E6B4E]">
          <div className="flex items-center gap-3">
            <HardDrive className="w-4 h-4 text-[#E8512A]" />
            <div>
              <div className="text-[#1C2618] font-sans font-medium">120TB NVMe RAID</div>
              <div className="text-[10px] text-[#5E6B4E]">8K Uncompressed Raw Bandwidth</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MonitorCheck className="w-4 h-4 text-[#2A7B88]" />
            <div>
              <div className="text-[#1C2618] font-sans font-medium">Flanders Scientific XMP310</div>
              <div className="text-[10px] text-[#5E6B4E]">100% DCI-P3 Mastering Display</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-[#B59226]" />
            <div>
              <div className="text-[#1C2618] font-sans font-medium">DaVinci Resolve Studio 19</div>
              <div className="text-[10px] text-[#5E6B4E]">Dual RTX 4090 GPU Node</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#1C2618]" />
            <div>
              <div className="text-[#1C2618] font-sans font-medium">MPA / TPN Certified</div>
              <div className="text-[10px] text-[#5E6B4E]">Air-Gapped NDA Asset Vault</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
