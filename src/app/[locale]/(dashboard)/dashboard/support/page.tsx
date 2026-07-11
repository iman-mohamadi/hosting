import { notFound } from "next/navigation"

import { get_dashboard_page_copy, get_tickets } from "@/actions"
import { PortalPageHeader } from "@/components/dashboard/dashboard-ui"
import { SupportList } from "@/components/dashboard/support-list"
import { isValidLocale, type Locale } from "@/i18n/config"

interface SupportPageProps {
  params: Promise<{ locale: string }>
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [tickets, copy] = await Promise.all([
    get_tickets(),
    get_dashboard_page_copy(locale),
  ])

  return (
    <div>
      <PortalPageHeader
        title={copy.support.title}
        subtitle={copy.support.subtitle}
        isRTL={isRTL}
      />
      <SupportList tickets={tickets} copy={copy.support} locale={locale} />
    </div>
  )
}
