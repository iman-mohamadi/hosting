"use client"

import { useRef, type ElementType, type ReactNode } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"
import {
  EASE_OUT_EXPO,
  EASE_OUT_QUINT,
  lineReveal,
  staggerContainer,
  wordReveal,
} from "@/lib/motion"

/* ── Reveal: a block that rises + de-blurs into view ──────────────── */

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  as?: ElementType
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  once = true,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "-12% 0px" })
  const reduced = useReducedMotion()
  const MotionTag = motion[as as "div"] ?? motion.div

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, ease: EASE_OUT_QUINT, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/* ── TextReveal: word-by-word clip-mask reveal for headings ───────── */

interface TextRevealProps {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  once?: boolean
  as?: ElementType
  stagger?: number
}

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  once = true,
  as = "span",
  stagger = 0.06,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: "-8% 0px" })
  const reduced = useReducedMotion()
  const lines = text.split("\n")
  const Tag = as as "span"

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag className={className}>
      <motion.span
        ref={ref}
        variants={staggerContainer(stagger, delay)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="block"
      >
        {lines.map((line, li) => (
          <span key={li} className="block overflow-hidden pb-[0.12em]">
            {line.split(" ").map((word, wi) => (
              <span
                key={wi}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  variants={wordReveal}
                  className={cn("inline-block", wordClassName)}
                >
                  {word}
                </motion.span>
                {wi < line.split(" ").length - 1 && "\u00A0"}
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/* ── Lines: masked line-by-line reveal (no word splitting) ────────── */

export function LinesReveal({
  lines,
  className,
  lineClassName,
  once = true,
  stagger = 0.12,
  delay = 0,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  once?: boolean
  stagger?: number
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: "-8% 0px" })
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((l, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {l}
          </span>
        ))}
      </span>
    )
  }

  return (
    <motion.span
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            variants={lineReveal}
            className={cn("block", lineClassName)}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ── Parallax: scroll-linked translate for layered depth ──────────── */

export function Parallax({
  children,
  className,
  distance = 80,
  as = "div",
}: {
  children: ReactNode
  className?: string
  distance?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [distance, -distance],
  )
  const MotionTag = motion[as as "div"] ?? motion.div

  return (
    <MotionTag ref={ref} style={{ y }} className={className}>
      {children}
    </MotionTag>
  )
}

export { EASE_OUT_EXPO }
