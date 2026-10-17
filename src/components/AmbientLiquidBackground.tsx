import React, { memo } from "react"

export const AmbientLiquidBackground: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* Primary Floating Mocha Orb (Top Left to Center) */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-[#9A7562]/20 via-[#B79F93]/15 to-transparent blur-[130px] opacity-70 animate-liquid-orb-1"
        style={{ willChange: "transform" }}
      />

      {/* Secondary Alabaster Specular Liquid Wave (Top Right to Mid) */}
      <div 
        className="absolute top-[25%] -right-[15%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-bl from-white/50 via-[#EDCFB5]/40 to-transparent blur-[140px] opacity-80 animate-liquid-orb-2"
        style={{ willChange: "transform" }}
      />

      {/* Tertiary Warm Taupe Glow (Bottom Left to Center) */}
      <div 
        className="absolute top-[60%] -left-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tr from-[#B79F93]/25 via-[#9A7562]/15 to-transparent blur-[150px] opacity-65 animate-liquid-orb-3"
        style={{ willChange: "transform" }}
      />

      {/* Quaternary Soft Champagne Pool (Bottom Right) */}
      <div 
        className="absolute -bottom-[20%] right-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tl from-[#9A7562]/20 via-white/40 to-transparent blur-[140px] opacity-75 animate-liquid-orb-1"
        style={{ animationDirection: "reverse", animationDuration: "28s", willChange: "transform" }}
      />

      {/* Delicate Specular Shimmer Sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.45),rgba(255,255,255,0))]" />
      
    </div>
  )
})

AmbientLiquidBackground.displayName = "AmbientLiquidBackground"
