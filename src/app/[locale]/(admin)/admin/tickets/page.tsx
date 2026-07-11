import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { get_admin_page_copy, get_admin_tickets } from "@/actions"
import {
  EmptyState,
  PortalPageHeader,
  StatusBadge,
  ticket_priority_tone,
  ticket_status_tone,
} from "@/components/dashboard/dashboard-ui"
import { isValidLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_datetime } from "@/lib/format"
import { cn } from "@/lib/utils"

interface AdminTicketsPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminTicketsPage({
  params,
}: AdminTicketsPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [tickets, copy] = await Promise.all([
    get_admin_tickets(),
    get_admin_page_copy(locale),
  ])
  const c = copy.tickets

  return (
    <div>
      <PortalPageHeader title={c.title} subtitle={c.subtitle} isRTL={isRTL} />

      {tickets.length === 0 ? (
        <EmptyState label={c.empty} isRTL={isRTL} />
      ) : (
        <ul className="space-y-3">
          {tickets.map((ticket) => (
            <li key={ticket.ticket_id}>
              <Link
                href={localizePathname(
                  `/admin/tickets/${ticket.ticket_id}`,
                  locale,
                )}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.015] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge
                      label={c.status_labels[ticket.status]}
                      tone={ticket_status_tone(ticket.status)}
                    />
                    <StatusBadge
                      label={c.priority_labels[ticket.priority]}
                      tone={ticket_priority_tone(ticket.priority)}
                      withDot={false}
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-2 truncate text-sm font-medium text-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {ticket.subject}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.open_by} {ticket.user_name} ·{" "}
                    {format_datetime(ticket.updated_at, locale)}
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
    </div>
  )
}
