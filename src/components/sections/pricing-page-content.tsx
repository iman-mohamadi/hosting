"use client"

import { motion } from "framer-motion"

import type {
  ComparisonFeature,
  PricingPageCopy,
  PricingPlan,
} from "@/actions"
import { ComparisonTable } from "@/components/sections/comparison-table"
import { PricingCards } from "@/components/sections/pricing-cards"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface PricingPageContentProps {
  plans: PricingPlan[]
  features: ComparisonFeature[]
  copy: PricingPageCopy
  locale: Locale
}

const headerVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function PricingPageContent({
  plans,
  features,
  copy,
  locale,
}: PricingPageContentProps) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,oklch(0.45_0.08_188/0.14),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 lg:px-8 lg:pt-32 lg:pb-24">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className={cn(
            "max-w-3xl space-y-6",
            "ltr:text-left rtl:text-right",
          )}
        >
          <h1
            className={cn(
              "whitespace-pre-line text-4xl font-semibold tracking-tight text-foreground",
              "sm:text-5xl md:text-6xl md:leading-[1.05]",
              locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.page_title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {copy.page_subtitle}
          </p>
        </motion.header>
      </div>

      <PricingCards
        plans={plans}
        locale={locale}
        section_title={copy.plans_section_title}
        recommended_badge={copy.recommended_badge}
        per_month={copy.per_month}
      />

      <ComparisonTable
        features={features}
        plans={plans}
        section_title={copy.comparison_section_title}
        section_subtitle={copy.comparison_section_subtitle}
      />
    </div>
  )
}
