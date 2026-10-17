import React, { useState } from "react"
import { Sparkles, MessageSquare, Copy, Check, X, ArrowUpRight, Zap, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export const StudioAttribution: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedDiscord, setCopiedDiscord] = useState(false)
  const [copiedInsta, setCopiedInsta] = useState(false)

  const DISCORD_HANDLE = "alter.ffx"
  const DISCORD_NAME = "Alter"
  const INSTA_HANDLE = "@alter.ffx"
  const INSTA_NAME = "Alter"
  const INSTA_URL = "https://www.instagram.com/alter.ffx/"

  const handleCopyDiscord = (e: React.MouseEvent) => {
    e.stopPropagation()
    soundFx.playTick(1300)
    navigator.clipboard.writeText("alter.ffx")
    setCopiedDiscord(true)
    setTimeout(() => setCopiedDiscord(false), 2500)
  }

  const handleCopyInsta = (e: React.MouseEvent) => {
    e.stopPropagation()
    soundFx.playTick(1300)
    navigator.clipboard.writeText(INSTA_HANDLE)
    setCopiedInsta(true)
    setTimeout(() => setCopiedInsta(false), 2500)
  }

  const handleOpenModal = () => {
    soundFx.playNeuralBurst()
    setIsOpen(true)
  }

  return (
    <>
      {/* =========================================================================
          PERMANENT HARDCODED STUDIO SIGNATURE & WATERMARK — DO NOT REMOVE
          ALTERFFX STUDIO DIGITAL WATERMARK & LEAD GENERATION ATOM
          ========================================================================= */}

      {/* 1. Permanent Fixed Bottom Ribbon Across Every Viewport with Liquid Glass styling */}
      <div 
        onClick={handleOpenModal}
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#241812]/90 backdrop-blur-xl text-[#EDCFB5] text-[11px] font-mono py-1.5 px-4 border-t border-white/20 flex items-center justify-between cursor-pointer hover:bg-[#2F2119] transition-colors select-none shadow-2xl"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-pulse"></span>
          <span className="font-semibold tracking-wider text-white">PORTFOLIO ARCHITECTURE</span>
          <span className="hidden sm:inline text-[#EDCFB5]/40">•</span>
          <span className="hidden sm:inline text-[#EDCFB5]/80 font-light">
            Bespoke High-Impact Web Systems for Elite Editors
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] tracking-wide">
          <span className="hidden md:inline text-[#EDCFB5] font-light">
            Want a portfolio like this?
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#9A7562] text-white font-medium uppercase tracking-wider text-[9px] hover:bg-[#86614E] transition-colors flex items-center gap-1 border border-white/20 shadow-xs">
            <span>Get Yours</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>

      {/* 2. Floating Bottom-Right Badge in Liquid Glass Finish */}
      <div className="fixed bottom-8 right-4 sm:right-6 z-40 select-none">
        <motion.button
          onClick={handleOpenModal}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-2.5 pl-3.5 pr-4 py-2 rounded-full liquid-glass text-[#241812] border-2 border-white/80 shadow-2xl hover:border-white transition-all cursor-pointer"
        >
          {/* Animated Glowing Accent Dot in #9A7562 */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] animate-ping absolute opacity-75"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#9A7562] relative"></span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-tight">
            <span className="text-[#6D5548] font-light">Engineered by</span>
            <span className="text-[#241812] group-hover:text-[#9A7562] transition-colors font-semibold">
              STUDIO
            </span>
          </div>

          <div className="hidden sm:flex items-center text-[10px] font-mono text-[#6D5548] pl-1.5 border-l border-white/60">
            <Zap className="w-3 h-3 text-[#9A7562] mr-0.5 fill-[#9A7562]" />
            <span className="font-semibold">PRO</span>
          </div>
        </motion.button>
      </div>

      {/* 3. In-Website Lead Capture & Agency Showcase Modal in Liquid Glass */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#241812]/70 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-3xl liquid-glass-card shadow-2xl overflow-hidden my-auto p-6 sm:p-8 text-[#241812] space-y-6 border border-white/90"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundFx.playTick(900)
                  setIsOpen(false)
                }}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-full liquid-glass-pill hover:border-[#9A7562] text-[#241812] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-xs font-mono font-medium text-[#241812]">
                  <Sparkles className="w-3.5 h-3.5 text-[#9A7562]" />
                  <span>ALTERFFX DIGITAL STUDIO COMMISSIONS</span>
                </div>

                <h3 className="font-normal text-3xl sm:text-4xl text-[#241812] leading-tight">
                  Want a <span className="font-light italic text-[#9A7562]">bespoke $15k+ portfolio</span> that stands out immediately?
                </h3>

                <p className="text-sm sm:text-base text-[#6D5548] font-light leading-relaxed">
                  We build high-retention, cinematic portfolios for editors, directors, cinematographers, and premium creative studios. No generic templates, no AI clichés—just custom liquid glass aesthetics, interactive NLE monitors, and flawless typography.
                </p>
              </div>

              {/* Direct Social Contact Cards (Discord & Instagram) */}
              <div className="space-y-3 pt-2 font-sans">
                <div className="text-xs font-sans text-[#6D5548] uppercase tracking-wider font-semibold">
                  DIRECT CONTACT CHANNELS (REPLY WITHIN 2 HOURS)
                </div>

                {/* Discord Channel Card */}
                <div className="p-3.5 sm:p-4 rounded-2xl liquid-glass-pill flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-white transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#5865F2] text-white flex items-center justify-center shadow-md shrink-0">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-xs font-sans text-[#6D5548] font-medium">DISCORD DIRECT ({DISCORD_NAME})</div>
                      <div className="text-sm sm:text-base font-sans font-semibold text-[#241812]">{DISCORD_HANDLE}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyDiscord}
                    className="w-full sm:w-auto justify-center px-4 py-2 rounded-xl bg-[#9A7562] text-white hover:bg-[#86614E] text-xs font-sans font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer border border-white/20"
                  >
                    {copiedDiscord ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDiscord ? "Copied!" : "Copy Tag"}</span>
                  </button>
                </div>

                {/* Instagram Channel Card */}
                <div className="p-3.5 sm:p-4 rounded-2xl liquid-glass-pill flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-white transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] text-white flex items-center justify-center shadow-md shrink-0">
                      <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-xs font-sans text-[#6D5548] font-medium">INSTAGRAM DM ({INSTA_NAME})</div>
                      <div className="text-sm sm:text-base font-sans font-semibold text-[#241812]">{INSTA_HANDLE}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyInsta}
                      className="flex-1 sm:flex-none justify-center px-3.5 py-2 rounded-xl liquid-glass text-[#241812] text-xs font-sans font-medium uppercase tracking-wider hover:bg-white/70 transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                    >
                      {copiedInsta ? <Check className="w-3.5 h-3.5 text-[#9A7562]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedInsta ? "Copied!" : "Copy"}</span>
                    </button>

                    <a
                      href={INSTA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none justify-center px-3.5 py-2 rounded-xl bg-[#9A7562] text-white hover:bg-[#86614E] text-xs font-sans font-medium uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer border border-white/20"
                    >
                      <span>Send DM</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Security & Exclusivity Note */}
              <div className="p-4 rounded-2xl liquid-glass-pill flex items-center justify-between text-xs font-mono text-[#6D5548] font-light">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9A7562]" />
                  <span>ALTERFFX STUDIO ARCHITECTURE</span>
                </span>
                <span className="font-medium text-[#241812]">COMMISSIONS OPEN</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
