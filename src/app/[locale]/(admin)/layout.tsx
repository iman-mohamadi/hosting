import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { get_admin_page_copy, get_current_user } from "@/actions"
import {
  PortalShell,
  type PortalNavItem,
} from "@/components/dashboard/portal-shell"
import { isValidLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Backoffice",
  robots: { index: false, follow: false },
}

interface AdminLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const user = await get_current_user()

  if (!user) {
    redirect(localizePathname("/login", locale))
  }

  if (user.role !== "admin") {
    redirect(localizePathname("/dashboard", locale))
  }

  const copy = await get_admin_page_copy(locale)

  const nav_items: PortalNavItem[] = [
    { href: "/admin", label: copy.nav.dashboard, icon: "metrics", exact: true },
    { href: "/admin/users", label: copy.nav.users, icon: "users" },
    { href: "/admin/orders", label: copy.nav.orders, icon: "orders" },
    { href: "/admin/nodes", label: copy.nav.nodes, icon: "nodes" },
    { href: "/admin/tickets", label: copy.nav.tickets, icon: "tickets" },
  ]

  return (
    <PortalShell
      locale={locale}
      user={user}
      nav_items={nav_items}
      portal_label={copy.portal_label}
      sign_out_label={copy.sign_out}
      variant="admin"
    >
      {children}
    </PortalShell>
  )
}
