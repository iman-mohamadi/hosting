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

export function AboutPageContent({ content, locale }: AboutPageContentProps) {
  const isRTL = locale === "fa"

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

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {content.pillars.map((pillar, index) => (
            <Reveal
              key={pillar.pillar_id}
              delay={index * 0.05}
              className={cn(
                "group grid gap-8 border-b border-white/10 py-20 transition-colors md:grid-cols-12 md:gap-16 md:py-28 lg:py-36",
              )}
            >
              <div className="md:col-span-5">
                <span className="font-mono text-sm tracking-widest text-acid/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2
                  className={cn(
                    "mt-4 text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-acid md:text-4xl",
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
