"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"
import { Reveal, TextReveal, Parallax } from "@/components/fx/reveal"
import { TiltCard } from "@/components/fx/tilt-card"
import { Marquee } from "@/components/fx/marquee"

/* ─── copy maps ────────────────────────────────────────────────────── */

const MANIFESTO = {
  en: {
    eyebrow: "The philosophy",
    words:
      "Infrastructure should disappear. Fast enough to forget. Stable enough to trust. Quiet enough to let your product be the loudest thing in the room.",
    footnote: "— Built for builders, not for dashboards.",
  },
  fa: {
    eyebrow: "فلسفه",
    words:
      "زیرساخت باید ناپدید شود. آن‌قدر سریع که فراموش شود. آن‌قدر پایدار که به آن اعتماد کنی. آن‌قدر بی‌صدا که محصولت بلندترین صدای اتاق باشد.",
    footnote: "— ساخته‌شده برای سازندگان، نه برای داشبوردها.",
  },
}

const TRUST = {
  en: {
    label: "Powering teams that ship",
    items: ["Fintech", "AI Startups", "Game Studios", "E-commerce", "SaaS", "Agencies", "Media", "IoT"],
  },
  fa: {
    label: "قدرت‌بخش تیم‌هایی که محصول می‌سازند",
    items: ["فین‌تک", "استارتاپ‌های AI", "استودیوهای بازی", "فروشگاه‌ها", "SaaS", "آژانس‌ها", "مدیا", "IoT"],
  },
}

const FEATURES = {
  en: {
    eyebrow: "Infrastructure",
    title: "Built for load.\nShaped for clarity.",
    subtitle:
      "Enterprise-grade hardware, developer-friendly pricing, and the kind of simplicity that keeps teams moving.",
    cards: {
      nvme: {
        stat: "NVMe",
        label: "Pure NVMe storage",
        body: "No spinning disks. No bottlenecks. Every node runs enterprise-class NVMe with sub-millisecond latency.",
      },
      uptime: {
        stat: "99.99%",
        label: "Uptime SLA",
        body: "Redundant power, cooling, and networking in every datacenter. Your infra never blinks.",
      },
      routing: {
        stat: "10 Gbps",
        label: "Low-latency routing",
        body: "A private backbone across every region. Dedicated uplinks, no noisy neighbours, no throttling.",
      },
      ddos: {
        stat: "∞",
        label: "DDoS protection",
        body: "Always-on volumetric scrubbing at the edge. Attacks are absorbed before they touch your app.",
      },
    },
  },
  fa: {
    eyebrow: "زیرساخت",
    title: "برای بار سنگین.\nبا شفافیت کامل.",
    subtitle:
      "سخت‌افزار سازمانی، قیمت‌گذاری منطقی، و سادگی‌ای که تیم را جلو نگه می‌دارد.",
    cards: {
      nvme: {
        stat: "NVMe",
        label: "ذخیره‌سازی خالص NVMe",
        body: "بدون دیسک مکانیکی. بدون گلوگاه. هر نود با NVMe سازمانی و تأخیر زیر میلی‌ثانیه.",
      },
      uptime: {
        stat: "۹۹.۹۹٪",
        label: "تضمین آپتایم",
        body: "برق، خنک‌کاری و شبکه افزونه در هر دیتاسنتر. زیرساخت شما حتی یک لحظه هم از نفس نمی‌افتد.",
      },
      routing: {
        stat: "10 Gbps",
        label: "مسیریابی کم‌تأخیر",
        body: "بک‌بون اختصاصی در همه مناطق. آپلینک اختصاصی، بدون همسایه پر سر و صدا.",
      },
      ddos: {
        stat: "∞",
        label: "محافظت DDoS",
        body: "پاکسازی حجمی همیشه‌روشن در لبه. حملات پیش از رسیدن به برنامه شما جذب می‌شوند.",
      },
    },
  },
}

