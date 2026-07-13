"use client"

import { motion, useReducedMotion } from "framer-motion"

import type { HeroData } from "@/actions"
import { Aurora } from "@/components/fx/aurora"
import { ArrowButton } from "@/components/animate-ui/arrow-button"
import { ShimmerButton } from "@/components/animate-ui/shimmer-button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface HomeHeroProps {
  data: HeroData
  locale: Locale
}

export function HomeHero({ data, locale }: HomeHeroProps) {
  const isRTL = locale === "fa"
  const reduced = useReducedMotion()

  const lines = data.main_title.split("\n")
  const leadLines = lines.slice(0, -1)
  const gradientLine = lines[lines.length - 1]

  const stats =
    locale === "fa"
      ? [
          { value: "۹۹.۹٪", label: "هدف آپتایم" },
          { value: "۳", label: "دیتاسنتر" },
          { value: "<۱۰ms", label: "تأخیر ایران" },
        ]
      : [
          { value: "99.9%", label: "Uptime target" },
          { value: "3", label: "Datacenters" },
          { value: "<10ms", label: "Iran latency" },
        ]

  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
  })

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center lg:px-8">
      <Aurora intensity="vivid" />
      <div
        aria-hidden
        className="mesh-hero pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(70%_55%_at_50%_35%,black,transparent)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        <motion.div {...fade(0.05)}>
          <Eyebrow>{data.badge_text}</Eyebrow>
        </motion.div>

        <h1 className="mt-8 text-[clamp(3rem,10vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.04em] text-balance text-foreground">
          {leadLines.map((line, i) => (
            <TextReveal key={i} text={line} as="span" stagger={0.05} />
          ))}
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.35 }}
            className="animate-gradient-text block"
          >
            {gradientLine}
          </motion.span>
        </h1>

        <motion.p
          {...fade(0.5)}
          className="mt-8 max-w-lg text-lg leading-relaxed text-balance text-muted-foreground md:text-xl"
        >
          {data.sub_description}
        </motion.p>

        <motion.div
          {...fade(0.65)}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
        >
          <ShimmerButton href={localizePathname(data.call_to_action_href, locale)}>
            {data.call_to_action}
          </ShimmerButton>
          <ArrowButton
            href={localizePathname("/pricing", locale)}
            isRTL={isRTL}
            variant="ghost"
          >
            {locale === "fa" ? "مشاهده پلن‌ها" : "View plans"}
          </ArrowButton>
        </motion.div>

        <motion.dl
          {...fade(0.8)}
          className="glass mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-6 py-5 sm:px-10"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd
                className={cn(
                  "text-2xl font-semibold tracking-tight text-foreground tabular-nums sm:text-3xl",
                  !isRTL && "font-mono",
                )}
              >
                {stat.value}
              </dd>
              <span className="text-[11px] tracking-wide text-muted-foreground uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#challenge"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={locale === "fa" ? "ادامه" : "Scroll to continue"}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">
          {locale === "fa" ? "ادامه" : "Scroll"}
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-brand"
            animate={reduced ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  )
}
