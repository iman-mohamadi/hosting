"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Cpu, HardDrive, Lightning, Globe } from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import {
  BILLING_PERIODS,
  format_toman,
  get_billing_period,
  loc_num,
  LOCATIONS,
  pick,
  type BillingPeriodId,
  type LocationId,
  type ServerPlan,
} from "@/lib/catalog"
import { use_cart_store, type CartItem } from "@/store/use_cart_store"
import { SegmentedControl } from "./plan-table"
import { cn } from "@/lib/utils"

interface ServerPlanTableProps {
  locale: Locale
  plans: ServerPlan[]
  locations: LocationId[]
  /** Cloud servers bill per period; dedicated is monthly only. */
  showPeriod?: boolean
  titlePrefix: { fa: string; en: string }
  labels: {
    addLabel: string
    perMonth: string
    recommendedLabel: string
  }
}

export function ServerPlanTable({
  locale,
  plans,
  locations,
  showPeriod = true,
  titlePrefix,
  labels,
}: ServerPlanTableProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const add_item = use_cart_store((s) => s.add_item)

  const [location, setLocation] = useState<LocationId>(locations[0])
  const [period, setPeriod] = useState<BillingPeriodId>("monthly")
  const billing = get_billing_period(period)

  function handle_add(plan: ServerPlan) {
    const base = plan.price[location] ?? plan.price.iran ?? 0
    const item: CartItem = {
      key: `server:${plan.plan_id}:${location}:${period}`,
      kind: "server",
      title: {
        fa: `${titlePrefix.fa} ${plan.name.fa}`,
        en: `${titlePrefix.en} ${plan.name.en}`,
      },
      subtitle: LOCATIONS[location].label,
      meta: [
        plan.cpu,
        { fa: `${loc_num(plan.ram_gb, "fa")} گیگابایت RAM`, en: `${plan.ram_gb} GB RAM` },
        plan.disk,
      ],
      location,
      period: showPeriod ? period : "monthly",
      monthly_price: base,
      quantity: 1,
    }
    add_item(item)
    router.push(localizePathname("/cart", locale))
  }

  return (
    <div>
      <div className="mb-10 flex flex-col items-center gap-4">
        <SegmentedControl
          options={locations.map((id) => ({
            id,
            label: `${LOCATIONS[id].flag} ${pick(LOCATIONS[id].label, locale)}`,
          }))}
          value={location}
          onChange={(id) => setLocation(id as LocationId)}
        />
        {showPeriod && (
          <SegmentedControl
            options={BILLING_PERIODS.map((p) => ({
              id: p.period_id,
              label: pick(p.label, locale),
              badge: p.badge ? pick(p.badge, locale) : undefined,
            }))}
            value={period}
            onChange={(id) => setPeriod(id as BillingPeriodId)}
          />
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const base = plan.price[location] ?? plan.price.iran ?? 0
          const perMonthNet = showPeriod
            ? Math.round(base * (1 - billing.discount_pct / 100))
            : base
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
                    {labels.recommendedLabel}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      "text-xl font-semibold tracking-tight",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {pick(plan.name, locale)}
                  </h3>
                  <span className="font-mono text-[11px] text-muted-foreground">{plan.code}</span>
                </div>
                <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
                  {pick(plan.tagline, locale)}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">
                    {format_toman(perMonthNet, locale)}
                  </span>
                  <span className="pb-1 text-xs text-muted-foreground">{labels.perMonth}</span>
                </div>
                {showPeriod && billing.discount_pct > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground line-through tabular-nums">
                    {format_toman(base, locale)}
                  </p>
                )}

                <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  <SpecRow icon={<Cpu weight="duotone" className="size-4 text-primary" />} text={pick(plan.cpu, locale)} />
                  <SpecRow
                    icon={<Lightning weight="duotone" className="size-4 text-primary" />}
                    text={`${loc_num(plan.ram_gb, locale)} ${locale === "fa" ? "گیگابایت RAM" : "GB RAM"}`}
                  />
                  <SpecRow icon={<HardDrive weight="duotone" className="size-4 text-primary" />} text={pick(plan.disk, locale)} />
                  <SpecRow
                    icon={<Globe weight="duotone" className="size-4 text-primary" />}
                    text={`${locale === "fa" ? "ترافیک" : "Traffic"}: ${pick(plan.traffic, locale)}`}
                  />
                </ul>

                <div className="mt-7 pt-2">
                  <MagneticButton
                    onClick={() => handle_add(plan)}
                    size="pill"
                    variant={plan.is_recommended ? "brand" : "outline"}
                    isRTL={isRTL}
                    withArrow={false}
                    className="w-full justify-center"
                  >
                    {labels.addLabel}
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

function SpecRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-foreground/80">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </span>
      <span>{text}</span>
    </li>
  )
}