const NETWORK = {
  en: {
    eyebrow: "Global network",
    headline_a: "Lightning fast.",
    headline_b: "Everywhere.",
    body: "Our private backbone spans 14 regions across 5 continents. Wherever your users are, your server is a heartbeat away.",
    stats: [
      { value: "14", unit: "Regions" },
      { value: "<1ms", unit: "Internal latency" },
      { value: "5×", unit: "Faster than HDD" },
    ],
    nodes: ["AMS", "FRA", "NYC", "SIN", "TYO", "SFO"],
  },
  fa: {
    eyebrow: "شبکه جهانی",
    headline_a: "سریع مثل برق.",
    headline_b: "همه‌جا.",
    body: "بک‌بون اختصاصی ما ۱۴ منطقه در ۵ قاره را پوشش می‌دهد. هر جا کاربران شما هستند، سرور شما یک ضربان فاصله دارد.",
    stats: [
      { value: "۱۴", unit: "منطقه" },
      { value: "<۱ms", unit: "تأخیر داخلی" },
      { value: "۵×", unit: "سریع‌تر از HDD" },
    ],
    nodes: ["AMS", "FRA", "NYC", "SIN", "TYO", "SFO"],
  },
}

/* ─── Trust marquee strip ──────────────────────────────────────────── */

