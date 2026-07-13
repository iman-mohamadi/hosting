import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ConfigurePageContent } from "@/components/sections/configure-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"

interface ConfigurePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: ConfigurePageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "configure",
    isValidLocale(locale) ? locale : defaultLocale,
    "/configure",
  )
}

export default async function ConfigurePage({ params }: ConfigurePageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
          …
        </div>
      }
    >
      <ConfigurePageContent locale={locale} />
    </Suspense>
  )
}
