import type { Metadata } from "next"

import { get_status_page_content } from "@/actions"
import { StatusPageContent } from "@/components/sections/status-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface StatusPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: StatusPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "status",
    isValidLocale(locale) ? locale : defaultLocale,
    "/status",
  )
}

export default async function StatusPage({ params }: StatusPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = await get_status_page_content(locale)

  return <StatusPageContent content={content} locale={locale} />
}
