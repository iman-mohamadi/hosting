"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/** A hairline acid progress bar pinned to the top edge, tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-acid via-aurora-2 to-aurora-3"
    />
  )
}
