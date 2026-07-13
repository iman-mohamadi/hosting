"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

interface ArrowButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  isRTL?: boolean
  variant?: "ghost" | "outline"
}

export function ArrowButton({
  children,
  href,
  onClick,
  className,
  isRTL = false,
  variant = "ghost",
}: ArrowButtonProps) {
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const classes = cn(
    "group inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors",
    variant === "ghost" &&
      "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
    variant === "outline" &&
      "border border-border text-foreground hover:border-primary/40 hover:bg-muted/40",
    className,
  )

  const inner = (
    <>
      <span>{children}</span>
      <Arrow
        weight="bold"
        className={cn(
          "size-4 transition-transform duration-300",
          isRTL
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5",
        )}
      />
    </>
  )

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  )
}
