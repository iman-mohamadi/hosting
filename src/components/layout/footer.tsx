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
  wordmark: string
  columns: FooterColumn[]
  copyright: string
  status_label: string
}

const footerContentByLocale: Record<Locale, FooterContent> = {
  fa: {
    tagline: "زیرساخت ابری برای تیم‌هایی که سرعت و شفافیت می‌خواهند.",
    wordmark: "هاستینگ",
    columns: [
      {
        title: "پلتفرم",
        links: [
          { label: "پلن‌ها", href: "/pricing" },
          { label: "پیکربندی", href: "/#configurator" },
          { label: "ورود", href: "/login" },
        ],
      },
      {
        title: "شرکت",
        links: [
          { label: "درباره ما", href: "/about" },
          { label: "تماس", href: "/contact" },
          { label: "ثبت‌نام", href: "/register" },
        ],
      },
      {
        title: "قوانین",
        links: [
          { label: "شرایط", href: "/terms" },
          { label: "حریم خصوصی", href: "/privacy" },
        ],
      },
    ],
    copyright: "© ۱۴۰۵ هاستینگ. تمامی حقوق محفوظ است.",
    status_label: "شبکه پایدار و آماده",
  },
  en: {
    tagline: "Cloud infrastructure for teams that want speed and clarity.",
    wordmark: "Hosting",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Configurator", href: "/#configurator" },
          { label: "Sign in", href: "/login" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Create account", href: "/register" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms", href: "/terms" },
          { label: "Privacy", href: "/privacy" },
        ],
      },
    ],
    copyright: "© 2026 Hosting. All rights reserved.",
    status_label: "Network live and healthy",
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
      data-cursor="hover"
      className={cn(
        "group relative inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground",
        "transition-colors duration-300 hover:text-foreground",
      )}
    >
      <span
        aria-hidden
        className="h-1 w-1 rounded-full bg-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </Link>
  )
}

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const content = footerContentByLocale[locale]
  const isRTL = locale === "fa"

  return (
    <footer
      id="contact"
      className="relative z-10 mt-auto overflow-hidden border-t border-border/50"
      aria-label={isRTL ? "پاورقی" : "Footer"}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[80rem] -translate-x-1/2 rounded-full bg-signal/[0.05] blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 py-24 md:py-28 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          {/* left: statement */}
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.25em] text-muted-foreground uppercase">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
                </span>
                {content.status_label}
              </div>
              <p
                className={cn(
                  "max-w-sm text-lg leading-relaxed text-foreground/80",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.tagline}
              </p>
            </div>

            <Link
              href={getHomePath(locale)}
              data-cursor="hover"
              aria-label={content.wordmark}
              className={cn(
                "block w-full text-[clamp(3.5rem,13vw,9rem)] leading-[0.85] font-semibold tracking-tighter text-foreground/90 transition-colors hover:text-foreground",
                isRTL
                  ? "font-[family-name:var(--font-vazirmatn)]"
                  : "font-display italic",
              )}
            >
              {content.wordmark}
              <span className="text-signal">.</span>
            </Link>
          </div>

          {/* right: link columns */}
          <div
            className={cn(
              "grid grid-cols-2 gap-10 sm:grid-cols-3",
              "ltr:text-left rtl:text-right",
            )}
          >
            {content.columns.map((column) => (
              <div key={column.title} className="space-y-6">
                <h3
                  className={cn(
                    "text-xs font-medium tracking-[0.2em] text-signal uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
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
            "flex flex-col gap-4 border-t border-border/30 py-8",
            "text-xs text-muted-foreground/70",
            "md:flex-row md:items-center md:justify-between",
            "ltr:md:text-left rtl:md:text-right",
          )}
        >
          <p className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}>
            {content.copyright}
          </p>
          <p className="font-mono tracking-wider uppercase opacity-60">
            {isRTL ? "بتای خصوصی" : "Private beta"}
          </p>
        </div>
      </div>
    </footer>
  )
}
