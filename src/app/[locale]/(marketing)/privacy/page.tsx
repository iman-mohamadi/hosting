import type { Metadata } from "next"

import { get_privacy_content } from "@/actions"
import { PrivacyPageContent } from "@/components/sections/privacy-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "privacy",
    isValidLocale(locale) ? locale : defaultLocale,
    "/privacy",
  )
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = await get_privacy_content(locale)

  return <PrivacyPageContent content={content} locale={locale} />
}
