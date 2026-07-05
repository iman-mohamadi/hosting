import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1]

  if (segment && isValidLocale(segment)) {
    return segment
  }

  return null
}

export function getEffectiveLocale(pathname: string): Locale {
  return getLocaleFromPathname(pathname) ?? defaultLocale
}

export function stripLocalePrefix(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)

  if (locale) {
    const stripped = pathname.slice(`/${locale}`.length)
    return stripped || "/"
  }

  return pathname || "/"
}

export function localizePathname(pathname: string, targetLocale: Locale): string {
  const pathWithoutLocale = stripLocalePrefix(pathname)

  if (targetLocale === defaultLocale) {
    return pathWithoutLocale
  }

  if (pathWithoutLocale === "/") {
    return `/${targetLocale}`
  }

  return `/${targetLocale}${pathWithoutLocale}`
}

export function getHomePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`
}

export function getInternalPathname(pathname: string): string {
  const locale = getEffectiveLocale(pathname)
  const pathWithoutLocale = stripLocalePrefix(pathname)

  if (pathWithoutLocale === "/") {
    return `/${locale}`
  }

  return `/${locale}${pathWithoutLocale}`
}
