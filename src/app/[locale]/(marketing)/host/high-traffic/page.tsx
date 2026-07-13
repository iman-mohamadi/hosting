import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HostProductView } from "@/components/sections/product/host-product-view"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { HOSTING_TABLES } from "@/lib/catalog"
import { build_meta } from "@/lib/seo"
import { HOST_CONTENT, HOST_LOCATIONS, HOST_META } from "../_content"

const TYPE = "high-traffic" as const

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const l = isValidLocale(locale) ? locale : defaultLocale
  return build_meta(HOST_META[TYPE].title, HOST_META[TYPE].description, l, "/host/high-traffic")
}

export default async function Page({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  return (
    <HostProductView
      locale={locale}
      content={HOST_CONTENT[TYPE][locale]}
      plans={HOSTING_TABLES[TYPE]}
      locations={HOST_LOCATIONS[TYPE]}
    />
  )
}
