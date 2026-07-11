import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { get_sla_page_content } from "@/actions"
import { SlaPageContentView } from "@/components/sections/sla-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"

interface SlaPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: SlaPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "sla",
    isValidLocale(locale) ? locale : defaultLocale,
    "/sla",
  )
}

export default async function SlaPage({ params }: SlaPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = await get_sla_page_content(locale)

  return <SlaPageContentView content={content} locale={locale} />
}
