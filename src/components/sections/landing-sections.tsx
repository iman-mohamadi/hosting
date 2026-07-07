"use client"

import Link from "next/link"
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import {
  HardDrives,
  ShieldCheck,
  Lightning,
  Globe,
  ArrowUpRight,
} from "@phosphor-icons/react"

import { Marquee } from "@/components/ui/marquee"
import { MaskReveal, Reveal, Magnetic } from "@/components/ui/motion-primitives"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/* ─── copy maps ────────────────────────────────────────────────────── */

const FEATURES = {
  en: {
    eyebrow: "Infrastructure",
    title: "Built for load.",
    accent: "Shaped for clarity.",
    subtitle:
      "Enterprise-grade hardware, developer-friendly pricing, and the kind of simplicity that keeps teams moving.",
    cards: [
      {
        stat: "NVMe",
        label: "Pure flash storage",
        body: "No spinning disks. No bottlenecks. Every node runs enterprise-class NVMe with sub-millisecond latency.",
      },
      {
        stat: "99.99%",
        label: "Relentless uptime",
        body: "Redundant power, cooling, and networking are built into every datacenter. Your infra never blinks.",
      },
      {
        stat: "10 Gbps",
        label: "Low-latency routing",
        body: "Private backbone across every region. Dedicated uplinks, no noisy neighbours, no throttling.",
      },
      {
        stat: "∞",
        label: "DDoS absorbed",
        body: "Always-on volumetric scrubbing at the edge. Attacks are absorbed before they touch your application.",
      },
    ],
  },
  fa: {
    eyebrow: "زیرساخت",
    title: "برای بارهای جدی.",
    accent: "بدون هیچ اضافه‌ای.",
    subtitle:
      "سخت‌افزار سازمانی، قیمت‌گذاری منطقی، و سادگی‌ای که تیم را جلو نگه می‌دارد.",
    cards: [
      {
        stat: "NVMe",
        label: "ذخیره‌سازی فلش",
        body: "بدون دیسک مکانیکی. بدون گلوگاه. هر نود با NVMe سازمانی و تأخیر زیر میلی‌ثانیه.",
      },
      {
        stat: "۹۹.۹۹٪",
        label: "آپتایم بی‌وقفه",
        body: "برق، خنک‌کاری و شبکه افزونه در هر دیتاسنتر. زیرساخت شما حتی یک لحظه هم از نفس نمی‌افتد.",
      },
      {
        stat: "10 Gbps",
        label: "مسیریابی کم‌تاخیر",
        body: "بک‌بون اختصاصی در همه مناطق. آپلینک اختصاصی، بدون همسایه پر سر و صدا.",
      },
      {
        stat: "∞",
        label: "جذب حملات DDoS",
        body: "پاکسازی حجمی همیشه روشن. حملات پیش از رسیدن به برنامه شما جذب می‌شوند.",
      },
    ],
  },
}

const MANIFESTO = {
  en: [
    "Deploy in seconds",
    "Scale without drama",
    "Own your uptime",
    "No hidden fees",
    "Real engineers on call",
  ],
  fa: [
    "استقرار در چند ثانیه",
    "مقیاس بدون دردسر",
    "آپتایم در کنترل شما",
    "بدون هزینه پنهان",
    "مهندسان واقعی در دسترس",
  ],
}

const PERFORMANCE = {
  en: {
    eyebrow: "Speed / Reach",
    headline_a: "Lightning",
    headline_b: "everywhere.",
    body: "Our backbone spans 14 regions across 5 continents. Wherever your users are, your server is already close.",
    stats: [
      { value: 14, suffix: "", unit: "Regions" },
      { value: 1, prefix: "<", suffix: "ms", unit: "Internal latency" },
      { value: 5, suffix: "×", unit: "Faster than HDD" },
      { value: 99.99, suffix: "%", unit: "Network uptime" },
    ],
    regions: [
      "FRA", "AMS", "LON", "NYC", "SFO", "SGP", "TYO", "SYD", "DXB", "TEH",
    ],
  },
  fa: {
    eyebrow: "سرعت / گستره",
    headline_a: "برق‌آسا",
    headline_b: "در همه‌جا.",
    body: "بک‌بون ما ۱۴ منطقه در ۵ قاره را پوشش می‌دهد. هر جا کاربران شما هستند، سرور شما همان‌جا نزدیک است.",
    stats: [
      { value: 14, suffix: "", unit: "منطقه" },
      { value: 1, prefix: "<", suffix: "ms", unit: "تأخیر داخلی" },
      { value: 5, suffix: "×", unit: "سریع‌تر از HDD" },
      { value: 99.99, suffix: "%", unit: "آپتایم شبکه" },
    ],
    regions: [
      "FRA", "AMS", "LON", "NYC", "SFO", "SGP", "TYO", "SYD", "DXB", "TEH",
    ],
  },
}

