import { notFound } from "next/navigation"

import { get_dashboard_page_copy, get_dns_zones } from "@/actions"
import { PortalPageHeader } from "@/components/dashboard/dashboard-ui"
import { DnsPanel } from "@/components/dashboard/dns-panel"
import { isValidLocale, type Locale } from "@/i18n/config"

interface DnsPageProps {
  params: Promise<{ locale: string }>
}

export default async function DnsPage({ params }: DnsPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [zones, copy] = await Promise.all([
    get_dns_zones(),
    get_dashboard_page_copy(locale),
  ])

  return (
    <div>
      <PortalPageHeader
        title={copy.dns.title}
        subtitle={copy.dns.subtitle}
        isRTL={isRTL}
      />
      <DnsPanel zones={zones} copy={copy.dns} locale={locale} />
    </div>
  )
}
