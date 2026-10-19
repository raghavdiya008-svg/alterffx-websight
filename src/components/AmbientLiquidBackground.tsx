import React, { memo } from "react"

export const AmbientLiquidBackground: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none contain-strict motion-reduce:hidden">
      
      {/* Primary Floating Mocha Orb (Top Left to Center) - GPU Accelerated Soft Radial */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(154,117,98,0.25)_0%,rgba(183,159,147,0.12)_45%,transparent_70%)] opacity-80 animate-liquid-orb-1 will-change-transform"
      />

      {/* Secondary Alabaster Specular Liquid Wave (Top Right to Mid) */}
      <div 
        className="absolute top-[20%] -right-[15%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45)_0%,rgba(237,207,181,0.25)_50%,transparent_70%)] opacity-85 animate-liquid-orb-2 will-change-transform"
      />

      {/* Tertiary Warm Taupe Glow (Bottom Left to Center) */}
      <div 
        className="absolute top-[55%] -left-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(183,159,147,0.25)_0%,rgba(154,117,98,0.12)_50%,transparent_70%)] opacity-70 animate-liquid-orb-3 will-change-transform"
      />

      {/* Quaternary Soft Champagne Pool (Bottom Right) */}
      <div 
        className="absolute -bottom-[20%] right-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(154,117,98,0.22)_0%,rgba(255,255,255,0.3)_45%,transparent_70%)] opacity-75 animate-liquid-orb-4 will-change-transform"
      />

      {/* Delicate Specular Shimmer Sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.4),transparent_75%)]" />
      
    </div>
  )
})

AmbientLiquidBackground.displayName = "AmbientLiquidBackground"

