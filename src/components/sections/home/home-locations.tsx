"use client"

import Link from "next/link"

import { Reveal } from "@/components/fx/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const SECTION = {
  fa: {
    eyebrow: "لوکیشن‌ها",
    title: "سرور مجازی در لوکیشن‌های متنوع",
    subtitle: "نزدیک‌ترین دیتاسنتر به کاربران خود را انتخاب کنید.",
    vps: "سرور مجازی",
    soon: "به‌زودی",
    off: "تا ۱۹٪ تخفیف",
  },
  en: {
    eyebrow: "Locations",
    title: "Virtual servers across many locations",
    subtitle: "Pick the datacenter closest to your users.",
    vps: "VPS",
    soon: "Soon",
    off: "up to 19% off",
  },
}

interface Loc {
  flag: string
  name: { fa: string; en: string }
  loc?: string
}

const LOCS: Loc[] = [
  { flag: "🇮🇷", name: { fa: "ایران", en: "Iran" }, loc: "iran" },
  { flag: "🇩🇪", name: { fa: "آلمان", en: "Germany" }, loc: "germany" },
  { flag: "🇳🇱", name: { fa: "هلند", en: "Netherlands" }, loc: "netherlands" },
  { flag: "🇹🇷", name: { fa: "ترکیه", en: "Turkey" }, loc: "turkey" },
  { flag: "🇨🇦", name: { fa: "کانادا", en: "Canada" }, loc: "canada" },
  { flag: "🇸🇪", name: { fa: "سوئد", en: "Sweden" } },
  { flag: "🇬🇧", name: { fa: "انگلستان", en: "England" } },
  { flag: "🇫🇷", name: { fa: "فرانسه", en: "France" } },
]

export function HomeLocations({ locale }: { locale: Locale }) {
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

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {LOCS.map((l, i) => {
            const available = Boolean(l.loc)
            const href = localizePathname(available ? `/vps?loc=${l.loc}` : "/vps", locale)
            return (
              <Reveal key={l.name.en} delay={(i % 4) * 0.05}>
                <Link
                  href={href}
                  className="card-glossy group flex h-full items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
                >
                  <span className="text-3xl leading-none">{l.flag}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{l.name[locale]}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.vps}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      available
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {available ? s.off : s.soon}
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
