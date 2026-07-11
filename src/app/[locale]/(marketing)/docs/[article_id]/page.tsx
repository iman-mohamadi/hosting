import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { get_docs_article } from "@/actions"
import { DocsArticleContent } from "@/components/sections/docs-article-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"

interface DocsArticlePageProps {
  params: Promise<{ locale: string; article_id: string }>
}

export async function generateMetadata({
  params,
}: DocsArticlePageProps): Promise<Metadata> {
  const { locale, article_id } = await params
  const valid = isValidLocale(locale) ? locale : defaultLocale
  const result = await get_docs_article(valid, article_id)
  if (!result) {
    return build_page_metadata("docs", valid, "/docs")
  }
  return {
    title: result.article.title,
    description: result.article.summary,
  }
}

export default async function DocsArticlePage({ params }: DocsArticlePageProps) {
  const { locale: localeParam, article_id } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const result = await get_docs_article(locale, article_id)

  if (!result) {
    notFound()
  }

  return (
    <DocsArticleContent
      article={result.article}
      body_markdown_paragraphs={result.body_markdown_paragraphs}
      locale={locale}
    />
  )
}
