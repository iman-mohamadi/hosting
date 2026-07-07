"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

/**
 * Bespoke two-part cursor: an instant precision dot plus a lagging ring that
 * reacts to interactive targets. Disabled for touch, coarse pointers, and
 * reduced-motion users so the native cursor stays intact.
 */
export function CursorProvider() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || reduced.matches) return

    setEnabled(true)
    document.documentElement.classList.add("has-custom-cursor")

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement | null
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, [data-cursor='hover']",
      )
      setHovering(Boolean(interactive))
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
        style={{ x, y }}
        animate={{
          width: down ? 9 : 6,
          height: down ? 9 : 6,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        initial={false}
      />

      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          borderColor: hovering
            ? "color-mix(in oklch, var(--signal) 90%, transparent)"
            : "color-mix(in oklch, var(--foreground) 30%, transparent)",
          backgroundColor: hovering
            ? "color-mix(in oklch, var(--signal) 12%, transparent)"
            : "transparent",
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </div>
  )
}
