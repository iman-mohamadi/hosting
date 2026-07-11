"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

import type { DocsArticle } from "@/actions"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface DocsArticleContentProps {
  article: DocsArticle
  body_markdown_paragraphs: string[]
  locale: Locale
}

export function DocsArticleContent({
  article,
  body_markdown_paragraphs,
  locale,
}: DocsArticleContentProps) {
  const isRTL = locale === "fa"
  const Back = isRTL ? ArrowRight : ArrowLeft

  return (
    <div className="relative">
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        subtitle={article.summary}
        locale={locale}
      />

      <section className="border-t border-white/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href={localizePathname("/docs", locale)}
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Back className="size-4" />
              {locale === "fa" ? "بازگشت به مستندات" : "Back to docs"}
            </Link>
          </Reveal>

          <div className="space-y-6">
            {body_markdown_paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.04}>
                <p
                  className={cn(
                    "text-base leading-[1.85] text-muted-foreground md:text-lg",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 font-mono text-xs text-muted-foreground">
            {article.read_minutes} {locale === "fa" ? "دقیقه مطالعه" : "min read"}
          </p>
        </div>
      </section>
    </div>
  )
}
