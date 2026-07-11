"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChartLineUp,
  ChatsCircle,
  ClipboardText,
  GlobeHemisphereWest,
  GlobeSimple,
  HardDrives,
  List,
  Pulse,
  Receipt,
  ShieldCheck,
  SignOut,
  SquaresFour,
  Stack,
  UserCircle,
  UsersThree,
  X,
} from "@phosphor-icons/react"

import { logout_user } from "@/actions"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Logo } from "@/components/layout/logo"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { getHomePath, localizePathname, stripLocalePrefix } from "@/i18n/routing"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { use_auth_store } from "@/stores/auth-store"
import type { AuthUser } from "@/types/auth"

const ICONS = {
  overview: SquaresFour,
  instances: HardDrives,
  networking: GlobeHemisphereWest,
  dns: GlobeSimple,
  billing: Receipt,
  support: ChatsCircle,
  activity: Pulse,
  account: UserCircle,
  metrics: ChartLineUp,
  users: UsersThree,
  orders: ClipboardText,
  nodes: Stack,
  tickets: ChatsCircle,
  admin: ShieldCheck,
} as const

export type PortalIcon = keyof typeof ICONS

export interface PortalNavItem {
  href: string
  label: string
  icon: PortalIcon
  exact?: boolean
}

interface PortalShellProps {
  locale: Locale
  user: AuthUser
  nav_items: PortalNavItem[]
  portal_label: string
  sign_out_label: string
  variant: "client" | "admin"
  children: React.ReactNode
}

function get_initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "U"
}

function PortalNavList({
  nav_items,
  portal_label,
  locale,
  isRTL,
  variant,
  stripped,
  on_navigate,
}: {
  nav_items: PortalNavItem[]
  portal_label: string
  locale: Locale
  isRTL: boolean
  variant: "client" | "admin"
  stripped: string
  on_navigate?: () => void
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label={portal_label}>
      {nav_items.map((item) => {
        const Icon = ICONS[item.icon]
        const active = item.exact
          ? stripped === item.href
          : stripped === item.href || stripped.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={localizePathname(item.href, locale)}
            onClick={on_navigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
              active
                ? "bg-acid/[0.08] text-foreground"
                : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {active && (
              <motion.span
                layoutId={`portal-active-${variant}`}
                className="absolute inset-y-2 w-0.5 rounded-full bg-acid ltr:left-0 rtl:right-0"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <Icon
              weight={active ? "fill" : "regular"}
              className={cn("size-5 shrink-0", active && "text-acid")}
            />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function PortalUserBlock({
  user,
  isRTL,
  sign_out_label,
  signing_out,
  on_sign_out,
}: {
  user: AuthUser
  isRTL: boolean
  sign_out_label: string
  signing_out: boolean
  on_sign_out: () => void
}) {
  return (
    <div className="flex items-center gap-3 border-t border-white/5 pt-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-acid/15 font-mono text-sm font-semibold text-acid">
        {get_initials(user.full_name)}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm font-medium text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {user.full_name}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {user.email_address}
        </p>
      </div>
      <button
        type="button"
        onClick={on_sign_out}
        disabled={signing_out}
        aria-label={sign_out_label}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground disabled:opacity-50"
      >
        <SignOut className="size-4" />
      </button>
    </div>
  )
}

export function PortalShell({
  locale,
  user,
  nav_items,
  portal_label,
  sign_out_label,
  variant,
  children,
}: PortalShellProps) {
  const isRTL = locale === "fa"
  const pathname = usePathname()
  const router = useRouter()
  const { show_toast } = useToast()
  const clear_session = use_auth_store((state) => state.clear_session)
  const [mobile_open, set_mobile_open] = useState(false)
  const [signing_out, set_signing_out] = useState(false)

  const stripped = stripLocalePrefix(pathname)

  async function handle_sign_out() {
    set_signing_out(true)
    await logout_user()
    clear_session()
    show_toast({
      variant: "success",
      title: locale === "fa" ? "خارج شدید" : "Signed out",
    })
    router.push(localizePathname("/login", locale))
    router.refresh()
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "min-h-svh bg-background text-foreground lg:grid lg:grid-cols-[280px_minmax(0,1fr)]",
        isRTL
          ? "font-[family-name:var(--font-vazirmatn)]"
          : "font-[family-name:var(--font-inter)]",
      )}
    >
      <aside className="sticky top-0 hidden h-svh flex-col border-white/5 p-6 lg:flex ltr:border-r rtl:border-l">
        <div className="mb-8 flex items-center justify-between">
          <Link href={getHomePath(locale)}>
            <Logo locale={locale} />
          </Link>
          {variant === "admin" && (
            <span className="rounded-full bg-acid/15 px-2.5 py-1 font-mono text-[0.6rem] tracking-widest text-acid uppercase">
              Admin
            </span>
          )}
        </div>
        <p className="mb-4 px-4 font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground/60 uppercase">
          {portal_label}
        </p>
        {variant === "admin" && (
          <Link
            href={localizePathname("/dashboard", locale)}
            className="mb-4 px-4 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-acid hover:underline"
          >
            {locale === "fa" ? "داشبورد مشتری" : "Client dashboard"}
          </Link>
        )}
        <PortalNavList
          nav_items={nav_items}
          portal_label={portal_label}
          locale={locale}
          isRTL={isRTL}
          variant={variant}
          stripped={stripped}
        />
        <PortalUserBlock
          user={user}
          isRTL={isRTL}
          sign_out_label={sign_out_label}
          signing_out={signing_out}
          on_sign_out={handle_sign_out}
        />
      </aside>

      <div className="flex min-h-svh flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/5 bg-background/80 px-5 py-4 backdrop-blur-xl lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set_mobile_open(true)}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-foreground lg:hidden"
              aria-label="Open menu"
            >
              <List className="size-4" />
            </button>
            <span className="lg:hidden">
              <Logo locale={locale} />
            </span>
            <p className="hidden font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase lg:block">
              {portal_label}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
          </div>
        </header>

        <main className="flex-1 px-5 py-8 lg:px-10 lg:py-12">{children}</main>
      </div>

      <AnimatePresence>
        {mobile_open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => set_mobile_open(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ ease: EASE_OUT_EXPO, duration: 0.5 }}
              className="absolute inset-y-0 flex w-[82%] max-w-xs flex-col border-white/10 bg-[#050706] p-6 ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l"
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo locale={locale} />
                <button
                  type="button"
                  onClick={() => set_mobile_open(false)}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </button>
              </div>
              <PortalNavList
                nav_items={nav_items}
                portal_label={portal_label}
                locale={locale}
                isRTL={isRTL}
                variant={variant}
                stripped={stripped}
                on_navigate={() => set_mobile_open(false)}
              />
              <PortalUserBlock
                user={user}
                isRTL={isRTL}
                sign_out_label={sign_out_label}
                signing_out={signing_out}
                on_sign_out={handle_sign_out}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
