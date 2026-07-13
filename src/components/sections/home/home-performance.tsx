"use client"

import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { BRAND } from "@/lib/brand"
import { cn } from "@/lib/utils"

import { HomeSectionLabel } from "./home-section-label"
import { useScrollSection } from "./use-scroll-section"

const COPY = {
  en: {
    index: "04",
    label: "Speed",
    title: "Provisioned in minutes.",
    typical: "Manual setup",
    typical_value: "45m",
    hosting: BRAND.name_en,
    hosting_value: "5m",
    note: "Median time from payment confirmation to Running on Tehran NVMe hosts.",
  },
  fa: {
    index: "۰۴",
    label: "سرعت",
    title: "آماده در چند دقیقه.",
    typical: "راه‌اندازی دستی",
    typical_value: "۴۵د",
    hosting: BRAND.name_fa,
    hosting_value: "۵د",
    note: "میانه زمان از تأیید پرداخت تا وضعیت Running روی میزبان‌های NVMe تهران.",
  },
}

export function HomePerformance({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"
  const { ref, entered } = useScrollSection({
    start: "top 65%",
  })

  return (
    <section
      ref={ref}
      className="border-y border-border bg-[#f0f0ec] py-32 lg:py-44"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>
        </Reveal>
        <h2
          className={cn(
            "mt-6 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          <TextReveal text={copy.title} as="span" />
        </h2>

        <div className="mt-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {copy.typical}
              </p>
              <p
                className={cn(
                  "mt-3 font-mono text-5xl font-medium tracking-tight text-muted-foreground/60 transition-all duration-1000 md:text-7xl",
                  entered && "opacity-100",
                )}
              >
                {copy.typical_value}
              </p>
            </div>
            <div className="text-end">
              <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase">
                {copy.hosting}
              </p>
              <p
                className={cn(
                  "mt-3 font-mono text-5xl font-medium tracking-tight text-foreground transition-all duration-1000 md:text-7xl",
                  entered && "text-primary",
                )}
              >
                {copy.hosting_value}
              </p>
            </div>
          </div>

          <div className="relative mt-10 h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="absolute inset-y-0 start-0 rounded-full bg-muted-foreground/30 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: entered ? "100%" : "0%" }}
            />
            <div
              className="absolute inset-y-0 start-0 rounded-full bg-primary transition-all duration-[1.2s] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: entered ? "11%" : "0%" }}
            />
          </div>

          <div className="mt-4 flex justify-between font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            <span>0m</span>
            <span>45m</span>
          </div>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-sm text-muted-foreground">{copy.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
