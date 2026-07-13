"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Moon, Sun } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { springSnappy } from "@/lib/motion"

interface ThemeToggleProps {
  className?: string
  labels?: { light: string; dark: string }
}

function subscribe() {
  return () => {}
}

export function ThemeToggle({
  className,
  labels = { light: "Light", dark: "Dark" },
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const reduced = useReducedMotion()

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex size-10 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-muted/60",
        className,
      )}
      aria-label={isDark ? labels.light : labels.dark}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={reduced ? false : { opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, rotate: 40, scale: 0.6 }}
          transition={springSnappy}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon weight="bold" className="size-4" />
          ) : (
            <Sun weight="bold" className="size-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
