import { cn } from "@/lib/utils"

interface MarqueeProps {
  items: string[]
  className?: string
  itemClassName?: string
  separator?: React.ReactNode
  slow?: boolean
}

/**
 * Seamless infinite marquee. The animated track holds two identical sequences
 * and translates -50%, so the loop is invisible. Pauses on hover.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator,
  slow = false,
}: MarqueeProps) {
  const sequence = items.map((item, i) => (
    <span
      key={`${item}-${i}`}
      className={cn(
        "flex items-center gap-10 whitespace-nowrap pe-10",
        itemClassName,
      )}
    >
      {item}
      {separator ?? (
        <span aria-hidden className="text-signal/60">
          &#9670;
        </span>
      )}
    </span>
  ))

  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden",
        "hover:[&_.marquee-track]:[animation-play-state:paused]",
        className,
      )}
    >
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{
          animation: `var(${slow ? "--animate-marquee-slow" : "--animate-marquee"})`,
        }}
      >
        {sequence}
        <div aria-hidden className="flex items-center">
          {sequence}
        </div>
      </div>
    </div>
  )
}
