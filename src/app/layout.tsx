import type { Metadata, Viewport } from "next"

import { Geist, Geist_Mono, Vazirmatn } from "next/font/google"

import { headers } from "next/headers"



import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

import { defaultLocale, getDirection, isValidLocale } from "@/i18n/config"

import { BRAND } from "@/lib/brand"

import { cn } from "@/lib/utils"



export const metadata: Metadata = {

  metadataBase: new URL(BRAND.site_url),

  title: {

    default: `${BRAND.name_en} — Iranian VPS hosting on NVMe`,

    template: `%s · ${BRAND.name_en}`,

  },

  description:

    "Iranian VPS hosting with NVMe storage, Tehran and Isfahan datacenters, Toman billing, Persian support, and DDoS protection. Configure and deploy in minutes.",

  keywords: [

    "VPS",

    "Iran VPS",

    "سرور مجازی",

    "سرور مجازی ایران",

    "VPS تهران",

    "هاستینگ ایران",

    "NVMe",

    "پارس‌کلود",

    "ParsCloud",

    "DDoS protection",

  ],

  applicationName: BRAND.name_en,

  authors: [{ name: BRAND.legal_name_en }],

  alternates: {

    canonical: "/",

    languages: { fa: "/", en: "/en" },

  },

  openGraph: {

    type: "website",

    siteName: BRAND.name_en,

    title: `${BRAND.name_en} — Iranian VPS hosting on NVMe`,

    description:

      "NVMe VPS in Iranian datacenters with Toman billing, Persian support, and transparent pricing.",

    url: BRAND.site_url,

  },

  twitter: {

    card: "summary_large_image",

    title: `${BRAND.name_en} — Iranian VPS hosting on NVMe`,

    description:

      "NVMe VPS in Iranian datacenters with Toman billing and Persian support.",

  },

  robots: { index: true, follow: true },

}



export const viewport: Viewport = {

  themeColor: [

    { media: "(prefers-color-scheme: light)", color: "#F7F7F7" },

    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },

  ],

  colorScheme: "light dark",

  width: "device-width",

  initialScale: 1,

}



const geist = Geist({

  subsets: ["latin"],

  variable: "--font-geist",

  display: "swap",

})



const vazirmatn = Vazirmatn({

  subsets: ["arabic", "latin"],

  variable: "--font-vazirmatn",

  display: "swap",

})



const fontMono = Geist_Mono({

  subsets: ["latin"],

  variable: "--font-mono",

})



export default async function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode

}>) {

  const headersList = await headers()

  const localeHeader = headersList.get("x-locale") ?? defaultLocale

  const locale = isValidLocale(localeHeader) ? localeHeader : defaultLocale

  const direction = getDirection(locale)



  return (

    <html

      lang={locale}

      dir={direction}

      suppressHydrationWarning

      className={cn(

        "antialiased",

        geist.variable,

        vazirmatn.variable,

        fontMono.variable,

      )}

    >

      <body className="min-h-svh bg-background font-sans text-foreground">

        <ThemeProvider>{children}</ThemeProvider>

      </body>

    </html>

  )

}

