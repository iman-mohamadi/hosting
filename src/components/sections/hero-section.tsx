"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDownRight } from "@phosphor-icons/react"

import { Marquee } from "@/components/ui/marquee"
import { MaskReveal, Magnetic } from "@/components/ui/motion-primitives"
import { NetworkGlobe } from "@/components/visuals/network-globe"
import type { HeroData } from "@/actions"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface HeroSectionProps {
  data: HeroData
  locale: Locale
}

const HERO_EXTRA = {
  en: {
    flourish: "engineered to stay up.",
    scroll: "Scroll to configure",
    ticker: [
      "NVMe Gen4",
      "14 regions",
      "Anycast DNS",
      "99.99% uptime",
      "10 Gbps uplinks",
      "Always-on DDoS scrubbing",
      "Instant snapshots",
      "Private backbone",
    ],
    coord: "51.5074° N",
  },
  fa: {
    flourish: "ساخته‌شده برای پایداری.",
    scroll: "برای پیکربندی اسکرول کنید",
    ticker: [
      "NVMe نسل ۴",
      "۱۴ منطقه",
      "Anycast DNS",
      "۹۹.۹۹٪ آپتایم",
      "آپلینک ۱۰ گیگابیت",
      "پاکسازی همیشگی DDoS",
      "اسنپ‌شات فوری",
      "بک‌بون اختصاصی",
    ],
    coord: "۳۵.۶۸۹۲° N",
  },
}

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroSection({ data, locale }: HeroSectionProps) {
  const isRTL = locale === "fa"
  const extra = isRTL ? HERO_EXTRA.fa : HERO_EXTRA.en
  const titleLines = data.main_title.split("\n")

  return (
    <section className="relative z-10 -mt-16 min-h-[100svh] overflow-hidden">
      {/* Ambient signal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="animate-drift absolute end-[-10%] top-[8%] h-[42rem] w-[42rem] rounded-full bg-signal/[0.07] blur-[120px]" />
        <div className="absolute start-[-6%] bottom-[6%] h-[26rem] w-[26rem] rounded-full bg-signal/[0.04] blur-[100px]" />
      </div>

      {/* Interactive network globe — layered, asymmetric */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-[-18%] z-0 w-[110%] opacity-70 [mask-image:radial-gradient(60%_60%_at_60%_45%,#000_35%,transparent_78%)] sm:end-[-8%] sm:w-[80%] lg:end-0 lg:w-[62%]"
      >
        <NetworkGlobe />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-6 pt-28 pb-20 lg:px-8">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.28em] text-muted-foreground uppercase"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
          </span>
          {data.badge_text}
          <span aria-hidden className="hidden h-px w-16 bg-border sm:inline-block" />
          <span className="hidden text-muted-foreground/50 sm:inline">
            {extra.coord}
          </span>
        </motion.div>

        {/* headline */}
        <h1
          className={cn(
            "text-hero max-w-[16ch] font-semibold text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {titleLines.map((line, i) => (
            <MaskReveal key={i} delay={0.15 + i * 0.12}>
              {line}
            </MaskReveal>
          ))}
        </h1>

        {/* serif flourish */}
        <MaskReveal
          delay={0.15 + titleLines.length * 0.12}
          className="mt-2"
        >
          <span
            className={cn(
              "text-signal-gradient text-4xl italic sm:text-5xl lg:text-6xl",
              isRTL
                ? "font-[family-name:var(--font-vazirmatn)] not-italic"
                : "font-display",
            )}
          >
            {extra.flourish}
          </span>
        </MaskReveal>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          className={cn(
            "mt-10 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {data.sub_description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.68 }}
          className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
        >
          <Magnetic strength={0.4}>
            <Link
              href={data.call_to_action_href}
              data-cursor="hover"
              className={cn(
                "group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-signal px-8",
                "text-sm font-medium tracking-wide text-primary-foreground",
                "glow-signal transition-transform",
              )}
            >
              <span className="relative z-10">{data.call_to_action}</span>
              <ArrowDownRight
                weight="bold"
                className="relative z-10 size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5 rtl:-scale-x-100"
              />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full"
              />
            </Link>
          </Magnetic>

          <Link
            href={locale === "fa" ? "/pricing" : "/en/pricing"}
            data-cursor="hover"
            className={cn(
              "group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            <span className="relative">
              {isRTL ? "مشاهده پلن‌ها" : "See the plans"}
              <span className="absolute -bottom-1 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full ltr:left-0 rtl:right-0" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* bottom ticker + scroll cue */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pb-3 lg:px-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className={cn(
              "flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground/60 uppercase",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
              aria-hidden
            >
              &#8595;
            </motion.span>
            {extra.scroll}
          </motion.span>
        </div>
        <div className="border-t border-border/50 py-4">
          <Marquee
            items={extra.ticker}
            className="font-mono text-xs tracking-[0.2em] text-muted-foreground/40 uppercase"
          />
        </div>
      </div>
    </section>
  )
}
