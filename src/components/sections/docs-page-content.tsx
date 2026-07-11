"use client"

import Link from "next/link"
import { useState } from "react"

import type { DocsPageContent } from "@/actions"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import { FloatingInput } from "@/components/ui/floating-input"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface DocsPageContentProps {
  content: DocsPageContent
  locale: Locale
}

export function DocsPageContentView({ content, locale }: DocsPageContentProps) {
  const isRTL = locale === "fa"
  const [query, set_query] = useState("")
  const [active_category, set_active_category] = useState<string | null>(null)

  const filtered = content.articles.filter((article) => {
    const normalized = query.trim().toLowerCase()
    const matches_category =
      !active_category || article.category === active_category
    const matches_query =
      !normalized ||
      article.title.toLowerCase().includes(normalized) ||
      article.summary.toLowerCase().includes(normalized) ||
      article.category.toLowerCase().includes(normalized)
    return matches_category && matches_query
  })

  return (
    <div className="relative">
      <PageHeader
        eyebrow={locale === "fa" ? "راهنما" : "Guides"}
        title={content.page_title}
        subtitle={content.page_subtitle}
        locale={locale}
      />

      <section className="border-t border-white/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-xl">
              <FloatingInput
                id="docs_search"
                label={content.search_placeholder}
                value={query}
                onChange={set_query}
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => set_active_category(null)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  active_category === null
                    ? "border-acid/50 bg-acid/10 text-foreground"
                    : "border-white/10 text-muted-foreground hover:text-foreground",
                )}
              >
                {locale === "fa" ? "همه" : "All"}
              </button>
              {content.categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => set_active_category(category)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    active_category === category
                      ? "border-acid/50 bg-acid/10 text-foreground"
                      : "border-white/10 text-muted-foreground hover:text-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {filtered.map((article, index) => (
              <Reveal key={article.article_id} delay={index * 0.03}>
                <Link
                  href={localizePathname(`/docs/${article.article_id}`, locale)}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/[0.015] p-6 transition-colors hover:border-white/20"
                >
                  <p className="font-mono text-xs tracking-wider text-acid/80 uppercase">
                    {article.category}
                  </p>
                  <h2
                    className={cn(
                      "mt-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-acid",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {article.summary}
                  </p>
                  <p className="mt-6 font-mono text-xs text-muted-foreground">
                    {article.read_minutes}{" "}
                    {locale === "fa" ? "دقیقه مطالعه" : "min read"}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/** @deprecated Prefer DocsPageContentView — kept for existing imports */
export function DocsPageContent(props: DocsPageContentProps) {
  return <DocsPageContentView {...props} />
}
