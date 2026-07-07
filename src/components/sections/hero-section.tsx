"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

import type { HeroData } from "@/actions"
import { WebglBackdrop } from "@/components/fx/webgl-backdrop"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { TextReveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { EASE_OUT_EXPO } from "@/lib/motion"

interface HeroSectionProps {
  data: HeroData
  locale: Locale
}

const HERO_COPY = {
  en: {
    location: "AMS · FRA · SIN",
    scroll: "Scroll to explore",
    liveLabel: "P99 latency",
    secondary: "See the plans",
    metricUnit: "ms",
  },
  fa: {
    location: "AMS · FRA · SIN",
    scroll: "برای کشف اسکرول کنید",
    liveLabel: "تأخیر P99",
    secondary: "دیدن پلن‌ها",
    metricUnit: "ms",
  },
} as const

function LiveLatency({ label, unit, isRTL }: { label: string; unit: string; isRTL: boolean }) {
  const [value, setValue] = useState(0.7)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setValue(0.6 + Math.random() * 0.5)
    }, 1400)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-acid/50" />
        <span className="relative inline-flex size-2 rounded-full bg-acid" />
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-sm tabular-nums text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {value.toFixed(2)}
          <span className="text-muted-foreground"> {unit}</span>
        </span>
      </div>
    </div>
  )
}

export function HeroSection({ data, locale }: HeroSectionProps) {
  const isRTL = locale === "fa"
  const copy = isRTL ? HERO_COPY.fa : HERO_COPY.en
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.15])

  const plansHref = isRTL ? "/pricing" : "/en/pricing"

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Animated CSS aurora (always visible) + WebGL enhancement on top */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div aria-hidden className="absolute inset-0 bg-[#050706]" />
        <div
          aria-hidden
          className="animate-aurora-drift absolute -top-1/3 left-1/2 h-[75vh] w-[85vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.88_0.21_128/0.38),transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden
          className="animate-aurora-drift absolute -top-1/4 h-[60vh] w-[45vw] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.16_172/0.34),transparent_70%)] blur-3xl ltr:right-0 rtl:left-0 [animation-delay:-6s]"
        />
        <div
          aria-hidden
          className="animate-aurora-drift absolute top-0 h-[55vh] w-[40vw] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.18_205/0.3),transparent_70%)] blur-3xl ltr:left-0 rtl:right-0 [animation-delay:-12s]"
        />
        {/* WebGL ribbons — screen-blended, so it only ever adds light */}
        <WebglBackdrop />
        <div aria-hidden className="bg-grid absolute inset-0 opacity-25" />
        {/* legibility blends toward the page color */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040605]/30 to-[#040605]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#040605] to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#040605]/80 to-transparent"
        />
      </motion.div>

      {/* top HUD */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 top-24 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
          {copy.location}
        </span>
        <span className="hidden font-mono text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase sm:block">
          52.3676° N / 4.9041° E
        </span>
      </motion.div>

      {/* main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-acid" />
          <span className="font-mono text-[0.7rem] tracking-[0.15em] text-foreground/80 uppercase">
            {data.badge_text}
          </span>
        </motion.div>

        <h1
          className={cn(
            "max-w-5xl text-[clamp(2.75rem,8.5vw,8rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.05]",
          )}
        >
          <TextReveal text={data.main_title} delay={0.5} stagger={0.05} />
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: EASE_OUT_EXPO }}
            className={cn(
              "max-w-md text-base leading-relaxed text-muted-foreground md:text-lg",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {data.sub_description}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-6"
          >
            <MagneticButton href={data.call_to_action_href} size="xl" isRTL={isRTL}>
              {data.call_to_action}
            </MagneticButton>
            <Link
              href={plansHref}
              className="group relative text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {copy.secondary}
              <span className="absolute -bottom-1 h-px w-full origin-left scale-x-0 bg-acid/60 transition-transform duration-300 group-hover:scale-x-100 ltr:left-0 rtl:right-0" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <LiveLatency label={copy.liveLabel} unit={copy.metricUnit} isRTL={isRTL} />
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="hidden font-mono text-[0.65rem] tracking-[0.25em] uppercase sm:block">
              {copy.scroll}
            </span>
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block h-6 w-px bg-gradient-to-b from-acid to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
