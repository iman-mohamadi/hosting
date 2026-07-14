"use client"

import Link from "next/link"
import { ChatCircleDots, Headset, Phone, Ticket } from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const SECTION = {
  fa: {
    eyebrow: "پشتیبانی",
    title: "پشتیبانی در هر لحظه، کنار شما",
    subtitle: "تیم فنی ما در تمام روزهای هفته آماده پاسخ‌گویی است.",
    cta: "تماس با پشتیبانی",
    docs: "مطالعه مستندات",
    channels: [
      { icon: <Phone weight="duotone" className="size-6 text-primary" />, title: "تلفنی", body: "گفت‌وگوی مستقیم با کارشناس در ساعات کاری." },
      { icon: <Ticket weight="duotone" className="size-6 text-primary" />, title: "تیکت", body: "پیگیری دقیق درخواست‌ها با ثبت تیکت." },
      { icon: <ChatCircleDots weight="duotone" className="size-6 text-primary" />, title: "گفت‌وگوی آنلاین", body: "پاسخ سریع به پرسش‌های کوتاه در چت." },
      { icon: <Headset weight="duotone" className="size-6 text-primary" />, title: "پشتیبانی پیشرفته", body: "همراهی تخصصی برای پروژه‌های حساس." },
    ],
  },
  en: {
    eyebrow: "Support",
    title: "Support by your side, any time",
    subtitle: "Our technical team is ready to help every day of the week.",
    cta: "Contact support",
    docs: "Read the docs",
    channels: [
      { icon: <Phone weight="duotone" className="size-6 text-primary" />, title: "Phone", body: "Talk directly with a specialist during business hours." },
      { icon: <Ticket weight="duotone" className="size-6 text-primary" />, title: "Tickets", body: "Track requests precisely by opening a ticket." },
      { icon: <ChatCircleDots weight="duotone" className="size-6 text-primary" />, title: "Live chat", body: "Fast answers to quick questions in chat." },
      { icon: <Headset weight="duotone" className="size-6 text-primary" />, title: "Premium support", body: "Expert help for mission-critical projects." },
    ],
  },
}

export function HomeSupport({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa"
  const s = SECTION[locale]

  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
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
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  href={localizePathname("/contact", locale)}
                  variant="brand"
                  size="pill"
                  isRTL={isRTL}
                >
                  {s.cta}
                </MagneticButton>
                <Link
                  href={localizePathname("/docs", locale)}
                  className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground/80 shadow-[var(--shadow-sm)] transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {s.docs}
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {s.channels.map((ch, i) => (
              <Reveal key={ch.title} delay={(i % 2) * 0.08}>
                <div className="card-glossy h-full rounded-2xl p-6">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    {ch.icon}
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{ch.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ch.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
