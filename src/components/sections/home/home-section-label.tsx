"use client"

import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

interface HomeSectionLabelProps {
  children: React.ReactNode
  className?: string
  index?: string
}

export function HomeSectionLabel({
  children,
  className,
  index,
}: HomeSectionLabelProps) {
  return (
    <Eyebrow index={index} className={cn(className)}>
      {children}
    </Eyebrow>
  )
}
