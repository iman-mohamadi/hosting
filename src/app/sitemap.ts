import type { MetadataRoute } from "next"

import { locales } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

const SITE_URL = "https://hosting.io"

const PUBLIC_PATHS = [
  "/",
  "/pricing",
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
