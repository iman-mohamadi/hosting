"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_OUT_EXPO } from "@/lib/motion"

interface PreloaderProps {
  label: string
  isRTL: boolean
}

/**
 * A one-shot cinematic intro: a counter races to 100 while the wordmark holds,
 * then the curtain lifts to reveal the hero. Shown once per session so repeat
 * navigation stays instant.
 */
export function Preloader({ label, isRTL }: PreloaderProps) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (reduced) return
    if (sessionStorage.getItem("intro_seen")) return

    setActive(true)
    document.documentElement.classList.add("lenis-stopped")

    const start = performance.now()
    const DURATION = 1900
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      // ease-out for a decelerating counter
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(step)
      } else {
        window.setTimeout(() => {
          sessionStorage.setItem("intro_seen", "1")
          document.documentElement.classList.remove("lenis-stopped")
          setActive(false)
        }, 420)
      }
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove("lenis-stopped")
    }
  }, [reduced])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#040605]"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        >
          <div className="relative overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
              className={cn(
                "block text-4xl font-semibold tracking-tight text-foreground sm:text-6xl",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {label}
            </motion.span>
          </div>

          <div
            aria-hidden
            className="mt-6 h-px w-40 origin-left overflow-hidden bg-white/10"
          >
            <motion.div
              className="h-full w-full bg-acid"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: "linear" }}
              style={{ originX: 0 }}
            />
          </div>

          <span className="absolute bottom-8 font-mono text-xs tabular-nums tracking-[0.3em] text-muted-foreground ltr:right-8 rtl:left-8">
            {String(count).padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