const CTA_COPY = {
  en: {
    eyebrow: "Get started",
    title: "Deploy your",
    accent: "first server.",
    body: "From zero to live in under 60 seconds. No credit card required to start the conversation.",
    button: "Deploy your first server",
    href: "/en#configurator",
    note: "No pressure · Cancel anytime",
  },
  fa: {
    eyebrow: "شروع کنید",
    title: "اولین سرور خود را",
    accent: "راه‌اندازی کنید.",
    body: "از صفر تا آنلاین در کمتر از ۶۰ ثانیه. بدون نیاز به کارت اعتباری برای شروع گفتگو.",
    button: "اولین سرور خود را راه‌اندازی کنید",
    href: "/#configurator",
    note: "بدون فشار · هر زمان خواستید متوقف کنید",
  },
}

const CARD_ICONS = [HardDrives, ShieldCheck, Lightning, Globe]

/* ─── Count-up number ──────────────────────────────────────────────── */

function CountUp({
  value,
  prefix = "",
  suffix = "",
  locale,
}: {
  value: number
  prefix?: string
  suffix?: string
  locale: Locale
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 1 })
  const [display, setDisplay] = useState("0")
  const isFloat = !Number.isInteger(value)

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useEffect(() => {
    return spring.on("change", (latest) => {
      const rounded = isFloat ? latest.toFixed(2) : Math.round(latest).toString()
      const localized = Number(rounded).toLocaleString(
        locale === "fa" ? "fa-IR" : "en-US",
        isFloat ? { minimumFractionDigits: 2 } : undefined,
      )
      setDisplay(localized)
    })
  }, [spring, isFloat, locale])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* ─── Perspective tilt card ────────────────────────────────────────── */

