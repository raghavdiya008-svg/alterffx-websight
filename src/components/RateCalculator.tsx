import React, { useState, useEffect } from "react"
import { ShieldCheck, ArrowRight, Zap, Check, MessageSquare, Copy, ExternalLink, Calendar, Plus, X, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

interface RateCalculatorProps {
  prefilledProject?: string
  onBookingSuccess: () => void
}

const AVAILABLE_NEEDS = [
  "3D Camera Tracking",
  "Kinetic Typography Rig",
  "Dynamic Speed Ramping",
  "Frame-Synced Sub-Bass Foley",
  "Color Grading (Rec.709)",
  "9:16 Vertical Social Cutdown",
  "24h Priority Turnaround",
  "Raw .aep Project Comps",
  "Multi-Cam Podcast Sync",
  "Monthly Creator Retainer"
]

export const RateCalculator: React.FC<RateCalculatorProps> = ({ prefilledProject, onBookingSuccess }) => {
  const [selectedTier, setSelectedTier] = useState<"commercial" | "longform" | "kinetic" | "custom">("commercial")
  
  // Custom Needs & Requirements Tags
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [customNeedInput, setCustomNeedInput] = useState("")

  // Intake Form State
  const [clientName, setClientName] = useState("")
  const [contactHandle, setContactHandle] = useState("")
  const [selectedBudget, setSelectedBudget] = useState<string>("$300–$600")
  const [customBudgetInput, setCustomBudgetInput] = useState<string>("")
  const [projectBrief, setProjectBrief] = useState(prefilledProject ? `Interested in commissioning an edit similar to ${prefilledProject}.` : "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [copiedDiscord, setCopiedDiscord] = useState(false)

  useEffect(() => {
    if (prefilledProject) {
      setProjectBrief(`Interested in commissioning an edit similar to ${prefilledProject}.`)
    }
  }, [prefilledProject])

  const handleCopyDiscord = () => {
    soundFx.playTick(1200)
    navigator.clipboard.writeText("alter.ffx")
    setCopiedDiscord(true)
    setTimeout(() => setCopiedDiscord(false), 2500)
  }

  const toggleNeed = (need: string) => {
    soundFx.playTick(1050)
    setSelectedNeeds(prev => 
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    )
  }

  const handleAddCustomNeed = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = customNeedInput.trim()
    if (trimmed && !selectedNeeds.includes(trimmed)) {
      soundFx.playNeuralBurst()
      setSelectedNeeds(prev => [...prev, trimmed])
      setCustomNeedInput("")
    }
  }

  const handleRemoveNeed = (need: string) => {
    soundFx.playTick(950)
    setSelectedNeeds(prev => prev.filter(n => n !== need))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    soundFx.playNeuralBurst()

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      onBookingSuccess()
    }, 900)
  }

  const tiers = [
    {
      id: "commercial" as const,
      num: "01",
      title: "3D Commercial & Product Motion",
      subtitle: "30s–60s High-Octane Commercials",
      idealFor: "Brands, product launches, 3D reveals & hardware animations",
      deliverables: [
        "Full 3D Element/C4D multi-pass compositing",
        "Dynamic velocity speed ramps & camera tracking",
        "Tactile sub-bass hits & organic foley sound design",
        "Master ProRes 422 HQ + 9:16 vertical social cutdown"
      ],
      turnaround: "2–3 Days Turnaround"
    },
    {
      id: "longform" as const,
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
      id: "kinetic" as const,
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
      id: "custom" as const,
      num: "04",
      title: "Custom Scope & Specific Needs",
      subtitle: "Tailored Format, Retainer, or Bespoke Cut",
      idealFor: "Podcasts, multi-cam flows, viral shorts batch, or monthly retainer",
      deliverables: [
        "Custom workflow configured to your exact timeline & requirements",
        "Direct 1-on-1 collaboration with Alter via Discord or Telegram",
        "Tailored revisions & rush delivery options",
        "Full master exports + raw .aep project comps upon request"
      ],
      turnaround: "Flexible / Rush Available"
    }
  ]

  const activeTierData = tiers.find((t) => t.id === selectedTier) || tiers[0]

  return (
    <section id="rates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header with Thin Montserrat typography */}
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
            <span className="font-light text-base sm:text-lg text-[#6D5548]">
              PRODUCTION DOCKET // COMMISSION AVAILABILITY
            </span>
          </div>
          <h2 className="font-normal text-4xl sm:text-6xl text-[#241812] tracking-tight">
            Commission Intake
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            I accept a select number of commercial and YouTube commissions per production cycle. Choose a package below or configure your custom needs.
          </p>
        </div>

        {/* Live Capacity Pill */}
        <div className="flex items-center gap-2 text-xs font-sans text-[#241812] font-semibold liquid-glass-pill px-4 py-2 rounded-full self-start md:self-auto shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CURRENT STATUS: 2 OF 4 PRODUCTION SLOTS OPEN</span>
        </div>
      </motion.div>

      {/* Main Commission Grid in Liquid Glass */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Scope Selector Cards & Custom Needs Builder */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-sans text-[#6D5548] font-medium flex items-center justify-between">
            <span>SELECT YOUR PROJECT SCOPE</span>
            <span className="text-[#9A7562] font-semibold">AFTER EFFECTS 24 PIPELINE</span>
          </div>

          {/* Scope Cards */}
          <div className="space-y-3.5">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                onClick={() => {
                  soundFx.playTick(1000)
                  setSelectedTier(tier.id)
                }}
                className={`p-5 sm:p-6 rounded-3xl transition-all cursor-pointer border flex flex-col justify-between font-sans ${
                  selectedTier === tier.id
                    ? "liquid-glass-card border-[#9A7562] shadow-xl ring-1 ring-[#9A7562]/40"
                    : "liquid-glass hover:bg-white/55 border-white/60"
                }`}
              >
                <div className="flex items-start justify-between gap-4 font-sans">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-sans text-xs text-[#9A7562] font-bold">{tier.num} //</span>
                      <h3 className="font-normal text-xl sm:text-2xl text-[#241812]">
                        {tier.title}
                      </h3>
                    </div>
                    <p className="text-xs font-sans text-[#6D5548] font-normal">
                      {tier.subtitle}
                    </p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors shrink-0 ${
                    selectedTier === tier.id 
                      ? "bg-[#9A7562] text-white" 
                      : "bg-white/60 text-[#6D5548]"
                  }`}>
                    {tier.turnaround}
                  </span>
                </div>

                {/* Scope Details (Expands when active) */}
                {selectedTier === tier.id && (
                  <div className="mt-4 pt-4 border-t border-white/50 space-y-3 font-sans text-xs text-[#6D5548] animate-fade-in">
                    <div className="text-[12px] text-[#241812] font-semibold tracking-wide">
                      INCLUDED DELIVERABLES & CRAFT:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {tier.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#9A7562] shrink-0" />
                          <span className="font-normal text-[#4A372D]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Custom Requirements & Specific Needs Selector */}
          <div className="p-6 rounded-3xl liquid-glass-card space-y-4 border border-white/70 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9A7562]" />
                <span className="font-medium text-base text-[#241812]">
                  Select or Type Custom Needs
                </span>
              </div>
              <span className="text-[11px] font-sans text-[#6D5548] font-medium">
                {selectedNeeds.length} Selected
              </span>
            </div>

            {/* Quick Toggleable Need Pills */}
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_NEEDS.map((need) => {
                const isSelected = selectedNeeds.includes(need)
                return (
                  <button
                    key={need}
                    type="button"
                    onClick={() => toggleNeed(need)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sans transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#9A7562] text-white border-[#9A7562] shadow-sm font-medium"
                        : "bg-white/40 hover:bg-white/70 text-[#6D5548] border-white/60"
                    }`}
                  >
                    <span>{isSelected ? "✓" : "+"}</span>
                    <span>{need}</span>
                  </button>
                )
              })}
            </div>

            {/* Custom Need Input Field */}
            <form onSubmit={handleAddCustomNeed} className="flex items-center gap-2 pt-2 border-t border-white/40">
              <input
                type="text"
                placeholder="Type any other custom need (e.g. 3D Logo Reveal, Multi-Cam Cut, 48h Delivery)..."
                value={customNeedInput}
                onChange={(e) => setCustomNeedInput(e.target.value)}
                className="flex-1 bg-white/40 border border-white/60 rounded-xl px-3.5 py-2 text-xs font-sans text-[#241812] placeholder:text-[#6D5548]/60 focus:outline-none focus:border-[#9A7562]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#9A7562] hover:bg-[#86614E] text-white text-xs font-sans font-medium flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Need</span>
              </button>
            </form>

            {/* Selected Custom Needs Display */}
            {selectedNeeds.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {selectedNeeds.map((need) => (
                  <span 
                    key={need}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#9A7562]/15 text-[#9A7562] border border-[#9A7562]/30 text-[11px] font-sans font-medium"
                  >
                    <span>{need}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveNeed(need)}
                      className="hover:text-[#241812] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Direct Connect Drawer */}
          <div className="p-5 rounded-2xl liquid-glass-pill flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-[#9A7562]" />
              <span className="text-[#6D5548] font-normal">Prefer direct chat? Ping Alter on Discord:</span>
              <span className="text-[#241812] font-semibold">alter.ffx</span>
            </div>

            <button
              onClick={handleCopyDiscord}
              className="px-4 py-2 rounded-xl bg-white/60 hover:bg-white text-[#241812] border border-white/70 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 font-medium shadow-2xs"
            >
              {copiedDiscord ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied alter.ffx</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#9A7562]" />
                  <span>Copy Discord Tag</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Direct Intake Docket Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl liquid-glass-card p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden border border-white/80">
            <div className="border-b border-white/50 pb-4 space-y-1">
              <span className="font-light text-xs text-[#9A7562] block uppercase tracking-wider font-semibold font-mono">
                COMMISSION INTAKE DOCKET
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-[#241812]">
                Reserve Your Edit Slot
              </h3>
              <p className="text-xs text-[#6D5548] font-light">
                Fill out your details below or provide a drive link. I review all project scopes within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl liquid-glass border border-[#9A7562] text-center space-y-3 animate-fade-in">
                <span className="w-10 h-10 rounded-full bg-[#9A7562] text-white flex items-center justify-center mx-auto text-base font-bold shadow-md">✓</span>
                <div className="font-medium text-lg text-[#241812]">Inquiry Successfully Filed</div>
                <p className="text-xs text-[#6D5548] font-light max-w-sm mx-auto">
                  Your project scope for <span className="font-semibold text-[#241812]">{activeTierData.title}</span> has been received. I will reach out directly on Discord / Email within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Active Scope Summary Pill */}
                <div className="p-3 rounded-xl bg-white/40 border border-white/50 text-xs font-sans flex items-center justify-between">
                  <span className="text-[#6D5548] font-normal">Target Package:</span>
                  <span className="text-[#241812] font-semibold">{activeTierData.title}</span>
                </div>

                {/* Included Custom Needs Tag Indicator */}
                {selectedNeeds.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#9A7562]/10 border border-[#9A7562]/25 text-xs font-sans text-[#241812]">
                    <div className="text-[11px] text-[#9A7562] font-semibold mb-1">ATTACHED CUSTOM REQUIREMENTS ({selectedNeeds.length}):</div>
                    <div className="text-xs font-normal text-[#6D5548] line-clamp-2">
                      {selectedNeeds.join(" • ")}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[#6D5548] text-xs font-sans font-medium block">
                    Your Name / Creator Channel
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex / Apex Media"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2.5 text-[#241812] focus:outline-none focus:border-[#9A7562] font-sans text-base sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#6D5548] text-xs font-sans font-medium block">
                    Discord Handle or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@username or alex@channel.com"
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2.5 text-[#241812] focus:outline-none focus:border-[#9A7562] font-sans text-base sm:text-sm"
                  />
                </div>

                {/* Estimated Budget Selector with Custom Option */}
                <div className="space-y-1.5">
                  <label className="text-[#6D5548] text-xs font-sans font-medium flex items-center justify-between">
                    <span>Estimated Budget</span>
                    <span className="text-[11px] text-[#9A7562] font-normal">Select or customize</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["$150–$300", "$300–$600", "$600–$1,200", "Custom"].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => {
                          soundFx.playTick(1050)
                          setSelectedBudget(budget)
                        }}
                        className={`py-2 px-2.5 rounded-xl text-xs font-sans transition-all cursor-pointer border text-center ${
                          selectedBudget === budget
                            ? "bg-[#9A7562] text-white border-[#9A7562] shadow-sm font-medium"
                            : "bg-white/40 hover:bg-white/70 text-[#6D5548] border-white/60 font-normal"
                        }`}
                      >
                        {budget === "Custom" ? "Custom Budget" : budget}
                      </button>
                    ))}
                  </div>

                  {/* Custom Budget Input Field */}
                  {selectedBudget === "Custom" && (
                    <div className="pt-1.5 animate-fade-in">
                      <input
                        type="text"
                        placeholder="Enter your target budget (e.g. $250 / video or $1,500/mo)..."
                        value={customBudgetInput}
                        onChange={(e) => setCustomBudgetInput(e.target.value)}
                        className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2 text-[#241812] placeholder:text-[#6D5548]/60 focus:outline-none focus:border-[#9A7562] font-sans text-base sm:text-xs"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[#6D5548] text-xs font-sans font-medium block">
                    Project Brief & Custom Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide Google Drive footage links, video concept, reference cuts, custom duration, or specific instructions..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2.5 text-[#241812] placeholder:text-[#6D5548]/60 focus:outline-none focus:border-[#9A7562] font-sans text-base sm:text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-[#9A7562] text-white font-medium text-sm tracking-wide uppercase hover:bg-[#86614E] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#9A7562]/25 active:scale-98 cursor-pointer border border-white/20"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Scope</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Response Commitment */}
                <div className="pt-2 text-[11px] font-sans text-[#6D5548] text-center font-normal flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9A7562]" />
                  <span>Direct Editor Contact • Response Within 2h</span>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
