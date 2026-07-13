"use client"

import type { SlaPageContent } from "@/actions"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

interface SlaPageContentProps {
  content: SlaPageContent
  locale: Locale
}

export function SlaPageContentView({ content, locale }: SlaPageContentProps) {
  const isRTL = locale === "fa"

  return (
    <div className="relative">
      <PageHeader
        eyebrow="SLA"
        title={content.page_title}
        subtitle={content.page_subtitle}
        locale={locale}
      />

      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-16">
          <Reveal>
            <div>
              <h2
                className={cn(
                  "text-2xl font-semibold tracking-tight text-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.commitment_title}
              </h2>
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed text-muted-foreground md:text-lg",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.commitment_body}
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2
                className={cn(
                  "mb-8 text-2xl font-semibold tracking-tight text-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.metrics_title}
              </h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {content.metrics.map((metric, index) => (
                <Reveal key={metric.metric_id} delay={index * 0.05}>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <p className="font-mono text-3xl font-semibold text-acid">
                      {metric.value}
                    </p>
                    <p
                      className={cn(
                        "mt-3 text-sm font-medium text-foreground",
                        isRTL && "font-[family-name:var(--font-vazirmatn)]",
                      )}
                    >
                      {metric.label}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {metric.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div>
              <h2
                className={cn(
                  "text-2xl font-semibold tracking-tight text-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.credits_title}
              </h2>
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed text-muted-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.credits_body}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2
                className={cn(
                  "text-2xl font-semibold tracking-tight text-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {content.exclusions_title}
              </h2>
              <ul className="mt-6 space-y-3">
                {content.exclusions.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "border-b border-border pb-3 text-sm text-muted-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
