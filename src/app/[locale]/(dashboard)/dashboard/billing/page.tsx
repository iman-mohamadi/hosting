import { notFound } from "next/navigation"

import {
  get_dashboard_page_copy,
  get_invoices,
  get_payment_methods,
} from "@/actions"
import { BillingTable } from "@/components/dashboard/billing-table"
import {
  EmptyState,
  PortalPageHeader,
} from "@/components/dashboard/dashboard-ui"
import { PaymentMethodsPanel } from "@/components/dashboard/payment-methods-panel"
import { isValidLocale, type Locale } from "@/i18n/config"
import { format_money } from "@/lib/format"
import { cn } from "@/lib/utils"

interface BillingPageProps {
  params: Promise<{ locale: string }>
}

export default async function BillingPage({ params }: BillingPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [invoices, payment_methods, copy] = await Promise.all([
    get_invoices(),
    get_payment_methods(),
    get_dashboard_page_copy(locale),
  ])
  const c = copy.billing

  const total_due = invoices
    .filter((invoice) => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  return (
    <div className="space-y-10">
      <PortalPageHeader
        title={c.title}
        subtitle={c.subtitle}
        isRTL={isRTL}
        action={
          total_due > 0 ? (
            <div className="rounded-2xl border border-border glass px-6 py-4 text-end">
              <p
                className={cn(
                  "text-xs text-muted-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {c.total_due}
              </p>
              <p className="mt-1 text-2xl font-semibold text-foreground tabular-nums">
                {format_money(total_due, locale)}
              </p>
            </div>
          ) : undefined
        }
      />

      <PaymentMethodsPanel methods={payment_methods} copy={c} locale={locale} />

      {invoices.length === 0 ? (
        <EmptyState label={c.empty} isRTL={isRTL} />
      ) : (
        <BillingTable invoices={invoices} copy={c} locale={locale} />
      )}
    </div>
  )
}
