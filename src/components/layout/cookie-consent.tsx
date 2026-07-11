"use client"

import { useState, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "cookie_consent_v1"

const copy_by_locale: Record<
  Locale,
  { message: string; accept: string }
> = {
  fa: {
    message:
      "ما از کوکی‌های ضروری برای ورود و ترجیحات شما استفاده می‌کنیم. با ادامه، با این استفاده موافقت می‌کنید.",
    accept: "قبول می‌کنم",
  },
  en: {
    message:
      "We use essential cookies for sign-in and your preferences. By continuing, you agree to this use.",
    accept: "Accept",
  },
}

function subscribe_consent(on_store_change: () => void) {
  window.addEventListener("storage", on_store_change)
  return () => window.removeEventListener("storage", on_store_change)
}

function get_consent_needed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "accepted"
  } catch {
    return true
  }
}

function get_server_consent_needed(): boolean {
  return false
}

interface CookieConsentProps {
  locale: Locale
}

export function CookieConsent({ locale }: CookieConsentProps) {
  const needs_consent = useSyncExternalStore(
    subscribe_consent,
    get_consent_needed,
    get_server_consent_needed,
  )
  const [dismissed, set_dismissed] = useState(false)
  const copy = copy_by_locale[locale]
  const isRTL = locale === "fa"

  if (dismissed || !needs_consent) {
    return null
  }

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted")
    } catch {
      // ignore storage failures
    }
    set_dismissed(true)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div
        className={cn(
          "mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#050706]/95 p-5 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.message}
        </p>
        <Button
          type="button"
          variant="acid"
          size="pill"
          onClick={accept}
          className="shrink-0 justify-center"
        >
          {copy.accept}
        </Button>
      </div>
    </div>
  )
}
