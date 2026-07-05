"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

/* ─── shared helpers ───────────────────────────────────────────────── */

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── copy maps ────────────────────────────────────────────────────── */

const FEATURES = {
  en: {
    eyebrow: "Infrastructure",
    title: "Built for load.\nShaped for clarity.",
    subtitle:
      "Enterprise-grade hardware, developer-friendly pricing, and the kind of simplicity that keeps teams moving.",
    cards: [
      {
        stat: "NVMe",
        label: "Pure NVMe storage",
        body: "No spinning disks. No bottlenecks. Every node runs enterprise-class NVMe with sub-millisecond latency.",
      },
      {
        stat: "99.99%",
        label: "99.99% uptime",
        body: "Redundant power, cooling, and networking are built into every datacenter. Your infra never blinks.",
      },
      {
        stat: "10 Gbps",
        label: "Low latency routing",
        body: "Private backbone across every region. Dedicated uplinks, no noisy neighbours, no throttling.",
      },
      {
        stat: "∞",
        label: "DDoS protection",
        body: "Always-on volumetric scrubbing at the edge. Attacks are absorbed before they touch your application.",
      },
    ],
  },
  fa: {
    eyebrow: "زیرساخت",
    title: "همه‌چیز برای بارهای جدی.\nهیچ چیز اضافه‌ای.",
    subtitle:
      "سخت‌افزار سازمانی، قیمت‌گذاری منطقی، و سادگی‌ای که تیم را جلو نگه می‌دارد.",
    cards: [
      {
        stat: "NVMe",
        label: "ذخیره‌سازی NVMe",
        body: "بدون دیسک مکانیکی. بدون گلوگاه. هر نود با NVMe سازمانی و تأخیر زیر میلی‌ثانیه.",
      },
      {
        stat: "۹۹.۹۹٪",
        label: "۹۹.۹۹٪ آپتایم",
        body: "برق، خنک‌کاری و شبکه افزونه در هر دیتاسنتر. زیرساخت شما حتی یک لحظه هم از نفس نمی‌افتد.",
      },
      {
        stat: "10 Gbps",
        label: "مسیر‌یابی کم‌تاخیر",
        body: "بک‌بون اختصاصی در همه مناطق. آپلینک اختصاصی، بدون همسایه پر سر و صدا.",
      },
      {
        stat: "∞",
        label: "DDoS Protection",
        body: "پاکسازی حجمی همیشه روشن. حملات پیش از رسیدن به برنامه شما جذب می‌شوند.",
      },
    ],
  },
}

const PERFORMANCE = {
  en: {
    eyebrow: "Speed",
    headline_a: "Lightning Fast.",
    headline_b: "Anywhere.",
    body: "Our backbone spans 14 regions across 5 continents. Wherever your users are, your server is close.",
    stats: [
      { value: "14", unit: "Regions" },
      { value: "<1ms", unit: "Internal Latency" },
      { value: "5×", unit: "Faster Than HDD" },
    ],
  },
  fa: {
    eyebrow: "سرعت",
    headline_a: "سریع مثل برق.",
    headline_b: "هر کجا.",
    body: "بک‌بون جهانی ما ۱۴ منطقه در ۵ قاره را پوشش می‌دهد. هر جا کاربران شما هستند، سرور شما نزدیک است.",
    stats: [
      { value: "۱۴", unit: "منطقه" },
      { value: "<۱ms", unit: "تأخیر داخلی" },
      { value: "۵×", unit: "سریع‌تر از HDD" },
    ],
  },
}

const CTA_COPY = {
  en: {
    eyebrow: "Get started",
    title: "Deploy your\nfirst server.",
    body: "From zero to live in under 60 seconds. No credit card required to start the conversation.",
    button: "Deploy your first server",
    href: "#contact",
    note: "No pressure · Cancel anytime",
  },
  fa: {
    eyebrow: "شروع کنید",
    title: "اولین سرور خود\nرا راه‌اندازی کنید.",
    body: "از صفر تا آنلاین در کمتر از ۶۰ ثانیه. بدون نیاز به کارت اعتباری برای شروع گفتگو.",
    button: "اولین سرور خود را راه‌اندازی کنید",
    href: "#contact",
    note: "بدون فشار · هر زمان خواستید متوقف کنید",
  },
}

