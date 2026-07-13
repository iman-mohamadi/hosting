import type { MetadataRoute } from "next"

import { locales } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

import { BRAND } from "@/lib/brand"

const SITE_URL = BRAND.site_url

const PUBLIC_PATHS = [
  "/",
  "/pricing",
  "/configure",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/status",
  "/docs",
  "/faq",
  "/sla",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const path of PUBLIC_PATHS) {
    for (const locale of locales) {
      const localized = localizePathname(path, locale)
      entries.push({
        url: `${SITE_URL}${localized === "/" ? "" : localized}`,
        lastModified: new Date(),
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
      })
    }
  }

  return entries
}
