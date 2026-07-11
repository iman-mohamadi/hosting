import { notFound } from "next/navigation"

import { get_admin_page_copy, get_admin_users } from "@/actions"
import { PortalPageHeader } from "@/components/dashboard/dashboard-ui"
import { AdminUsersTable } from "@/components/admin/admin-users-table"
import { isValidLocale, type Locale } from "@/i18n/config"

interface AdminUsersPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminUsersPage({ params }: AdminUsersPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [users, copy] = await Promise.all([
    get_admin_users(),
    get_admin_page_copy(locale),
  ])

  return (
    <div>
      <PortalPageHeader
        title={copy.users.title}
        subtitle={copy.users.subtitle}
        isRTL={isRTL}
      />
      <AdminUsersTable users={users} copy={copy.users} locale={locale} />
    </div>
  )
}
