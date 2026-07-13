import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { FeatureGrid } from "@/components/sections/product/feature-grid"
import { ProductFaq } from "@/components/sections/product/product-faq"
import { ProductHero } from "@/components/sections/product/product-hero"
import { RelatedLinks, SectionShell } from "@/components/sections/product/section-shell"
import { VpsPlanTable } from "@/components/sections/product/vps-plan-table"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import type { LocationId } from "@/lib/catalog"
import { build_page_metadata } from "@/lib/seo"
import { VPS_COPY } from "./copy"

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ loc?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "vps",
    isValidLocale(locale) ? locale : defaultLocale,
    "/vps",
  )
}

const VALID_LOC = new Set(["iran", "germany", "netherlands", "turkey", "canada"])

export default async function VpsPage({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params
  const { loc } = await searchParams
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  const c = VPS_COPY[locale]
  const initialLocation = (loc && VALID_LOC.has(loc) ? loc : "iran") as LocationId

  return (
    <div className="relative">
      <ProductHero
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        titleAccent={c.titleAccent}
        subtitle={c.subtitle}
        primaryCta={{ label: c.primaryCta, href: "#plans" }}
        secondaryCta={{ label: c.secondaryCta, href: "/configure" }}
        stats={c.stats}
      />

      <div id="plans" className="scroll-mt-24">
        <SectionShell
          locale={locale}
          eyebrow={c.plansEyebrow}
          title={c.plansTitle}
          subtitle={c.plansSubtitle}
        >
          <VpsPlanTable locale={locale} initialLocation={initialLocation} labels={c.tableLabels} />
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
