import {
  get_comparison_features,
  get_pricing_page_copy,
  get_pricing_plans,
} from "@/actions"
import { PricingPageContent } from "@/components/sections/pricing-page-content"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface PricingPageProps {
  params: Promise<{ locale: string }>
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
