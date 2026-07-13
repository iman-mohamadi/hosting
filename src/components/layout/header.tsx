"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { List, X } from "@phosphor-icons/react"

import { CartButton } from "@/components/layout/cart-button"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Logo } from "@/components/layout/logo"
import { ProductsMenu } from "@/components/layout/products-menu"
import { Magnetic } from "@/components/fx/magnetic"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { getHomePath, localizePathname } from "@/i18n/routing"
import { use_auth_store } from "@/stores/auth-store"

interface NavItem {
  label: string
  href: string
}

const navItemsByLocale: Record<Locale, NavItem[]> = {
  fa: [
    { label: "هاست", href: "/host/cloud-host" },
    { label: "سرور", href: "/vps" },
    { label: "دامنه", href: "/domain" },
    { label: "پلن‌ها", href: "/pricing" },
    { label: "مستندات", href: "/docs" },
  ],
  en: [
    { label: "Hosting", href: "/host/cloud-host" },
    { label: "Servers", href: "/vps" },
    { label: "Domains", href: "/domain" },
    { label: "Plans", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ],
}

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const navItems = navItemsByLocale[locale]
  const isRTL = locale === "fa"
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const user = use_auth_store((state) => state.user)
  const is_hydrated = use_auth_store((state) => state.is_hydrated)
  const is_signed_in = is_hydrated && user !== null
  const account_href = localizePathname(
    user?.role === "admin" ? "/admin" : "/dashboard",
    locale,
  )
  const account_label = is_signed_in
    ? locale === "fa"
      ? "داشبورد"
      : "Dashboard"
    : locale === "fa"
      ? "ورود"
      : "Sign in"
  const account_target = is_signed_in
    ? account_href
    : localizePathname("/login", locale)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open)
    return () => document.documentElement.classList.remove("lenis-stopped")
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <motion.div
          initial={reduced ? false : { y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 ps-5 transition-all duration-500",
            scrolled
              ? "glass"
              : "border border-transparent bg-transparent shadow-none",
          )}
        >
          <Magnetic strength={0.25}>
            <Link
              href={getHomePath(locale)}
              className="transition-opacity hover:opacity-80"
              aria-label={locale === "fa" ? "خانه" : "Home"}
            >
              <Logo locale={locale} />
            </Link>
          </Magnetic>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={locale === "fa" ? "ناوبری اصلی" : "Main navigation"}
          >
            <ProductsMenu locale={locale} />
            {navItems.map((item) => (
              <Magnetic key={item.href} strength={0.2}>
                <Link
                  href={localizePathname(item.href, locale)}
                  className="group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-px origin-center scale-x-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={account_target}
              className="hidden px-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
            >
              {account_label}
            </Link>
            <CartButton locale={locale} />
            <LanguageSwitcher locale={locale} />
            <div className="hidden sm:block">
              <MagneticButton
                href={localizePathname("/configure", locale)}
                size="pill"
                variant="brand"
                isRTL={isRTL}
                className="h-10 px-5 text-sm"
                withArrow={false}
              >
                {locale === "fa" ? "شروع" : "Deploy"}
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-white/70 text-foreground backdrop-blur lg:hidden"
              aria-label={locale === "fa" ? "باز کردن منو" : "Open menu"}
            >
              <List weight="bold" className="size-5" />
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] overflow-hidden lg:hidden"
          >
            <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl" />
            <div
              aria-hidden
              className="mesh pointer-events-none absolute inset-0 opacity-60"
            />
            <div className="relative flex h-full flex-col px-6 pt-6">
              <div className="flex items-center justify-between">
                <Logo locale={locale} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-white/70 text-foreground"
                  aria-label={locale === "fa" ? "بستن منو" : "Close menu"}
                >
                  <X weight="bold" className="size-5" />
                </button>
              </div>

              <nav
                className="mt-16 flex flex-1 flex-col gap-2"
                aria-label={locale === "fa" ? "ناوبری موبایل" : "Mobile navigation"}
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, ease: EASE_OUT_EXPO, duration: 0.6 }}
                  >
                    <Link
                      href={localizePathname(item.href, locale)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b border-border/70 py-4 text-4xl font-semibold tracking-tight text-foreground",
                        isRTL && "font-[family-name:var(--font-vazirmatn)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex items-center justify-between py-8">
                <div className="flex items-center gap-4">
                  <Link
                    href={account_target}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground"
                  >
                    {account_label}
                  </Link>
                  <Link
                    href={localizePathname("/cart", locale)}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground"
                  >
                    {locale === "fa" ? "سبد خرید" : "Cart"}
                  </Link>
                </div>
                <MagneticButton
                  href={localizePathname("/configure", locale)}
                  variant="brand"
                  isRTL={isRTL}
                  onClick={() => setOpen(false)}
                >
                  {locale === "fa" ? "شروع کنید" : "Deploy now"}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
