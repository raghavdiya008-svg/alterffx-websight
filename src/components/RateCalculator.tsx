import React, { useState } from "react"
import { Calculator, Check, ShieldCheck, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

interface RateCalculatorProps {
  prefilledProject?: string
  onBookingSuccess: () => void
}

export const RateCalculator: React.FC<RateCalculatorProps> = ({ prefilledProject, onBookingSuccess }) => {
  const [projectType, setProjectType] = useState<"commercial" | "narrative" | "music" | "creator">("commercial")
  const [turnaround, setTurnaround] = useState<"standard" | "priority" | "rush">("standard")
  const [soundDesign, setSoundDesign] = useState(true)
  const [colorGrade, setColorGrade] = useState(true)
  const [socialCuts, setSocialCuts] = useState(false)
  const [rawHours, setRawHours] = useState(4)

  // Booking Form State
  const [producerName, setProducerName] = useState("")
  const [email, setEmail] = useState("")
  const [productionCompany, setProductionCompany] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [notes, setNotes] = useState(prefilledProject ? `Interested in booking an edit similar to ${prefilledProject}.` : "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Rate Math
  const baseRates = {
    commercial: 4800,
    narrative: 7200,
    music: 3800,
    creator: 2900
  }

  const turnaroundMultipliers = {
    standard: 1.0,
    priority: 1.25,
    rush: 1.6
  }

  let totalEstimate = baseRates[projectType]
  if (soundDesign) totalEstimate += 850
  if (colorGrade) totalEstimate += 1200
  if (socialCuts) totalEstimate += 650
  if (rawHours > 5) totalEstimate += (rawHours - 5) * 150

  totalEstimate = Math.round(totalEstimate * turnaroundMultipliers[turnaround])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    soundFx.playNeuralBurst()

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      onBookingSuccess()
    }, 1000)
  }

  return (
    <section id="rates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Section Header with +2pt */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C2618]/15 pb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-[#E8512A]" />
            <span className="font-serif italic text-lg sm:text-xl text-[#5E6B4E]">Transparent edit suite estimation docket</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C2618] tracking-tight">
            Interactive Rate & Scope Calculator
          </h2>
          <p className="text-[#5E6B4E] text-base sm:text-lg mt-2 max-w-2xl font-sans font-normal">
            No ambiguous &ldquo;contact for a quote&rdquo; runarounds. Select your project parameters, pacing requirements, and finishing deliverables for an immediate baseline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#1C2618] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#E8512A]" />
          <span>FIXED PRICE PER LOCK • NO OVERTIME SURPRISES</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Scope & Addon Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Project Type Selector */}
          <div className="p-6 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] space-y-4 shadow-2xs">
            <span className="font-serif italic text-base text-[#1C2618] block font-semibold">
              1. Select Project Category
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "commercial", label: "Commercial", price: "€4,800" },
                { id: "narrative", label: "Narrative / Doc", price: "€7,200" },
                { id: "music", label: "Music Video", price: "€3,800" },
                { id: "creator", label: "Creator Series", price: "€2,900" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundFx.playTick(1000)
                    setProjectType(item.id as typeof projectType)
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    projectType === item.id
                      ? "border-[#E8512A] bg-[#CBD4B1] text-[#E8512A] shadow-xs ring-1 ring-[#E8512A]"
                      : "border-[#1C2618]/15 bg-[#D6DDBF] text-[#5E6B4E] hover:text-[#1C2618] hover:bg-[#E0E6CE]"
                  }`}
                >
                  <div className="font-serif text-lg font-normal text-[#1C2618]">{item.label}</div>
                  <div className="text-xs font-mono text-[#5E6B4E] mt-1 font-medium">From {item.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Turnaround Speed */}
          <div className="p-6 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] space-y-4 shadow-2xs">
            <span className="font-serif italic text-base text-[#1C2618] block font-semibold">
              2. Desired Turnaround Pacing
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "standard", title: "Standard Turnaround", time: "8–10 Days", note: "Standard Studio Pacing" },
                { id: "priority", title: "Priority Delivery", time: "4–5 Days", note: "+25% Expedited Surcharge" },
                { id: "rush", title: "48-Hour Emergency", time: "48 Hours", note: "+60% Surcharge" }
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => {
                    soundFx.playTick(1100)
                    setTurnaround(tier.id as typeof turnaround)
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    turnaround === tier.id
                      ? "border-[#E8512A] bg-[#CBD4B1] text-[#1C2618] ring-1 ring-[#E8512A]"
                      : "border-[#1C2618]/15 bg-[#D6DDBF] text-[#5E6B4E] hover:text-[#1C2618]"
                  }`}
                >
                  <div className="font-sans font-semibold text-sm text-[#1C2618]">{tier.title}</div>
                  <div className="text-base font-mono text-[#E8512A] font-bold mt-1">{tier.time}</div>
                  <div className="text-xs font-sans text-[#5E6B4E] mt-0.5">{tier.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Deliverable Inclusions / Addons */}
          <div className="p-6 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] space-y-4 shadow-2xs">
            <span className="font-serif italic text-base text-[#1C2618] block font-semibold">
              3. Finishing Deliverables Included
            </span>

            <div className="space-y-3">
              <label
                onClick={() => {
                  soundFx.playTick(1200)
                  setSoundDesign(!soundDesign)
                }}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  soundDesign
                    ? "border-[#1C2618]/40 bg-[#CBD4B1] text-[#1C2618]"
                    : "border-[#1C2618]/15 bg-[#D6DDBF] text-[#5E6B4E]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${soundDesign ? "bg-[#1C2618] border-[#1C2618] text-[#D6DDBF]" : "border-[#1C2618]/30"}`}>
                    {soundDesign && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-sm font-sans font-bold">Multi-Stem Sound Design & Foley Mix</div>
                    <div className="text-xs font-mono text-[#5E6B4E]">iZotope RX dialogue polish, custom sub-bass hits, and full stem exports</div>
                  </div>
                </div>
                <span className="text-sm font-mono text-[#1C2618] font-bold">+€850</span>
              </label>

              <label
                onClick={() => {
                  soundFx.playTick(1200)
                  setColorGrade(!colorGrade)
                }}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  colorGrade
                    ? "border-[#E8512A]/50 bg-[#CBD4B1] text-[#1C2618]"
                    : "border-[#1C2618]/15 bg-[#D6DDBF] text-[#5E6B4E]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${colorGrade ? "bg-[#E8512A] border-[#E8512A] text-white" : "border-[#1C2618]/30"}`}>
                    {colorGrade && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-sm font-sans font-bold">Film-Print Master Color Grade</div>
                    <div className="text-xs font-mono text-[#5E6B4E]">DaVinci Resolve Studio color pass with custom Kodak 2383 LUT</div>
                  </div>
                </div>
                <span className="text-sm font-mono text-[#E8512A] font-bold">+€1,200</span>
              </label>

              <label
                onClick={() => {
                  soundFx.playTick(1200)
                  setSocialCuts(!socialCuts)
                }}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  socialCuts
                    ? "border-[#B59226]/50 bg-[#CBD4B1] text-[#1C2618]"
                    : "border-[#1C2618]/15 bg-[#D6DDBF] text-[#5E6B4E]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${socialCuts ? "bg-[#B59226] border-[#B59226] text-white" : "border-[#1C2618]/30"}`}>
                    {socialCuts && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="text-sm font-sans font-bold">Social Multi-Format Cutdowns</div>
                    <div className="text-xs font-mono text-[#5E6B4E]">Vertical 9:16 and Square 1:1 re-framed exports for social delivery</div>
                  </div>
                </div>
                <span className="text-sm font-mono text-[#1C2618] font-bold">+€650</span>
              </label>
            </div>
          </div>

          {/* Raw Footage Dailies Volume Slider */}
          <div className="p-6 rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] space-y-3.5 shadow-2xs">
            <div className="flex items-center justify-between text-sm font-mono">
              <span className="text-[#5E6B4E] font-medium">4. RAW FOOTAGE VOLUME (DAILIES)</span>
              <span className="text-[#1C2618] font-bold">{rawHours} Hours of Raw Takes</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={rawHours}
              onChange={(e) => {
                setRawHours(parseInt(e.target.value))
                soundFx.playTick(900 + parseInt(e.target.value) * 30, 0.01)
              }}
              className="w-full accent-[#E8512A] cursor-pointer bg-[#CBD4B1] h-2.5 rounded-lg"
            />
            <div className="flex justify-between text-xs text-[#5E6B4E] font-mono">
              <span>1 Hour (Single Cam)</span>
              <span>10 Hours (Multi-Cam)</span>
              <span>20+ Hours (Feature Doc)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price Summary & Direct Intake Form */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Realtime Estimate Summary Card in Lab Chart Vibe */}
          <div className="rounded-3xl border-2 border-[#E8512A] bg-[#E5EBD5] p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#1C2618]/15 pb-4">
              <div>
                <span className="font-serif italic text-sm text-[#E8512A] block font-semibold">
                  Calculated Baseline Docket
                </span>
                <div className="text-5xl sm:text-6xl font-serif text-[#1C2618] mt-1 font-normal">
                  €{totalEstimate.toLocaleString()}
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-[#E8512A]/10 border border-[#E8512A]/30 text-xs font-mono text-[#E8512A] font-bold">
                FIXED RATE
              </span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs font-mono text-[#5E6B4E]">
              <div className="flex justify-between">
                <span>Base Offline Assembly:</span>
                <span className="text-[#1C2618] font-bold">€{baseRates[projectType].toLocaleString()}</span>
              </div>
              {soundDesign && (
                <div className="flex justify-between">
                  <span>Sound Design & Mix:</span>
                  <span className="text-[#1C2618] font-bold">+€850</span>
                </div>
              )}
              {colorGrade && (
                <div className="flex justify-between">
                  <span>Film Print Color Grade:</span>
                  <span className="text-[#E8512A] font-bold">+€1,200</span>
                </div>
              )}
              {socialCuts && (
                <div className="flex justify-between">
                  <span>Social 9:16 Cutdowns:</span>
                  <span className="text-[#1C2618] font-bold">+€650</span>
                </div>
              )}
              {turnaround !== "standard" && (
                <div className="flex justify-between text-[#E8512A] font-bold">
                  <span>Pacing Surcharge ({turnaround.toUpperCase()}):</span>
                  <span>+{Math.round((turnaroundMultipliers[turnaround] - 1) * 100)}%</span>
                </div>
              )}
            </div>

            {/* Inclusions Guarantee */}
            <div className="p-4 rounded-xl border border-[#1C2618]/15 bg-[#CBD4B1] text-xs font-mono text-[#5E6B4E] space-y-1.5">
              <div className="text-[#1C2618] font-sans font-bold">INCLUDED IN EVERY CUT:</div>
              <div>• 2 full rounds of director revisions</div>
              <div>• Frame.io web review links for asynchronous markup</div>
              <div>• Final ProRes 4444 XQ master + clean textless splits</div>
            </div>
          </div>

          {/* Direct Booking Submission Form */}
          <div className="rounded-3xl border border-[#1C2618]/20 bg-[#E5EBD5] p-6 sm:p-8 shadow-sm space-y-5">
            {submitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#CBD4B1] border-2 border-[#1C2618] text-[#1C2618] mx-auto flex items-center justify-center">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="font-serif text-3xl font-normal text-[#1C2618]">
                  Docket Filed Successfully
                </h3>
                <p className="text-sm text-[#5E6B4E] leading-relaxed max-w-xs mx-auto font-sans">
                  Thank you, {producerName || "Producer"}. Julian will review your dailies scope and respond within 3 hours with suite availability.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-lg bg-[#CBD4B1] border border-[#1C2618]/20 text-[#1C2618] text-sm font-sans font-semibold"
                >
                  Configure Another Cut
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
                <div className="space-y-1">
                  <label className="text-[#5E6B4E] text-xs font-semibold">Your Name & Role</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Lindqvist (Director / Producer)"
                    value={producerName}
                    onChange={(e) => setProducerName(e.target.value)}
                    className="w-full bg-[#D6DDBF] border border-[#1C2618]/25 rounded-xl px-4 py-3 text-[#1C2618] placeholder:text-[#5E6B4E]/60 focus:outline-none focus:border-[#E8512A] font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#5E6B4E] text-xs font-semibold">Executive / Agency Email</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@anonymouscontent.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#D6DDBF] border border-[#1C2618]/25 rounded-xl px-4 py-3 text-[#1C2618] placeholder:text-[#5E6B4E]/60 focus:outline-none focus:border-[#E8512A] font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[#5E6B4E] text-xs font-semibold">Production House</label>
                    <input
                      type="text"
                      placeholder="e.g. Somesuch / Nike"
                      value={productionCompany}
                      onChange={(e) => setProductionCompany(e.target.value)}
                      className="w-full bg-[#D6DDBF] border border-[#1C2618]/25 rounded-xl px-4 py-3 text-[#1C2618] placeholder:text-[#5E6B4E]/60 focus:outline-none focus:border-[#E8512A] font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#5E6B4E] text-xs font-semibold">Target Lock Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full bg-[#D6DDBF] border border-[#1C2618]/25 rounded-xl px-4 py-3 text-[#1C2618] focus:outline-none focus:border-[#E8512A] font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#5E6B4E] text-xs font-semibold">Project Notes & Dailies Link</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of footage, tone references, and target runtime..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#D6DDBF] border border-[#1C2618]/25 rounded-xl px-4 py-3 text-[#1C2618] placeholder:text-[#5E6B4E]/60 focus:outline-none focus:border-[#E8512A] font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#E8512A] text-white font-sans font-semibold text-sm uppercase tracking-wider hover:bg-[#CF401B] transition-all flex items-center justify-center gap-2.5 shadow-md shadow-[#E8512A]/20 active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Confirming Schedule...</span>
                  ) : (
                    <>
                      <span>Lock In Availability for This Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
