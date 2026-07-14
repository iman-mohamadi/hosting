"use client"

import Link from "next/link"
import { ArrowRight, Cloud, Globe, HardDrives, Stack } from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const SECTION = {
  fa: {
    eyebrow: "محصولات",
    title: "هرچه برای آنلاین‌شدن لازم دارید",
    subtitle: "از سرور و هاست تا دامنه و خدمات ابری، همه در یک‌جا.",
  },
  en: {
    eyebrow: "Products",
    title: "Everything you need to go online",
    subtitle: "Servers, hosting, domains, and cloud services — all in one place.",
  },
}

interface Card {
  icon: React.ReactNode
  title: { fa: string; en: string }
  body: { fa: string; en: string }
  href: string
}

const CARDS: Card[] = [
  {
    icon: <HardDrives weight="duotone" className="size-7 text-primary" />,
    title: { fa: "انواع سرور ابری، مجازی و اختصاصی", en: "Cloud, virtual & dedicated servers" },
    body: { fa: "منابع تضمین‌شده با ارتقای آنی و کنترل کامل.", en: "Guaranteed resources with instant scaling and full control." },
    href: "/vps",
  },
  {
    icon: <Cloud weight="duotone" className="size-7 text-primary" />,
    title: { fa: "انواع هاستینگ از اشتراکی تا اختصاصی", en: "Hosting from shared to dedicated" },
    body: { fa: "میزبانی سریع و پایدار برای هر نوع وب‌سایت.", en: "Fast, stable hosting for any kind of site." },
    href: "/host/cloud-host",
  },
  {
    icon: <Stack weight="duotone" className="size-7 text-primary" />,
    title: { fa: "فضای ذخیره‌سازی ابری", en: "Cloud storage solutions" },
    body: { fa: "ذخیره‌سازی سازگار با S3 برای فایل و بک‌آپ.", en: "S3-compatible storage for files and backups." },
    href: "/cloud-storage",
  },
  {
    icon: <Globe weight="duotone" className="size-7 text-primary" />,
    title: { fa: "متنوع‌ترین پسوندها برای انتخاب دامنه", en: "The widest range of domain TLDs" },
    body: { fa: "جستجو و ثبت آنی ir.، com. و ده‌ها پسوند دیگر.", en: "Search and register .ir, .com, and dozens more instantly." },
    href: "/domain",
  },
]

export function HomeProductShowcase({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa"
  const s = SECTION[locale]

  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-28">
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

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.href} delay={(i % 2) * 0.08}>
              <Link
                href={localizePathname(card.href, locale)}
                className="card-glossy group flex h-full items-start gap-5 rounded-3xl p-7 transition-transform hover:-translate-y-1"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  {card.icon}
                </span>
                <div className="flex-1">
                  <h3
                    className={cn(
                      "text-lg font-semibold tracking-tight",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {card.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.body[locale]}
                  </p>
                </div>
                <ArrowRight
                  weight="bold"
                  className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
