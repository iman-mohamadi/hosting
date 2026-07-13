import type { MetadataRoute } from "next"

import { BRAND } from "@/lib/brand"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/admin",
          "/admin/",
          "/checkout",
          "/login",
          "/register",
          "/en/dashboard",
          "/en/dashboard/",
          "/en/admin",
          "/en/admin/",
          "/en/checkout",
          "/en/login",
          "/en/register",
        ],
      },
    ],
    sitemap: `${BRAND.site_url}/sitemap.xml`,
  }
}
