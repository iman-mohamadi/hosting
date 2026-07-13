"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react"

import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { BRAND } from "@/lib/brand"
import { cn } from "@/lib/utils"

const COPY = {
  en: {
    title: "Ready in minutes.",
    body: "Configure once. Deploy in Tehran or Isfahan. Scale when traffic grows.",
    cta: "Start configuring",
  },
  fa: {
    title: "در چند دقیقه آماده.",
    body: "یک‌بار پیکربندی کنید. در تهران یا اصفهان مستقر شوید. با رشد ترافیک مقیاس دهید.",
    cta: "شروع پیکربندی",
  },
}

export function HomeFinalCta({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <section className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-28 text-center lg:rounded-[2.75rem] lg:py-40">
        <div aria-hidden className="bg-brand absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(40% 60% at 15% 20%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(50% 70% at 85% 90%, rgba(255,255,255,0.35), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_60%_at_50%_50%,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <h2
            className={cn(
              "text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-white",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            <TextReveal text={copy.title} as="span" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-white/85">
              {copy.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex justify-center">
              <Link
                href={localizePathname("/configure", locale)}
                className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-white px-9 text-base font-semibold text-[color:var(--brand-indigo)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                {copy.cta}
                <Arrow
                  weight="bold"
                  className={cn(
                    "size-5 transition-transform duration-300",
                    isRTL
                      ? "group-hover:-translate-x-0.5"
                      : "group-hover:translate-x-0.5",
                  )}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
