import { get_privacy_content } from "@/actions"
import { PrivacyPageContent } from "@/components/sections/privacy-page-content"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
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
