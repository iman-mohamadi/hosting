import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { Reveal } from "@/components/fx/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface SectionShellProps {
  locale: Locale
  eyebrow?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  muted?: boolean
}

/** Standard marketing section: centered heading + content, generous rhythm. */
export function SectionShell({
  locale,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  muted,
}: SectionShellProps) {
  const isRTL = locale === "fa"
  return (
    <section
      className={cn(
        "border-t border-border px-6 py-20 lg:px-8 lg:py-28",
        muted && "bg-muted/30",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h2
              className={cn(
                "mt-5 text-[clamp(1.8rem,4vw,2.75rem)] font-semibold tracking-tight",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {title}
            </h2>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}

export interface RelatedLink {
  label: string
  href: string
}

/** Horizontal strip of related product links shown near the page bottom. */
export function RelatedLinks({
  locale,
  title,
  links,
}: {
  locale: Locale
  title: string
  links: RelatedLink[]
}) {
  return (
    <div>
      <p className="mb-5 text-center text-sm font-medium text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={localizePathname(link.href, locale)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80 shadow-[var(--shadow-sm)] transition-colors hover:border-primary/30 hover:text-foreground"
          >
            {link.label}
            <ArrowRight
              weight="bold"
              className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
