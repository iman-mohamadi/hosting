"use client"

import type { ContactPageCopy } from "@/actions"
import { ContactForm } from "@/components/sections/contact-form"
import { Reveal } from "@/components/fx/reveal"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface ContactPageContentProps {
  copy: ContactPageCopy
  locale: Locale
}

export function ContactPageContent({ copy, locale }: ContactPageContentProps) {
  const isRTL = locale === "fa"

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_60%_at_30%_-10%,oklch(0.88_0.21_128/0.1),transparent)]"
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30 mask-b" />

      <div className="mx-auto max-w-7xl px-6 pt-40 pb-32 lg:px-8 lg:pt-52 lg:pb-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          <div className={cn("space-y-10", "ltr:text-left rtl:text-right")}>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.3em] text-acid uppercase">
                {locale === "fa" ? "تماس" : "Contact"}
              </p>
            </Reveal>
            <h1
              className={cn(
                "whitespace-pre-line text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tight text-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.1]",
              )}
            >
              {copy.page_title}
            </h1>

            <Reveal delay={0.1}>
              <p
                className={cn(
                  "max-w-md text-lg leading-relaxed text-muted-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {copy.page_subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="space-y-6 border-t border-white/10 pt-10">
                <div className="space-y-1">
                  <dt className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {copy.response_time_label}
                  </dt>
                  <dd className="text-sm text-foreground">{copy.response_time_value}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {copy.support_email_label}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${copy.support_email_value}`}
                      className="group relative text-sm text-foreground"
                      dir="ltr"
                    >
                      {copy.support_email_value}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-acid/60 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ContactForm copy={copy} locale={locale} />
          </Reveal>
        </div>
      </div>
    </div>
  )
}
