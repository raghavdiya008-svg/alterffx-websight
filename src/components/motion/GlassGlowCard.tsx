import React, { useState, useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface GlassGlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  onClick?: () => void
}

export const GlassGlowCard: React.FC<GlassGlowCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(154, 117, 98, 0.18)",
  onClick
}) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: -1000, y: -1000 })
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Specular Mouse-Following Radial Light Cone */}
      {!shouldReduceMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 75%)`,
            opacity: isHovered ? 1 : 0
          }}
        />
      )}
      <div className="relative z-1">{children}</div>
    </div>
  )
}
