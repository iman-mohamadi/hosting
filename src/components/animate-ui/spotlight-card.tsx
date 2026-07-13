"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  onClick?: () => void
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "color-mix(in srgb, var(--primary) 18%, transparent)",
  onClick,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const reduced = useReducedMotion()

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-shadow duration-500",
        "hover:shadow-[0_24px_60px_-36px_color-mix(in_srgb,var(--primary)_35%,transparent)]",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: hover
              ? `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 45%)`
              : undefined,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
