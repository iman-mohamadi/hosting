"use client"

import Link from "next/link"
import { Check } from "@phosphor-icons/react"

import type { PricingPlan } from "@/actions"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/fx/reveal"
import { TiltCard } from "@/components/fx/tilt-card"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

interface PricingCardsProps {
  plans: PricingPlan[]
  locale: Locale
  section_title: string
  recommended_badge: string
  per_month: string
}

const SPEC_LABELS = {
  en: { cpu: "vCPU", ram: "RAM", nvme: "NVMe", bw: "Transfer" },
  fa: { cpu: "vCPU", ram: "RAM", nvme: "NVMe", bw: "ترافیک" },
}

function PlanCard({
  plan,
  locale,
  recommended_badge,
  per_month,
  index,
}: {
  plan: PricingPlan
  locale: Locale
  recommended_badge: string
  per_month: string
  index: number
}) {
  const isRTL = locale === "fa"
  const specs = isRTL ? SPEC_LABELS.fa : SPEC_LABELS.en

  const specItems = [
    { label: specs.cpu, value: plan.cpu_cores },
    { label: specs.ram, value: `${plan.ram_gb} GB` },
    { label: specs.nvme, value: `${plan.storage_nvme} GB` },
    { label: specs.bw, value: `${plan.bandwidth_tb} TB` },
  ]

  return (
    <Reveal delay={index * 0.08} y={50} className="h-full">
      <TiltCard
        max={5}
        className={cn(
          "h-full p-8 md:p-9",
          plan.is_recommended &&
            "border-acid/40 shadow-[0_0_60px_-20px_oklch(0.9_0.22_128/0.5)]",
        )}
      >
        {plan.is_recommended && (
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid to-transparent"
          />
        )}

        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h3
                className={cn(
                  "text-xl font-semibold tracking-tight text-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {plan.plan_name}
              </h3>
              <p
                className={cn(
                  "max-w-[16rem] text-sm leading-relaxed text-muted-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {plan.plan_description}
              </p>
            </div>
            {plan.is_recommended && (
              <span className="shrink-0 rounded-full bg-acid px-3 py-1 font-mono text-[0.6rem] font-semibold tracking-widest text-acid-foreground uppercase">
                {recommended_badge}
              </span>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl font-bold tracking-tighter text-foreground">
                {plan.price_display}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {per_month}
              </span>
            </div>
          </div>

          {/* spec strip */}
          <div className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            {specItems.map((s) => (
              <div key={s.label} className="bg-white/[0.01] p-4">
                <p className="font-mono text-[0.6rem] tracking-[0.15em] text-muted-foreground uppercase">
                  {s.label}
                </p>
                <p
                  className={cn(
                    "mt-1 text-lg font-semibold tabular-nums text-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <ul className="mb-10 flex-1 space-y-3">
            {plan.features_list.map((feature) => (
              <li
                key={feature}
                className={cn(
                  "flex items-start gap-3 text-sm text-muted-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                <Check
                  weight="bold"
                  className="mt-0.5 size-4 shrink-0 text-acid"
                  aria-hidden
                />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            asChild
            variant={plan.is_recommended ? "acid" : "glass"}
            size="pill"
            className="w-full justify-center"
          >
            <Link href={localizePathname("/#configurator", locale)}>
              {plan.cta_label}
            </Link>
          </Button>
        </div>
      </TiltCard>
    </Reveal>
  )
}

export function PricingCards({
  plans,
  locale,
  section_title,
  recommended_badge,
  per_month,
}: PricingCardsProps) {
  const isRTL = locale === "fa"
  return (
    <section id="plans" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <h2
            className={cn(
              "mb-14 font-mono text-xs tracking-[0.3em] text-acid uppercase",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {section_title}
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.plan_id}
              plan={plan}
              locale={locale}
              recommended_badge={recommended_badge}
              per_month={per_month}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
