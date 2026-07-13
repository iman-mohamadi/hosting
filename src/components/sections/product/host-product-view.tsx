import { FeatureGrid, type FeatureItem } from "@/components/sections/product/feature-grid"
import { PlanTable } from "@/components/sections/product/plan-table"
import { ProductFaq, type FaqItem } from "@/components/sections/product/product-faq"
import { ProductHero, type ProductHeroStat } from "@/components/sections/product/product-hero"
import { RelatedLinks, SectionShell, type RelatedLink } from "@/components/sections/product/section-shell"
import type { Locale } from "@/i18n/config"
import type { HostingPlan, LocationId } from "@/lib/catalog"

export interface HostProductContent {
  eyebrow: string
  title: string
  titleAccent: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  stats: ProductHeroStat[]
  plansEyebrow: string
  plansTitle: string
  plansSubtitle: string
  addLabel: string
  perMonth: string
  recommendedLabel: string
  featuresEyebrow: string
  featuresTitle: string
  featuresSubtitle: string
  features: FeatureItem[]
  faqEyebrow: string
  faqTitle: string
  faq: FaqItem[]
  relatedTitle: string
  related: RelatedLink[]
}

/** Data-driven layout shared by every fixed-tier hosting product page. */
export function HostProductView({
  locale,
  content,
  plans,
  locations,
  secondaryHref = "/contact",
}: {
  locale: Locale
  content: HostProductContent
  plans: HostingPlan[]
  locations: LocationId[]
  secondaryHref?: string
}) {
  return (
    <div className="relative">
      <ProductHero
        locale={locale}
        eyebrow={content.eyebrow}
        title={content.title}
        titleAccent={content.titleAccent}
        subtitle={content.subtitle}
        primaryCta={{ label: content.primaryCta, href: "#plans" }}
        secondaryCta={{ label: content.secondaryCta, href: secondaryHref }}
        stats={content.stats}
      />

      <div id="plans" className="scroll-mt-24">
        <SectionShell
          locale={locale}
          eyebrow={content.plansEyebrow}
          title={content.plansTitle}
          subtitle={content.plansSubtitle}
        >
          <PlanTable
            locale={locale}
            plans={plans}
            locations={locations}
            addLabel={content.addLabel}
            perMonth={content.perMonth}
            recommendedLabel={content.recommendedLabel}
          />
        </SectionShell>
      </div>

      <SectionShell
        locale={locale}
        eyebrow={content.featuresEyebrow}
        title={content.featuresTitle}
        subtitle={content.featuresSubtitle}
        muted
      >
        <FeatureGrid items={content.features} />
      </SectionShell>

      <SectionShell locale={locale} eyebrow={content.faqEyebrow} title={content.faqTitle}>
        <ProductFaq items={content.faq} />
        <div className="mt-16">
          <RelatedLinks locale={locale} title={content.relatedTitle} links={content.related} />
        </div>
      </SectionShell>
    </div>
  )
}
