import type {
  ComparisonFeature,
  PricingPageCopy,
  PricingPlan,
} from "@/actions"
import { ComparisonTable } from "@/components/sections/comparison-table"
import { PricingCards } from "@/components/sections/pricing-cards"
import { PageHeader } from "@/components/sections/page-header"
import type { Locale } from "@/i18n/config"

interface PricingPageContentProps {
  plans: PricingPlan[]
  features: ComparisonFeature[]
  copy: PricingPageCopy
  locale: Locale
}

export function PricingPageContent({
  plans,
  features,
  copy,
  locale,
}: PricingPageContentProps) {
  return (
    <div className="relative">
      <PageHeader
        eyebrow={locale === "fa" ? "قیمت‌گذاری" : "Pricing"}
        title={copy.page_title}
        subtitle={copy.page_subtitle}
        locale={locale}
      />

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
        locale={locale}
      />
    </div>
  )
}
