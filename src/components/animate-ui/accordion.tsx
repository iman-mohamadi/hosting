"use client"

import { createContext, useContext, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_OUT_EXPO } from "@/lib/motion"

interface AccordionContextValue {
  openId: string | null
  setOpenId: (id: string | null) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

interface AccordionProps {
  children: React.ReactNode
  className?: string
  defaultValue?: string | null
}

export function Accordion({
  children,
  className,
  defaultValue = null,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultValue)

  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className={cn("divide-y divide-border", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function AccordionItem({
  id,
  title,
  children,
  className,
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext)
  const reduced = useReducedMotion()
  if (!ctx) throw new Error("AccordionItem must be used within Accordion")

  const isOpen = ctx.openId === id

  return (
    <div className={cn("py-6", className)}>
      <button
        type="button"
        onClick={() => ctx.setOpenId(isOpen ? null : id)}
        className="flex w-full items-start justify-between gap-6 text-start"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-foreground">{title}</span>
        <motion.span
          aria-hidden
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT_EXPO }}
          className="mt-1 font-mono text-sm text-muted-foreground"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-base leading-relaxed text-muted-foreground">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
