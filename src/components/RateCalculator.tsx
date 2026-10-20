import React, { useState } from "react"
import { Calendar, Clock, Check, Copy, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

interface RateCalculatorProps {
  prefilledProject?: string
  onBookingSuccess?: () => void
}

const DiscordIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const TIERS = [
  {
    num: "01",
    title: "Short Form Videos",
    subtitle: "30s–60s Viral Shorts, Reels & TikToks",
    idealFor: "Creators, brands, TikTok, Instagram Reels & YouTube Shorts",
    deliverables: [
      "High-retention 1.5s hook design & dynamic transitions",
      "Kinetic subtitle animations & visual punch-ins",
      "Tactile sound design, risers, swooshes & trending audio sync",
      "Master 9:16 vertical ProRes / MP4 export (1080p & 4K)"
    ],
    turnaround: "2–3 Days Turnaround"
  },
  {
    num: "02",
    title: "High-Retention YouTube Long Form",
    subtitle: "8–20 Minute Gaming, Faceless & Storytelling",
    idealFor: "Top YouTube creators, gaming channels, faceless video essays",
    deliverables: [
      "Psychological pattern interrupt pacing every 4–6s",
      "Custom kinetic infographics & paper texture animation",
      "Dynamic speaker punch-ins & vocal compression",
      "Full master render + textless stem version"
    ],
    turnaround: "3–5 Days Turnaround"
  },
  {
    num: "03",
    title: "Kinetic Typography & Motion Rig",
    subtitle: "Bespoke Titles & Essential Graphics",
    idealFor: "Music videos, editorial title sequences, motion packages",
    deliverables: [
      "Expression-driven kinetic type with elastic overshoot",
      "Custom glint, particle bursts & deep glow curves",
      "Alpha channel ProRes 4444 transparent assets",
      "Includes After Effects 24 project comps"
    ],
    turnaround: "24–48 Hours Turnaround"
  },
  {
    num: "04",
    title: "Custom Scope & Specific Needs",
    subtitle: "Tailored Format, Retainer, or Bespoke Cut",
    idealFor: "Podcasts, multi-cam flows, viral shorts batch, or monthly retainer",
    deliverables: [
      "Custom workflow configured to your exact timeline & requirements",
      "Direct 1-on-1 collaboration with Alter via Discord or Instagram",
      "Tailored revisions & priority rush delivery options",
      "Full master exports + raw .aep project comps upon request"
    ],
    turnaround: "Flexible / Rush Available"
  }
]

export const RateCalculator: React.FC<RateCalculatorProps> = () => {
  const [copiedDiscord, setCopiedDiscord] = useState(false)
  const [copiedInsta, setCopiedInsta] = useState(false)

  const DISCORD_TAG = "alter.ffx"
  const DISCORD_DM_URL = "https://discord.com/users/1539590699769659494"
  const INSTA_HANDLE = "@alter.ffx"
  const INSTA_DM_URL = "https://ig.me/m/alter.ffx"

  const handleCopyDiscord = (e: React.MouseEvent) => {
    e.stopPropagation()
    soundFx.playTick(1200)
    navigator.clipboard.writeText(DISCORD_TAG)
    setCopiedDiscord(true)
    setTimeout(() => setCopiedDiscord(false), 2500)
  }

  const handleCopyInsta = (e: React.MouseEvent) => {
    e.stopPropagation()
    soundFx.playTick(1200)
    navigator.clipboard.writeText(INSTA_HANDLE)
    setCopiedInsta(true)
    setTimeout(() => setCopiedInsta(false), 2500)
  }

  return (
    <section id="rates" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/50 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#9A7562]" />
            <span className="font-light text-sm sm:text-base text-[#6D5548] tracking-wide">
              PRODUCTION TIMELINES & COMMISSION AVAILABILITY
            </span>
          </div>
          <h2 className="font-normal text-3xl sm:text-5xl lg:text-6xl text-[#241812] tracking-tight">
            Editing Scope & Turnaround
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Dedicated production pipeline with guaranteed turnaround times. Direct 1-on-1 collaboration with Alter from initial brief to final 4K master.
          </p>
        </div>

        {/* Live Capacity Pill */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#241812] font-semibold liquid-glass-pill px-4 py-2 rounded-full self-start md:self-auto shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CURRENT STATUS: 2 OF 4 PRODUCTION SLOTS OPEN</span>
        </div>
      </motion.div>

      {/* Turnaround Scope Cards Grid (2x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TIERS.map((tier, idx) => (
          <motion.div
            key={tier.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-6 sm:p-7 rounded-3xl liquid-glass-card border border-white/70 hover:border-white transition-all shadow-xl flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              {/* Card Header & Turnaround Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#9A7562] font-semibold">
                    <span>{tier.num} //</span>
                    <span className="uppercase tracking-wider">AFTER EFFECTS 24</span>
                  </div>
                  <h3 className="font-normal text-2xl sm:text-3xl text-[#241812] group-hover:text-[#9A7562] transition-colors leading-tight">
                    {tier.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#6D5548] font-normal">
                    {tier.subtitle}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#9A7562] text-white text-xs font-sans font-medium shrink-0 shadow-sm border border-white/20 self-start">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tier.turnaround}</span>
                </div>
              </div>

              {/* Deliverables List */}
              <div className="pt-4 border-t border-white/50 space-y-2.5 text-xs font-sans">
                <div className="text-[11px] text-[#241812] font-semibold tracking-wide uppercase font-mono">
                  INCLUDED DELIVERABLES & CRAFT:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {tier.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#4A372D]">
                      <Check className="w-3.5 h-3.5 text-[#9A7562] shrink-0 mt-0.5" />
                      <span className="font-normal leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Audience / Ideal For Tag */}
            <div className="pt-3 border-t border-white/40 text-[11px] font-sans text-[#6D5548] flex items-center justify-between">
              <span className="truncate">Ideal for: {tier.idealFor}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct Booking & Commission DM Cards (Below Turnaround Cards) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-8 lg:p-10 rounded-3xl liquid-glass-card border border-white/90 shadow-2xl space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/50 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono font-medium text-[#241812]">
              <Sparkles className="w-3.5 h-3.5 text-[#9A7562]" />
              <span>DIRECT COMMISSION CHANNELS // INSTANT BOOKING</span>
            </div>
            <h3 className="font-normal text-2xl sm:text-4xl text-[#241812]">
              Reserve Your Edit Slot via Direct Message
            </h3>
            <p className="text-sm sm:text-base text-[#6D5548] font-light max-w-2xl">
              Skip long web forms. Message Alter directly on Discord or Instagram with your video concept, references, or raw Google Drive footage link. Direct responses within 2 hours.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans text-[#6D5548] liquid-glass-pill px-3.5 py-1.5 rounded-full shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#9A7562]" />
            <span className="font-medium text-[#241812]">2-Hour Response Guaranteed</span>
          </div>
        </div>

        {/* Discord & Instagram Big DM Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Card 1: Discord Direct Message */}
          <div className="p-6 rounded-2xl liquid-glass border border-white/70 hover:border-white transition-all shadow-md flex flex-col justify-between space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5865F2] text-white flex items-center justify-center shadow-lg shrink-0">
                <DiscordIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[11px] font-mono text-[#6D5548] uppercase tracking-wider block font-semibold">
                  DISCORD DIRECT MESSAGE
                </span>
                <h4 className="text-xl sm:text-2xl font-normal text-[#241812] truncate">
                  {DISCORD_TAG}
                </h4>
                <p className="text-xs text-[#6D5548] font-light leading-relaxed">
                  Fastest response for project scopes, footage drive links, and 1-on-1 production planning.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-white/40">
              <a
                href={DISCORD_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playNeuralBurst()}
                className="flex-1 py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-sans font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer border border-white/20"
              >
                <span>Direct Message on Discord</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyDiscord}
                className="py-3 px-3.5 rounded-xl liquid-glass hover:bg-white/70 text-[#241812] text-xs font-sans font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer border border-white/60 shrink-0"
                title="Copy Discord Tag"
              >
                {copiedDiscord ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#9A7562]" />}
                <span className="hidden sm:inline">{copiedDiscord ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Instagram Direct Message */}
          <div className="p-6 rounded-2xl liquid-glass border border-white/70 hover:border-white transition-all shadow-md flex flex-col justify-between space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] text-white flex items-center justify-center shadow-lg shrink-0">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[11px] font-mono text-[#6D5548] uppercase tracking-wider block font-semibold">
                  INSTAGRAM DIRECT MESSAGE
                </span>
                <h4 className="text-xl sm:text-2xl font-normal text-[#241812] truncate">
                  {INSTA_HANDLE}
                </h4>
                <p className="text-xs text-[#6D5548] font-light leading-relaxed">
                  Direct DM for reels brainstorming, concept feedback, revisions, and rate quotes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-white/40">
              <a
                href={INSTA_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playNeuralBurst()}
                className="flex-1 py-3 px-4 rounded-xl bg-[#9A7562] hover:bg-[#86614E] text-white text-xs font-sans font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer border border-white/20"
              >
                <span>Direct Message on Instagram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyInsta}
                className="py-3 px-3.5 rounded-xl liquid-glass hover:bg-white/70 text-[#241812] text-xs font-sans font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer border border-white/60 shrink-0"
                title="Copy Instagram Handle"
              >
                {copiedInsta ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#9A7562]" />}
                <span className="hidden sm:inline">{copiedInsta ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Commitment Badge Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#6D5548] border-t border-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>COMMISSIONS ACCEPTED GLOBALLY // DCI-P3 4K 60FPS</span>
          </div>
          <span className="text-[11px] font-sans font-normal text-[#9A7562]">
            Ready to edit? Click any channel above to open direct chat.
          </span>
        </div>
      </motion.div>

    </section>
  )
}
