"use client"

import Link from "next/link"
import {
  Cloud,
  CloudArrowDown,
  Cpu,
  Globe,
  HardDrives,
  LockKey,
  Package,
  ShieldCheck,
  Stack,
  Storefront,
  Browser,
  Broadcast,
} from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const SECTION = {
  fa: {
    eyebrow: "خدمات",
    title: "جعبه‌ابزاری به وسعت کسب‌وکار شما",
    subtitle: "هر آنچه برای ساخت، اجرا و رشد نیاز دارید، یک‌جا و یکپارچه.",
    off: "تخفیف",
  },
  en: {
    eyebrow: "Services",
    title: "A toolbox as broad as your business",
    subtitle: "Everything to build, run, and grow — in one integrated place.",
    off: "off",
  },
}

interface Tile {
  icon: React.ReactNode
  label: { fa: string; en: string }
  href: string
  discount?: number
}

const TILES: Tile[] = [
  { icon: <HardDrives weight="duotone" />, label: { fa: "سرور اختصاصی", en: "Dedicated server" }, href: "/dedicated-servers", discount: 19 },
  { icon: <Cpu weight="duotone" />, label: { fa: "سرور مجازی", en: "VPS" }, href: "/vps", discount: 19 },
  { icon: <Cloud weight="duotone" />, label: { fa: "سرور ابری", en: "Cloud server" }, href: "/cloud-server" },
  { icon: <LockKey weight="duotone" />, label: { fa: "گواهی SSL", en: "SSL certificate" }, href: "/ssl" },
  { icon: <Browser weight="duotone" />, label: { fa: "هاست وردپرس", en: "WordPress hosting" }, href: "/host/wordpress", discount: 19 },
  { icon: <Storefront weight="duotone" />, label: { fa: "هاست ووکامرس", en: "WooCommerce hosting" }, href: "/host/woocommerce" },
  { icon: <Globe weight="duotone" />, label: { fa: "ثبت دامنه ir.", en: ".ir domain" }, href: "/domain?tld=ir" },
  { icon: <Globe weight="duotone" />, label: { fa: "ثبت دامنه com.", en: ".com domain" }, href: "/domain?tld=com" },
  { icon: <Package weight="duotone" />, label: { fa: "پلتفرم PaaS", en: "PaaS" }, href: "/paas" },
  { icon: <Broadcast weight="duotone" />, label: { fa: "شبکه CDN", en: "CDN" }, href: "/cdn" },
  { icon: <CloudArrowDown weight="duotone" />, label: { fa: "هاست دانلود", en: "Download hosting" }, href: "/host/download-host" },
  { icon: <Stack weight="duotone" />, label: { fa: "فضای ابری", en: "Object storage" }, href: "/cloud-storage" },
]

export function HomeToolbox({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa"
  const s = SECTION[locale]

  return (
    <section className="border-t border-border bg-muted/30 px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>{s.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className={cn(
                "mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-tight",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {s.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TILES.map((tile, i) => (
            <Reveal key={tile.href + tile.label.en} delay={(i % 4) * 0.05}>
              <Link
                href={localizePathname(tile.href, locale)}
                className="card-glossy group relative flex h-full flex-col items-start gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                {tile.discount && (
                  <span className="absolute end-4 top-4 rounded-full bg-[color-mix(in_oklch,var(--brand-pink),transparent_85%)] px-2 py-0.5 text-[10px] font-medium text-[var(--brand-pink)]">
                    {locale === "fa" ? `تا ${tile.discount.toLocaleString("fa-IR")}٪ ${s.off}` : `up to ${tile.discount}% ${s.off}`}
                  </span>
                )}
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:size-6">
                  {tile.icon}
                </span>
                <span className="text-sm font-medium text-foreground">{tile.label[locale]}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
