import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { get_faq_page_content } from "@/actions"
import { FaqPageContentView } from "@/components/sections/faq-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"

interface FaqPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "faq",
    isValidLocale(locale) ? locale : defaultLocale,
    "/faq",
  )
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = await get_faq_page_content(locale)

  return <FaqPageContentView content={content} locale={locale} />
}
