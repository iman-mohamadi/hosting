import { notFound } from "next/navigation"

import { get_hero_data } from "@/actions"
import { HomeCapabilities } from "@/components/sections/home/home-capabilities"
import { HomeFinalCta } from "@/components/sections/home/home-final-cta"
import { HomeHero } from "@/components/sections/home/home-hero"
import { HomeLocations } from "@/components/sections/home/home-locations"
import { HomeProductShowcase } from "@/components/sections/home/home-product-showcase"
import { HomeSupport } from "@/components/sections/home/home-support"
import { HomeToolbox } from "@/components/sections/home/home-toolbox"
import { HomeTrust } from "@/components/sections/home/home-trust"
import { HomeWhy } from "@/components/sections/home/home-why"
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
      <div id="challenge">
        <HomeProductShowcase locale={locale} />
      </div>
      <HomeToolbox locale={locale} />
      <HomeCapabilities locale={locale} />
      <HomeLocations locale={locale} />
      <HomeWhy locale={locale} />
      <HomeSupport locale={locale} />
      <HomeTrust locale={locale} />
      <HomeFinalCta locale={locale} />
    </>
  )
}
