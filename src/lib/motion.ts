import type { Variants } from "framer-motion"

/** Signature easing curves for the whole motion language. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const

/** Cinematic reveal — used for blocks entering the viewport. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_QUINT },
  },
}

/** Container that staggers its children. */
export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
}

/** A single line inside a clip-masked heading reveal. */
export const lineReveal: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
}

/** A single word for word-by-word reveals. */
export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
}

export const springSoft = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 } as const
export const springSnappy = { type: "spring", stiffness: 400, damping: 30 } as const
