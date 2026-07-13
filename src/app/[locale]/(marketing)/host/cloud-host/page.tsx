import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { FeatureGrid } from "@/components/sections/product/feature-grid"
import { PlanTable } from "@/components/sections/product/plan-table"
import { ProductFaq } from "@/components/sections/product/product-faq"
import { ProductHero } from "@/components/sections/product/product-hero"
import { RelatedLinks, SectionShell } from "@/components/sections/product/section-shell"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { CLOUD_HOST_COPY } from "./copy"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "cloud-host",
    isValidLocale(locale) ? locale : defaultLocale,
    "/host/cloud-host",
  )
}

export default async function CloudHostPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  const c = CLOUD_HOST_COPY[locale]

  return (
    <div className="relative">
      <ProductHero
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        titleAccent={c.titleAccent}
        subtitle={c.subtitle}
        primaryCta={{ label: c.primaryCta, href: "#plans" }}
        secondaryCta={{ label: c.secondaryCta, href: "/contact" }}
        stats={c.stats}
      />

      <div id="plans" className="scroll-mt-24">
        <SectionShell
          locale={locale}
          eyebrow={c.plansEyebrow}
          title={c.plansTitle}
          subtitle={c.plansSubtitle}
        >
          <PlanTable
            locale={locale}
            locations={["iran", "europe"]}
            addLabel={c.addLabel}
            perMonth={c.perMonth}
            recommendedLabel={c.recommendedLabel}
          />
        </SectionShell>
      </div>

      <SectionShell
        locale={locale}
        eyebrow={c.featuresEyebrow}
        title={c.featuresTitle}
        subtitle={c.featuresSubtitle}
        muted
      >
        <FeatureGrid items={c.features} />
      </SectionShell>

      <SectionShell locale={locale} eyebrow={c.faqEyebrow} title={c.faqTitle}>
        <ProductFaq items={c.faq} />
        <div className="mt-16">
          <RelatedLinks locale={locale} title={c.relatedTitle} links={c.related} />
        </div>
      </SectionShell>
    </div>
  )
}
