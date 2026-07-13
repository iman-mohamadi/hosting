"use client"

import { cn } from "@/lib/utils"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-3 md:gap-5",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface BentoItemProps {
  children: React.ReactNode
  className?: string
}

export function BentoItem({ children, className }: BentoItemProps) {
  return (
    <div
      className={cn(
        "group sheen relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-card p-7 shadow-[var(--shadow-sm)] transition-all duration-400",
        "hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
