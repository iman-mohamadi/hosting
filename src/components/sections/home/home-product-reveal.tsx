"use client"

import { useMemo } from "react"
import {
  Cpu,
  HardDrives,
  Network,
  Lightning,
} from "@phosphor-icons/react"

import { Dock } from "@/components/animate-ui/dock"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

import { HomeSectionLabel } from "./home-section-label"
import { useScrollSection } from "./use-scroll-section"

const COPY = {
  en: {
    index: "02",
    label: "The Solution",
    title: "Quiet power. Clear control.",
    features: [
      {
        id: "cpu",
        label: "Compute",
        title: "Dedicated vCPU",
        body: "Guaranteed cores on KVM — no noisy neighbors under load.",
      },
      {
        id: "ram",
        label: "Memory",
        title: "DDR4 ECC",
        body: "Stable memory for production apps that cannot afford silent errors.",
      },
      {
        id: "disk",
        label: "Storage",
        title: "Local NVMe",
        body: "Fast boots and low I/O latency on locally attached flash.",
      },
      {
        id: "net",
        label: "Network",
        title: "1 Gbps uplink",
        body: "Low-latency paths across Tehran, Isfahan, and EU backup.",
      },
    ],
  },
  fa: {
    index: "۰۲",
    label: "راه‌حل",
    title: "قدرت آرام. کنترل شفاف.",
    features: [
      {
        id: "cpu",
        label: "پردازش",
        title: "vCPU اختصاصی",
        body: "هسته تضمین‌شده روی KVM — بدون همسایه پر سر و صدا زیر بار.",
      },
      {
        id: "ram",
        label: "حافظه",
        title: "DDR4 ECC",
        body: "حافظه پایدار برای اپلیکیشن‌هایی که خطای خاموش نمی‌توانند تحمل کنند.",
      },
      {
        id: "disk",
        label: "ذخیره",
        title: "NVMe محلی",
        body: "بوت سریع و تأخیر I/O پایین روی فلش متصل محلی.",
      },
      {
        id: "net",
        label: "شبکه",
        title: "آپلینک ۱ گیگابیت",
        body: "مسیرهای کم‌تأخیر در تهران، اصفهان و پشتیبان اروپا.",
      },
    ],
  },
}

const ICONS = {
  cpu: Cpu,
  ram: Lightning,
  disk: HardDrives,
  net: Network,
} as const

export function HomeProductReveal({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"
  const { ref, progress } = useScrollSection({
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  })

  const featureIndex = Math.min(
    copy.features.length - 1,
    Math.floor(progress * copy.features.length),
  )
  const active = copy.features[featureIndex]
  const ActiveIcon = ICONS[active.id as keyof typeof ICONS]

  const cpu_cores = useMemo(() => Math.round(2 + progress * 6), [progress])
  const ram_gb = useMemo(() => Math.round(4 + progress * 28), [progress])
  const activeCores = Math.max(1, Math.min(8, cpu_cores))
  const revealPct = Math.min(100, Math.max(8, progress * 110))

  const fmt = (n: number) =>
    isRTL ? n.toLocaleString("fa-IR") : String(n)

  const dockItems = copy.features.map((f) => {
    const Icon = ICONS[f.id as keyof typeof ICONS]
    return {
      id: f.id,
      label: f.label,
      icon: <Icon weight="duotone" className="size-5" />,
    }
  })

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden border-y border-border bg-muted/30 py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>
            </Reveal>
            <h2
              className={cn(
                "mt-6 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              <TextReveal text={copy.title} as="span" />
            </h2>

            <div className="mt-10 min-h-[8rem]">
              <p className="font-mono text-[11px] tracking-[0.25em] text-primary uppercase">
                {active.label}
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {active.title}
              </p>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
                {active.body}
              </p>
            </div>

            <div className="mt-10">
              <Dock items={dockItems} activeId={active.id} />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="rounded-3xl border border-border bg-card p-8 shadow-[0_40px_80px_-60px_rgba(0,0,0,0.45)] md:p-10"
              style={{
                clipPath: isRTL
                  ? `inset(0 ${100 - revealPct}% 0 0)`
                  : `inset(0 0 0 ${100 - revealPct}%)`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                  {isRTL ? "داشبورد" : "Dashboard"}
                </span>
                <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <ActiveIcon weight="fill" className="size-3.5 text-primary" />
                  {isRTL ? "فعال" : "Live"}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-2.5" aria-hidden>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-lg border transition-colors duration-300",
                      i < activeCores
                        ? "border-primary/30 bg-primary/15"
                        : "border-border bg-muted/60",
                    )}
                  />
                ))}
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8">
                <div>
                  <dt className="text-xs text-muted-foreground">CPU</dt>
                  <dd
                    className={cn(
                      "mt-1 text-3xl font-semibold tracking-tight tabular-nums",
                      !isRTL && "font-mono",
                    )}
                  >
                    {fmt(cpu_cores)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">RAM</dt>
                  <dd
                    className={cn(
                      "mt-1 text-3xl font-semibold tracking-tight tabular-nums",
                      !isRTL && "font-mono",
                    )}
                  >
                    {fmt(ram_gb)}
                    <span className="ms-1 text-sm font-normal text-muted-foreground">
                      GB
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
