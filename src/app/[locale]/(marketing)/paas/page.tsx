import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ServiceProductView } from "@/components/sections/product/service-product-view"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { SERVICE_PLANS } from "@/lib/catalog"
import { build_meta } from "@/lib/seo"
import { SERVICE_CONTENT, SERVICE_META } from "../_services-content"

const TYPE = "paas" as const

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const l = isValidLocale(locale) ? locale : defaultLocale
  return build_meta(SERVICE_META[TYPE].title, SERVICE_META[TYPE].description, l, "/paas")
}

export default async function Page({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  return (
    <ServiceProductView locale={locale} content={SERVICE_CONTENT[TYPE][locale]} plans={SERVICE_PLANS[TYPE]} />
  )
}
