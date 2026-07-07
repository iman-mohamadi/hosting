"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Magnetic } from "@/components/ui/motion-primitives"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { getHomePath, localizePathname } from "@/i18n/routing"

interface NavItem {
  label: string
  href: string
}

const navItemsByLocale: Record<Locale, NavItem[]> = {
  fa: [
    { label: "پلن‌ها", href: "/pricing" },
    { label: "پیکربندی", href: "/#configurator" },
    { label: "درباره", href: "/about" },
    { label: "تماس", href: "/contact" },
  ],
  en: [
    { label: "Plans", href: "/pricing" },
    { label: "Configurator", href: "/#configurator" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}

function resolveNavHref(href: string, locale: Locale): string {
  if (href.startsWith("#")) return href
  return localizePathname(href, locale)
}

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const navItems = navItemsByLocale[locale]
  const isRTL = locale === "fa"
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > prev && latest > 200)
    setScrolled(latest > 24)
  })

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      <div
        className={cn(
          "transition-colors duration-500",
          scrolled
            ? "border-b border-border/50 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Magnetic strength={0.25}>
            <Link
              href={getHomePath(locale)}
              data-cursor="hover"
              className={cn(
                "group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              <motion.span
                aria-hidden
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="inline-block text-signal"
              >
                &#9670;
              </motion.span>
              {isRTL ? "هاستینگ" : "Hosting"}
            </Link>
          </Magnetic>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label={isRTL ? "ناوبری اصلی" : "Main navigation"}
          >
            {navItems.map((item) => (
              <Magnetic key={item.href} strength={0.2}>
                <Link
                  href={resolveNavHref(item.href, locale)}
                  data-cursor="hover"
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {item.label}
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={resolveNavHref("/login", locale)}
              data-cursor="hover"
              className={cn(
                "hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {isRTL ? "ورود" : "Sign in"}
            </Link>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>

        {/* scroll progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="h-px origin-[0%] bg-gradient-to-r from-signal via-signal to-transparent rtl:origin-[100%]"
        />
      </div>
    </motion.header>
  )
}
