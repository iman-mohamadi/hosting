"use client"

import { useEffect } from "react"

import { getDirection, type Locale } from "@/i18n/config"

interface LocaleAttributesProps {
  locale: Locale
}

export function LocaleAttributes({ locale }: LocaleAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = getDirection(locale)
  }, [locale])

  return null
}
