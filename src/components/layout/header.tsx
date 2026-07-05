import Link from "next/link"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
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
    { label: "درباره ما", href: "/about" },
    { label: "تماس", href: "/contact" },
  ],
  en: [
    { label: "Plans", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}

function resolveNavHref(href: string, locale: Locale): string {
  if (href.startsWith("#")) {
    return href
  }

  return localizePathname(href, locale)
}

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const navItems = navItemsByLocale[locale]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40",
        "bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href={getHomePath(locale)}
          className="text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="font-mono text-xs text-muted-foreground ltr:mr-2 rtl:ml-2">
            ◆
          </span>
          {locale === "fa" ? "هاستینگ" : "Hosting"}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={locale === "fa" ? "ناوبری اصلی" : "Main navigation"}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={resolveNavHref(item.href, locale)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  )
}
