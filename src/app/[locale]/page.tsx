import { get_hero_data } from "@/actions"
import { HeroSection } from "@/components/sections/hero-section"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

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

  return <HeroSection data={heroData} locale={locale} />
}
