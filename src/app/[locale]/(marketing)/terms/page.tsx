import type { Metadata } from "next"

import { get_legal_content } from "@/actions"
import { TermsPageContent } from "@/components/sections/terms-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface TermsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "terms",
    isValidLocale(locale) ? locale : defaultLocale,
    "/terms",
  )
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = await get_legal_content(locale)

  return <TermsPageContent content={content} locale={locale} />
}
