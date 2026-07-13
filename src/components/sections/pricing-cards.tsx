"use client"

import { useState } from "react"

import type { PricingPlan } from "@/actions"
import { BillingToggle } from "@/components/animate-ui/billing-toggle"
import { MagicCard } from "@/components/animate-ui/magic-card"
import { ShimmerButton } from "@/components/animate-ui/shimmer-button"
import { ArrowButton } from "@/components/animate-ui/arrow-button"
import { Reveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_vps_price } from "@/lib/vps-pricing"

interface PricingCardsProps {
  plans: PricingPlan[]
  locale: Locale
  section_title: string
  recommended_badge: string
  per_month: string
}

const ANNUAL_DISCOUNT = 0.85

export function PricingCards({
  plans,
  locale,
  section_title,
  recommended_badge,
  per_month,
}: PricingCardsProps) {
  const isRTL = locale === "fa"
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")

  const perLabel =
    billing === "annual"
      ? locale === "fa"
        ? "/ ماه · سالانه"
        : "/ mo · billed yearly"
      : per_month

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <Reveal>
        <h2 className="sr-only">{section_title}</h2>
      </Reveal>

      <Reveal>
        <div className="mb-12 flex justify-center">
          <BillingToggle
            value={billing}
            onChange={setBilling}
            monthlyLabel={locale === "fa" ? "ماهانه" : "Monthly"}
            annualLabel={locale === "fa" ? "سالانه" : "Annual"}
            saveLabel={locale === "fa" ? "۱۵٪-" : "Save 15%"}
          />
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan, index) => {
          const isScale =
            plan.plan_id === "scale" || plan.plan_id === "enterprise"
          const href = isScale
            ? localizePathname("/contact", locale)
            : localizePathname(`/configure?plan=${plan.plan_id}`, locale)

          const displayPrice =
            billing === "annual"
              ? format_vps_price(
                  Math.round(plan.monthly_price * ANNUAL_DISCOUNT),
                  locale,
                )
              : plan.price_display

          const body = (
            <>
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {plan.plan_name}
                  </h3>
                  <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                    {plan.plan_description}
                  </p>
                </div>
                {plan.is_recommended && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 font-mono text-[0.6rem] font-semibold tracking-widest text-primary uppercase">
                    {recommended_badge}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-5xl font-medium tracking-tighter">
                    {displayPrice}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {perLabel}
                  </span>
                </div>
              </div>

              <dl className="mb-8 grid grid-cols-2 gap-4 border-y border-border py-6">
                {[
                  { label: "vCPU", value: plan.cpu_cores },
                  { label: "RAM", value: `${plan.ram_gb} GB` },
                  { label: "NVMe", value: `${plan.storage_nvme} GB` },
                  {
                    label: locale === "fa" ? "ترافیک" : "Transfer",
                    value: `${plan.bandwidth_tb} TB`,
                  },
                ].map((spec) => (
                  <div key={spec.label}>
                    <dt className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mb-10 flex-1 space-y-3">
                {plan.features_list.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.is_recommended ? (
                <ShimmerButton href={href} className="w-full">
                  {plan.cta_label}
                </ShimmerButton>
              ) : (
                <ArrowButton
                  href={href}
                  isRTL={isRTL}
                  variant="outline"
                  className="w-full justify-center"
                >
                  {plan.cta_label}
                </ArrowButton>
              )}
            </>
          )

          return (
            <Reveal key={plan.plan_id} delay={index * 0.08} className="h-full">
              {plan.is_recommended ? (
                <MagicCard className="flex h-full flex-col">{body}</MagicCard>
              ) : (
                <article
                  className={cn(
                    "sheen relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-card p-8 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)] md:p-9",
                  )}
                >
                  {body}
                </article>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
