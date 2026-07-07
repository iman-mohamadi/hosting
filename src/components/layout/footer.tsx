"use client"

import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react"

import { Logo } from "@/components/layout/logo"
import { Marquee } from "@/components/fx/marquee"
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
  marquee: string[]
}

const footerContentByLocale: Record<Locale, FooterContent> = {
  fa: {
    cta_eyebrow: "آماده‌اید؟",
    cta_title: "زیرساخت\nبعدی شما.",
    cta_button: "سرور خود را بسازید",
    tagline: "زیرساخت ابری برای تیم‌هایی که سرعت و شفافیت می‌خواهند.",
    columns: [
      {
        title: "پلتفرم",
        links: [
          { label: "پلن‌ها", href: "/pricing" },
          { label: "پیکربندی", href: "/#configurator" },
          { label: "شبکه جهانی", href: "/#network" },
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
    marquee: ["NVMe", "۹۹.۹۹٪ آپتایم", "DDoS Protection", "۱۴ منطقه", "۱۰ Gbps", "استقرار ۶۰ ثانیه‌ای"],
  },
  en: {
    cta_eyebrow: "Ready?",
    cta_title: "Your next\ninfrastructure.",
    cta_button: "Build your server",
    tagline: "Cloud infrastructure for teams that want speed and clarity.",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Configurator", href: "/#configurator" },
          { label: "Global network", href: "/#network" },
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
    marquee: ["NVMe", "99.99% uptime", "DDoS protection", "14 regions", "10 Gbps", "60s deploy"],
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
  const resolvedHref = href.startsWith("/#")
    ? locale === "fa"
      ? href
      : `/${locale}${href}`
    : localizePathname(href, locale)

  return (
    <Link
      href={resolvedHref}
      className="group relative inline-flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 h-px w-0 bg-acid/60 transition-all duration-300 ease-out group-hover:w-full ltr:left-0 rtl:right-0"
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
  const configuratorHref = isRTL ? "/#configurator" : "/en/#configurator"

  return (
    <footer
      id="contact"
      className="relative mt-auto overflow-hidden border-t border-white/10"
      aria-label={locale === "fa" ? "پاورقی" : "Footer"}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,oklch(0.88_0.21_128/0.1),transparent)]"
      />

      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8 lg:pt-40">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-6 font-mono text-xs tracking-[0.3em] text-acid uppercase">
                {content.cta_eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={cn(
                  "whitespace-pre-line text-6xl font-semibold tracking-tight text-foreground sm:text-7xl md:text-8xl md:leading-[0.9]",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.cta_title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MagneticButton href={configuratorHref} size="xl" isRTL={isRTL}>
              {content.cta_button}
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      {/* marquee divider */}
      <div className="border-y border-white/10 py-6">
        <Marquee
          items={content.marquee}
          className="text-sm font-medium tracking-wide text-muted-foreground"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16 py-20 lg:py-28">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="space-y-5">
              <Logo locale={locale} />
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {content.tagline}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-acid/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-acid" />
                </span>
                {content.status_label}
              </div>
            </div>

            {content.columns.map((column) => (
              <div key={column.title} className="space-y-6 ltr:text-left rtl:text-right">
                <h3 className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase">
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

        {/* giant wordmark */}
        <div aria-hidden className="mask-b select-none pb-4">
          <span
            className={cn(
              "block bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text text-center text-[22vw] font-bold leading-none tracking-tighter text-transparent",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {locale === "fa" ? "هاستینگ" : "Hosting"}
          </span>
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-muted-foreground/70 md:flex-row md:items-center md:justify-between",
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
