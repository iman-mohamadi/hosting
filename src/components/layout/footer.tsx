"use client"

import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react"

import { Logo } from "@/components/layout/logo"
import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

interface FooterLinkItem {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLinkItem[]
}

interface FooterContent {
  cta_eyebrow: string
  cta_title: string
  cta_button: string
  tagline: string
  columns: FooterColumn[]
  copyright: string
  status_label: string
}

const footerContentByLocale: Record<Locale, FooterContent> = {
  fa: {
    cta_eyebrow: "آماده‌اید؟",
    cta_title: "زیرساخت\nبعدی شما.",
    cta_button: "سرور خود را بسازید",
    tagline: "سرور مجازی ایرانی با پشتیبانی فارسی، قیمت شفاف و دیتاسنتر در تهران.",
    columns: [
      {
        title: "پلتفرم",
        links: [
          { label: "پلن‌ها", href: "/pricing" },
          { label: "پیکربندی", href: "/configure" },
          { label: "مستندات", href: "/docs" },
          { label: "سؤالات متداول", href: "/faq" },
          { label: "وضعیت سرویس", href: "/status" },
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
          { label: "SLA", href: "/sla" },
        ],
      },
    ],
    copyright: "© ۱۴۰۵ پارس‌کلود. تمامی حقوق محفوظ است.",
    status_label: "همه سرویس‌ها عملیاتی",
  },
  en: {
    cta_eyebrow: "Ready?",
    cta_title: "Your next\ninfrastructure.",
    cta_button: "Build your server",
    tagline: "Iranian VPS hosting with Persian support, transparent Toman pricing, and datacenters in Tehran.",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Configure", href: "/configure" },
          { label: "Documentation", href: "/docs" },
          { label: "FAQ", href: "/faq" },
          { label: "System status", href: "/status" },
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
          { label: "SLA", href: "/sla" },
        ],
      },
    ],
    copyright: "© 2026 ParsCloud. All rights reserved.",
    status_label: "All systems operational",
  },
}

function FooterLink({
  href,
  locale,
  children,
}: {
  href: string
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <Link
      href={localizePathname(href, locale)}
      className="group relative inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 h-px w-0 bg-primary/60 transition-all duration-300 ease-out group-hover:w-full ltr:left-0 rtl:right-0"
      />
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
      className="relative mt-auto overflow-hidden border-t border-border"
      aria-label={locale === "fa" ? "پاورقی" : "Footer"}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 0%, color-mix(in srgb, var(--brand-indigo) 16%, transparent), transparent 60%), radial-gradient(50% 70% at 85% 0%, color-mix(in srgb, var(--brand-pink) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8 lg:pt-36">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-6 font-mono text-xs tracking-[0.3em] text-primary uppercase">
                {content.cta_eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={cn(
                  "whitespace-pre-line text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl md:leading-[0.95]",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.cta_title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MagneticButton
              href={localizePathname("/configure", locale)}
              size="xl"
              variant="brand"
              isRTL={isRTL}
            >
              {content.cta_button}
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16 border-t border-border py-20 lg:py-24">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="space-y-5">
              <Logo locale={locale} />
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {content.tagline}
              </p>
              <Link
                href={localizePathname("/status", locale)}
                className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                {content.status_label}
              </Link>
            </div>

            {content.columns.map((column) => (
              <div key={column.title} className="space-y-6 ltr:text-left rtl:text-right">
                <h3 className="font-mono text-xs tracking-[0.2em] text-foreground/40 uppercase">
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
            "flex flex-col gap-4 border-t border-border py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between",
          )}
        >
          <p>{content.copyright}</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-1 font-mono tracking-wider uppercase transition-colors hover:text-foreground"
          >
            {locale === "fa" ? "بازگشت به بالا" : "Back to top"}
            <ArrowUpRight
              weight="bold"
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
