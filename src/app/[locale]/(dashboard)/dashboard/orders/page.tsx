import { get_dashboard_page_copy, get_user_orders } from "@/actions"
import { OrdersList } from "@/components/dashboard/orders-list"
import { isValidLocale, type Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

interface OrdersPageProps {
  params: Promise<{ locale: string }>
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const [orders, copy] = await Promise.all([
    get_user_orders(),
    get_dashboard_page_copy(locale),
  ])

  const isRTL = locale === "fa"

  return (
    <div className="space-y-8">
      <div>
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight text-foreground md:text-4xl",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.orders.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{copy.orders.subtitle}</p>
      </div>
      <OrdersList orders={orders} copy={copy.orders} locale={locale} />
    </div>
  )
}
