"use client"

import type { AboutContent } from "@/actions"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface AboutPageContentProps {
  content: AboutContent
  locale: Locale
}

const TIMELINE = {
  en: [
    {
      year: "2021",
      title: "First rack",
      body: "A small cluster in Tehran. One promise: infrastructure that stays out of the way.",
    },
    {
      year: "2023",
      title: "Global edges",
      body: "Regions across Europe and Asia. Latency dropped. Ambition stayed quiet.",
    },
    {
      year: "2025",
      title: "Platform clarity",
      body: "Transparent plans, instant deploys, and a dashboard designed for focus.",
    },
    {
      year: "Now",
      title: "Fourteen regions",
      body: "Still one fabric. Still one blue accent. Still built for teams that ship.",
    },
  ],
  fa: [
    {
      year: "۱۴۰۰",
      title: "اولین رک",
      body: "کلاستری کوچک در تهران. یک وعده: زیرساختی که سر راه نباشد.",
    },
    {
      year: "۱۴۰۲",
      title: "لبه‌های جهانی",
      body: "مناطق در اروپا و آسیا. تأخیر پایین آمد. جاه‌طلبی آرام ماند.",
    },
    {
      year: "۱۴۰۴",
      title: "شفافیت پلتفرم",
      body: "پلن‌های شفاف، استقرار آنی، و داشبوردی برای تمرکز.",
    },
    {
      year: "اکنون",
      title: "چهارده منطقه",
      body: "هنوز یک شبکه. هنوز یک آبی. هنوز برای تیم‌هایی که می‌سازند.",
    },
  ],
}

export function AboutPageContent({ content, locale }: AboutPageContentProps) {
  const isRTL = locale === "fa"
  const timeline = TIMELINE[locale]

  return (
    <div className="relative">
      <PageHeader
        eyebrow={content.intro_label}
        title={content.page_title}
        locale={locale}
      >
        <div className="max-w-4xl space-y-8">
          <Reveal delay={0.1}>
            <p
              className={cn(
                "text-2xl leading-snug font-medium tracking-tight text-foreground/90 md:text-4xl md:leading-[1.15]",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {content.mission_statement}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className={cn(
                "max-w-2xl text-lg leading-relaxed text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {content.mission_subtitle}
            </p>
          </Reveal>
        </div>
      </PageHeader>

      {/* Abstract imagery band */}
      <section className="relative h-[40vh] min-h-[240px] overflow-hidden border-y border-border">
        <div
          aria-hidden
          className="absolute inset-0 hero-mesh opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
        />
        <div className="relative z-10 flex h-full items-end px-6 pb-10 lg:px-8">
          <p className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
            {locale === "fa" ? "زیرساخت · سکوت · دقت" : "Infrastructure · Silence · Precision"}
          </p>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
            {locale === "fa" ? "مسیر" : "Journey"}
          </p>
          <h2
            className={cn(
              "mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {locale === "fa" ? "از یک رک تا یک شبکه." : "From one rack to a fabric."}
          </h2>
        </Reveal>

        <ol className="relative mt-16 space-y-0">
          <div
            aria-hidden
            className="absolute start-[0.35rem] top-2 bottom-2 w-px bg-border md:start-[7.5rem]"
          />
          {timeline.map((item, index) => (
            <Reveal key={item.year} delay={0.05 * index}>
              <li className="relative grid gap-4 py-10 md:grid-cols-[7.5rem_1fr] md:gap-12">
                <div className="flex items-center gap-3 md:block">
                  <span
                    aria-hidden
                    className="relative z-10 size-2 shrink-0 rounded-full bg-primary md:absolute md:start-[0.2rem] md:top-14"
                  />
                  <span className="font-mono text-sm tracking-wide text-muted-foreground">
                    {item.year}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Pillars */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {content.pillars.map((pillar, index) => (
            <Reveal
              key={pillar.pillar_id}
              delay={index * 0.05}
              className="group grid gap-8 border-b border-border py-20 md:grid-cols-12 md:gap-16 md:py-28 lg:py-36"
            >
              <div className="md:col-span-5">
                <span className="font-mono text-sm tracking-widest text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2
                  className={cn(
                    "mt-4 text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-4xl",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {pillar.pillar_title}
                </h2>
              </div>
              <p
                className={cn(
                  "max-w-prose text-base leading-[1.85] text-muted-foreground md:col-span-7 md:text-lg md:leading-[1.85]",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {pillar.pillar_body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
