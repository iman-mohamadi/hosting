import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter, Vazirmatn } from "next/font/google"
import { headers } from "next/headers"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { defaultLocale, getDirection, isValidLocale } from "@/i18n/config"
import { cn } from "@/lib/utils"

const SITE_URL = "https://hosting-iota-orcin.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hosting — Cloud infrastructure for serious builds",
    template: "%s · Hosting",
  },
  description:
    "Premium VPS hosting on NVMe storage with low-latency routing, DDoS protection, and a network engineered for 99.99% uptime. Configure and deploy in seconds.",
  keywords: [
    "VPS",
    "cloud hosting",
    "NVMe",
    "DDoS protection",
    "low latency",
    "server",
    "هاستینگ",
    "سرور مجازی",
  ],
  applicationName: "Hosting",
  authors: [{ name: "Hosting" }],
  alternates: {
    canonical: "/",
    languages: { fa: "/", en: "/en" },
  },
  openGraph: {
    type: "website",
    siteName: "Hosting",
    title: "Hosting — Cloud infrastructure for serious builds",
    description:
      "NVMe storage, low-latency routing, DDoS protection. A network built for 99.99% uptime. Configure and deploy in seconds.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hosting — Cloud infrastructure for serious builds",
    description:
      "NVMe storage, low-latency routing, DDoS protection. A network built for 99.99% uptime.",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#040605",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        "dark antialiased",
        inter.variable,
        vazirmatn.variable,
        fontMono.variable,
      )}
    >
      <body className="min-h-svh bg-background font-sans text-foreground">
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
