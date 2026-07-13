import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ChatsCircle, HardDrives, Receipt } from "@phosphor-icons/react/dist/ssr"

import { get_dashboard_overview, get_dashboard_page_copy } from "@/actions"
import {
  EmptyState,
  Panel,
  PanelLink,
  StatCard,
  StatusBadge,
  instance_status_tone,
  invoice_status_tone,
  ticket_status_tone,
} from "@/components/dashboard/dashboard-ui"
import { isValidLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_date, format_money, format_number } from "@/lib/format"
import { cn } from "@/lib/utils"

interface OverviewPageProps {
  params: Promise<{ locale: string }>
}

export default async function DashboardOverviewPage({
  params,
}: OverviewPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [overview, copy] = await Promise.all([
    get_dashboard_overview(locale),
    get_dashboard_page_copy(locale),
  ])
  const c = copy.overview

  const first_name = overview.full_name.split(" ")[0]

  return (
    <div>
      <div className="mb-10">
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {c.greeting}
          {locale === "fa" ? "، " : ", "}
          <span className="text-aurora">{first_name}</span>
        </h1>
        <p
          className={cn(
            "mt-3 text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {c.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={c.active_instances}
          value={`${format_number(overview.active_instances, locale)} / ${format_number(overview.total_instances, locale)}`}
          icon={<HardDrives className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.monthly_spend}
          value={format_money(overview.monthly_spend, locale)}
          icon={<Receipt className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.pending_invoices}
          value={format_money(overview.pending_invoice_total, locale)}
          hint={format_number(overview.pending_invoice_count, locale)}
          icon={<Receipt className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.open_tickets}
          value={format_number(overview.open_ticket_count, locale)}
          icon={<ChatsCircle className="size-5" />}
          isRTL={isRTL}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title={c.recent_instances}
          isRTL={isRTL}
          action={
            <PanelLink
              href={localizePathname("/dashboard/instances", locale)}
              label={c.view_all}
              locale={locale}
            />
          }
        >
          {overview.recent_instances.length === 0 ? (
            <EmptyState label={c.empty_instances} isRTL={isRTL} />
          ) : (
            <ul className="space-y-2">
              {overview.recent_instances.map((instance) => (
                <li key={instance.instance_id}>
                  <Link
                    href={localizePathname(
                      `/dashboard/instances/${instance.instance_id}`,
                      locale,
                    )}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3 transition-colors hover:border-border hover:bg-muted"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-mono text-sm text-foreground">
                        {instance.hostname}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {instance.plan_name} · {instance.region_label}
                      </p>
                    </div>
                    <StatusBadge
                      label={
                        copy.instances.status_labels[instance.status]
                      }
                      tone={instance_status_tone(instance.status)}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title={c.pending_invoices_title}
          isRTL={isRTL}
          action={
            <PanelLink
              href={localizePathname("/dashboard/billing", locale)}
              label={c.view_all}
              locale={locale}
            />
          }
        >
          {overview.pending_invoices.length === 0 ? (
            <EmptyState label={c.empty_invoices} isRTL={isRTL} />
          ) : (
            <ul className="space-y-2">
              {overview.pending_invoices.map((invoice) => (
                <li
                  key={invoice.invoice_id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm text-foreground">
                      {invoice.invoice_number}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {format_date(invoice.due_at, locale)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground tabular-nums">
                      {format_money(invoice.amount, locale)}
                    </span>
                    <StatusBadge
                      label={copy.billing.status_labels[invoice.status]}
                      tone={invoice_status_tone(invoice.status)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title={c.recent_tickets_title}
          isRTL={isRTL}
          className="lg:col-span-2"
          action={
            <PanelLink
              href={localizePathname("/dashboard/support", locale)}
              label={c.view_all}
              locale={locale}
            />
          }
        >
          {overview.recent_tickets.length === 0 ? (
            <EmptyState label={c.empty_tickets} isRTL={isRTL} />
          ) : (
            <ul className="space-y-2">
              {overview.recent_tickets.map((ticket) => (
                <li key={ticket.ticket_id}>
                  <Link
                    href={localizePathname(
                      `/dashboard/support/${ticket.ticket_id}`,
                      locale,
                    )}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3 transition-colors hover:border-border hover:bg-muted"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <StatusBadge
                        label={copy.support.status_labels[ticket.status]}
                        tone={ticket_status_tone(ticket.status)}
                      />
                      <p
                        className={cn(
                          "truncate text-sm text-foreground",
                          isRTL && "font-[family-name:var(--font-vazirmatn)]",
                        )}
                      >
                        {ticket.subject}
                      </p>
                    </div>
                    <ArrowRight
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1",
                        isRTL && "rotate-180 group-hover:-translate-x-1",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  )
}
