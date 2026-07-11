import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { get_current_user, get_dashboard_page_copy } from "@/actions"
import {
  PortalShell,
  type PortalNavItem,
} from "@/components/dashboard/portal-shell"
import { isValidLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
}

interface DashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const user = await get_current_user()

  if (!user) {
    redirect(localizePathname("/login", locale))
  }

  const copy = await get_dashboard_page_copy(locale)

  const nav_items: PortalNavItem[] = [
    {
      href: "/dashboard",
      label: copy.nav.overview,
      icon: "overview",
      exact: true,
    },
    {
      href: "/dashboard/instances",
      label: copy.nav.instances,
      icon: "instances",
    },
    {
      href: "/dashboard/orders",
      label: copy.nav.orders,
      icon: "orders",
    },
    {
      href: "/dashboard/networking",
      label: copy.nav.networking,
      icon: "networking",
    },
    { href: "/dashboard/dns", label: copy.nav.dns, icon: "dns" },
    { href: "/dashboard/billing", label: copy.nav.billing, icon: "billing" },
    { href: "/dashboard/support", label: copy.nav.support, icon: "support" },
    {
      href: "/dashboard/activity",
      label: copy.nav.activity,
      icon: "activity",
    },
    { href: "/dashboard/account", label: copy.nav.account, icon: "account" },
  ]

  return (
    <PortalShell
      locale={locale}
      user={user}
      nav_items={nav_items}
      portal_label={copy.portal_label}
      sign_out_label={copy.sign_out}
      variant="client"
    >
      {children}
    </PortalShell>
  )
}
