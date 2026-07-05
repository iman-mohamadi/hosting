"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useCallback, useState } from "react"

import type { PricingPlan } from "@/actions"
import { Button } from "@/components/ui/button"
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

interface SpotlightCardProps {
  plan: PricingPlan
  locale: Locale
  recommended_badge: string
  per_month: string
  index: number
}

function SpotlightCard({
  plan,
  locale,
  recommended_badge,
  per_month,
  index,
}: SpotlightCardProps) {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      setSpotlight({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        opacity: 1,
      })
    },
    [],
  )

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }))
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border p-8",
        "bg-card/30 backdrop-blur-md transition-colors duration-500",
        plan.is_recommended
          ? "border-primary/40 shadow-[0_0_40px_-12px_oklch(0.72_0.12_188/0.45)]"
          : "border-border/40 hover:border-border/60",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(480px circle at ${spotlight.x}px ${spotlight.y}px, oklch(0.72 0.12 188 / 0.12), transparent 45%)`,
        }}
      />

      {plan.is_recommended && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      )}

      <div className="relative flex flex-1 flex-col">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="space-y-2 ltr:text-left rtl:text-right">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {plan.plan_name}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {plan.plan_description}
            </p>
          </div>

          {plan.is_recommended && (
            <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.65rem] font-medium tracking-widest text-primary uppercase">
              {recommended_badge}
            </span>
          )}
        </div>

        <div className="mb-8 ltr:text-left rtl:text-right">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-semibold tracking-tight text-foreground">
              {plan.price_display}
            </span>
          </div>
          <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
            {per_month}
          </p>
        </div>

        <ul className="mb-10 flex-1 space-y-3 ltr:text-left rtl:text-right">
          {plan.features_list.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span
                aria-hidden
                className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
              />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          asChild
          variant={plan.is_recommended ? "default" : "outline"}
          className={cn(
            "h-11 w-full rounded-full text-sm font-medium tracking-wide",
            plan.is_recommended && "shadow-[0_0_24px_-8px_oklch(0.72_0.12_188/0.5)]",
          )}
        >
          <Link href={localizePathname("/configure", locale)}>
            {plan.cta_label}
          </Link>
        </Button>
      </div>
    </motion.article>
  )
}

export function PricingCards({
  plans,
  locale,
  section_title,
  recommended_badge,
  per_month,
}: PricingCardsProps) {
  return (
    <section id="plans" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase ltr:text-left rtl:text-right">
          {section_title}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <SpotlightCard
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
