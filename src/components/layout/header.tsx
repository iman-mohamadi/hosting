"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { List, X } from "@phosphor-icons/react"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Logo } from "@/components/layout/logo"
import { Magnetic } from "@/components/fx/magnetic"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { getHomePath, localizePathname } from "@/i18n/routing"

interface NavItem {
  label: string
  href: string
}

const navItemsByLocale: Record<Locale, NavItem[]> = {
  fa: [
    { label: "پلن‌ها", href: "/pricing" },
    { label: "پیکربندی", href: "/#configurator" },
    { label: "شبکه", href: "/#network" },
    { label: "درباره", href: "/about" },
    { label: "تماس", href: "/contact" },
  ],
  en: [
    { label: "Plans", href: "/pricing" },
    { label: "Configure", href: "/#configurator" },
    { label: "Network", href: "/#network" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}

function resolveNavHref(href: string, locale: Locale): string {
  if (href.startsWith("#")) return href
  if (href.startsWith("/#")) {
    return locale === "fa" ? href : `/${locale}${href}`
  }
  return localizePathname(href, locale)
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
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500",
            "ps-5",
            scrolled
              ? "border border-white/10 bg-background/70 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
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
            {navItems.map((item) => (
              <Magnetic key={item.href} strength={0.2}>
                <Link
                  href={resolveNavHref(item.href, locale)}
                  className="group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-acid/70 transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={localizePathname("/login", locale)}
              className="hidden px-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
            >
              {locale === "fa" ? "ورود" : "Sign in"}
            </Link>
            <LanguageSwitcher locale={locale} />
            <div className="hidden sm:block">
              <MagneticButton
                href={resolveNavHref("/#configurator", locale)}
                size="pill"
                variant="acid"
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
              className="flex size-10 items-center justify-center rounded-full border border-white/10 text-foreground lg:hidden"
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
            className="fixed inset-0 z-[70] bg-[#040605]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-6">
              <div className="flex items-center justify-between">
                <Logo locale={locale} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 text-foreground"
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
                      href={resolveNavHref(item.href, locale)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b border-white/5 py-4 text-4xl font-semibold tracking-tight text-foreground",
                        isRTL && "font-[family-name:var(--font-vazirmatn)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex items-center justify-between py-8">
                <Link
                  href={localizePathname("/login", locale)}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground"
                >
                  {locale === "fa" ? "ورود به حساب" : "Sign in"}
                </Link>
                <MagneticButton
                  href={resolveNavHref("/#configurator", locale)}
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
