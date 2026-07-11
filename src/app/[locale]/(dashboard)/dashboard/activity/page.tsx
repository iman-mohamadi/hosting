import { notFound } from "next/navigation"

import { get_activity_log, get_dashboard_page_copy } from "@/actions"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { PortalPageHeader } from "@/components/dashboard/dashboard-ui"
import { isValidLocale, type Locale } from "@/i18n/config"

interface ActivityPageProps {
  params: Promise<{ locale: string }>
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [entries, copy] = await Promise.all([
    get_activity_log(),
    get_dashboard_page_copy(locale),
  ])

  return (
    <div>
      <PortalPageHeader
        title={copy.activity.title}
        subtitle={copy.activity.subtitle}
        isRTL={isRTL}
      />
      <ActivityLog entries={entries} copy={copy.activity} locale={locale} />
    </div>
  )
}
