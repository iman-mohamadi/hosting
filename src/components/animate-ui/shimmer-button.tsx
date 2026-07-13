"use client"

import Link from "next/link"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ShimmerButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
}

export function ShimmerButton({
  children,
  href,
  onClick,
  className,
  type = "button",
  disabled,
}: ShimmerButtonProps) {
  const reduced = useReducedMotion()

  const classes = cn(
    "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-brand px-8 text-sm font-semibold text-white",
    "shadow-[var(--shadow-glow)]",
    "transition-[transform,filter] duration-300 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    className,
  )

  const shimmer = !reduced && (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%)] transition-transform duration-[1.4s] ease-out group-hover:translate-x-full"
    />
  )

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {shimmer}
        <span className="relative z-10">{children}</span>
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {shimmer}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
