/**
 * Single source of truth for product identity, regions, and SLA targets.
 * All user-facing copy should align with these values.
 */
export const BRAND = {
  name_en: "ParsCloud",
  name_fa: "پارس‌کلود",
  legal_name_fa: "شرکت فناوری ابر پارس",
  legal_name_en: "Pars Cloud Technology Co.",
  domain: "parscloud.ir",
  site_url: "https://parscloud.ir",
  support_email: "support@parscloud.ir",
  sales_email: "sales@parscloud.ir",
  privacy_email: "privacy@parscloud.ir",
  phone_display: "+98 21 9100 1234",
  address_fa: "تهران، خیابان ولیعصر، برج فناوری، واحد ۴۰۲",
  address_en: "Unit 402, Technology Tower, Valiasr St., Tehran, Iran",
  /** Published uptime target — linked from SLA, not a marketing guarantee. */
  uptime_target_pct: 99.9,
  /** Typical provisioning time after payment confirmation. */
  deploy_minutes_typical: 5,
  /** Business-hours support window (IRST). */
  support_hours_fa: "شنبه تا پنج‌شنبه، ۹ تا ۱۸",
  support_hours_en: "Sat–Thu, 9:00–18:00 IRST",
  /** First-response target during business hours. */
  support_response_hours: 4,
} as const

export interface DeployRegion {
  region_id: string
  label_fa: string
  label_en: string
  latency_hint_fa: string
  latency_hint_en: string
  is_primary?: boolean
}

/** Live datacenters — marketing, checkout, and admin must match this list. */
export const DEPLOY_REGIONS: DeployRegion[] = [
  {
    region_id: "tehran",
    label_fa: "تهران",
    label_en: "Tehran",
    latency_hint_fa: "زیر ۱۰ms از ایران",
    latency_hint_en: "Under 10ms from Iran",
    is_primary: true,
  },
  {
    region_id: "isfahan",
    label_fa: "اصفهان",
    label_en: "Isfahan",
    latency_hint_fa: "زیر ۱۵ms از مرکز ایران",
    latency_hint_en: "Under 15ms from central Iran",
  },
  {
    region_id: "fra",
    label_fa: "فرانکفورت",
    label_en: "Frankfurt",
    latency_hint_fa: "پشتیبان اروپا · ~۳۵ms",
    latency_hint_en: "EU backup · ~35ms",
  },
]

export function get_region_label(region_id: string, locale: "fa" | "en"): string {
  const region = DEPLOY_REGIONS.find((item) => item.region_id === region_id)
  if (!region) return region_id
  return locale === "fa" ? region.label_fa : region.label_en
}