export function TrustStrip({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? TRUST.fa : TRUST.en
  const isRTL = locale === "fa"

  return (
    <section className="relative border-y border-white/10 py-10">
      <div className="mx-auto mb-6 max-w-7xl px-6 lg:px-8">
        <p
          className={cn(
            "text-center font-mono text-[0.7rem] tracking-[0.3em] text-muted-foreground uppercase",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.label}
        </p>
      </div>
      <Marquee
        items={copy.items}
        className={cn(
          "text-2xl font-semibold tracking-tight text-foreground/70 md:text-3xl",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      />
    </section>
  )
}

/* ─── Manifesto: scroll-fill statement ─────────────────────────────── */

function FillWord({
  word,
  range,
  progress,
}: {
  word: string
  range: [number, number]
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {"\u00A0"}
    </motion.span>
  )
}

export function ManifestoSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? MANIFESTO.fa : MANIFESTO.en
  const isRTL = locale === "fa"
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  })

  const words = copy.words.split(" ")

  return (
    <section className="relative px-6 py-32 lg:px-8 lg:py-48">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-14 font-mono text-xs tracking-[0.3em] text-acid uppercase">
            {copy.eyebrow}
          </p>
        </Reveal>

        <div
          ref={ref}
          className={cn(
            "text-[clamp(1.75rem,5vw,4rem)] font-semibold leading-[1.15] tracking-tight text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.4]",
          )}
        >
          {reduced ? (
            <span>{copy.words}</span>
          ) : (
            words.map((word, i) => (
              <FillWord
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              />
            ))
          )}
        </div>

        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-14 font-mono text-sm text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Mini viz: NVMe throughput bars ───────────────────────────────── */

function ThroughputBars() {
  const reduced = useReducedMotion()
  const bars = Array.from({ length: 28 })
  return (
    <div className="flex h-24 items-end gap-1" aria-hidden>
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-full bg-gradient-to-t from-acid/20 to-acid"
          initial={{ height: "20%" }}
          animate={
            reduced
              ? { height: "60%" }
              : {
                  height: [
                    "25%",
                    `${40 + ((i * 37) % 60)}%`,
                    "35%",
                  ],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 1.6 + (i % 5) * 0.12,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: i * 0.04,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  )
}

/* ─── Features: bento card system ──────────────────────────────────── */

function CardShell({
  stat,
  label,
  body,
  isRTL,
  className,
  children,
}: {
  stat: string
  label: string
  body: string
  isRTL: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <TiltCard className={cn("p-8 md:p-10", className)}>
      <div className="flex h-full flex-col">
        <p
          className={cn(
            "text-5xl font-bold tracking-tighter text-foreground md:text-6xl",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {stat}
        </p>
        <p
          className={cn(
            "mt-3 text-sm font-semibold tracking-wide text-acid",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {body}
        </p>
        {children && <div className="mt-auto pt-8">{children}</div>}
      </div>
    </TiltCard>
  )
}

export function FeaturesSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? FEATURES.fa : FEATURES.en
  const isRTL = locale === "fa"
  const c = copy.cards

  return (
    <section className="relative px-6 py-28 lg:px-8 lg:py-40">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-6 font-mono text-xs tracking-[0.3em] text-acid uppercase">
              {copy.eyebrow}
            </p>
          </Reveal>
          <h2
            className={cn(
              "text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.95] tracking-tight text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.15]",
            )}
          >
            <TextReveal text={copy.title} />
          </h2>
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-8 max-w-xl text-lg text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:mt-24 lg:grid-cols-6 lg:gap-5">
          <Reveal className="lg:col-span-4" y={50}>
            <CardShell {...c.nvme} isRTL={isRTL} className="h-full min-h-[22rem]">
              <ThroughputBars />
            </CardShell>
          </Reveal>
          <Reveal className="lg:col-span-2" y={50} delay={0.06}>
            <CardShell {...c.uptime} isRTL={isRTL} className="h-full min-h-[22rem]" />
          </Reveal>
          <Reveal className="lg:col-span-3" y={50} delay={0.03}>
            <CardShell {...c.routing} isRTL={isRTL} className="h-full min-h-[16rem]" />
          </Reveal>
          <Reveal className="lg:col-span-3" y={50} delay={0.09}>
            <CardShell {...c.ddos} isRTL={isRTL} className="h-full min-h-[16rem]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Network: orbital visualization ───────────────────────────────── */

function OrbitViz({ nodes }: { nodes: string[] }) {
  const reduced = useReducedMotion()
  const rings = [42, 78, 118, 158]
  const size = 360
  const cx = size / 2
  const cy = size / 2

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.9 0.22 128)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.9 0.22 128)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {rings.map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="oklch(1 0 0 / 0.08)"
            strokeWidth="1"
          />
        ))}

        <circle cx={cx} cy={cy} r="60" fill="url(#core)" />
        <circle cx={cx} cy={cy} r="5" fill="oklch(0.9 0.22 128)" />

        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2
          const r = rings[i % (rings.length - 1) + 1]
          // Round to fixed precision so SSR and client render identical strings.
          const x = Math.round((cx + Math.cos(angle) * r) * 100) / 100
          const y = Math.round((cy + Math.sin(angle) * r) * 100) / 100
          return (
            <g key={node}>
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="oklch(0.9 0.22 128 / 0.15)"
                strokeWidth="1"
              />
              {!reduced && (
                <circle r="2.5" fill="oklch(0.82 0.16 172)">
                  <animateMotion
                    dur={`${2 + i * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M${cx},${cy} L${x},${y}`}
                    keyPoints="0;1"
                    keyTimes="0;1"
                  />
                </circle>
              )}
              <circle cx={x} cy={y} r="4" fill="oklch(0.97 0 0)" />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="none"
                stroke="oklch(0.9 0.22 128 / 0.5)"
                strokeWidth="1"
              >
                {!reduced && (
                  <animate
                    attributeName="r"
                    values="4;12;4"
                    dur="2.4s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                className="fill-white/50 font-mono"
                style={{ fontSize: 8, letterSpacing: 1 }}
              >
                {node}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function NetworkSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? NETWORK.fa : NETWORK.en
  const isRTL = locale === "fa"

  return (
    <section id="network" className="relative px-6 py-28 lg:px-8 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 rule-x"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <p className="mb-6 font-mono text-xs tracking-[0.3em] text-acid uppercase">
              {copy.eyebrow}
            </p>
          </Reveal>
          <h2
            className={cn(
              "text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-tight",
              isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.1]",
            )}
          >
            <span className="block text-foreground">
              <TextReveal text={copy.headline_a} />
            </span>
            <span className="block text-aurora">
              <TextReveal text={copy.headline_b} delay={0.1} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-8 max-w-md text-lg text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.body}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            {copy.stats.map((s, i) => (
              <Reveal key={s.unit} delay={0.1 + i * 0.08}>
                <p
                  className={cn(
                    "text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {s.value}
                </p>
                <p
                  className={cn(
                    "mt-2 font-mono text-[0.65rem] tracking-[0.15em] text-muted-foreground uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {s.unit}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Parallax distance={40}>
          <OrbitViz nodes={copy.nodes} />
        </Parallax>
      </div>
    </section>
  )
}
