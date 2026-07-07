"use client"

import { useRef, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}

/**
 * A layered glass surface that tilts toward the pointer in 3D and casts a moving
 * specular highlight. The core primitive of the new card system — depth and
 * perspective instead of flat rounded rectangles.
 */
export function TiltCard({ children, className, max = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  })
  const glareBg = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, oklch(0.9 0.22 128 / 0.12), transparent 60%)`,
  )

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return
    const rect = ref.current!.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  function onLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn(
        "group/tilt relative overflow-hidden rounded-3xl border border-white/10 glass",
        "transition-colors duration-500 hover:border-white/20",
        className,
      )}
    >
      <div style={{ transform: "translateZ(40px)" }} className="relative h-full">
        {children}
      </div>
      {glare && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
