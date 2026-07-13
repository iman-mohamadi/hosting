"use client"

import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { springSoft } from "@/lib/motion"

interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface DockProps {
  items: DockItem[]
  activeId?: string
  className?: string
  onSelect?: (id: string) => void
}

export function Dock({ items, activeId, className, onSelect }: DockProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className={cn(
        "inline-flex items-end gap-2 rounded-2xl border border-border bg-background/70 p-2 backdrop-blur-xl",
        className,
      )}
      role="toolbar"
    >
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            whileHover={reduced ? undefined : { y: -6, scale: 1.08 }}
            transition={springSoft}
            className={cn(
              "relative flex size-12 flex-col items-center justify-center rounded-xl border transition-colors",
              active
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-transparent bg-muted/40 text-muted-foreground hover:text-foreground",
            )}
            aria-label={item.label}
            aria-pressed={active}
            title={item.label}
          >
            {item.icon}
            {active && (
              <span
                aria-hidden
                className="absolute -bottom-1 size-1 rounded-full bg-primary"
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
