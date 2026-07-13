"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface EvervaultCardProps {
  children: React.ReactNode
  className?: string
  expanded?: boolean
  onToggle?: () => void
}

/** Hover-glow card inspired by Evervault / animate-ui patterns. */
export function EvervaultCard({
  children,
  className,
  expanded,
  onToggle,
}: EvervaultCardProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [coords, setCoords] = useState({ x: 50, y: 50 })
  const reduced = useReducedMotion()

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setCoords({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.button
      type="button"
      ref={ref}
      onMouseMove={onMove}
      onClick={onToggle}
      aria-expanded={expanded}
      whileHover={reduced ? undefined : { scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-border bg-card p-8 text-start transition-colors",
        expanded && "border-primary/35",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 42%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.button>
  )
}