/* ─── Section 2: Features ──────────────────────────────────────────── */

export function FeaturesSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? FEATURES.fa : FEATURES.en
  const isRTL = locale === "fa"

  return (
    <section
      className={cn(
        "relative z-10 min-h-screen",
        "flex flex-col justify-center",
        "px-6 py-32 lg:px-8",
      )}
    >
      {/* top rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl">
        <FadeUp>
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            {copy.eyebrow}
          </p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h2
            className={cn(
              "whitespace-pre-line text-5xl font-semibold tracking-tight text-foreground",
              "sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[0.93]",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.title}
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p
            className={cn(
              "mt-8 max-w-xl text-lg text-muted-foreground md:text-xl",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.subtitle}
          </p>
        </FadeUp>

        {/* glassmorphic cards grid */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.cards.map((card, i) => (
            <FadeUp key={card.stat} delay={0.1 + i * 0.08}>
              <div
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  "border border-border/50 bg-white/[0.03] backdrop-blur-md",
                  "p-8 transition-colors duration-500 hover:border-border/80 hover:bg-white/[0.06]",
                )}
              >
                {/* glow dot */}
                <div
                  aria-hidden
                  className="absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <p
                  className={cn(
                    "text-4xl font-bold tracking-tight text-foreground",
                    "sm:text-5xl",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {card.stat}
                </p>

                <p
                  className={cn(
                    "mt-3 text-sm font-semibold tracking-wide text-cyan-400",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {card.label}
                </p>

                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed text-muted-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {card.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section 3: Performance ───────────────────────────────────────── */

export function PerformanceSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? PERFORMANCE.fa : PERFORMANCE.en
  const isRTL = locale === "fa"

  return (
    <section
      className={cn(
        "relative z-10 min-h-screen",
        "flex flex-col justify-center",
        "px-6 py-32 lg:px-8",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"
      />

      {/* faint vertical accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 start-0 top-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent ms-[max(1.5rem,calc((100vw-80rem)/2))]"
      />

      <div className="mx-auto w-full max-w-7xl">
        <FadeUp>
          <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            {copy.eyebrow}
          </p>
        </FadeUp>

        {/* oversized headline */}
        <div
          className={cn(
            "overflow-hidden",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          <FadeUp>
            <p
              className={cn(
                "text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.9] tracking-tighter text-foreground",
              )}
            >
              {copy.headline_a}
            </p>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p
              className={cn(
                "text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.9] tracking-tighter",
                "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent",
              )}
            >
              {copy.headline_b}
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.12}>
          <p
            className={cn(
              "mt-12 max-w-lg text-lg text-muted-foreground md:text-xl",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.body}
          </p>
        </FadeUp>

        {/* stat row */}
        <div className="mt-20 grid grid-cols-3 gap-8 border-t border-border/30 pt-12 sm:gap-16">
          {copy.stats.map((s, i) => (
            <FadeUp key={s.unit} delay={0.1 + i * 0.08}>
              <p
                className={cn(
                  "text-4xl font-bold tracking-tight text-foreground sm:text-5xl",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {s.value}
              </p>
              <p
                className={cn(
                  "mt-2 text-xs font-medium tracking-widest text-muted-foreground uppercase",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {s.unit}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section 4: CTA ───────────────────────────────────────────────── */

export function CtaSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? CTA_COPY.fa : CTA_COPY.en
  const isRTL = locale === "fa"
  const href = locale === "fa" ? copy.href : `/en${copy.href}`

  return (
    <section
      className={cn(
        "relative z-10 min-h-[70vh]",
        "flex flex-col items-center justify-center",
        "px-6 py-32 text-center lg:px-8",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
      />

      {/* radial halo behind the CTA text only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <FadeUp>
          <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            {copy.eyebrow}
          </p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h2
            className={cn(
              "whitespace-pre-line text-5xl font-semibold tracking-tight text-foreground",
              "sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[0.93]",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.title}
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p
            className={cn(
              "mx-auto mt-8 max-w-md text-lg text-muted-foreground md:text-xl",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.body}
          </p>
        </FadeUp>

        <FadeUp delay={0.18}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-10 text-sm font-medium tracking-wide"
            >
              <Link href={href}>{copy.button}</Link>
            </Button>
            <p
              className={cn(
                "text-xs text-muted-foreground/60",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.note}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
