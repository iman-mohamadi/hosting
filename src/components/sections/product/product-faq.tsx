"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"

export interface FaqItem {
  question: string
  answer: string
}

export function ProductFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <Reveal key={item.question} delay={(i % 4) * 0.04}>
            <div
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors",
                isOpen ? "border-primary/30 bg-card shadow-[var(--shadow-sm)]" : "border-border bg-card",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-foreground">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-300",
                    isOpen && "rotate-45 bg-primary/10",
                  )}
                >
                  <Plus weight="bold" className="size-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
