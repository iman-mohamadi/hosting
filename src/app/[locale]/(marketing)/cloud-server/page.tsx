import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { FeatureGrid } from "@/components/sections/product/feature-grid"
import { ProductFaq } from "@/components/sections/product/product-faq"
import { ProductHero } from "@/components/sections/product/product-hero"
import { RelatedLinks, SectionShell } from "@/components/sections/product/section-shell"
import { ServerPlanTable } from "@/components/sections/product/server-plan-table"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { CLOUD_SERVER_LOCATIONS, CLOUD_SERVER_PLANS } from "@/lib/catalog"
import { build_meta } from "@/lib/seo"
import { CLOUD_SERVER_COPY } from "./copy"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const l = isValidLocale(locale) ? locale : defaultLocale
  return build_meta(
    { fa: "سرور ابری", en: "Cloud Server" },
    {
      fa: "سرور ابری با منابع تضمین‌شده روی NVMe، تحویل آنی، اسنپ‌شات و ارتقای لحظه‌ای در موقعیت ایران و اروپا.",
      en: "Cloud servers with guaranteed NVMe resources, instant delivery, snapshots, and live scaling in Iran and Europe.",
    },
    l,
    "/cloud-server",
  )
}

export default async function CloudServerPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  const c = CLOUD_SERVER_COPY[locale]

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
        <SectionShell locale={locale} eyebrow={c.plansEyebrow} title={c.plansTitle} subtitle={c.plansSubtitle}>
          <ServerPlanTable
            locale={locale}
            plans={CLOUD_SERVER_PLANS}
            locations={CLOUD_SERVER_LOCATIONS}
            showPeriod
            titlePrefix={{ fa: "سرور ابری", en: "Cloud Server" }}
            labels={{ addLabel: c.addLabel, perMonth: c.perMonth, recommendedLabel: c.recommendedLabel }}
          />
        </SectionShell>
      </div>

      <SectionShell locale={locale} eyebrow={c.featuresEyebrow} title={c.featuresTitle} subtitle={c.featuresSubtitle} muted>
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
