import React, { useState } from "react"
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, Building2, Mail, Globe } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

interface PrivateAllocationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTierName?: string
}

export const PrivateAllocationModal: React.FC<PrivateAllocationModalProps> = ({
  isOpen,
  onClose,
  selectedTierName = "Sovereign Cluster"
}) => {
  const [maisonName, setMaisonName] = useState("")
  const [email, setEmail] = useState("")
  const [targetVault, setTargetVault] = useState("Zurich Sovereign Vault (ZRH-01)")
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    soundFx.playNeuralBurst()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setMaisonName("")
    setEmail("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-2xl">
      <div className="relative w-full max-w-xl rounded-3xl border border-white/[0.12] bg-obsidian-card p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playTick(900)
            handleReset()
          }}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/[0.1] bg-obsidian-surface hover:bg-white/10 text-smoke hover:text-alabaster transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/30 text-champagne mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-champagne">
                RESERVATION PROTOCOL INITIATED
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-alabaster">
                Sovereign Tenant Registered
              </h3>
              <p className="text-smoke text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-alabaster">{maisonName || "Maison"}</strong>. Our Executive Machine Learning Director will contact you within 2 business hours via secure PGP channel.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-obsidian-surface/60 text-xs font-mono text-left max-w-sm mx-auto space-y-1">
              <div className="text-smoke">ALLOCATION: <span className="text-champagne">{selectedTierName}</span></div>
              <div className="text-smoke">VAULT: <span className="text-silver">{targetVault}</span></div>
              <div className="text-smoke">TENANT STATUS: <span className="text-phosphor">AIR-GAP PROVISIONED</span></div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg bg-alabaster text-obsidian font-semibold text-xs uppercase tracking-wider hover:bg-champagne transition-colors"
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-champagne mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>PRIVATE SOVEREIGN ALLOCATION</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-alabaster">
                Request Reserved Compute
              </h3>
              <p className="text-smoke text-xs sm:text-sm mt-1">
                Air-gapped dedicated B200 hardware nodes with guaranteed zero data retention.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-smoke flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-champagne" />
                  <span>MAISON / STUDIO NAME</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maison Cartier, Studio Veloce"
                  value={maisonName}
                  onChange={(e) => setMaisonName(e.target.value)}
                  className="w-full bg-obsidian border border-white/[0.1] rounded-xl px-4 py-3 text-alabaster focus:outline-none focus:border-champagne/60 text-xs font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-smoke flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-champagne" />
                  <span>DIRECT EXECUTIVE EMAIL</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="director@yourmaison.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-obsidian border border-white/[0.1] rounded-xl px-4 py-3 text-alabaster focus:outline-none focus:border-champagne/60 text-xs font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-smoke flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-champagne" />
                  <span>PREFERRED SOVEREIGN DATACENTER VAULT</span>
                </label>
                <select
                  value={targetVault}
                  onChange={(e) => setTargetVault(e.target.value)}
                  className="w-full bg-obsidian border border-white/[0.1] rounded-xl px-4 py-3 text-silver focus:outline-none focus:border-champagne/60 text-xs font-sans"
                >
                  <option value="Zurich Sovereign Vault (ZRH-01)">Zurich Sovereign Vault (ZRH-01) — Swiss Hydroelectric</option>
                  <option value="Paris Faubourg Atelier (CDG-02)">Paris Faubourg Atelier (CDG-02) — Dedicated Maison Vault</option>
                  <option value="Tokyo Ginza Node (HND-04)">Tokyo Ginza Node (HND-04) — Quantum Random Seed</option>
                  <option value="New York Madison Cluster (JFK-08)">New York Madison Cluster (JFK-08) — Low-Latency Direct</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-obsidian/60 text-[11px] font-mono text-smoke flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
              <span>Zero-training covenant: Your proprietary IP and archival CAD models are never retained or trained on.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-champagne text-obsidian font-semibold text-xs uppercase tracking-widest hover:bg-champagne-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-champagne/15"
            >
              <span>Submit Sovereign Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
