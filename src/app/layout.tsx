import { Geist_Mono, Inter, Vazirmatn } from "next/font/google"
import { headers } from "next/headers"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { defaultLocale, getDirection, isValidLocale } from "@/i18n/config"
import { cn } from "@/lib/utils"

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
