import React, { useState } from "react"
import { Copy, Check, Calendar, ShieldCheck } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

interface FooterProps {
  onNavClick: (sectionId: string) => void
  onOpenBooking: () => void
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenBooking }) => {
  const [copied, setCopied] = useState(false)
  const email = "julian@vance-editorial.com"

  const handleCopyEmail = () => {
    soundFx.playTick(1300)
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer className="border-t border-[#1C2618]/15 bg-[#CBD4B1] text-[#5E6B4E] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Call to Action Row */}
        <div className="p-8 sm:p-12 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden shadow-2xs">
          <div className="space-y-3 z-10 max-w-xl">
            <span className="font-serif italic text-base text-[#E8512A] block font-semibold">
              Have a shoot wrapping this month?
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C2618] tracking-tight leading-tight">
              Let&rsquo;s cut your next defining commercial or narrative.
            </h3>
            <p className="text-base text-[#5E6B4E] font-sans">
              Available for commercial offline bookings, narrative feature assemblies, and creator retention consulting across Los Angeles, London, and remote Frame.io pipelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 z-10">
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onOpenBooking()
              }}
              className="px-7 py-4 rounded-xl bg-[#E8512A] text-white font-sans font-semibold text-sm uppercase tracking-wider hover:bg-[#CF401B] transition-all shadow-md shadow-[#E8512A]/20 flex items-center justify-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book An Edit Slot</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-xl border border-[#1C2618]/25 bg-[#D6DDBF] hover:bg-[#E0E6CE] text-[#1C2618] font-sans text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5"
            >
              {copied ? <Check className="w-4 h-4 text-[#1C2618]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Docket Copied!" : "Copy Direct Email"}</span>
            </button>
          </div>
        </div>

        {/* Technical Directory Grid with +2pt fonts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm font-sans">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8512A]"></span>
              <span className="font-serif text-3xl font-normal text-[#1C2618]">Julian Vance</span>
            </div>
            
            <p className="text-[#5E6B4E] leading-relaxed max-w-sm font-sans text-sm font-normal">
              Senior Commercial & Narrative Film Editor. Offline pacing, surgical multi-stem sound design, and master color grading for world-class directors and brands.
            </p>

            <div className="text-xs font-mono text-[#1C2618] flex items-center gap-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#E8512A]" />
              <span>TPN & MPA SECURITY CERTIFIED SUITE</span>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-serif italic text-base text-[#1C2618] block font-semibold">
                Suite Navigation
              </span>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <button onClick={() => onNavClick("works")} className="hover:text-[#1C2618] transition-colors">
                    Selected Works
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick("color-grade")} className="hover:text-[#1C2618] transition-colors">
                    Color Grade Loupe
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick("philosophy")} className="hover:text-[#1C2618] transition-colors">
                    Editorial Craft & Pacing
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick("rates")} className="hover:text-[#1C2618] transition-colors">
                    Rate Calculator
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-serif italic text-base text-[#1C2618] block font-semibold">
                Edit Suite Hubs
              </span>
              <ul className="space-y-2 text-[#5E6B4E] text-sm font-medium">
                <li>Los Angeles, CA (Arts District)</li>
                <li>London, UK (Soho Cutting Rooms)</li>
                <li>Remote via Frame.io & Aspera</li>
                <li className="text-[#1C2618]/70 text-xs pt-1 font-mono font-bold">Timezones: PST & GMT</li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="font-serif italic text-base text-[#1C2618] block font-semibold">
                Technical Certifications
              </span>
              <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#D6DDBF] space-y-1.5 text-xs font-mono text-[#5E6B4E] font-medium">
                <div>• DaVinci Resolve Studio 19</div>
                <div>• Avid Media Composer Certified</div>
                <div>• Adobe Premiere Pro / After Effects</div>
                <div>• Apple ProRes Certified Facility</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Timecode Line */}
        <div className="border-t border-[#1C2618]/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5E6B4E]">
          <div>
            © 2026 JULIAN VANCE EDITORIAL LAB. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span>SMPTE TIME: 24.00 FPS</span>
            <span>•</span>
            <span className="text-[#1C2618] font-bold">REPUTATION BUILT FRAME BY FRAME</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
