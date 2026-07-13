import { notFound } from "next/navigation"

import { get_hero_data } from "@/actions"
import { HomeCorePillars } from "@/components/sections/home/home-core-pillars"
import { HomeFaqTeaser } from "@/components/sections/home/home-faq-teaser"
import { HomeFinalCta } from "@/components/sections/home/home-final-cta"
import { HomeHero } from "@/components/sections/home/home-hero"
import { HomePricingTeaser } from "@/components/sections/home/home-pricing-teaser"
import { HomeProblem } from "@/components/sections/home/home-problem"
import { HomeProductReveal } from "@/components/sections/home/home-product-reveal"
import { HomeTrust } from "@/components/sections/home/home-trust"
import { isValidLocale, type Locale } from "@/i18n/config"

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const heroData = await get_hero_data(locale)

  return (
    <>
      <HomeHero data={heroData} locale={locale} />
      <HomeProblem locale={locale} />
      <HomeProductReveal locale={locale} />
      <HomeCorePillars locale={locale} />
      <HomeTrust locale={locale} />
      <HomePricingTeaser locale={locale} />
      <HomeFaqTeaser locale={locale} />
      <HomeFinalCta locale={locale} />
    </>
  )
}
