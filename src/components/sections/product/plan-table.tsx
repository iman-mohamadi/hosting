"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Check, Cpu, Database, Globe, HardDrive } from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import {
  BILLING_PERIODS,
  CLOUD_HOSTING_PLANS,
  format_toman,
  get_billing_period,
  loc_num,
  LOCATIONS,
  pick,
  type BillingPeriodId,
  type HostingPlan,
  type LocationId,
} from "@/lib/catalog"
import { use_cart_store, type CartItem } from "@/store/use_cart_store"
import { cn } from "@/lib/utils"

interface PlanTableProps {
  locale: Locale
  plans?: HostingPlan[]
  /** Locations offered for this product. */
  locations?: LocationId[]
  addLabel: string
  perMonth: string
  recommendedLabel: string
}

export function PlanTable({
  locale,
  plans = CLOUD_HOSTING_PLANS,
  locations = ["iran", "europe"],
  addLabel,
  perMonth,
  recommendedLabel,
}: PlanTableProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const add_item = use_cart_store((s) => s.add_item)

  const [location, setLocation] = useState<LocationId>(locations[0])
  const [period, setPeriod] = useState<BillingPeriodId>("monthly")

  const billing = get_billing_period(period)

  function handle_add(plan: HostingPlan) {
    const base = plan.price[location] ?? plan.price.iran ?? 0
    const item: CartItem = {
      key: `hosting:${plan.plan_id}:${location}:${period}`,
      kind: "hosting",
      title: {
        fa: `هاست ابری ${plan.name.fa}`,
        en: `${plan.name.en} Cloud Hosting`,
      },
      subtitle: LOCATIONS[location].label,
      meta: [
        { fa: `${plan.specs.ssd_gb} گیگابایت SSD`, en: `${plan.specs.ssd_gb} GB SSD` },
        { fa: `${plan.specs.ram_gb} گیگابایت RAM`, en: `${plan.specs.ram_gb} GB RAM` },
        { fa: `${plan.specs.vcpu} هسته پردازنده`, en: `${plan.specs.vcpu} vCPU` },
      ],
      location,
      period,
      monthly_price: base,
      quantity: 1,
    }
    add_item(item)
    router.push(localizePathname("/cart", locale))
  }

  return (
    <div>
      {/* Toggles */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <SegmentedControl
          options={locations.map((id) => ({
            id,
            label: `${LOCATIONS[id].flag} ${pick(LOCATIONS[id].label, locale)}`,
          }))}
          value={location}
          onChange={(id) => setLocation(id as LocationId)}
        />
        <SegmentedControl
          options={BILLING_PERIODS.map((p) => ({
            id: p.period_id,
            label: pick(p.label, locale),
            badge: p.badge ? pick(p.badge, locale) : undefined,
          }))}
          value={period}
          onChange={(id) => setPeriod(id as BillingPeriodId)}
        />
      </div>

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const base = plan.price[location] ?? plan.price.iran ?? 0
          const perMonthNet = Math.round(base * (1 - billing.discount_pct / 100))
          return (
            <Reveal key={plan.plan_id} delay={i * 0.06}>
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
                    "text-xl font-semibold tracking-tight",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {pick(plan.name, locale)}
                </h3>
                <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground">
                  {pick(plan.tagline, locale)}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">
                    {format_toman(perMonthNet, locale)}
                  </span>
                  <span className="pb-1 text-xs text-muted-foreground">{perMonth}</span>
                </div>
                {billing.discount_pct > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground line-through tabular-nums">
                    {format_toman(base, locale)}
                  </p>
                )}

                <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  <SpecRow
                    icon={<HardDrive weight="duotone" className="size-4 text-primary" />}
                    text={`${loc_num(plan.specs.ssd_gb, locale)} ${locale === "fa" ? "گیگابایت فضای SSD" : "GB SSD storage"}`}
                  />
                  <SpecRow
                    icon={<Cpu weight="duotone" className="size-4 text-primary" />}
                    text={`${loc_num(plan.specs.ram_gb, locale)} ${locale === "fa" ? "گیگابایت RAM" : "GB RAM"} · ${loc_num(plan.specs.vcpu, locale)} ${locale === "fa" ? "هسته" : "vCPU"}`}
                  />
                  <SpecRow
                    icon={<Globe weight="duotone" className="size-4 text-primary" />}
                    text={`${locale === "fa" ? "پهنای باند" : "Bandwidth"}: ${pick(plan.specs.bandwidth, locale)}`}
                  />
                  <SpecRow
                    icon={<Database weight="duotone" className="size-4 text-primary" />}
                    text={`${format_count(plan.specs.databases, locale)} ${locale === "fa" ? "دیتابیس" : "databases"} · ${format_count(plan.specs.sites, locale)} ${locale === "fa" ? "سایت" : "sites"}`}
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
                    {addLabel}
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

function format_count(value: number | "unlimited", locale: Locale): string {
  if (value === "unlimited") return locale === "fa" ? "نامحدود" : "Unlimited"
  return value.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")
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

export interface SegmentOption {
  id: string
  label: string
  badge?: string
}

export function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: SegmentOption[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="glass inline-flex flex-wrap items-center gap-1 rounded-full p-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
            value === opt.id
              ? "bg-brand text-white shadow-[var(--shadow-glow)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {opt.label}
          {opt.badge && (
            <span
              className={cn(
                "ms-1.5 rounded-full px-1.5 py-0.5 text-[10px]",
                value === opt.id ? "bg-white/20" : "bg-primary/10 text-primary",
              )}
            >
              {opt.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

/** Small check-list bullet reused by feature blocks. */
export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-foreground/80">
      <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  )
}
