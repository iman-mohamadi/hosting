import { Aurora } from "@/components/fx/aurora"
import { Eyebrow } from "@/components/ui/eyebrow"
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

/** Shared editorial header for secondary marketing pages. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  locale,
  align = "left",
  children,
}: PageHeaderProps) {
  const isRTL = locale === "fa"
  const lines = title.split("\n")
  const leadLines = lines.slice(0, -1)
  const gradientLine = lines[lines.length - 1]

  return (
    <header className="relative overflow-hidden">
      <Aurora intensity="subtle" className="opacity-60" />
      <div
        aria-hidden
        className="mesh pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-40 [mask-image:radial-gradient(60%_70%_at_30%_0%,black,transparent)]"
      />
      <div
        className={cn(
          "relative mx-auto max-w-7xl px-6 pt-40 pb-16 lg:px-8 lg:pt-52 lg:pb-24",
          align === "center" && "text-center",
        )}
      >
        <Reveal>
          <div className={cn(align === "center" && "flex justify-center")}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        </Reveal>

        <h1
          className={cn(
            "mt-8 text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] font-semibold tracking-tight text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.1]",
            align === "center" && "mx-auto",
          )}
        >
          {leadLines.map((line, i) => (
            <TextReveal key={i} text={line} as="span" />
          ))}
          <TextReveal
            text={gradientLine}
            as="span"
            wordClassName="text-gradient"
          />
        </h1>

        {subtitle && (
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground",
                align === "center" && "mx-auto",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
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
