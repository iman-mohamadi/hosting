import { notFound } from "next/navigation"

import { get_dashboard_page_copy, get_ticket } from "@/actions"
import { TicketThread } from "@/components/dashboard/ticket-thread"
import { isValidLocale, type Locale } from "@/i18n/config"

interface TicketPageProps {
  params: Promise<{ locale: string; ticket_id: string }>
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { locale: localeParam, ticket_id } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const [ticket, copy] = await Promise.all([
    get_ticket(ticket_id),
    get_dashboard_page_copy(locale),
  ])

  if (!ticket) {
    notFound()
  }

  return <TicketThread ticket={ticket} copy={copy.support} locale={locale} />
}
