import { get_legal_content } from "@/actions"
import { TermsPageContent } from "@/components/sections/terms-page-content"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface TermsPageProps {
  params: Promise<{ locale: string }>
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
