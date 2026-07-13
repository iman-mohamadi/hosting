"use client"

import Link from "next/link"

import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { DEPLOY_REGIONS } from "@/lib/brand"
import { cn } from "@/lib/utils"

import { HomeSectionLabel } from "./home-section-label"

const COPY = {
  en: {
    index: "03",
    label: "Network",
    title: "Three datacenters.\nOne control plane.",
    body: "Tehran and Isfahan for Iranian users. Frankfurt for EU backup. Traffic stays on healthy paths.",
    status: "Live status",
    latency: "Tehran median",
    latency_value: "8ms",
  },
  fa: {
    index: "۰۳",
    label: "شبکه",
    title: "سه دیتاسنتر.\nیک پنل کنترل.",
    body: "تهران و اصفهان برای کاربران ایرانی. فرانکفورت برای پشتیبان اروپا. ترافیک روی مسیرهای سالم می‌ماند.",
    status: "وضعیت زنده",
    latency: "میانه تأخیر تهران",
    latency_value: "۸ms",
  },
}

const NODES = [
  { x: 330, y: 200, ping: true },
  { x: 265, y: 313, ping: false },
  { x: 135, y: 313, ping: true },
  { x: 70, y: 200, ping: false },
  { x: 135, y: 87, ping: false },
  { x: 265, y: 87, ping: true },
]

function NetworkDiagram() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full text-muted-foreground"
      role="img"
      aria-label="ParsCloud datacenter network"
    >
      {[60, 110, 160].map((r) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}

      {NODES.map((n, i) => (
        <line
          key={i}
          x1="200"
          y1="200"
          x2={n.x}
          y2={n.y}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      ))}

      {NODES.map((n, i) => (
        <g key={`node-${i}`}>
          {n.ping && (
            <circle cx={n.x} cy={n.y} r="5" className="fill-primary/40">
              <animate
                attributeName="r"
                values="5;12;5"
                dur="2.6s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="2.6s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          )}
          <circle cx={n.x} cy={n.y} r="4" className="fill-primary" />
        </g>
      ))}

      <circle cx="200" cy="200" r="9" className="fill-primary" />
      <circle cx="200" cy="200" r="9" className="fill-primary/30">
        <animate
          attributeName="r"
          values="9;22;9"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0;0.4"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

export function HomeInfrastructure({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"
  const regions = DEPLOY_REGIONS.map((region) => ({
    code: region.region_id.toUpperCase().slice(0, 3),
    name: isRTL ? region.label_fa : region.label_en,
  }))

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-48">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>
          </Reveal>
          <h2 className="mt-6 whitespace-pre-line text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            <TextReveal text={copy.title} as="span" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              {copy.body}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href={localizePathname("/status", locale)}
                className="inline-flex items-center gap-2.5 text-sm font-medium text-primary transition-opacity hover:opacity-70"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                  <span className="relative size-2 rounded-full bg-primary" />
                </span>
                {copy.status}
              </Link>
              <div>
                <p
                  className={cn(
                    "text-2xl font-medium tracking-tight",
                    !isRTL && "font-mono",
                  )}
                >
                  {copy.latency_value}
                </p>
                <p className="mt-0.5 text-xs tracking-wide text-muted-foreground uppercase">
                  {copy.latency}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md justify-self-center lg:max-w-none">
          <NetworkDiagram />
        </div>
      </div>

      <div className="mt-20 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-10">
        {regions.map((region, i) => (
          <Reveal key={region.code} delay={0.03 * i}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                {region.code}
              </span>
              <span className="text-sm font-medium text-foreground">
                {region.name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
