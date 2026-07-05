import { get_contact_page_copy } from "@/actions"
import { ContactPageContent } from "@/components/sections/contact-page-content"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface ContactPageProps {
  params: Promise<{ locale: string }>
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
