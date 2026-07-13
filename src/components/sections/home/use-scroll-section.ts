"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface ScrollSectionOptions {
  start?: string
  end?: string
  scrub?: boolean
  onEnter?: () => void
}

/**
 * Lightweight ScrollTrigger bridge for section-driven animations.
 */
export function useScrollSection({
  start = "top 70%",
  end = "bottom 30%",
  scrub = false,
  onEnter,
}: ScrollSectionOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(reduced ? 1 : 0)
  const [entered, setEntered] = useState(reduced)

  useEffect(() => {
    // Initial state already reflects reduced motion (progress 1, entered true).
    if (reduced) return

    let cleanup: (() => void) | undefined

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)
        const el = ref.current
        if (!el) return

        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: el,
            start,
            end: scrub ? end : undefined,
            scrub: scrub || false,
            onEnter: () => {
              setEntered(true)
              onEnter?.()
            },
            onUpdate: scrub
              ? (self) => setProgress(self.progress)
              : undefined,
          })
        }, el)

        cleanup = () => ctx.revert()
      },
    )

    return () => cleanup?.()
  }, [reduced, start, end, scrub, onEnter])

  return { ref, progress, entered }
}
