import { notFound } from "next/navigation"

import { get_admin_orders, get_admin_page_copy } from "@/actions"
import { PortalPageHeader } from "@/components/dashboard/dashboard-ui"
import { AdminOrdersList } from "@/components/admin/admin-orders-list"
import { isValidLocale, type Locale } from "@/i18n/config"

interface AdminOrdersPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminOrdersPage({
  params,
}: AdminOrdersPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [orders, copy] = await Promise.all([
    get_admin_orders(),
    get_admin_page_copy(locale),
  ])

  return (
    <div>
      <PortalPageHeader
        title={copy.orders.title}
        subtitle={copy.orders.subtitle}
        isRTL={isRTL}
      />
      <AdminOrdersList orders={orders} copy={copy.orders} locale={locale} />
    </div>
  )
}
