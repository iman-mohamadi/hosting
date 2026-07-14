"use client"

import { useRouter } from "next/navigation"

import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { CheckItem } from "@/components/sections/product/plan-table"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import {
  format_toman,
  pick,
  service_term_label,
  type ServicePlan,
} from "@/lib/catalog"
import { use_cart_store, type CartItem } from "@/store/use_cart_store"
import { cn } from "@/lib/utils"

interface ServicePlanTableProps {
  locale: Locale
  plans: ServicePlan[]
  /** Prefix used in the cart line title, e.g. "گواهی SSL". */
  titlePrefix: { fa: string; en: string }
  addLabel: string
  recommendedLabel: string
}

export function ServicePlanTable({
  locale,
  plans,
  titlePrefix,
  addLabel,
  recommendedLabel,
}: ServicePlanTableProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const add_item = use_cart_store((s) => s.add_item)

  function handle_add(plan: ServicePlan) {
    const item: CartItem = {
      key: `service:${plan.plan_id}`,
      kind: "service",
      title: { fa: `${titlePrefix.fa} ${plan.name.fa}`, en: `${titlePrefix.en} ${plan.name.en}` },
      subtitle: plan.tagline,
      fixed_term:
        plan.term === "annual"
          ? { fa: "اشتراک یک‌ساله", en: "1 year" }
          : { fa: "اشتراک ماهانه", en: "Monthly" },
      period: "monthly",
      monthly_price: plan.price,
      quantity: 1,
    }
    add_item(item)
    router.push(localizePathname("/cart", locale))
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, i) => {
        const term = pick(service_term_label(plan.term), locale)
        return (
          <Reveal key={plan.plan_id} delay={(i % 3) * 0.06}>
            <div
              className={cn(
                "card-glossy relative flex h-full flex-col rounded-3xl p-7",
                plan.is_recommended && "gradient-ring shadow-[var(--shadow-glow)]",
              )}
            >
              {plan.is_recommended && (
                <span className="bg-brand absolute -top-3 start-7 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-[var(--shadow-glow)]">
                  {recommendedLabel}
                </span>
              )}
              <h3
                className={cn(
                  "text-lg font-semibold tracking-tight",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {pick(plan.name, locale)}
              </h3>
              <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
                {pick(plan.tagline, locale)}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {format_toman(plan.price, locale)}
                </span>
                <span className="pb-1 text-xs text-muted-foreground">{term}</span>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                {plan.bullets.map((b, bi) => (
                  <CheckItem key={bi}>{pick(b, locale)}</CheckItem>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <MagneticButton
                  onClick={() => handle_add(plan)}
                  size="pill"
                  variant={plan.is_recommended ? "brand" : "outline"}
                  isRTL={isRTL}
                  withArrow={false}
                  className="w-full justify-center"
                >
                  {addLabel}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
