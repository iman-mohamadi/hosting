import type { Metadata } from "next"

import { get_about_content } from "@/actions"
import { AboutPageContent } from "@/components/sections/about-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "about",
    isValidLocale(locale) ? locale : defaultLocale,
    "/about",
  )
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
