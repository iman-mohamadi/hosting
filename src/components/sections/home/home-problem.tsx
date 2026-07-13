"use client"

import {
  ClockCountdown,
  LockOpen,
  WarningCircle,
  WaveSine,
} from "@phosphor-icons/react"

import {
  AnimatedGrid,
  AnimatedGridItem,
} from "@/components/animate-ui/animated-grid"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

import { HomeSectionLabel } from "./home-section-label"

const COPY = {
  en: {
    index: "01",
    label: "The Challenge",
    title: "Infrastructure should get out of your way.",
    statement:
      "Foreign datacenters. Dollar invoices. Support tickets that go nowhere. Iranian teams deserve local latency, Toman billing, and engineers who answer in Persian.",
    icons: [
      { id: "slow", label: "Latency", Icon: ClockCountdown },
      { id: "risk", label: "Exposure", Icon: LockOpen },
      { id: "noise", label: "Noise", Icon: WaveSine },
      { id: "fail", label: "Downtime", Icon: WarningCircle },
    ],
  },
  fa: {
    index: "۰۱",
    label: "چالش",
    title: "زیرساخت نباید مانع شما شود.",
    statement:
      "دیتاسنتر خارجی. صورتحساب دلاری. تیکت‌هایی که بی‌پاسخ می‌مانند. تیم‌های ایرانی شایسته تأخیر پایین محلی، پرداخت تومانی و پشتیبانی فارسی هستند.",
    icons: [
      { id: "slow", label: "تأخیر", Icon: ClockCountdown },
      { id: "risk", label: "ریسک", Icon: LockOpen },
      { id: "noise", label: "شلوغی", Icon: WaveSine },
      { id: "fail", label: "قطعی", Icon: WarningCircle },
    ],
  },
}

export function HomeProblem({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"

  return (
    <section
      id="challenge"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-40"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>
          </Reveal>
          <h2
            className={cn(
              "mt-8 text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            <TextReveal text={copy.title} as="span" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
              {copy.statement}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <AnimatedGrid>
            {copy.icons.map(({ id, label, Icon }) => (
              <AnimatedGridItem key={id} label={label}>
                <Icon weight="duotone" className="size-8" />
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>
        </Reveal>
      </div>
    </section>
  )
}
