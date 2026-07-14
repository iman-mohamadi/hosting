import { FeatureGrid, type FeatureItem } from "@/components/sections/product/feature-grid"
import { ProductFaq, type FaqItem } from "@/components/sections/product/product-faq"
import { ProductHero, type ProductHeroStat } from "@/components/sections/product/product-hero"
import { RelatedLinks, SectionShell, type RelatedLink } from "@/components/sections/product/section-shell"
import { ServicePlanTable } from "@/components/sections/product/service-plan-table"
import type { Locale } from "@/i18n/config"
import type { ServicePlan } from "@/lib/catalog"

export interface ServiceProductContent {
  eyebrow: string
  title: string
  titleAccent: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  secondaryHref: string
  stats: ProductHeroStat[]
  titlePrefix: { fa: string; en: string }
  plansEyebrow: string
  plansTitle: string
  plansSubtitle: string
  addLabel: string
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

/** Shared layout for the services family (SSL, CDN, storage, private cloud, PaaS). */
export function ServiceProductView({
  locale,
  content,
  plans,
}: {
  locale: Locale
  content: ServiceProductContent
  plans: ServicePlan[]
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
        secondaryCta={{ label: content.secondaryCta, href: content.secondaryHref }}
        stats={content.stats}
      />

      <div id="plans" className="scroll-mt-24">
        <SectionShell
          locale={locale}
          eyebrow={content.plansEyebrow}
          title={content.plansTitle}
          subtitle={content.plansSubtitle}
        >
          <ServicePlanTable
            locale={locale}
            plans={plans}
            titlePrefix={content.titlePrefix}
            addLabel={content.addLabel}
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
