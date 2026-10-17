import React, { useState, useRef } from "react"
import { Play, ShieldCheck, Sparkles, Layers } from "lucide-react"
import { soundFx } from "../lib/audioEngine"

interface CloakedVideoPlayerProps {
  youtubeId?: string
  videoSrc?: string
  title: string
  category?: string
  duration?: string
  stillImage?: string
  aspectRatio?: string
  autoPlay?: boolean
  className?: string
  onPlayChange?: (isPlaying: boolean) => void
}

export const CloakedVideoPlayer: React.FC<CloakedVideoPlayerProps> = ({
  youtubeId = "EPU8ivyiWHI",
  videoSrc,
  title,
  category = "Motion Graphics",
  duration = "00:48",
  stillImage,
  aspectRatio = "16:9",
  autoPlay = false,
  className = "",
  onPlayChange
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleStartPlay = () => {
    soundFx.playNeuralBurst()
    setIsPlaying(true)
    if (onPlayChange) onPlayChange(true)
  }

  // Hardened Cloaked Embed URL parameters
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1`

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-black/95 border border-white/50 shadow-2xl select-none ${className}`}
    >
      {isPlaying ? (
        <div className="relative w-full h-full overflow-hidden">
          {videoSrc ? (
            /* Native HTML5 High-Performance Video Player with Zero Third-Party Branding */
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
                onPlay={() => {
                  setIsPlaying(true)
                  if (onPlayChange) onPlayChange(true)
                }}
              />
            </div>
          ) : (
            <>
              {/* 
                ====================================================================
                CLOAKED VIDEO EMBED ENGINE (NO YOUTUBE BRANDING / NO CHANNEL LEAKS)
                ====================================================================
              */}
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

          {/* 
            1. TOP BRAND SHIELD (Blocks YouTube Title, Channel Avatar & Share Link)
            100% solid opaque black prevents any clicks from opening the client's YouTube channel,
            and eliminates any visual bleedthrough of the channel name or avatar.
          */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 left-0 right-0 h-14 sm:h-16 z-30 pointer-events-auto bg-black flex items-center justify-between px-3 sm:px-6 cursor-default select-none border-b border-white/15 shadow-xl"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-pulse shrink-0"></span>
              <span className="font-medium text-xs sm:text-sm text-white tracking-wide truncate max-w-[160px] sm:max-w-xs md:max-w-md">
                {title}
              </span>
              <span className="hidden md:inline text-white/40 font-mono text-xs">•</span>
              <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full bg-[#9A7562] text-[10px] font-sans text-white uppercase font-medium tracking-wider shrink-0">
                {category}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="liquid-glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-white/90 font-medium hidden sm:flex items-center gap-1.5 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>AE24 // 4K 60FPS</span>
              </span>
            </div>
          </div>
          {/* Subtle blend shadow beneath solid top shield */}
          <div className="absolute top-14 sm:top-16 left-0 right-0 h-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-20" />

          {/* 
            2. BOTTOM-RIGHT LOGO & WATERMARK SHIELD
            Blocks YouTube's watermark logo and subscriber watermark link in lower right.
          */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2.5 right-11 sm:right-14 z-30 pointer-events-auto px-2.5 py-1 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-mono text-[#EDCFB5] font-semibold flex items-center gap-1 shadow-lg cursor-default select-none"
          >
            <span>MASTER CUT</span>
          </div>

          {/* Channel Watermark Click Interceptor (covers custom subscriber logo above controls) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-11 right-2 w-16 h-12 z-30 pointer-events-auto cursor-default select-none bg-transparent"
            title="4K Master"
          />

          {/* 
            3. BOTTOM-LEFT SHIELD (Blocks any 'Watch on YouTube' badge)
          */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2.5 left-2 sm:left-4 z-30 pointer-events-auto px-2.5 py-1 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-sans text-white/80 font-medium flex items-center gap-1.5 cursor-default select-none hidden sm:flex"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A7562]"></span>
            <span>TIMECODE // {duration}</span>
          </div>
            </>
          )}
        </div>
      ) : (
        /* Poster Preview Canvas with Launch Action */
        <div className="relative w-full h-full flex items-center justify-center">
          {stillImage ? (
            <img
              src={stillImage}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-black/90 flex items-center justify-center">
              <span className="font-sans text-xs text-[#EDCFB5]">ALTER VIDEO MASTER</span>
            </div>
          )}

          {/* Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none"></div>

          {/* Top Left Spec HUD */}
          <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-sans px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-medium z-10">
            <span className="w-2 h-2 rounded-full bg-[#9A7562] animate-ping"></span>
            <span>AFTER EFFECTS 24</span>
            <span>•</span>
            <span className="text-[#EDCFB5] font-semibold">{aspectRatio}</span>
          </div>

          {/* Central Play Trigger Button */}
          <button
            onClick={handleStartPlay}
            className="absolute inset-0 m-auto w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#9A7562] border-2 border-white/70 flex items-center justify-center text-white hover:scale-110 hover:bg-[#86614E] transition-all shadow-2xl cursor-pointer z-20 group"
            aria-label={`Play ${title}`}
          >
            <Play className="w-8 h-8 fill-white ml-1 group-hover:scale-105 transition-transform" />
          </button>

          {/* Bottom HUD */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-white/95 font-medium z-10">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EDCFB5]"></span>
              <span>STREAM HIGH-RETENTION CUT</span>
            </span>

            <span>{duration} • 60.00 FPS UHD</span>
          </div>
        </div>
      )}
    </div>
  )
}
