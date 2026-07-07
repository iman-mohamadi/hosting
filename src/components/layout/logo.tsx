import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface LogoProps {
  locale: Locale
  className?: string
  markClassName?: string
}

/**
 * The wordmark: a custom "signal aperture" glyph paired with the name. The mark
 * is a set of concentric strokes — infrastructure emitting signal — with the
 * innermost node in the brand's acid accent.
 */
export function Logo({ locale, className, markClassName }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={cn("size-5", markClassName)}
      >
        <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="2.6" fill="var(--acid)" />
      </svg>
      <span className={locale === "fa" ? "font-[family-name:var(--font-vazirmatn)]" : undefined}>
        {locale === "fa" ? "هاستینگ" : "Hosting"}
      </span>
    </span>
  )
}
