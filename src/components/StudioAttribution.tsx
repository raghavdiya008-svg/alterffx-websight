import React, { useState } from "react"
import { MessageSquare, Copy, Check, X, ArrowUpRight } from "lucide-react"
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

  const DISCORD_HANDLE = "R13598og"
  const DISCORD_NAME = "R13598"
  const INSTA_HANDLE = "@ruthlesssoul9"
  const INSTA_NAME = "r13598"
  const INSTA_URL = "https://www.instagram.com/ruthlesssoul9/"

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        throw new Error("Fallback to execCommand")
      }
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
      } catch {
        // Silently catch
      }
      textArea.remove()
    }
  }

  const handleCopyDiscord = async (e: React.MouseEvent) => {
    e.stopPropagation()
    soundFx.playTick(1300)
    await copyToClipboard(DISCORD_HANDLE)
    setCopiedDiscord(true)
    setTimeout(() => setCopiedDiscord(false), 2500)
  }

  const handleCopyInsta = async (e: React.MouseEvent) => {
    e.stopPropagation()
    soundFx.playTick(1300)
    await copyToClipboard(INSTA_HANDLE)
    setCopiedInsta(true)
    setTimeout(() => setCopiedInsta(false), 2500)
  }

  const handleOpenModal = () => {
    soundFx.playNeuralBurst()
    setIsOpen(true)
  }

  return (
    <>
      {/* Floating Bottom-Right Badge in Subtle Liquid Glass Finish */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 select-none">
        <motion.button
          onClick={handleOpenModal}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full liquid-glass text-[#241812] border border-white/80 shadow-xl hover:border-white transition-all cursor-pointer"
        >
          {/* Subtle Glowing Accent Dot */}
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-ping absolute opacity-70"></span>
            <span className="w-2 h-2 rounded-full bg-[#9A7562] relative"></span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-sans tracking-tight">
            <span className="text-[#6D5548] font-light">Site by</span>
            <span className="text-[#241812] group-hover:text-[#9A7562] transition-colors font-semibold">
              r13598
            </span>
          </div>
        </motion.button>
      </div>

      {/* Subtle Studio Info & Contact Modal in Liquid Glass */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#241812]/70 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl liquid-glass-card shadow-2xl overflow-hidden my-auto p-6 sm:p-8 text-[#241812] space-y-6 border border-white/90"
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
              <div className="space-y-2.5 pr-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-pill text-[11px] font-sans font-medium text-[#6D5548]">
                  <span>DIGITAL ARCHITECTURE</span>
                </div>

                <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] leading-tight">
                  Crafted by <span className="font-medium text-[#9A7562]">r13598</span>
                </h3>

                <p className="text-sm text-[#6D5548] font-light leading-relaxed">
                  Design systems, cinematic web interfaces, and bespoke portfolios for creators and creative studios. Available for select collaborations and custom web engineering.
                </p>
              </div>

              {/* Direct Social Contact Cards (Discord & Instagram) */}
              <div className="space-y-3 pt-2 font-sans">
                <div className="text-xs font-sans text-[#6D5548] uppercase tracking-wider font-semibold">
                  DIRECT CONTACT CHANNELS
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

              {/* Status Note */}
              <div className="p-3.5 rounded-2xl liquid-glass-pill flex items-center justify-between text-xs font-sans text-[#6D5548] font-light">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-[#241812]">r13598</span>
                </span>
                <span className="text-[11px] font-mono text-[#9A7562]">AVAILABLE FOR SELECT COLLABORATIONS</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

