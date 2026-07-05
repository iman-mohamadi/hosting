import Link from "next/link"

import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { getHomePath, localizePathname } from "@/i18n/routing"

interface FooterLinkItem {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLinkItem[]
}

interface FooterContent {
  tagline: string
  columns: FooterColumn[]
  copyright: string
  status_label: string
}

const footerContentByLocale: Record<Locale, FooterContent> = {
  fa: {
    tagline: "زیرساخت ابری، ساده و قدرتمند.",
    columns: [
      {
        title: "محصول",
        links: [
          { label: "پلن‌ها", href: "/pricing" },
          { label: "ویژگی‌ها", href: "/features" },
          { label: "پیکربندی VPS", href: "/configure" },
        ],
      },
      {
        title: "شرکت",
        links: [
          { label: "درباره ما", href: "/about" },
          { label: "تماس", href: "/contact" },
          { label: "وضعیت سرویس", href: "/status" },
        ],
      },
      {
        title: "قوانین",
        links: [
          { label: "شرایط استفاده", href: "/terms" },
          { label: "حریم خصوصی", href: "/privacy" },
        ],
      },
    ],
    copyright: "© ۱۴۰۵ هاستینگ. تمامی حقوق محفوظ است.",
    status_label: "همه سرویس‌ها فعال",
  },
  en: {
    tagline: "Cloud infrastructure, distilled.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Features", href: "/features" },
          { label: "Configure VPS", href: "/configure" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Status", href: "/status" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
    ],
    copyright: "© 2026 Hosting. All rights reserved.",
    status_label: "All systems operational",
  },
}

interface FooterLinkProps {
  href: string
  locale: Locale
  children: React.ReactNode
}

function FooterLink({ href, locale, children }: FooterLinkProps) {
  const resolvedHref = href.startsWith("#")
    ? href
    : localizePathname(href, locale)

  return (
    <Link
      href={resolvedHref}
      className={cn(
        "group relative inline-flex w-fit text-sm text-muted-foreground",
        "transition-colors duration-300 hover:text-foreground",
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 h-px w-0 bg-foreground/50 transition-all duration-300 ease-out",
          "group-hover:w-full ltr:left-0 rtl:right-0",
        )}
      />
    </Link>
  )
}

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const content = footerContentByLocale[locale]

  return (
    <footer
      id="contact"
      className="mt-auto border-t border-border/30"
      aria-label={locale === "fa" ? "پاورقی" : "Footer"}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16 py-24 md:py-32 lg:py-40">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <Link
                href={getHomePath(locale)}
                className="inline-block text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
              >
                {locale === "fa" ? "هاستینگ" : "Hosting"}
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {content.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {content.status_label}
            </div>
          </div>

          <div
            className={cn(
              "grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-24",
              "ltr:text-left rtl:text-right",
            )}
          >
            {content.columns.map((column) => (
              <div key={column.title} className="space-y-6">
                <h3 className="text-xs font-medium tracking-[0.2em] text-foreground/60 uppercase">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href} locale={locale}>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 border-t border-border/20 py-8",
            "text-xs text-muted-foreground/70",
            "md:flex-row md:items-center md:justify-between",
            "ltr:md:text-left rtl:md:text-right",
          )}
        >
          <p>{content.copyright}</p>
          <p className="font-mono tracking-wider uppercase opacity-60">
            {locale === "fa" ? "نسخه ۰.۱.۰" : "v0.1.0"}
          </p>
        </div>
      </div>
    </footer>
  )
}
