"use client"

import { Check } from "@phosphor-icons/react"

import CloudFlow from "@/components/ui/cloud-flow"
import CpuArchitecture from "@/components/ui/cpu-architecture"
import DataFeedingIn from "@/components/ui/data-feeding-in"
import { Reveal } from "@/components/fx/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

interface Feature {
  eyebrow: { fa: string; en: string }
  title: { fa: string; en: string }
  body: { fa: string; en: string }
  bullets: { fa: string; en: string }[]
  visual: React.ReactNode
}

const SECTION = {
  fa: {
    eyebrow: "زیرساخت",
    title: "زیرساختی که پشت هر سرویس می‌درخشد",
    subtitle:
      "از مسیریابی ترافیک تا پردازش و ذخیره‌سازی داده — همه‌چیز روی بستری ابری، سریع و پایدار اجرا می‌شود.",
  },
  en: {
    eyebrow: "Infrastructure",
    title: "The infrastructure behind every service",
    subtitle:
      "From traffic routing to compute and data storage — everything runs on a fast, stable cloud platform.",
  },
}

const FEATURES: Feature[] = [
  {
    eyebrow: { fa: "شبکه ابری", en: "Cloud network" },
    title: { fa: "معماری ابری توزیع‌شده", en: "Distributed cloud architecture" },
    body: {
      fa: "سرویس‌های شما میان چند دیتاسنتر توزیع و ترافیک به‌صورت هوشمند به نزدیک‌ترین و سالم‌ترین گره هدایت می‌شود.",
      en: "Your services are distributed across datacenters and traffic is routed to the nearest, healthiest node.",
    },
    bullets: [
      { fa: "مسیریابی هوشمند ترافیک", en: "Smart traffic routing" },
      { fa: "هم‌گام‌سازی چند-منطقه", en: "Multi-region sync" },
      { fa: "پایداری در برابر خطا", en: "Fault tolerance" },
    ],
    visual: (
      <CloudFlow
        title="معماری ابری پارس‌کلود"
        centerText="ابر"
        nodeLabels={{ topLeft: "API", topRight: "CDN", bottomLeft: "DB", bottomRight: "APP" }}
        badges={{ left: "ترافیک زنده", right: "هم‌گام‌سازی" }}
      />
    ),
  },
  {
    eyebrow: { fa: "پردازش", en: "Compute" },
    title: { fa: "پردازش قدرتمند و اختصاصی", en: "Powerful, dedicated compute" },
    body: {
      fa: "هسته‌های پردازشی تضمین‌شده روی بستر KVM با معماری بهینه؛ بدون همسایه پر سر و صدا و با امکان ارتقای آنی.",
      en: "Guaranteed cores on KVM with an optimized architecture — no noisy neighbors, with instant scaling.",
    },
    bullets: [
      { fa: "پردازنده و رم اختصاصی", en: "Dedicated CPU & RAM" },
      { fa: "دیسک NVMe فوق‌سریع", en: "Ultra-fast NVMe disk" },
      { fa: "ارتقای آنی منابع", en: "Instant resource scaling" },
    ],
    visual: (
      <div className="w-full max-w-[460px]">
        <CpuArchitecture text="vCPU" className="h-auto w-full" />
      </div>
    ),
  },
  {
    eyebrow: { fa: "داده", en: "Data" },
    title: { fa: "جریان بی‌وقفه داده", en: "Uninterrupted data flow" },
    body: {
      fa: "داده‌ها لحظه‌ای دریافت، پردازش و روی فضای ذخیره‌سازی سازگار با S3 نوشته می‌شوند؛ با پشتیبان‌گیری خودکار.",
      en: "Data is ingested, processed, and written to S3-compatible storage in real time — with automatic backups.",
    },
    bullets: [
      { fa: "دریافت لحظه‌ای داده", en: "Real-time ingestion" },
      { fa: "ذخیره‌سازی سازگار با S3", en: "S3-compatible storage" },
      { fa: "پشتیبان‌گیری خودکار", en: "Automatic backups" },
    ],
    visual: (
      <div className="flex h-[380px] items-center justify-center">
        <DataFeedingIn />
      </div>
    ),
  },
]

export function HomeCapabilities({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa"
  const s = SECTION[locale]

  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
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

        <div className="mt-20 space-y-20 lg:space-y-28">
          {FEATURES.map((f, i) => {
            const flip = i % 2 === 1
            return (
              <div
                key={f.title.en}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={cn(flip && "lg:order-2")}>
                  <div>
                    <Eyebrow>{f.eyebrow[locale]}</Eyebrow>
                    <h3
                      className={cn(
                        "mt-5 text-2xl font-semibold tracking-tight sm:text-3xl",
                        isRTL && "font-[family-name:var(--font-vazirmatn)]",
                      )}
                    >
                      {f.title[locale]}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {f.body[locale]}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {f.bullets.map((b) => (
                        <li key={b.en} className="flex items-center gap-2.5 text-sm text-foreground/80">
                          <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                            <Check weight="bold" className="size-3 text-primary" />
                          </span>
                          {b[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
                  <div className="card-glossy flex min-h-[380px] items-center justify-center overflow-hidden rounded-3xl p-6">
                    {f.visual}
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
