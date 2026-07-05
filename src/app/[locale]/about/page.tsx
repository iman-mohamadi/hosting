import { get_about_content } from "@/actions"
import { AboutPageContent } from "@/components/sections/about-page-content"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = await get_about_content(locale)

  return <AboutPageContent content={content} locale={locale} />
}
