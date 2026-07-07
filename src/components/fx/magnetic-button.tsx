"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/fx/magnetic"
import { cn } from "@/lib/utils"

type Variant = ComponentProps<typeof Button>["variant"]
type Size = ComponentProps<typeof Button>["size"]

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  isRTL?: boolean
  withArrow?: boolean
  type?: "button" | "submit"
  disabled?: boolean
}

/**
 * The site's primary call to action: a magnetic pill with a directional arrow
 * that nudges on hover. Renders as a link or a button depending on props.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "acid",
  size = "pill",
  className,
  isRTL = false,
  withArrow = true,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <Arrow
          weight="bold"
          className={cn(
            "relative z-10 transition-transform duration-300",
            isRTL
              ? "group-hover/button:-translate-x-1"
              : "group-hover/button:translate-x-1",
          )}
        />
      )}
      {variant === "acid" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/button:translate-x-full"
        />
      )}
    </>
  )

  return (
    <Magnetic strength={0.4} className="inline-flex">
      {href ? (
        <Button asChild variant={variant} size={size} className={className}>
          <Link href={href} onClick={onClick}>
            {inner}
          </Link>
        </Button>
      ) : (
        <Button
          type={type}
          onClick={onClick}
          variant={variant}
          size={size}
          className={className}
          disabled={disabled}
        >
          {inner}
        </Button>
      )}
    </Magnetic>
  )
}
