import type { Locale } from "@/i18n/config"

export function format_money(amount: number, locale: Locale): string {
  if (locale === "fa") {
    return `${amount.toLocaleString("fa-IR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })} دلار`
  }

  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`
}

export function format_date(iso: string, locale: Locale): string {
  const date = new Date(iso)
  return date.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function format_datetime(iso: string, locale: Locale): string {
  const date = new Date(iso)
  return date.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function format_number(value: number, locale: Locale): string {
  return value.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")
}
