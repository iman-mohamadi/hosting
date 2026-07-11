import type { Metadata } from "next"

import { get_docs_page_content } from "@/actions"
import { DocsPageContent } from "@/components/sections/docs-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface DocsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "docs",
    isValidLocale(locale) ? locale : defaultLocale,
    "/docs",
  )
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const content = await get_docs_page_content(locale)

  return <DocsPageContent content={content} locale={locale} />
}
