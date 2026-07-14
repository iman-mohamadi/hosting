/**
 * Product catalog — the source of truth for the ParsCloud storefront.
 *
 * Modeled on a full Iranian cloud provider's line-up: cloud hosting, virtual
 * servers, and domains, each priced in Toman with an Iran / Europe location
 * split and monthly / quarterly / semi-annual / annual billing periods.
 *
 * Plain data (no "use server") so both server and client components can import it.
 */

import type { Locale } from "@/i18n/config"

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

export interface Localized {
  fa: string
  en: string
}

export function pick(value: Localized, locale: Locale): string {
  return locale === "fa" ? value.fa : value.en
}

export function format_toman(amount: number, locale: Locale): string {
  const digits = amount.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")
  return locale === "fa" ? `${digits} تومان` : `${digits} Toman`
}

/** Localize a bare number's digits (Persian numerals for fa). */
export function loc_num(value: number, locale: Locale): string {
  return value.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")
}

/** Billing periods with the number of months each covers. */
export type BillingPeriodId = "monthly" | "quarterly" | "semiannual" | "annual"

export interface BillingPeriod {
  period_id: BillingPeriodId
  months: number
  label: Localized
  /** Applied to the per-month price for longer commitments. */
  discount_pct: number
  badge?: Localized
}

export const BILLING_PERIODS: BillingPeriod[] = [
  { period_id: "monthly", months: 1, discount_pct: 0, label: { fa: "ماهانه", en: "Monthly" } },
  { period_id: "quarterly", months: 3, discount_pct: 5, label: { fa: "سه‌ماهه", en: "3 months" } },
  { period_id: "semiannual", months: 6, discount_pct: 10, label: { fa: "شش‌ماهه", en: "6 months" } },
  {
    period_id: "annual",
    months: 12,
    discount_pct: 20,
    label: { fa: "سالانه", en: "Annual" },
    badge: { fa: "۲۰٪ تخفیف", en: "Save 20%" },
  },
]

export function get_billing_period(period_id: BillingPeriodId): BillingPeriod {
  return BILLING_PERIODS.find((p) => p.period_id === period_id) ?? BILLING_PERIODS[0]
}

/** Product locations offered across the storefront. */
export type LocationId = "iran" | "europe" | "germany" | "netherlands" | "turkey" | "canada"

export interface CatalogLocation {
  location_id: LocationId
  label: Localized
  flag: string
}

export const LOCATIONS: Record<LocationId, CatalogLocation> = {
  iran: { location_id: "iran", label: { fa: "ایران", en: "Iran" }, flag: "🇮🇷" },
  europe: { location_id: "europe", label: { fa: "اروپا", en: "Europe" }, flag: "🇪🇺" },
  germany: { location_id: "germany", label: { fa: "آلمان", en: "Germany" }, flag: "🇩🇪" },
  netherlands: { location_id: "netherlands", label: { fa: "هلند", en: "Netherlands" }, flag: "🇳🇱" },
  turkey: { location_id: "turkey", label: { fa: "ترکیه", en: "Turkey" }, flag: "🇹🇷" },
  canada: { location_id: "canada", label: { fa: "کانادا", en: "Canada" }, flag: "🇨🇦" },
}

/* -------------------------------------------------------------------------- */
/* Product families — powers the mega-menu and the "other products" strips    */
/* -------------------------------------------------------------------------- */

export interface ProductLink {
  label: Localized
  href: string
  desc?: Localized
}

