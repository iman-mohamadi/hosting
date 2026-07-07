"use client"

import Link from "next/link"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { useRef } from "react"

import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Reveal: blur + rise on scroll into view ─────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
  as = "div",
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: "div" | "span" | "li"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-72px" })
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1, ease: EASE, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/* ── Line-mask reveal: text rises out from behind a clip edge ────────── */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-64px" })

  return (
    <span
      ref={ref}
      className={cn("block overflow-hidden", className)}
      style={{ clipPath: "inset(-20% -20% -20% -20%)" }}
    >
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : undefined}
        transition={{ duration: 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* ── Magnetic: element drifts toward the cursor, springs back ────────── */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  function onMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  )
}

/* ── MagneticLink: an anchor with a magnetic label + arrow ───────────── */
export function MagneticLink({
  href,
  children,
  className,
  strength = 0.3,
}: {
  href: string
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  return (
    <Magnetic strength={strength}>
      <Link href={href} className={className} data-cursor="hover">
        {children}
      </Link>
    </Magnetic>
  )
}
