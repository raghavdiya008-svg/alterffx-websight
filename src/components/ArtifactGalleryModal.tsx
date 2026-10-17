import React from "react"
import { X, Download, ShieldCheck, Box, Sliders, ExternalLink } from "lucide-react"
import { Artifact } from "../types"
import { soundFx } from "../lib/audioEngine"

interface ArtifactGalleryModalProps {
  artifact: Artifact | null
  onClose: () => void
}

export const ArtifactGalleryModal: React.FC<ArtifactGalleryModalProps> = ({ artifact, onClose }) => {
  if (!artifact) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-obsidian/85 backdrop-blur-2xl overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/[0.12] bg-obsidian-card shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={() => {
            soundFx.playTick(900)
            onClose()
          }}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full border border-white/[0.1] bg-obsidian-surface/80 hover:bg-white/10 hover:border-champagne/40 text-smoke hover:text-alabaster transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[480px] bg-obsidian flex items-center justify-center overflow-hidden">
            <img
              src={artifact.imageUrl}
              alt={artifact.title}
              className="w-full h-full object-cover object-center max-h-[600px]"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60 pointer-events-none"></div>

            {/* Bottom Floating Metadata Pill */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono px-4 py-2.5 rounded-xl border border-white/[0.1] bg-obsidian/80 backdrop-blur-md">
              <span className="text-champagne">{artifact.maison}</span>
              <span className="text-phosphor">TOLERANCE Δ=0.0018mm</span>
            </div>
          </div>

          {/* Right Information & Specification Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-champagne tracking-widest uppercase">
                <span>{artifact.category}</span>
                <span className="text-white/20">/</span>
                <span className="text-smoke">{artifact.year} EDITION</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-alabaster leading-snug">
                {artifact.title}
              </h3>

              <p className="text-smoke text-xs sm:text-sm leading-relaxed font-light">
                {artifact.curatorNotes}
              </p>

              {/* Physical Materials and Dimensions */}
              <div className="p-4 rounded-xl border border-white/[0.08] bg-obsidian-surface/60 space-y-2 text-xs font-mono">
                <div>
                  <span className="text-smoke text-[10px] uppercase block">Physical Formulation</span>
                  <span className="text-silver">{artifact.physicalMaterial}</span>
                </div>
                <div>
                  <span className="text-smoke text-[10px] uppercase block">Dimensions & Scale</span>
                  <span className="text-alabaster">{artifact.dimensions}</span>
                </div>
              </div>

              {/* Mathematical Tensor Lineage */}
              <div className="space-y-2 text-xs font-mono border-t border-white/[0.06] pt-4">
                <span className="text-[10px] uppercase tracking-wider text-smoke block">
                  Generative Tensor Lineage
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="text-smoke">Roughness: <span className="text-silver">{artifact.parameters.surfaceRoughness}</span></div>
                  <div className="text-smoke">Anisotropy: <span className="text-silver">{artifact.parameters.anisotropy}</span></div>
                  <div className="text-smoke">Seed: <span className="text-champagne">{artifact.parameters.latentSeed}</span></div>
                  <div className="text-smoke">Passes: <span className="text-phosphor">{artifact.parameters.renderPasses}</span></div>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="space-y-2 pt-4 border-t border-white/[0.08]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundFx.playTick(1300)
                    alert("STEP CAD (ISO 10303) cryptographic package downloaded.")
                  }}
                  className="py-2.5 px-3 rounded-lg border border-white/[0.1] bg-obsidian-surface hover:bg-white/[0.05] text-xs font-mono text-silver hover:text-alabaster transition-colors flex items-center justify-center gap-1.5"
                >
                  <Box className="w-3.5 h-3.5 text-champagne" />
                  <span>STEP CAD</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playTick(1400)
                    alert("Apple USDZ Volumetric Spatial Scene downloaded.")
                  }}
                  className="py-2.5 px-3 rounded-lg border border-white/[0.1] bg-obsidian-surface hover:bg-white/[0.05] text-xs font-mono text-silver hover:text-alabaster transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-phosphor" />
                  <span>Apple USDZ</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-smoke pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-champagne" />
                  <span>Cryptographic IP Watermarked</span>
                </span>
                <span>SHA-256 Verified</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
