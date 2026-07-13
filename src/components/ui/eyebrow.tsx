import { cn } from "@/lib/utils"

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  /** Optional leading index like "01". */
  index?: string
  /** Show the pulsing brand dot. */
  dot?: boolean
}

/**
 * Glossy pill label used above section/page headings.
 * A frosted gradient-ringed chip with a soft brand dot.
 */
export function Eyebrow({ children, className, index, dot = true }: EyebrowProps) {
  return (
    <span
      className={cn(
        "gradient-ring-soft inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground/70 shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
          <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
        </span>
      )}
      {index && (
        <span className="font-mono text-[10px] tracking-[0.3em] text-primary/70">
          {index}
        </span>
      )}
      <span className="uppercase tracking-[0.18em]">{children}</span>
    </span>
  )
}
