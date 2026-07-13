"use client"

import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface AnimatedGridProps {
  children: React.ReactNode
  className?: string
  columns?: number
}

export function AnimatedGrid({
  children,
  className,
  columns = 2,
}: AnimatedGridProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-muted/30 p-6 md:p-8",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40",
          !reduced && "animate-[float_12s_ease-in-out_infinite]",
        )}
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        }}
      />
      <div
        className={cn(
          "relative z-10 grid gap-4",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface AnimatedGridItemProps {
  children: React.ReactNode
  className?: string
  label?: string
}

export function AnimatedGridItem({
  children,
  className,
  label,
}: AnimatedGridItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-5 shadow-[var(--shadow-sm)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <div className="bg-brand grid size-12 place-items-center rounded-xl text-white shadow-[var(--shadow-sm)]">
        {children}
      </div>
      {label && (
        <span className="text-center text-xs text-muted-foreground">{label}</span>
      )}
    </div>
  )
}
