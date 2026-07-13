"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { springSnappy } from "@/lib/motion"

interface BillingToggleProps {
  value: "monthly" | "annual"
  onChange: (value: "monthly" | "annual") => void
  monthlyLabel: string
  annualLabel: string
  saveLabel?: string
  className?: string
}

export function BillingToggle({
  value,
  onChange,
  monthlyLabel,
  annualLabel,
  saveLabel,
  className,
}: BillingToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-border bg-muted/40 p-1",
        className,
      )}
      role="group"
      aria-label="Billing period"
    >
      {(
        [
          { id: "monthly" as const, label: monthlyLabel },
          { id: "annual" as const, label: annualLabel },
        ] as const
      ).map((option) => {
        const active = value === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="billing-toggle"
                className="absolute inset-0 rounded-full bg-primary"
                transition={springSnappy}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {option.label}
              {option.id === "annual" && saveLabel && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[10px] tracking-wide uppercase",
                    active
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {saveLabel}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
