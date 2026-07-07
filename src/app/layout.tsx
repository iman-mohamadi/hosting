import type { Metadata, Viewport } from "next"
import { Geist_Mono, Instrument_Serif, Inter, Vazirmatn } from "next/font/google"
import { headers } from "next/headers"

import "./globals.css"
import { GrainOverlay } from "@/components/visuals/grain-overlay"
import { CursorProvider } from "@/components/providers/cursor-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { defaultLocale, getDirection, isValidLocale } from "@/i18n/config"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
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

export const metadata: Metadata = {
  metadataBase: new URL("https://hosting-iota-orcin.vercel.app"),
  title: {
    default: "Hosting — Cloud infrastructure for serious builds",
    template: "%s — Hosting",
  },
  description:
    "NVMe storage, low-latency routing, and DDoS protection on a network engineered for 99.99% uptime. Configure, deploy, and scale in seconds.",
  keywords: [
    "VPS",
    "cloud hosting",
    "NVMe",
    "DDoS protection",
    "infrastructure",
    "servers",
  ],
  openGraph: {
    title: "Hosting — Cloud infrastructure for serious builds",
    description:
      "NVMe storage, low-latency routing, and DDoS protection on a network engineered for 99.99% uptime.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hosting — Cloud infrastructure for serious builds",
    description:
      "NVMe storage, low-latency routing, and DDoS protection on a network engineered for 99.99% uptime.",
  },
}

export const viewport: Viewport = {
  themeColor: "#04050a",
  colorScheme: "dark",
}

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
        "dark antialiased",
        inter.variable,
        instrumentSerif.variable,
        vazirmatn.variable,
        fontMono.variable,
      )}
    >
      <body className="min-h-svh bg-background font-sans text-foreground">
        <ThemeProvider defaultTheme="dark">
          {children}
          <div className="vignette" aria-hidden />
          <GrainOverlay />
          <CursorProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
