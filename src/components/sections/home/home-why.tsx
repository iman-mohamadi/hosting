"use client"

import { Buildings, Cpu, Cloud, UsersThree } from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

const SECTION = {
  fa: {
    eyebrow: "چرا پارس‌کلود؟",
    title: "زیرساختی که می‌توانید به آن تکیه کنید",
    subtitle: "سال‌ها تجربه، جامعه‌ای بزرگ و سخت‌افزار روزآمد پشت هر سرویس.",
  },
  en: {
    eyebrow: "Why ParsCloud?",
    title: "Infrastructure you can rely on",
    subtitle: "Years of experience, a large community, and modern hardware behind every service.",
  },
}

interface Stat {
  icon: React.ReactNode
  value: { fa: string; en: string }
  label: { fa: string; en: string }
}

const STATS: Stat[] = [
  {
    icon: <Buildings weight="duotone" className="size-7 text-primary" />,
    value: { fa: "۱۶ سال", en: "16 years" },
    label: { fa: "سابقه درخشان در میزبانی", en: "of hosting excellence" },
  },
  {
    icon: <UsersThree weight="duotone" className="size-7 text-primary" />,
    value: { fa: "۲۰۰٬۰۰۰+", en: "200,000+" },
    label: { fa: "کاربر در جامعه پارس‌کلود", en: "users in our community" },
  },
  {
    icon: <Cloud weight="duotone" className="size-7 text-primary" />,
    value: { fa: "پیشگام", en: "Pioneer" },
    label: { fa: "در فناوری ابری کشور", en: "in local cloud tech" },
  },
  {
    icon: <Cpu weight="duotone" className="size-7 text-primary" />,
    value: { fa: "روزآمد", en: "Modern" },
    label: { fa: "سخت‌افزار نسل جدید", en: "latest-gen hardware" },
  },
]

export function HomeWhy({ locale }: { locale: Locale }) {
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label.en} delay={(i % 4) * 0.06}>
              <div className="card-glossy h-full rounded-3xl p-7 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  {stat.icon}
                </span>
                <p className="mt-5 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                  {stat.value[locale]}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{stat.label[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
