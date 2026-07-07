import { Reveal, TextReveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  locale: Locale
  align?: "left" | "center"
  children?: React.ReactNode
}

/**
 * The shared editorial header for every secondary page: clears the floating
 * nav, lays an acid halo + grid behind an oversized kinetic title, and keeps
 * spacing luxuriously generous.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  locale,
  align = "left",
  children,
}: PageHeaderProps) {
  const isRTL = locale === "fa"

  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,oklch(0.88_0.21_128/0.1),transparent)]"
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30 mask-b" />

      <div
        className={cn(
          "mx-auto max-w-7xl px-6 pt-40 pb-16 lg:px-8 lg:pt-52 lg:pb-24",
          align === "center" && "text-center",
        )}
      >
        <Reveal>
          <p
            className={cn(
              "mb-8 font-mono text-xs tracking-[0.3em] text-acid uppercase",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {eyebrow}
          </p>
        </Reveal>

        <h1
          className={cn(
            "text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-tight text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.1]",
            align === "center" && "mx-auto",
          )}
        >
          <TextReveal text={title} delay={0.05} />
        </h1>

        {subtitle && (
          <Reveal delay={0.15}>
            <p
              className={cn(
                "mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
                align === "center" && "mx-auto",
              )}
            >
              {subtitle}
            </p>
          </Reveal>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  )
}
