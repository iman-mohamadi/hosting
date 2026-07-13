import type { ReactNode } from "react"

interface MagneticProps {
  children: ReactNode
  /** Retained for API compatibility; no longer applies a pointer-follow effect. */
  strength?: number
  className?: string
}

/**
 * Static wrapper. The old pointer-follow "magnetic" effect was removed in favour
 * of calm, Apple-style interactions; hover states now live on the elements
 * themselves. Kept as a thin passthrough so call sites stay unchanged.
 */
export function Magnetic({ children, className }: MagneticProps) {
  if (!className) return <>{children}</>
  return <span className={className}>{children}</span>
}
