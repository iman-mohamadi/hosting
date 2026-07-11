import type { Metadata } from "next"

import { get_contact_page_copy } from "@/actions"
import { ContactPageContent } from "@/components/sections/contact-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "contact",
    isValidLocale(locale) ? locale : defaultLocale,
    "/contact",
  )
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const copy = await get_contact_page_copy(locale)

  return <ContactPageContent copy={copy} locale={locale} />
}
