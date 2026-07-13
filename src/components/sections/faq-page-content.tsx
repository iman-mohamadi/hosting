"use client"

import type { FaqPageContent } from "@/actions"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

interface FaqPageContentProps {
  content: FaqPageContent
  locale: Locale
}

export function FaqPageContentView({ content, locale }: FaqPageContentProps) {
  const isRTL = locale === "fa"

  return (
    <div className="relative">
      <PageHeader
        eyebrow={locale === "fa" ? "کمک" : "Help"}
        title={content.page_title}
        subtitle={content.page_subtitle}
        locale={locale}
      />

      <section className="border-t border-border px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {content.items.map((item, index) => (
            <Reveal key={item.question_id} delay={index * 0.03}>
              <details className="group rounded-2xl border border-border bg-card p-6 open:border-primary/20">
                <summary
                  className={cn(
                    "cursor-pointer list-none text-lg font-semibold tracking-tight text-foreground marker:content-none",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {item.question}
                </summary>
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed text-muted-foreground md:text-base",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
