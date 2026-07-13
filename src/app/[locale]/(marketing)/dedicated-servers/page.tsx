import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { FeatureGrid } from "@/components/sections/product/feature-grid"
import { ProductFaq } from "@/components/sections/product/product-faq"
import { ProductHero } from "@/components/sections/product/product-hero"
import { RelatedLinks, SectionShell } from "@/components/sections/product/section-shell"
import { ServerPlanTable } from "@/components/sections/product/server-plan-table"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { DEDICATED_LOCATIONS, DEDICATED_PLANS } from "@/lib/catalog"
import { build_meta } from "@/lib/seo"
import { DEDICATED_COPY } from "./copy"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const l = isValidLocale(locale) ? locale : defaultLocale
  return build_meta(
    { fa: "سرور اختصاصی", en: "Dedicated Server" },
    {
      fa: "سرور اختصاصی با پردازنده‌های Xeon و EPYC، دیسک NVMe و منابع صددرصد اختصاصی در دیتاسنتر ایران و آلمان.",
      en: "Dedicated servers with Xeon and EPYC CPUs, NVMe disks, and fully dedicated resources in Iran and Germany.",
    },
    l,
    "/dedicated-servers",
  )
}

export default async function DedicatedServersPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  const c = DEDICATED_COPY[locale]

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
        <SectionShell locale={locale} eyebrow={c.plansEyebrow} title={c.plansTitle} subtitle={c.plansSubtitle}>
          <ServerPlanTable
            locale={locale}
            plans={DEDICATED_PLANS}
            locations={DEDICATED_LOCATIONS}
            showPeriod={false}
            titlePrefix={{ fa: "سرور اختصاصی", en: "Dedicated Server" }}
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