export interface ProductFamily {
  family_id: string
  label: Localized
  icon: "server" | "host" | "domain" | "shield"
  items: ProductLink[]
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    family_id: "server",
    label: { fa: "سرور", en: "Servers" },
    icon: "server",
    items: [
      { label: { fa: "سرور ابری", en: "Cloud server" }, href: "/cloud-server", desc: { fa: "منابع منعطف و ارتقای لحظه‌ای", en: "Flexible, instantly scalable resources" } },
      { label: { fa: "سرور مجازی (VPS)", en: "Virtual server (VPS)" }, href: "/vps", desc: { fa: "ایران و خارج، لینوکس و ویندوز", en: "Iran & abroad, Linux & Windows" } },
      { label: { fa: "سرور اختصاصی", en: "Dedicated server" }, href: "/dedicated-servers", desc: { fa: "سخت‌افزار کاملاً در اختیار شما", en: "Bare hardware, all yours" } },
      { label: { fa: "سرور مجازی ایران", en: "Iran VPS" }, href: "/vps?loc=iran" },
      { label: { fa: "سرور مجازی خارج", en: "Foreign VPS" }, href: "/vps?loc=germany" },
    ],
  },
  {
    family_id: "host",
    label: { fa: "هاست", en: "Hosting" },
    icon: "host",
    items: [
      { label: { fa: "هاست ابری", en: "Cloud hosting" }, href: "/host/cloud-host", desc: { fa: "میزبانی وب روی زیرساخت ابری", en: "Web hosting on cloud infra" } },
      { label: { fa: "هاست لینوکس", en: "Linux hosting" }, href: "/host/linux" },
      { label: { fa: "هاست وردپرس", en: "WordPress hosting" }, href: "/host/wordpress", desc: { fa: "بهینه‌شده برای وردپرس", en: "Tuned for WordPress" } },
      { label: { fa: "هاست ووکامرس", en: "WooCommerce hosting" }, href: "/host/woocommerce" },
      { label: { fa: "هاست دانلود", en: "Download hosting" }, href: "/host/download-host" },
      { label: { fa: "هاست نمایندگی", en: "Reseller hosting" }, href: "/host/reseller" },
      { label: { fa: "هاست پربازدید", en: "High-traffic hosting" }, href: "/host/high-traffic" },
    ],
  },
  {
    family_id: "domain",
    label: { fa: "دامنه", en: "Domain" },
    icon: "domain",
    items: [
      { label: { fa: "ثبت دامنه", en: "Register a domain" }, href: "/domain", desc: { fa: "جستجو و ثبت آنی دامنه", en: "Search & register instantly" } },
      { label: { fa: "دامنه ir.", en: ".ir domain" }, href: "/domain?tld=ir" },
      { label: { fa: "دامنه com.", en: ".com domain" }, href: "/domain?tld=com" },
      { label: { fa: "انتقال دامنه", en: "Transfer a domain" }, href: "/domain?tab=transfer" },
    ],
  },
  {
    family_id: "services",
    label: { fa: "خدمات", en: "Services" },
    icon: "shield",
    items: [
      { label: { fa: "گواهی SSL", en: "SSL certificate" }, href: "/ssl" },
      { label: { fa: "شبکه توزیع محتوا (CDN)", en: "CDN" }, href: "/cdn" },
      { label: { fa: "فضای ابری", en: "Object storage" }, href: "/cloud-storage" },
      { label: { fa: "ابر خصوصی", en: "Private cloud" }, href: "/cloud-storage/private-cloud" },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* Cloud hosting plans — fixed tiers with an Iran / Europe price split         */
/* -------------------------------------------------------------------------- */

export interface HostingPlan {
  plan_id: string
  name: Localized
  tagline: Localized
  /** Per-month price by location, in Toman (before period discount). */
  price: Partial<Record<LocationId, number>>
  specs: {
    ssd_gb: number
    ram_gb: number
    vcpu: number
    bandwidth: Localized
    sites: number | "unlimited"
    databases: number | "unlimited"
  }
  is_recommended?: boolean
}

/** Cloud hosting tiers (اقتصادی → فروشگاهی). Prices mirror the reference table. */
export const CLOUD_HOSTING_PLANS: HostingPlan[] = [
  {
    plan_id: "cloud-starter",
    name: { fa: "استارتر", en: "Starter" },
    tagline: { fa: "برای راه‌اندازی وب‌سایت‌های شخصی و شرکتی سبک", en: "For launching light personal & business sites" },
    price: { iran: 179_200, europe: 229_500 },
    specs: { ssd_gb: 1, ram_gb: 2, vcpu: 1, bandwidth: { fa: "نامحدود", en: "Unlimited" }, sites: 1, databases: 2 },
  },
  {
    plan_id: "cloud-startup",
    name: { fa: "استارتاپ", en: "Startup" },
    tagline: { fa: "مناسب کسب‌وکارهای در حال رشد با ترافیک متوسط", en: "For growing businesses with mid traffic" },
    price: { iran: 341_600, europe: 420_750 },
    specs: { ssd_gb: 5, ram_gb: 4, vcpu: 3, bandwidth: { fa: "نامحدود", en: "Unlimited" }, sites: 5, databases: "unlimited" },
    is_recommended: true,
  },
  {
    plan_id: "cloud-store",
    name: { fa: "فروشگاهی", en: "Store" },
    tagline: { fa: "بهینه برای فروشگاه‌های اینترنتی و سایت‌های پرمخاطب", en: "Optimized for online stores & busy sites" },
    price: { iran: 588_000, europe: 716_550 },
    specs: { ssd_gb: 10, ram_gb: 7, vcpu: 5, bandwidth: { fa: "نامحدود", en: "Unlimited" }, sites: "unlimited", databases: "unlimited" },
  },
]

const UNL = { fa: "نامحدود", en: "Unlimited" }

/** Web-hosting product types that share the fixed-tier layout. */
export type HostingType =
  | "linux"
  | "wordpress"
  | "woocommerce"
  | "download"
  | "reseller"
  | "high-traffic"

/**
 * Per-type tier tables. Prices are per-month Toman; Iran anchors and Europe is
 * the higher-latency-but-global option (~1.28× Iran, matching the cloud page).
 */
export const HOSTING_TABLES: Record<HostingType, HostingPlan[]> = {
  linux: [
    {
      plan_id: "linux-eco",
      name: { fa: "اقتصادی", en: "Economy" },
      tagline: { fa: "برای وب‌سایت‌های شخصی و شرکتی کوچک", en: "For personal and small business sites" },
      price: { iran: 94_080, europe: 120_000 },
      specs: { ssd_gb: 1, ram_gb: 1, vcpu: 1, bandwidth: UNL, sites: 1, databases: 2 },
    },
    {
      plan_id: "linux-pro",
      name: { fa: "حرفه‌ای", en: "Professional" },
      tagline: { fa: "مناسب کسب‌وکارهای در حال رشد", en: "For growing businesses" },
      price: { iran: 168_000, europe: 215_000 },
      specs: { ssd_gb: 3, ram_gb: 2, vcpu: 2, bandwidth: UNL, sites: 5, databases: "unlimited" },
      is_recommended: true,
    },
    {
      plan_id: "linux-org",
      name: { fa: "سازمانی", en: "Business" },
      tagline: { fa: "برای سایت‌های پرمخاطب و چند دامنه‌ای", en: "For busy, multi-domain sites" },
      price: { iran: 294_000, europe: 376_000 },
      specs: { ssd_gb: 6, ram_gb: 3, vcpu: 3, bandwidth: UNL, sites: "unlimited", databases: "unlimited" },
    },
  ],
  wordpress: [
    {
      plan_id: "wp-personal",
      name: { fa: "شخصی", en: "Personal" },
      tagline: { fa: "برای وبلاگ و سایت تک‌صفحه‌ای وردپرس", en: "For a blog or single WordPress site" },
      price: { iran: 245_000, europe: 314_000 },
      specs: { ssd_gb: 2, ram_gb: 2, vcpu: 2, bandwidth: UNL, sites: 1, databases: 3 },
    },
    {
      plan_id: "wp-business",
      name: { fa: "کسب‌وکار", en: "Business" },
      tagline: { fa: "بهینه‌شده با LiteSpeed برای سرعت بالا", en: "LiteSpeed-optimized for speed" },
      price: { iran: 420_000, europe: 538_000 },
      specs: { ssd_gb: 5, ram_gb: 4, vcpu: 3, bandwidth: UNL, sites: 3, databases: "unlimited" },
      is_recommended: true,
    },
    {
      plan_id: "wp-agency",
      name: { fa: "آژانس", en: "Agency" },
      tagline: { fa: "برای مدیریت چند سایت وردپرسی", en: "For managing multiple WordPress sites" },
      price: { iran: 690_000, europe: 883_000 },
      specs: { ssd_gb: 10, ram_gb: 6, vcpu: 4, bandwidth: UNL, sites: 10, databases: "unlimited" },
    },
  ],
  woocommerce: [
    {
      plan_id: "wc-start",
      name: { fa: "فروشگاه پایه", en: "Starter Store" },
      tagline: { fa: "برای راه‌اندازی فروشگاه ووکامرس", en: "To launch a WooCommerce store" },
      price: { iran: 320_000, europe: 410_000 },
      specs: { ssd_gb: 5, ram_gb: 3, vcpu: 3, bandwidth: UNL, sites: 1, databases: "unlimited" },
    },
    {
      plan_id: "wc-grow",
      name: { fa: "فروشگاه رشد", en: "Growth Store" },
      tagline: { fa: "برای فروشگاه‌های با ترافیک متوسط", en: "For mid-traffic stores" },
      price: { iran: 540_000, europe: 691_000 },
      specs: { ssd_gb: 10, ram_gb: 6, vcpu: 4, bandwidth: UNL, sites: 1, databases: "unlimited" },
      is_recommended: true,
    },
    {
      plan_id: "wc-scale",
      name: { fa: "فروشگاه بزرگ", en: "Scale Store" },
      tagline: { fa: "برای فروشگاه‌های پرفروش و پرمحصول", en: "For high-volume catalogs" },
      price: { iran: 850_000, europe: 1_088_000 },
      specs: { ssd_gb: 20, ram_gb: 8, vcpu: 6, bandwidth: UNL, sites: 1, databases: "unlimited" },
    },
  ],
  download: [
    {
      plan_id: "dl-1",
      name: { fa: "دانلود پایه", en: "Basic" },
      tagline: { fa: "برای ارائه فایل و رسانه با حجم متوسط", en: "For serving files and media" },
      price: { iran: 210_000, europe: 269_000 },
      specs: { ssd_gb: 50, ram_gb: 2, vcpu: 2, bandwidth: UNL, sites: 1, databases: 1 },
    },
    {
      plan_id: "dl-2",
      name: { fa: "دانلود حرفه‌ای", en: "Pro" },
      tagline: { fa: "برای سایت‌های دانلود پرترافیک", en: "For high-traffic download sites" },
      price: { iran: 380_000, europe: 486_000 },
      specs: { ssd_gb: 120, ram_gb: 3, vcpu: 3, bandwidth: UNL, sites: 1, databases: 2 },
      is_recommended: true,
    },
    {
      plan_id: "dl-3",
      name: { fa: "دانلود نامحدود", en: "Unlimited" },
      tagline: { fa: "بیشترین فضا برای آرشیو و رسانه سنگین", en: "Max space for heavy archives" },
      price: { iran: 620_000, europe: 794_000 },
      specs: { ssd_gb: 250, ram_gb: 4, vcpu: 4, bandwidth: UNL, sites: 1, databases: 2 },
    },
  ],
  reseller: [
    {
      plan_id: "rs-1",
      name: { fa: "نمایندگی برنزی", en: "Bronze" },
      tagline: { fa: "شروع کسب‌وکار میزبانی با ۲۵ اکانت", en: "Start reselling with 25 accounts" },
      price: { iran: 1_245_000 },
      specs: { ssd_gb: 50, ram_gb: 8, vcpu: 8, bandwidth: UNL, sites: 25, databases: "unlimited" },
    },
    {
      plan_id: "rs-2",
      name: { fa: "نمایندگی نقره‌ای", en: "Silver" },
      tagline: { fa: "برای نمایندگان رو به رشد با ۶۰ اکانت", en: "For growing resellers, 60 accounts" },
      price: { iran: 1_850_000 },
      specs: { ssd_gb: 120, ram_gb: 16, vcpu: 16, bandwidth: UNL, sites: 60, databases: "unlimited" },
      is_recommended: true,
    },
    {
      plan_id: "rs-3",
      name: { fa: "نمایندگی طلایی", en: "Gold" },
      tagline: { fa: "بیشترین منابع برای ۱۵۰ اکانت", en: "Max resources for 150 accounts" },
      price: { iran: 2_600_000 },
      specs: { ssd_gb: 250, ram_gb: 32, vcpu: 24, bandwidth: UNL, sites: 150, databases: "unlimited" },
    },
  ],
  "high-traffic": [
    {
      plan_id: "ht-1",
      name: { fa: "پربازدید پایه", en: "Basic" },
      tagline: { fa: "برای سایت‌هایی که ترافیک روزانه بالایی دارند", en: "For sites with high daily traffic" },
      price: { iran: 825_000, europe: 1_056_000 },
      specs: { ssd_gb: 5, ram_gb: 8, vcpu: 8, bandwidth: UNL, sites: 1, databases: "unlimited" },
    },
    {
      plan_id: "ht-2",
      name: { fa: "پربازدید حرفه‌ای", en: "Pro" },
      tagline: { fa: "برای پیک‌های ترافیکی و کمپین‌های سنگین", en: "For traffic spikes and heavy campaigns" },
      price: { iran: 1_250_000, europe: 1_600_000 },
      specs: { ssd_gb: 10, ram_gb: 16, vcpu: 12, bandwidth: UNL, sites: "unlimited", databases: "unlimited" },
      is_recommended: true,
    },
    {
      plan_id: "ht-3",
      name: { fa: "پربازدید سازمانی", en: "Business" },
      tagline: { fa: "بالاترین منابع برای بارهای کاری بحرانی", en: "Top resources for critical workloads" },
      price: { iran: 1_900_000, europe: 2_432_000 },
      specs: { ssd_gb: 20, ram_gb: 24, vcpu: 16, bandwidth: UNL, sites: "unlimited", databases: "unlimited" },
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* VPS plans — location + OS matrix                                           */
/* -------------------------------------------------------------------------- */

export type VpsOsId = "linux" | "windows" | "mikrotik"

export const VPS_OS: Record<VpsOsId, { label: Localized; surcharge: number }> = {
  linux: { label: { fa: "لینوکس", en: "Linux" }, surcharge: 0 },
  windows: { label: { fa: "ویندوز", en: "Windows" }, surcharge: 450_000 },
  mikrotik: { label: { fa: "میکروتیک", en: "MikroTik" }, surcharge: 180_000 },
}

export const VPS_LOCATIONS: LocationId[] = ["iran", "germany", "netherlands", "turkey", "canada"]

export interface VpsPlan {
  plan_id: string
  code: string
  vcpu: number
  ram_gb: number
  ssd_gb: number
  /** Base monthly price (Linux, Iran) in Toman. */
  base_price: number
}

/** Canonical VPS tiers. Iran-Linux prices mirror the reference table. */
export const VPS_PLANS: VpsPlan[] = [
  { plan_id: "vps-1", code: "VPS1", vcpu: 1, ram_gb: 1, ssd_gb: 25, base_price: 690_000 },
  { plan_id: "vps-2", code: "VPS2", vcpu: 1, ram_gb: 2, ssd_gb: 40, base_price: 785_000 },
  { plan_id: "vps-3", code: "VPS3", vcpu: 2, ram_gb: 2, ssd_gb: 50, base_price: 1_030_000 },
  { plan_id: "vps-4", code: "VPS4", vcpu: 2, ram_gb: 4, ssd_gb: 70, base_price: 1_480_000 },
  { plan_id: "vps-5", code: "VPS5", vcpu: 4, ram_gb: 8, ssd_gb: 100, base_price: 2_195_000 },
  { plan_id: "vps-6", code: "VPS6", vcpu: 8, ram_gb: 16, ssd_gb: 200, base_price: 3_950_000 },
]

/** Location price multipliers relative to the Iran base. */
const VPS_LOCATION_MULTIPLIER: Record<LocationId, number> = {
  iran: 1,
  germany: 1.15,
  netherlands: 1.18,
  turkey: 1.1,
  canada: 1.25,
  europe: 1.15,
}

/** Monthly traffic quota shown per location. */
export function vps_traffic(location: LocationId): Localized {
  if (location === "iran") return { fa: "۲۰۰ گیگابایت (قابل ارتقا)", en: "200 GB (upgradeable)" }
  return { fa: "۱۰۰۰ گیگابایت", en: "1000 GB" }
}

export function vps_price(plan: VpsPlan, location: LocationId, os: VpsOsId): number {
  const located = plan.base_price * (VPS_LOCATION_MULTIPLIER[location] ?? 1)
  const withOs = located + VPS_OS[os].surcharge
  return Math.round(withOs / 5_000) * 5_000
}

/** Location code prefix used in server names, e.g. "ir", "de". */
export function vps_location_code(location: LocationId): string {
  const map: Record<LocationId, string> = {
    iran: "ir",
    germany: "de",
    netherlands: "nl",
    turkey: "tr",
    canada: "ca",
    europe: "eu",
  }
  return map[location] ?? "eu"
}

/* -------------------------------------------------------------------------- */
/* Cloud & dedicated servers — tiered card layout                             */
/* -------------------------------------------------------------------------- */

export interface ServerPlan {
  plan_id: string
  code: string
  name: Localized
  tagline: Localized
  /** CPU label (core count for cloud, model + cores for dedicated). */
  cpu: Localized
  ram_gb: number
  disk: Localized
  traffic: Localized
  /** Per-month price by location, in Toman. */
  price: Partial<Record<LocationId, number>>
  is_recommended?: boolean
}

export const CLOUD_SERVER_LOCATIONS: LocationId[] = ["iran", "germany", "netherlands"]

export const CLOUD_SERVER_PLANS: ServerPlan[] = [
  {
    plan_id: "cs-1",
    code: "C1",
    name: { fa: "ابری استاندارد ۱", en: "Cloud Standard 1" },
    tagline: { fa: "برای پروژه‌های کوچک و محیط تست", en: "For small projects and test environments" },
    cpu: { fa: "۱ هسته", en: "1 vCPU" },
    ram_gb: 2,
    disk: { fa: "۲۵ گیگابایت NVMe", en: "25 GB NVMe" },
    traffic: { fa: "۱ ترابایت", en: "1 TB" },
    price: { iran: 480_000, germany: 590_000, netherlands: 610_000 },
  },
  {
    plan_id: "cs-2",
    code: "C2",
    name: { fa: "ابری استاندارد ۲", en: "Cloud Standard 2" },
    tagline: { fa: "مناسب اپلیکیشن و سایت در حال رشد", en: "For growing apps and sites" },
    cpu: { fa: "۲ هسته", en: "2 vCPU" },
    ram_gb: 4,
    disk: { fa: "۵۰ گیگابایت NVMe", en: "50 GB NVMe" },
    traffic: { fa: "۲ ترابایت", en: "2 TB" },
    price: { iran: 850_000, germany: 1_040_000, netherlands: 1_075_000 },
    is_recommended: true,
  },
  {
    plan_id: "cs-3",
    code: "C3",
    name: { fa: "ابری حرفه‌ای", en: "Cloud Pro" },
    tagline: { fa: "برای بارهای کاری تولیدی و دیتابیس", en: "For production workloads and databases" },
    cpu: { fa: "۴ هسته", en: "4 vCPU" },
    ram_gb: 8,
    disk: { fa: "۸۰ گیگابایت NVMe", en: "80 GB NVMe" },
    traffic: { fa: "۳ ترابایت", en: "3 TB" },
    price: { iran: 1_550_000, germany: 1_890_000, netherlands: 1_950_000 },
  },
  {
    plan_id: "cs-4",
    code: "C4",
    name: { fa: "ابری سازمانی", en: "Cloud Business" },
    tagline: { fa: "منابع بالا برای سرویس‌های حیاتی", en: "High resources for critical services" },
    cpu: { fa: "۸ هسته", en: "8 vCPU" },
    ram_gb: 16,
    disk: { fa: "۱۶۰ گیگابایت NVMe", en: "160 GB NVMe" },
    traffic: { fa: "۵ ترابایت", en: "5 TB" },
    price: { iran: 2_900_000, germany: 3_540_000, netherlands: 3_650_000 },
  },
]

export const DEDICATED_LOCATIONS: LocationId[] = ["iran", "germany"]

export const DEDICATED_PLANS: ServerPlan[] = [
  {
    plan_id: "ds-1",
    code: "E-2388G",
    name: { fa: "اختصاصی استاندارد", en: "Standard" },
    tagline: { fa: "سخت‌افزار اختصاصی برای بارهای عمومی", en: "Dedicated hardware for general workloads" },
    cpu: { fa: "Xeon E-2388G · ۸ هسته/۱۶ رشته", en: "Xeon E-2388G · 8C/16T" },
    ram_gb: 32,
    disk: { fa: "۲×۱ ترابایت NVMe", en: "2×1 TB NVMe" },
    traffic: { fa: "۱۰ ترابایت", en: "10 TB" },
    price: { iran: 8_900_000, germany: 9_800_000 },
  },
  {
    plan_id: "ds-2",
    code: "Gold-6230",
    name: { fa: "اختصاصی حرفه‌ای", en: "Pro" },
    tagline: { fa: "پردازش قوی برای مجازی‌سازی و دیتابیس", en: "Strong compute for virtualization and databases" },
    cpu: { fa: "Xeon Gold 6230 · ۲۰ هسته", en: "Xeon Gold 6230 · 20 cores" },
    ram_gb: 64,
    disk: { fa: "۲×۲ ترابایت NVMe", en: "2×2 TB NVMe" },
    traffic: { fa: "۲۰ ترابایت", en: "20 TB" },
    price: { iran: 14_500_000, germany: 15_900_000 },
    is_recommended: true,
  },
  {
    plan_id: "ds-3",
    code: "EPYC-7443P",
    name: { fa: "اختصاصی سازمانی", en: "Enterprise" },
    tagline: { fa: "بیشترین هسته و حافظه برای بار سنگین", en: "Max cores and memory for heavy load" },
    cpu: { fa: "AMD EPYC 7443P · ۲۴ هسته", en: "AMD EPYC 7443P · 24 cores" },
    ram_gb: 128,
    disk: { fa: "۲×۴ ترابایت NVMe", en: "2×4 TB NVMe" },
    traffic: { fa: "۳۰ ترابایت", en: "30 TB" },
    price: { iran: 23_500_000, germany: 22_000_000 },
  },
]

/* -------------------------------------------------------------------------- */
/* Services — SSL, CDN, storage, private cloud, PaaS                          */
/* -------------------------------------------------------------------------- */

export type ServiceType = "ssl" | "cdn" | "storage" | "private-cloud" | "paas"

export interface ServicePlan {
  plan_id: string
  name: Localized
  tagline: Localized
  /** Full price for one billing term, in Toman. */
  price: number
  term: "monthly" | "annual"
  bullets: Localized[]
  is_recommended?: boolean
}

export function service_term_label(term: "monthly" | "annual"): Localized {
  return term === "annual"
    ? { fa: "/ سال", en: "/ yr" }
    : { fa: "/ ماه", en: "/ mo" }
}

export const SERVICE_PLANS: Record<ServiceType, ServicePlan[]> = {
  ssl: [
    {
      plan_id: "ssl-dv",
      name: { fa: "SSL دامنه (DV)", en: "Domain SSL (DV)" },
      tagline: { fa: "اعتبارسنجی دامنه، مناسب اکثر وب‌سایت‌ها", en: "Domain validation for most sites" },
      price: 350_000,
      term: "annual",
      bullets: [
        { fa: "رمزنگاری ۲۵۶ بیتی", en: "256-bit encryption" },
        { fa: "صدور طی چند دقیقه", en: "Issued in minutes" },
        { fa: "پشتیبانی از یک دامنه", en: "Single domain" },
      ],
    },
    {
      plan_id: "ssl-wildcard",
      name: { fa: "SSL وایلدکارت", en: "Wildcard SSL" },
      tagline: { fa: "پوشش دامنه و همه ساب‌دامنه‌ها", en: "Covers a domain and all subdomains" },
      price: 1_850_000,
      term: "annual",
      bullets: [
        { fa: "پوشش نامحدود ساب‌دامنه", en: "Unlimited subdomains" },
        { fa: "رمزنگاری ۲۵۶ بیتی", en: "256-bit encryption" },
        { fa: "گارانتی و مهر اعتماد", en: "Warranty & trust seal" },
      ],
      is_recommended: true,
    },
    {
      plan_id: "ssl-ov",
      name: { fa: "SSL سازمانی (OV)", en: "Organization SSL (OV)" },
      tagline: { fa: "احراز هویت سازمان برای اعتماد بیشتر", en: "Organization validation for more trust" },
      price: 2_900_000,
      term: "annual",
      bullets: [
        { fa: "احراز هویت سازمان", en: "Organization vetting" },
        { fa: "مناسب سایت‌های تجاری", en: "For business sites" },
        { fa: "گارانتی بالاتر", en: "Higher warranty" },
      ],
    },
    {
      plan_id: "ssl-ev",
      name: { fa: "SSL توسعه‌یافته (EV)", en: "Extended SSL (EV)" },
      tagline: { fa: "بالاترین سطح اعتماد برای بانک و فروشگاه", en: "Top trust for banks and stores" },
      price: 6_500_000,
      term: "annual",
      bullets: [
        { fa: "بالاترین سطح احراز هویت", en: "Highest validation level" },
        { fa: "مناسب پرداخت و بانکداری", en: "For payments & banking" },
        { fa: "بیشترین اعتبار گارانتی", en: "Maximum warranty" },
      ],
    },
  ],
  cdn: [
    {
      plan_id: "cdn-starter",
      name: { fa: "CDN پایه", en: "CDN Starter" },
      tagline: { fa: "شتاب‌دهی سایت‌های کوچک و شخصی", en: "Acceleration for small sites" },
      price: 480_000,
      term: "monthly",
      bullets: [
        { fa: "۱۰۰ گیگابایت ترافیک ماهانه", en: "100 GB monthly traffic" },
        { fa: "کش لبه و فشرده‌سازی", en: "Edge cache & compression" },
        { fa: "SSL رایگان", en: "Free SSL" },
      ],
    },
    {
      plan_id: "cdn-business",
      name: { fa: "CDN کسب‌وکار", en: "CDN Business" },
      tagline: { fa: "برای سایت‌های پرمخاطب و فروشگاه", en: "For busy sites and stores" },
      price: 1_200_000,
      term: "monthly",
      bullets: [
        { fa: "۵۰۰ گیگابایت ترافیک ماهانه", en: "500 GB monthly traffic" },
        { fa: "محافظت DDoS لایه ۷", en: "Layer-7 DDoS protection" },
        { fa: "بهینه‌سازی تصاویر", en: "Image optimization" },
      ],
      is_recommended: true,
    },
    {
      plan_id: "cdn-pro",
      name: { fa: "CDN حرفه‌ای", en: "CDN Pro" },
      tagline: { fa: "پهنای باند بالا برای رسانه و استریم", en: "High bandwidth for media & streaming" },
      price: 3_900_000,
      term: "monthly",
      bullets: [
        { fa: "۲ ترابایت ترافیک ماهانه", en: "2 TB monthly traffic" },
        { fa: "قوانین کش سفارشی", en: "Custom cache rules" },
        { fa: "گزارش و آنالیز پیشرفته", en: "Advanced analytics" },
      ],
    },
  ],
  storage: [
    {
      plan_id: "st-100",
      name: { fa: "فضای ابری ۱۰۰", en: "Storage 100" },
      tagline: { fa: "ذخیره‌سازی شیء سازگار با S3", en: "S3-compatible object storage" },
      price: 190_000,
      term: "monthly",
      bullets: [
        { fa: "۱۰۰ گیگابایت فضا", en: "100 GB space" },
        { fa: "سازگار با S3 API", en: "S3-compatible API" },
        { fa: "ترافیک خروجی منصفانه", en: "Fair egress traffic" },
      ],
    },
    {
      plan_id: "st-500",
      name: { fa: "فضای ابری ۵۰۰", en: "Storage 500" },
      tagline: { fa: "برای بک‌آپ و فایل‌های پروژه", en: "For backups and project files" },
      price: 750_000,
      term: "monthly",
      bullets: [
        { fa: "۵۰۰ گیگابایت فضا", en: "500 GB space" },
        { fa: "لینک اشتراک و دسترسی خصوصی", en: "Share links & private access" },
        { fa: "نسخه‌بندی فایل", en: "File versioning" },
      ],
      is_recommended: true,
    },
    {
      plan_id: "st-2000",
      name: { fa: "فضای ابری ۲ ترابایت", en: "Storage 2 TB" },
      tagline: { fa: "ظرفیت بالا برای آرشیو و رسانه", en: "High capacity for archives & media" },
      price: 2_600_000,
      term: "monthly",
      bullets: [
        { fa: "۲ ترابایت فضا", en: "2 TB space" },
        { fa: "کلید دسترسی چندگانه", en: "Multiple access keys" },
        { fa: "سازگار با CDN", en: "CDN-ready" },
      ],
    },
  ],
  "private-cloud": [
    {
      plan_id: "pc-start",
      name: { fa: "ابر خصوصی شروع", en: "Private Cloud Start" },
      tagline: { fa: "استخر منابع اختصاصی برای چند ماشین", en: "Dedicated resource pool for several VMs" },
      price: 12_000_000,
      term: "monthly",
      bullets: [
        { fa: "۸ هسته · ۳۲ گیگابایت رم", en: "8 vCPU · 32 GB RAM" },
        { fa: "۵۰۰ گیگابایت فضای NVMe", en: "500 GB NVMe" },
        { fa: "پنل مدیریت ماشین‌ها", en: "VM management panel" },
      ],
    },
    {
      plan_id: "pc-grow",
      name: { fa: "ابر خصوصی رشد", en: "Private Cloud Growth" },
      tagline: { fa: "برای تیم‌ها و بارهای کاری متعدد", en: "For teams and multiple workloads" },
      price: 22_000_000,
      term: "monthly",
      bullets: [
        { fa: "۱۶ هسته · ۶۴ گیگابایت رم", en: "16 vCPU · 64 GB RAM" },
        { fa: "۱ ترابایت فضای NVMe", en: "1 TB NVMe" },
        { fa: "شبکه خصوصی و فایروال", en: "Private network & firewall" },
      ],
      is_recommended: true,
    },
    {
      plan_id: "pc-org",
      name: { fa: "ابر خصوصی سازمانی", en: "Private Cloud Enterprise" },
      tagline: { fa: "زیرساخت اختصاصی در مقیاس سازمان", en: "Dedicated infrastructure at org scale" },
      price: 38_000_000,
      term: "monthly",
      bullets: [
        { fa: "۳۲ هسته · ۱۲۸ گیگابایت رم", en: "32 vCPU · 128 GB RAM" },
        { fa: "۲ ترابایت فضای NVMe", en: "2 TB NVMe" },
        { fa: "SLA اختصاصی و پشتیبانی ویژه", en: "Dedicated SLA & premium support" },
      ],
    },
  ],
  paas: [
    {
      plan_id: "paas-hobby",
      name: { fa: "PaaS شخصی", en: "PaaS Hobby" },
      tagline: { fa: "اجرای اپلیکیشن بدون دردسر سرور", en: "Run apps without server hassle" },
      price: 350_000,
      term: "monthly",
      bullets: [
        { fa: "۱ اپلیکیشن · ۱ گیگابایت رم", en: "1 app · 1 GB RAM" },
        { fa: "استقرار از Git", en: "Deploy from Git" },
        { fa: "SSL و دامنه خودکار", en: "Automatic SSL & domain" },
      ],
    },
    {
      plan_id: "paas-team",
      name: { fa: "PaaS تیمی", en: "PaaS Team" },
      tagline: { fa: "برای تیم‌های توسعه و چند اپلیکیشن", en: "For dev teams and multiple apps" },
      price: 1_100_000,
      term: "monthly",
      bullets: [
        { fa: "۵ اپلیکیشن · ۴ گیگابایت رم", en: "5 apps · 4 GB RAM" },
        { fa: "دیتابیس مدیریت‌شده", en: "Managed databases" },
        { fa: "مقیاس‌پذیری خودکار", en: "Auto-scaling" },
      ],
      is_recommended: true,
    },
    {
      plan_id: "paas-business",
      name: { fa: "PaaS سازمانی", en: "PaaS Business" },
      tagline: { fa: "منابع بالا برای اپلیکیشن‌های تولیدی", en: "High resources for production apps" },
      price: 3_200_000,
      term: "monthly",
      bullets: [
        { fa: "اپلیکیشن نامحدود · ۱۲ گیگابایت رم", en: "Unlimited apps · 12 GB RAM" },
        { fa: "خط لوله CI/CD", en: "CI/CD pipeline" },
        { fa: "پشتیبانی اولویت‌دار", en: "Priority support" },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* Domain TLDs                                                                 */
/* -------------------------------------------------------------------------- */

export interface DomainTld {
  tld: string
  register: number
  renew: number
  transfer: number | null
  popular?: boolean
  discounted?: boolean
}

/** Annual domain pricing in Toman. */
export const DOMAIN_TLDS: DomainTld[] = [
  { tld: "ir", register: 84_000, renew: 84_000, transfer: 84_000, popular: true },
  { tld: "com", register: 2_127_000, renew: 2_175_000, transfer: 2_127_000, popular: true, discounted: true },
  { tld: "net", register: 2_389_000, renew: 2_389_000, transfer: 2_389_000, popular: true },
  { tld: "org", register: 2_305_000, renew: 2_305_000, transfer: 2_305_000 },
  { tld: "info", register: 1_120_000, renew: 2_640_000, transfer: 1_120_000, discounted: true },
  { tld: "shop", register: 452_000, renew: 7_482_000, transfer: 452_000, discounted: true },
  { tld: "io", register: 8_527_000, renew: 13_004_000, transfer: 8_527_000 },
  { tld: "me", register: 2_033_000, renew: 4_059_000, transfer: 2_033_000, discounted: true },
  { tld: "co", register: 3_180_000, renew: 3_180_000, transfer: 3_180_000 },
  { tld: "dev", register: 1_690_000, renew: 1_690_000, transfer: 1_690_000 },
  { tld: "app", register: 1_820_000, renew: 1_820_000, transfer: 1_820_000 },
  { tld: "website", register: 340_000, renew: 3_120_000, transfer: 340_000, discounted: true },
]

/** Deterministic availability so the demo search feels real without a backend. */
export function domain_is_available(sld: string, tld: string): boolean {
  const taken = new Set(["google", "test", "example", "parspack", "parscloud", "admin", "shop", "host"])
  if (taken.has(sld.toLowerCase())) return false
  // Simple hash → ~75% available.
  let h = 0
  const key = `${sld}.${tld}`
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return h % 4 !== 0
}
