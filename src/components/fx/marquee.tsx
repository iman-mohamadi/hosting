import { cn } from "@/lib/utils"

interface MarqueeProps {
  items: string[]
  className?: string
  reverse?: boolean
  separator?: string
}

/**
 * A seamless CSS marquee. The track renders its items twice and translates
 * -50%, so the loop is continuous with zero JS. Edge-masked for a premium fade.
 */
export function Marquee({
  items,
  className,
  reverse = false,
  separator = "✦",
}: MarqueeProps) {
  const sequence = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10 pe-10">
          <span className="whitespace-nowrap">{item}</span>
          <span aria-hidden className="text-acid/60">
            {separator}
          </span>
        </span>
      ))}
    </>
  )

  return (
    <div className={cn("mask-x flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {sequence}
        <span aria-hidden className="flex items-center">
          {sequence}
        </span>
      </div>
    </div>
  )
}
