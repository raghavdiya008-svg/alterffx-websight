import React, { useState } from "react"
import { Copy, Check, MessageSquare, Zap } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

interface FooterProps {
  onNavClick: (sectionId: string) => void
  onOpenBooking: () => void
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenBooking }) => {
  const [copied, setCopied] = useState(false)
  const email = "connectwithalter@gmail.com"

  const handleCopyEmail = () => {
    soundFx.playTick(1300)
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer className="border-t border-white/50 bg-white/20 backdrop-blur-xl text-[#6D5548] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Call to Action Row in Liquid Glass */}
        <div className="p-8 sm:p-12 rounded-3xl liquid-glass-card flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 z-10 max-w-xl">
            <span className="font-light italic text-base text-[#9A7562] block font-semibold">
              HAVE A PROJECT IN MIND? LET&rsquo;S CREATE TOGETHER.
            </span>
            <h3 className="font-normal text-3xl sm:text-5xl text-[#241812] tracking-tight leading-tight">
              Ready to elevate your edits to commercial grade?
            </h3>
            <p className="text-base text-[#6D5548] font-light leading-relaxed">
              Accepting commissions for product commercial animations, YouTube long form documentary editing, podcast series, and viral short-form retention hooks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 z-10">
            <button
              onClick={() => {
                soundFx.playNeuralBurst()
                onOpenBooking()
              }}
              className="px-7 py-4 rounded-2xl bg-[#9A7562] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#86614E] transition-all shadow-lg shadow-[#9A7562]/20 flex items-center justify-center gap-2.5 cursor-pointer border border-white/20"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Commission A Cut</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-2xl liquid-glass-pill hover:bg-white/60 text-[#241812] font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-white/60"
            >
              {copied ? <Check className="w-4 h-4 text-[#241812]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Email Copied!" : "connectwithalter@gmail.com"}</span>
            </button>
          </div>
        </div>

        {/* Technical Directory Grid with Thin Montserrat */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562]"></span>
              <span className="font-normal text-3xl text-[#241812]">ALTER</span>
              <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded-full bg-[#9A7562] font-semibold">AE24</span>
            </div>
            
            <p className="text-[#6D5548] leading-relaxed max-w-sm font-light text-sm">
              18 Yo Video editor & motion designer creating cinematic edits, 3D commercial animations, kinetic typography, and YouTube long form using After Effects 24.
            </p>

            <div className="text-xs font-mono text-[#241812] flex items-center gap-2 font-medium">
              <span>CONCEPT. EXECUTION. IMPACT.</span>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-medium text-sm text-[#241812] block tracking-wide">
                Portfolio Navigation
              </span>
              <ul className="space-y-2.5 text-sm font-light">
                <li>
                  <button onClick={() => onNavClick("works")} className="hover:text-[#241812] transition-colors cursor-pointer">
                    Sample Videos
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick("color-grade")} className="hover:text-[#241812] transition-colors cursor-pointer">
                    Color Grade Loupe
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick("philosophy")} className="hover:text-[#241812] transition-colors cursor-pointer">
                    What I Offer
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick("rates")} className="hover:text-[#241812] transition-colors cursor-pointer">
                    Rates & Intake
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-medium text-sm text-[#241812] block tracking-wide">
                Direct Channels
              </span>
              <ul className="space-y-2.5 text-[#6D5548] text-sm font-light">
                <li>
                  <a href="https://instagram.com/alter.ffx" target="_blank" rel="noopener noreferrer" className="hover:text-[#241812] transition-colors flex items-center gap-1.5">
                    <span>Instagram: @alter.ffx</span>
                  </a>
                </li>
                <li>
                  <span className="hover:text-[#241812] transition-colors">
                    Discord: @alterffx
                  </span>
                </li>
                <li>
                  <span className="text-[#6D5548] flex items-center gap-1.5 font-mono text-xs">
                    <span>Showreels: Native 4K Streams Only</span>
                  </span>
                </li>
                <li>
                  <a href="https://paypal.me/Priyanshuraikwar01" target="_blank" rel="noopener noreferrer" className="text-[#9A7562] hover:underline font-semibold text-xs font-mono">
                    Paypal: Priyanshu Raikwar
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="font-medium text-sm text-[#241812] block tracking-wide">
                Core Stack
              </span>
              <div className="p-4 rounded-2xl liquid-glass-pill space-y-1.5 text-xs font-mono text-[#6D5548] font-light">
                <div>• Adobe After Effects 24</div>
                <div>• 3D Camera Compositing</div>
                <div>• Kinetic Typography Rigging</div>
                <div>• Multi-Stem Sound Design</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Timecode Line */}
        <div className="border-t border-white/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6D5548]">
          <div className="font-light">
            © 2026 ALTER (ALTERFFX). ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-light">ENGINE: AFTER EFFECTS 24</span>
            <span>•</span>
            <span className="text-[#241812] font-semibold">CONCEPT. EXECUTION. IMPACT.</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
