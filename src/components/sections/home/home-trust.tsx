"use client"



import { Marquee } from "@/components/fx/marquee"

import { Reveal, TextReveal } from "@/components/fx/reveal"

import type { Locale } from "@/i18n/config"

import { cn } from "@/lib/utils"



import { HomeSectionLabel } from "./home-section-label"



const SEGMENTS = [

  "Online stores",

  "EdTech",

  "SaaS teams",

  "Media platforms",

  "Fintech",

  "Agencies",

]



const SEGMENTS_FA = [

  "فروشگاه آنلاین",

  "آموزش آنلاین",

  "تیم‌های SaaS",

  "رسانه دیجیتال",

  "فین‌تک",

  "آژانس‌ها",

]



const COPY = {

  en: {

    index: "04",

    label: "Who it's for",

    title: "Built for teams shipping in Iran.",

  },

  fa: {

    index: "۰۴",

    label: "برای چه کسانی",

    title: "ساخته‌شده برای تیم‌هایی که در ایران می‌سازند.",

  },

}



export function HomeTrust({ locale }: { locale: Locale }) {

  const copy = COPY[locale]

  const isRTL = locale === "fa"

  const items = isRTL ? SEGMENTS_FA : SEGMENTS



  return (

    <section className="border-y border-border bg-muted/20 py-24 lg:py-32">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <Reveal>

          <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>

        </Reveal>

        <h2

          className={cn(

            "mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]",

            isRTL && "font-[family-name:var(--font-vazirmatn)]",

          )}

        >

          <TextReveal text={copy.title} as="span" />

        </h2>

      </div>



      <div className="mt-14 text-foreground/55">

        <Marquee

          items={items}

          separator="·"

          className="py-2 font-mono text-sm tracking-[0.2em] uppercase md:text-base"

        />

      </div>

    </section>

  )

}

