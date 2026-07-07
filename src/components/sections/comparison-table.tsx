"use client"

import type { ComparisonFeature, PricingPlan } from "@/actions"
import { Reveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface ComparisonTableProps {
  features: ComparisonFeature[]
  plans: PricingPlan[]
  section_title: string
  section_subtitle: string
  locale: Locale
}

export function ComparisonTable({
  features,
  plans,
  section_title,
  section_subtitle,
  locale,
}: ComparisonTableProps) {
  const isRTL = locale === "fa"
  const planColumns = [
    { id: "starter", name: plans[0]?.plan_name ?? "Start" },
    { id: "pro", name: plans[1]?.plan_name ?? "Growth" },
    { id: "enterprise", name: plans[2]?.plan_name ?? "Scale" },
  ]

  function getValueForPlan(feature: ComparisonFeature, plan_id: string): string {
    switch (plan_id) {
      case "starter":
        return feature.starter_value
      case "pro":
        return feature.pro_value
      case "enterprise":
        return feature.enterprise_value
      default:
        return "—"
    }
  }

  return (
    <section className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-16 space-y-4">
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-foreground md:text-5xl",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {section_title}
          </h2>
          <p
            className={cn(
              "max-w-lg text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {section_subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-4 gap-6 border-b border-white/10 pb-6 font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
              <div />
              {planColumns.map((column) => (
                <div
                  key={column.id}
                  className={cn(
                    "text-center",
                    column.id === "pro" &&
                      "rounded-t-xl bg-acid/[0.06] py-2 text-acid",
                  )}
                >
                  {column.name}
                </div>
              ))}
            </div>

            <div>
              {features.map((feature) => (
                <div
                  key={feature.feature_id}
                  className="group grid grid-cols-4 gap-6 border-b border-white/[0.06] py-6 transition-colors hover:bg-white/[0.015]"
                >
                  <div
                    className={cn(
                      "flex items-center text-sm text-foreground ltr:text-left rtl:text-right",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {feature.feature_label}
                  </div>
                  {planColumns.map((column) => (
                    <div
                      key={`${feature.feature_id}-${column.id}`}
                      className={cn(
                        "flex items-center justify-center text-sm tabular-nums",
                        column.id === "pro"
                          ? "bg-acid/[0.04] font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {getValueForPlan(feature, column.id)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
