import React, { useState } from "react"
import { Eye, Box, ArrowUpRight, Sparkles, Filter } from "lucide-react"
import { MOCK_ARTIFACTS } from "../data/mockData"
import { Artifact } from "../types"
import { soundFx } from "../lib/audioEngine"

interface CuratedGalleryProps {
  onSelectArtifact: (artifact: Artifact) => void
  onEnterStudio: () => void
}

const CATEGORIES = ["All Creations", "Horology", "Haute Couture", "Architecture", "High Jewelry", "Industrial", "Sensory Cinema"]

export const CuratedGallery: React.FC<CuratedGalleryProps> = ({ onSelectArtifact, onEnterStudio }) => {
  const [activeCategory, setActiveCategory] = useState("All Creations")

  const filteredArtifacts = activeCategory === "All Creations"
    ? MOCK_ARTIFACTS
    : MOCK_ARTIFACTS.filter(a => a.category === activeCategory)

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Editorial Exhibition Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-champagne mb-2">
            <span className="w-2 h-px bg-champagne"></span>
            <span>ATELIER EXHIBITION // 2026 ARCHIVE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-alabaster tracking-tight">
            Synthesized Haute Creations
          </h2>
          <p className="text-smoke text-sm sm:text-base mt-2 max-w-2xl font-light">
            Each artifact is mathematically synthesized down to micro-facet optical tolerances and physical kinematic specifications.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundFx.playNeuralBurst()
            onEnterStudio()
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.12] bg-obsidian-surface hover:bg-obsidian-card hover:border-champagne/40 text-xs font-mono text-silver transition-all self-start md:self-auto group"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span>Synthesize Your Own</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-smoke mr-2" />
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => {
                soundFx.playTick(900)
                setActiveCategory(cat)
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-alabaster text-obsidian font-semibold shadow-sm"
                  : "bg-obsidian-surface border border-white/[0.06] text-smoke hover:text-alabaster hover:border-white/[0.16]"
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Dynamic Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtifacts.map((artifact) => (
          <div
            key={artifact.id}
            onClick={() => {
              soundFx.playTick(1100)
              onSelectArtifact(artifact)
            }}
            className="group relative rounded-2xl border border-white/[0.08] bg-obsidian-card/60 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 hover:border-champagne/40 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-champagne/5"
          >
            {/* Image Viewport */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian">
              <img
                src={artifact.imageUrl}
                alt={artifact.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-70"></div>
              
              {/* Category Pill */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-obsidian/80 border border-white/[0.1] text-champagne backdrop-blur-md">
                  {artifact.category.toUpperCase()}
                </span>
              </div>

              {/* Inspect Overlay Trigger */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-full bg-champagne text-obsidian shadow-lg">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Tolerance Badge */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-smoke">
                <span className="text-silver">{artifact.maison}</span>
                <span className="text-phosphor">Δ=0.0018mm</span>
              </div>
            </div>

            {/* Information Body */}
            <div className="p-6 space-y-3">
              <h3 className="font-serif text-xl font-normal text-alabaster group-hover:text-champagne transition-colors">
                {artifact.title}
              </h3>
              
              <p className="text-smoke text-xs leading-relaxed line-clamp-2 font-light">
                {artifact.prompt}
              </p>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-smoke">
                <span>{artifact.dimensions}</span>
                <span className="text-champagne flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
