"use client"

import Link from "next/link"

import { Aurora } from "@/components/fx/aurora"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export interface ProductHeroStat {
  value: string
  label: string
}

interface ProductHeroProps {
  locale: Locale
  eyebrow: string
  title: string
  /** Gradient-highlighted trailing fragment of the headline. */
  titleAccent?: string
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  stats?: ProductHeroStat[]
}

export function ProductHero({
  locale,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
}: ProductHeroProps) {
  const isRTL = locale === "fa"

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-16 lg:px-8 lg:pt-40 lg:pb-24">
      <Aurora intensity="subtle" />
      <div aria-hidden className="mesh-hero pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <h1
          className={cn(
            "mt-6 text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          <TextReveal text={title} as="span" />
          {titleAccent && (
            <>
              {" "}
              <span className="text-gradient animate-gradient-text">{titleAccent}</span>
            </>
          )}
        </h1>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              href={localizePathname(primaryCta.href, locale)}
              size="pill"
              variant="brand"
              isRTL={isRTL}
            >
              {primaryCta.label}
            </MagneticButton>
            {secondaryCta && (
              <Button asChild variant="glass" size="pill">
                <Link href={localizePathname(secondaryCta.href, locale)}>
                  {secondaryCta.label}
                </Link>
              </Button>
            )}
          </div>
        </Reveal>

        {stats && stats.length > 0 && (
          <Reveal delay={0.2}>
            <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl px-4 py-5 text-center"
                >
                  <dt className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  )
}
