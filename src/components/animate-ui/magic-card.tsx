"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface MagicCardProps {
  children: React.ReactNode
  className?: string
}

export function MagicCard({ children, className }: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
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
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8",
        "shadow-[0_24px_70px_-40px_color-mix(in_srgb,var(--primary)_45%,transparent)]",
        className,
      )}
    >
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, color-mix(in srgb, var(--primary) 16%, transparent), transparent 40%)`,
          }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
