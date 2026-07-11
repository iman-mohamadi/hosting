import {
  get_comparison_features,
  get_pricing_page_copy,
  get_pricing_plans,
} from "@/actions"
import type { Metadata } from "next"

import { PricingPageContent } from "@/components/sections/pricing-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface PricingPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: PricingPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "pricing",
    isValidLocale(locale) ? locale : defaultLocale,
    "/pricing",
  )
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam

  const [plans, features, copy] = await Promise.all([
    get_pricing_plans(locale),
    get_comparison_features(locale),
    get_pricing_page_copy(locale),
  ])

  return (
    <PricingPageContent
      plans={plans}
      features={features}
      copy={copy}
      locale={locale}
    />
  )
}
