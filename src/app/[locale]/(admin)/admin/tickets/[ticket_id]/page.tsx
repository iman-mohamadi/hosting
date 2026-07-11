import { notFound } from "next/navigation"

import { get_admin_page_copy, get_admin_ticket } from "@/actions"
import { AdminTicketThread } from "@/components/admin/admin-ticket-thread"
import { isValidLocale, type Locale } from "@/i18n/config"

interface AdminTicketPageProps {
  params: Promise<{ locale: string; ticket_id: string }>
}

export default async function AdminTicketPage({
  params,
}: AdminTicketPageProps) {
  const { locale: localeParam, ticket_id } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const [ticket, copy] = await Promise.all([
    get_admin_ticket(ticket_id),
    get_admin_page_copy(locale),
  ])

  if (!ticket) {
    notFound()
  }

  return (
    <AdminTicketThread ticket={ticket} copy={copy.tickets} locale={locale} />
  )
}