function TiltCard({
  index,
  stat,
  label,
  body,
  Icon,
  isRTL,
  offset,
}: {
  index: string
  stat: string
  label: string
  body: string
  Icon: (typeof CARD_ICONS)[number]
  isRTL: boolean
  offset: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 220, damping: 18 })
  const sry = useSpring(ry, { stiffness: 220, damping: 18 })

  function onMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 10)
    rx.set(-py * 10)
  }
  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className={cn("group [perspective:1200px]", offset && "lg:mt-16")}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-full overflow-hidden rounded-3xl border border-border/60 p-8",
          "bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]",
          "backdrop-blur-xl transition-colors duration-500 hover:border-signal/40",
        )}
      >
        {/* top hairline that ignites on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* pointer-follow sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,0%),rgba(104,226,240,0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div
          className="flex items-center justify-between"
          style={{ transform: "translateZ(40px)" }}
        >
          <span className="font-mono text-[0.7rem] tracking-[0.3em] text-muted-foreground/60">
            {index}
          </span>
          <Icon
            weight="light"
            className="size-5 text-signal transition-transform duration-500 group-hover:scale-110"
            aria-hidden
          />
        </div>

        <p
          className={cn(
            "mt-10 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
          style={{ transform: "translateZ(30px)" }}
        >
          {stat}
        </p>

        <p
          className={cn(
            "mt-4 text-sm font-medium tracking-wide text-signal",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
          style={{ transform: "translateZ(20px)" }}
        >
          {label}
        </p>

        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {body}
        </p>
      </motion.div>
    </div>
  )
}

/* ─── Section shell with a floating index tag ──────────────────────── */

function SectionTag({ n, label, isRTL }: { n: string; label: string; isRTL: boolean }) {
  return (
    <Reveal>
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[0.7rem] tracking-[0.3em] text-signal">
          {n}
        </span>
        <span className="h-px w-8 bg-signal/40" aria-hidden />
        <span
          className={cn(
            "text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {label}
        </span>
      </div>
    </Reveal>
  )
}

/* ─── Section 2: Features ──────────────────────────────────────────── */

export function FeaturesSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? FEATURES.fa : FEATURES.en
  const isRTL = locale === "fa"

  return (
    <section className="relative z-10 px-6 py-32 lg:px-8 lg:py-48">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div className="mx-auto w-full max-w-7xl">
        <SectionTag n="02" label={copy.eyebrow} isRTL={isRTL} />

        <h2
          className={cn(
            "text-display max-w-[18ch] font-semibold text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          <MaskReveal>{copy.title}</MaskReveal>
          <MaskReveal delay={0.08}>
            <span className={cn(!isRTL && "font-display text-signal-gradient italic")}>
              {copy.accent}
            </span>
          </MaskReveal>
        </h2>

        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-8 max-w-xl text-base text-muted-foreground sm:text-lg",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.subtitle}
          </p>
        </Reveal>

        <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.08} className="h-full">
              <TiltCard
                index={`0${i + 1}`}
                stat={card.stat}
                label={card.label}
                body={card.body}
                Icon={CARD_ICONS[i]}
                isRTL={isRTL}
                offset={i % 2 === 1}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Manifesto marquee band ───────────────────────────────────────── */

export function ManifestoBand({ locale }: { locale: Locale }) {
  const items = locale === "fa" ? MANIFESTO.fa : MANIFESTO.en
  const isRTL = locale === "fa"
  return (
    <section className="relative z-10 border-y border-border/50 py-10" aria-hidden>
      <Marquee
        items={items}
        slow
        className={cn(
          "text-4xl font-semibold tracking-tight text-foreground/90 sm:text-6xl lg:text-7xl",
          isRTL ? "font-[family-name:var(--font-vazirmatn)]" : "font-display italic",
        )}
        separator={<span className="px-8 text-signal">&#9670;</span>}
      />
    </section>
  )
}

/* ─── Section 3: Performance ───────────────────────────────────────── */

export function PerformanceSection({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? PERFORMANCE.fa : PERFORMANCE.en
  const isRTL = locale === "fa"
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden px-6 py-32 lg:px-8 lg:py-48"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionTag n="03" label={copy.eyebrow} isRTL={isRTL} />

        <motion.div style={{ y }} className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}>
          <h2 className="text-display font-semibold text-foreground">
            <MaskReveal>{copy.headline_a}</MaskReveal>
            <MaskReveal delay={0.08}>
              <span className={cn(!isRTL && "font-display text-signal-gradient italic")}>
                {copy.headline_b}
              </span>
            </MaskReveal>
          </h2>
        </motion.div>

        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-10 max-w-lg text-base text-muted-foreground sm:text-lg",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.body}
          </p>
        </Reveal>

        {/* region ticker */}
        <div className="mt-16 border-y border-border/50 py-5">
          <Marquee
            items={copy.regions}
            className="font-mono text-sm tracking-[0.3em] text-muted-foreground/50"
            separator={<span className="px-8 text-signal/50" aria-hidden>&middot;</span>}
          />
        </div>

        {/* stats */}
        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {copy.stats.map((s, i) => (
            <Reveal key={s.unit} delay={i * 0.08}>
              <div className="border-t border-border/60 pt-6">
                <p
                  className={cn(
                    "text-5xl font-semibold tracking-tight text-foreground sm:text-6xl",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  <CountUp
                    value={s.value}
                    prefix={"prefix" in s ? (s.prefix as string) : ""}
                    suffix={s.suffix}
                    locale={locale}
                  />
                </p>
                <p
                  className={cn(
                    "mt-3 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {s.unit}
                </p>
              </div>
            </Reveal>
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

  return (
    <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center lg:px-8">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/[0.06] blur-[120px]"
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionTag n="04" label={copy.eyebrow} isRTL={isRTL} />

        <h2
          className={cn(
            "text-display font-semibold text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          <MaskReveal className="inline-block">{copy.title}</MaskReveal>{" "}
          <MaskReveal delay={0.08} className="inline-block">
            <span className={cn(!isRTL && "font-display text-signal-gradient italic")}>
              {copy.accent}
            </span>
          </MaskReveal>
        </h2>

        <Reveal delay={0.12}>
          <p
            className={cn(
              "mx-auto mt-8 max-w-md text-base text-muted-foreground sm:text-lg",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.body}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-col items-center gap-5">
            <Magnetic strength={0.4}>
              <Link
                href={copy.href}
                data-cursor="hover"
                className={cn(
                  "group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-signal px-9",
                  "text-sm font-medium tracking-wide text-primary-foreground glow-signal",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                <span className="relative z-10">{copy.button}</span>
                <ArrowUpRight
                  weight="bold"
                  className="relative z-10 size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full"
                />
              </Link>
            </Magnetic>
            <p
              className={cn(
                "text-xs text-muted-foreground/60",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
