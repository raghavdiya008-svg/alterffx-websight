import React, { useState } from "react"
import { Calculator, Check, ShieldCheck, ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { soundFx } from "../lib/audioEngine"

interface RateCalculatorProps {
  prefilledProject?: string
  onBookingSuccess: () => void
}

export const RateCalculator: React.FC<RateCalculatorProps> = ({ prefilledProject, onBookingSuccess }) => {
  const [projectType, setProjectType] = useState<"commercial" | "narrative" | "creator" | "podcast">("commercial")
  const [turnaround, setTurnaround] = useState<"standard" | "priority" | "rush">("standard")
  const [soundDesign, setSoundDesign] = useState(true)
  const [motionGraphics, setMotionGraphics] = useState(true)
  const [socialCuts, setSocialCuts] = useState(false)
  const [rawHours, setRawHours] = useState(4)

  // Booking Form State
  const [producerName, setProducerName] = useState("")
  const [email, setEmail] = useState("")
  const [productionCompany, setProductionCompany] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [notes, setNotes] = useState(prefilledProject ? `Interested in commissioning an edit similar to ${prefilledProject}.` : "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Rate Math in USD / EUR
  const baseRates = {
    commercial: 1850,
    narrative: 2400,
    creator: 1200,
    podcast: 950
  }

  const turnaroundMultipliers = {
    standard: 1.0,
    priority: 1.25,
    rush: 1.5
  }

  let totalEstimate = baseRates[projectType]
  if (soundDesign) totalEstimate += 350
  if (motionGraphics) totalEstimate += 450
  if (socialCuts) totalEstimate += 250
  if (rawHours > 3) totalEstimate += (rawHours - 3) * 90

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
            <Calculator className="w-4 h-4 text-[#9A7562]" />
            <span className="font-light text-base sm:text-lg text-[#6D5548]">
              COMMISSION ESTIMATOR & INTAKE DOCKET
            </span>
          </div>
          <h2 className="font-normal text-4xl sm:text-6xl text-[#241812] tracking-tight">
            Transparent Project Rates
          </h2>
          <p className="text-[#6D5548] text-base sm:text-lg mt-2 max-w-2xl font-light">
            Configure your deliverables below to generate a transparent project docket for commercial animation, YouTube long form, or viral short form.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#241812] font-medium liquid-glass-pill px-4 py-2 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#9A7562]" />
          <span>FIXED SCOPE GUARANTEE</span>
        </div>
      </motion.div>

      {/* Main Calculator Grid in Liquid Glass */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Options */}
        <div className="lg:col-span-7 rounded-3xl liquid-glass-card p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Step 1: Project Format */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#6D5548] font-medium flex items-center justify-between">
              <span>01 // SELECT PROJECT DELIVERABLE TYPE</span>
              <span className="text-[#9A7562] font-semibold">{projectType.toUpperCase()}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "commercial", label: "Commercial 3D", sub: "Product / Brand" },
                { id: "narrative", label: "Storytelling", sub: "Cinematic Arc" },
                { id: "creator", label: "YouTube Long", sub: "Retention Pacing" },
                { id: "podcast", label: "Podcast Cut", sub: "Multi-Cam Flow" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundFx.playTick(950)
                    setProjectType(item.id as any)
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    projectType === item.id
                      ? "bg-[#9A7562] text-white border-white/40 shadow-md shadow-[#9A7562]/20"
                      : "liquid-glass-pill text-[#6D5548] hover:text-[#241812] hover:border-white/90"
                  }`}
                >
                  <div className="text-xs font-medium tracking-tight">{item.label}</div>
                  <div className={`text-[10px] mt-0.5 font-light ${projectType === item.id ? "text-white/80" : "text-[#6D5548]/70"}`}>{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Turnaround Velocity */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#6D5548] font-medium flex items-center justify-between">
              <span>02 // TURNAROUND VELOCITY SCHEDULE</span>
              <span className="text-[#9A7562] font-semibold">{turnaround.toUpperCase()}</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "standard", label: "Standard Delivery", days: "3–5 Days", mult: "1.0x" },
                { id: "priority", label: "Priority Fast", days: "48 Hours", mult: "+25%" },
                { id: "rush", label: "Rush Sprint", days: "24 Hours", mult: "+50%" }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundFx.playTick(1100)
                    setTurnaround(item.id as any)
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    turnaround === item.id
                      ? "bg-[#9A7562] text-white border-white/40 shadow-md shadow-[#9A7562]/20"
                      : "liquid-glass-pill text-[#6D5548] hover:text-[#241812] hover:border-white/90"
                  }`}
                >
                  <div className="text-xs font-medium">{item.label}</div>
                  <div className="flex items-center justify-between text-[10px] mt-1 font-mono">
                    <span className={turnaround === item.id ? "text-white/80" : "text-[#6D5548]"}>{item.days}</span>
                    <span className={turnaround === item.id ? "text-white font-bold" : "text-[#9A7562] font-semibold"}>{item.mult}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Production Inclusions */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#6D5548] font-medium">
              03 // FINISHING PASSES & DELIVERABLE ADD-ONS
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundFx.playTick(1200)
                  setSoundDesign(!soundDesign)
                }}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  soundDesign
                    ? "liquid-glass-card border-[#9A7562] text-[#241812] shadow-xs"
                    : "liquid-glass-pill text-[#6D5548]"
                }`}
              >
                <div className="text-left">
                  <div className="text-xs font-medium">Tactile Sound Design</div>
                  <div className="text-[10px] text-[#6D5548] mt-0.5 font-light">Sub-hits & Foley</div>
                </div>
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${soundDesign ? "bg-[#9A7562] border-[#9A7562] text-white" : "border-white/70"}`}>
                  {soundDesign && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playTick(1250)
                  setMotionGraphics(!motionGraphics)
                }}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  motionGraphics
                    ? "liquid-glass-card border-[#9A7562] text-[#241812] shadow-xs"
                    : "liquid-glass-pill text-[#6D5548]"
                }`}
              >
                <div className="text-left">
                  <div className="text-xs font-medium">Kinetic Motion & 3D</div>
                  <div className="text-[10px] text-[#6D5548] mt-0.5 font-light">After Effects 24</div>
                </div>
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${motionGraphics ? "bg-[#9A7562] border-[#9A7562] text-white" : "border-white/70"}`}>
                  {motionGraphics && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playTick(1300)
                  setSocialCuts(!socialCuts)
                }}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  socialCuts
                    ? "liquid-glass-card border-[#9A7562] text-[#241812] shadow-xs"
                    : "liquid-glass-pill text-[#6D5548]"
                }`}
              >
                <div className="text-left">
                  <div className="text-xs font-medium">9:16 Social Cutdowns</div>
                  <div className="text-[10px] text-[#6D5548] mt-0.5 font-light">Reels & TikTok Cuts</div>
                </div>
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${socialCuts ? "bg-[#9A7562] border-[#9A7562] text-white" : "border-white/70"}`}>
                  {socialCuts && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            </div>
          </div>

          {/* Step 4: Raw Footage Volume Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#6D5548]">
              <span>04 // ESTIMATED RAW FOOTAGE VOLUME</span>
              <span className="text-[#241812] font-semibold">{rawHours} HOURS OF DAILIES</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={rawHours}
              onChange={(e) => {
                setRawHours(parseInt(e.target.value))
                soundFx.playTick(900 + parseInt(e.target.value) * 30, 0.01)
              }}
              className="w-full accent-[#9A7562] cursor-pointer bg-white/40 h-2.5 rounded-lg"
            />
            <div className="flex justify-between text-xs text-[#6D5548] font-mono font-light">
              <span>1 Hour (Single Cam)</span>
              <span>8 Hours (Multi-Cam)</span>
              <span>15+ Hours (Extensive)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price Summary & Direct Intake Form */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Realtime Estimate Summary Card in Liquid Glass */}
          <div className="rounded-3xl liquid-glass-card p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden border border-white/80">
            <div className="flex items-center justify-between border-b border-white/50 pb-4">
              <div>
                <span className="font-light text-xs text-[#9A7562] block uppercase tracking-wider font-semibold">
                  ESTIMATED PROJECT SCOPE
                </span>
                <div className="text-5xl sm:text-6xl font-light text-[#241812] mt-1">
                  ${totalEstimate.toLocaleString()}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#9A7562]/15 border border-[#9A7562]/30 text-xs font-mono text-[#9A7562] font-semibold">
                FIXED RATE
              </span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs font-mono text-[#6D5548]">
              <div className="flex justify-between">
                <span>Base Editorial & Assembly:</span>
                <span className="text-[#241812] font-semibold">${baseRates[projectType].toLocaleString()}</span>
              </div>
              {soundDesign && (
                <div className="flex justify-between">
                  <span>Tactile Sound Design & Mix:</span>
                  <span className="text-[#241812] font-semibold">+$350</span>
                </div>
              )}
              {motionGraphics && (
                <div className="flex justify-between">
                  <span>3D Motion & Typography:</span>
                  <span className="text-[#9A7562] font-semibold">+$450</span>
                </div>
              )}
              {socialCuts && (
                <div className="flex justify-between">
                  <span>Vertical Social Cutdowns:</span>
                  <span className="text-[#241812] font-semibold">+$250</span>
                </div>
              )}
              {turnaround !== "standard" && (
                <div className="flex justify-between text-[#9A7562] font-semibold">
                  <span>Schedule Velocity ({turnaround.toUpperCase()}):</span>
                  <span>+{Math.round((turnaroundMultipliers[turnaround] - 1) * 100)}%</span>
                </div>
              )}
            </div>

            {/* Inclusions Guarantee */}
            <div className="p-4 rounded-2xl liquid-glass-pill text-xs font-mono text-[#6D5548] space-y-1 font-light">
              <div>✓ Unlimited micro-tweaks until final cut lock</div>
              <div>✓ 4K ProRes master + web/mobile optimized exports</div>
              <div>✓ Full stem audio delivery (Foley, dialogue, music)</div>
            </div>

            {/* Booking Form */}
            {submitted ? (
              <div className="p-6 rounded-2xl liquid-glass border border-[#9A7562] text-center space-y-2 animate-fade-in">
                <span className="w-8 h-8 rounded-full bg-[#9A7562] text-white flex items-center justify-center mx-auto text-sm font-bold">✓</span>
                <div className="font-medium text-base text-[#241812]">Intake Docket Filed</div>
                <p className="text-xs text-[#6D5548] font-light">
                  Alter will review your project scope and get in touch within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[#6D5548] text-xs font-medium">Your Name / Handle</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex (Discord)"
                      value={producerName}
                      onChange={(e) => setProducerName(e.target.value)}
                      className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2.5 text-[#241812] focus:outline-none focus:border-[#9A7562] font-sans text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#6D5548] text-xs font-medium">Email / Discord Tag</label>
                    <input
                      type="text"
                      required
                      placeholder="alex@studio.com or @alex"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2.5 text-[#241812] focus:outline-none focus:border-[#9A7562] font-sans text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#6D5548] text-xs font-medium">Project Notes / Footage Link</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of video, references, and target deadline..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white/40 border border-white/60 rounded-xl px-4 py-2.5 text-[#241812] placeholder:text-[#6D5548]/60 focus:outline-none focus:border-[#9A7562] font-sans text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#9A7562] text-white font-medium text-sm tracking-wide uppercase hover:bg-[#86614E] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#9A7562]/25 active:scale-98 cursor-pointer border border-white/20"
                >
                  {isSubmitting ? (
                    <span>Confirming Scope...</span>
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
