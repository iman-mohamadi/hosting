import { notFound } from "next/navigation"

import { get_hero_data } from "@/actions"
import { HeroSection } from "@/components/sections/hero-section"
import {
  FeaturesSection,
  ManifestoSection,
  NetworkSection,
  TrustStrip,
} from "@/components/sections/landing-sections"
import { VpsConfigurator } from "@/components/sections/vps-configurator"
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
      <HeroSection data={heroData} locale={locale} />
      <TrustStrip locale={locale} />
      <ManifestoSection locale={locale} />
      <FeaturesSection locale={locale} />
      <VpsConfigurator locale={locale} />
      <NetworkSection locale={locale} />
    </>
  )
}
