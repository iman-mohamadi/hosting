"use client"

import type { ComparisonFeature, PricingPlan } from "@/actions"
import { Reveal } from "@/components/fx/reveal"
import { ShimmerButton } from "@/components/animate-ui/shimmer-button"
import { ArrowButton } from "@/components/animate-ui/arrow-button"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface ComparisonTableProps {
  features: ComparisonFeature[]
  plans: PricingPlan[]
  section_title: string
  section_subtitle: string
  locale: Locale
}

function featureValue(
  feature: ComparisonFeature,
  planId: string,
): string {
  if (planId === "starter") return feature.starter_value
  if (planId === "growth" || planId === "pro") return feature.pro_value
  return feature.enterprise_value
}

export function ComparisonTable({
  features,
  plans,
  section_title,
  section_subtitle,
  locale,
}: ComparisonTableProps) {
  const isRTL = locale === "fa"

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8 lg:pb-40">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {section_title}
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-3 max-w-lg text-muted-foreground">{section_subtitle}</p>
      </Reveal>

      {/* Desktop table */}
      <Reveal delay={0.08}>
        <div className="mt-12 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 pe-6 text-start font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  {locale === "fa" ? "ویژگی" : "Feature"}
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.plan_id}
                    className={cn(
                      "px-4 py-4 text-start font-semibold",
                      plan.is_recommended && "text-primary",
                    )}
                  >
                    {plan.plan_name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr
                  key={feature.feature_id}
                  className="border-b border-border/70 transition-colors hover:bg-muted/30"
                >
                  <td className="py-4 pe-6 text-muted-foreground">
                    {feature.feature_label}
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={plan.plan_id}
                      className={cn(
                        "px-4 py-4 font-medium text-foreground",
                        plan.is_recommended && "bg-primary/[0.03]",
                      )}
                    >
                      {featureValue(feature, plan.plan_id)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div />
            {plans.map((plan) => {
              const isScale =
                plan.plan_id === "scale" || plan.plan_id === "enterprise"
              const href = isScale
                ? localizePathname("/contact", locale)
                : localizePathname(`/configure?plan=${plan.plan_id}`, locale)
              return (
                <div key={plan.plan_id} className="flex justify-start ps-4">
                  {plan.is_recommended ? (
                    <ShimmerButton href={href} className="h-10 px-5 text-xs">
                      {plan.cta_label}
                    </ShimmerButton>
                  ) : (
                    <ArrowButton href={href} isRTL={isRTL} variant="outline" className="h-10 px-5 text-xs">
                      {plan.cta_label}
                    </ArrowButton>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Mobile stacked */}
      <div className="mt-10 space-y-4 md:hidden">
        {plans.map((plan) => {
          const isScale =
            plan.plan_id === "scale" || plan.plan_id === "enterprise"
          const href = isScale
            ? localizePathname("/contact", locale)
            : localizePathname(`/configure?plan=${plan.plan_id}`, locale)
          return (
            <Reveal key={plan.plan_id}>
              <div
                className={cn(
                  "rounded-2xl border border-border bg-card p-6",
                  plan.is_recommended && "border-primary/30",
                )}
              >
                <p className="text-lg font-semibold">{plan.plan_name}</p>
                <dl className="mt-4 divide-y divide-border">
                  {features.map((feature) => (
                    <div
                      key={feature.feature_id}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <dt className="text-sm text-muted-foreground">
                        {feature.feature_label}
                      </dt>
                      <dd className="text-sm font-medium">
                        {featureValue(feature, plan.plan_id)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5">
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
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
