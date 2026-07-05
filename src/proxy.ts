import { NextRequest, NextResponse } from "next/server"

import { defaultLocale } from "@/i18n/config"
import { getLocaleFromPathname } from "@/i18n/routing"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const pathnameLocale = getLocaleFromPathname(pathname)

  if (pathnameLocale === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/fa(?=\/|$)/, "") || "/"
    return NextResponse.redirect(url)
  }

  if (pathnameLocale === "en") {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-locale", "en")

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === "/" ? "/fa" : `/fa${pathname}`

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", defaultLocale)

  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
