"use client"

import Link from "next/link"

import { ArrowButton } from "@/components/animate-ui/arrow-button"
import { BentoGrid, BentoItem } from "@/components/animate-ui/bento-grid"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import {
  format_vps_price,
  get_plan_monthly_price,
  type PlanPresetId,
} from "@/lib/vps-pricing"
import { cn } from "@/lib/utils"

import { HomeSectionLabel } from "./home-section-label"

const TIERS: {
  plan_id: PlanPresetId
  name: { en: string; fa: string }
  desc: { en: string; fa: string }
  features: { en: string[]; fa: string[] }
  recommended?: boolean
}[] = [
  {
    plan_id: "starter",
    name: { en: "Starter", fa: "شروع" },
    desc: {
      en: "For side projects and early products.",
      fa: "برای پروژه‌های جانبی و محصولات اولیه.",
    },
    features: {
      en: ["1 vCPU", "2 GB RAM", "40 GB NVMe"],
      fa: ["۱ هسته", "۲ گیگ RAM", "۴۰ گیگ NVMe"],
    },
  },
  {
    plan_id: "growth",
    name: { en: "Pro", fa: "حرفه‌ای" },
    desc: {
      en: "For teams shipping production workloads.",
      fa: "برای تیم‌هایی که بار تولیدی دارند.",
    },
    features: {
      en: ["4 vCPU", "8 GB RAM", "160 GB NVMe"],
      fa: ["۴ هسته", "۸ گیگ RAM", "۱۶۰ گیگ NVMe"],
    },
    recommended: true,
  },
  {
    plan_id: "scale",
    name: { en: "Enterprise", fa: "سازمانی" },
    desc: {
      en: "For high-throughput, mission-critical systems.",
      fa: "برای سیستم‌های پرترافیک و حیاتی.",
    },
    features: {
      en: ["8 vCPU", "32 GB RAM", "512 GB NVMe"],
      fa: ["۸ هسته", "۳۲ گیگ RAM", "۵۱۲ گیگ NVMe"],
    },
  },
]

const COPY = {
  en: {
    index: "05",
    label: "Pricing",
    title: "Clear. From day one.",
    per_month: "/ mo",
    view: "View plans",
    all: "Compare all plans",
  },
  fa: {
    index: "۰۵",
    label: "قیمت‌گذاری",
    title: "شفاف. از روز اول.",
    per_month: "/ ماه",
    view: "مشاهده پلن‌ها",
    all: "مقایسه همه پلن‌ها",
  },
}

export function HomePricingTeaser({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"

  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>
            </Reveal>
            <h2
              className={cn(
                "mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              <TextReveal text={copy.title} as="span" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Link
              href={localizePathname("/pricing", locale)}
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {copy.all}
            </Link>
          </Reveal>
        </div>

        <BentoGrid className="mt-14">
          {TIERS.map((tier, i) => {
            const price = get_plan_monthly_price(tier.plan_id)
            return (
              <Reveal key={tier.plan_id} delay={0.06 * i}>
                <BentoItem
                  className={cn(
                    tier.recommended &&
                      "gradient-ring shadow-glow md:-translate-y-2",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold">{tier.name[locale]}</h3>
                    {tier.recommended && (
                      <span className="bg-brand rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase shadow-[var(--shadow-sm)]">
                        {locale === "fa" ? "محبوب" : "Popular"}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {tier.desc[locale]}
                  </p>
                  <p
                    className={cn(
                      "mt-8 font-mono text-3xl font-medium tracking-tight tabular-nums",
                      tier.recommended && "text-gradient",
                    )}
                  >
                    {format_vps_price(price, locale)}
                    <span className="text-sm font-normal text-muted-foreground">
                      {copy.per_month}
                    </span>
                  </p>
                  <ul className="mt-6 space-y-2">
                    {tier.features[locale].map((f) => (
                      <li
                        key={f}
                        className="font-mono text-xs tracking-wide text-muted-foreground"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8 opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                    <ArrowButton
                      href={localizePathname("/pricing", locale)}
                      isRTL={isRTL}
                      variant="outline"
                      className="h-10 px-4 text-xs"
                    >
                      {copy.view}
                    </ArrowButton>
                  </div>
                </BentoItem>
              </Reveal>
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
