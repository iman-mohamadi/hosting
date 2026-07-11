"use server"

import { dashboardPageCopyByLocale } from "@/lib/dashboard-copy"
import {
  clear_auth_session,
  establish_auth_session,
  get_access_token,
} from "@/lib/session"
import type {
  AuthPageCopy,
  AuthResponse,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
} from "@/types/auth"
import type {
  AccountProfile,
  AccountSession,
  ActivityEntry,
  ApiToken,
  BackupFrequency,
  BackupPolicy,
  BlockVolume,
  DashboardOverview,
  DashboardPageCopy,
  DnsRecord,
  DnsRecordType,
  DnsZone,
  FirewallProtocol,
  FirewallRule,
  FloatingIp,
  InstanceAction,
  Invoice,
  NotificationPreferences,
  PaymentMethod,
  ResizeConstraints,
  ResizeMode,
  ServerInstance,
  Snapshot,
  SshKey,
  SupportTicket,
  TicketPriority,
  UsageSeries,
  UserOrder,
} from "@/types/dashboard"
import type {
  AdminAccountStatus,
  AdminMetrics,
  AdminNode,
  AdminOrder,
  AdminPageCopy,
  AdminTicket,
  AdminUser,
  OrderStatus,
} from "@/types/admin"

export interface HeroData {
  main_title: string
  sub_description: string
  call_to_action: string
  call_to_action_href: string
  badge_text: string
}

export interface PricingPlan {
  plan_id: string
  plan_name: string
  plan_description: string
  monthly_price: number
  price_display: string
  billing_period: string
  cpu_cores: number
  ram_gb: number
  storage_nvme: number
  bandwidth_tb: number
  is_recommended: boolean
  features_list: string[]
  cta_label: string
}

export interface ComparisonFeature {
  feature_id: string
  feature_label: string
  starter_value: string
  pro_value: string
  enterprise_value: string
}

export interface PricingPageCopy {
  page_title: string
  page_subtitle: string
  plans_section_title: string
  comparison_section_title: string
  comparison_section_subtitle: string
  recommended_badge: string
  per_month: string
}

export interface AboutPillar {
  pillar_id: string
  pillar_title: string
  pillar_body: string
}

export interface AboutContent {
  page_title: string
  mission_statement: string
  mission_subtitle: string
  intro_label: string
  pillars: AboutPillar[]
}

export interface LegalSection {
  section_id: string
  section_title: string
  section_body: string
}

export interface LegalContent {
  page_title: string
  page_subtitle: string
  last_updated: string
  toc_label: string
  sections: LegalSection[]
}

export interface ContactPayload {
  sender_name: string
  sender_email: string
  form_subject: string
  message_body: string
}

export interface ContactFormResult {
  success: boolean
  message: string
}

export interface ContactPageCopy {
  page_title: string
  page_subtitle: string
  form_title: string
  sender_name_label: string
  sender_name_placeholder: string
  sender_email_label: string
  sender_email_placeholder: string
  form_subject_label: string
  form_subject_placeholder: string
  message_body_label: string
  message_body_placeholder: string
  submit_label: string
  submitting_label: string
  success_title: string
  success_message: string
  response_time_label: string
  response_time_value: string
  support_email_label: string
  support_email_value: string
}

export interface PrivacyPolicySection {
  section_id: string
  section_heading: string
  section_content: string
}

export interface PrivacyContent {
  page_title: string
  page_subtitle: string
  last_updated_date: string
  toc_label: string
  policy_sections: PrivacyPolicySection[]
}

export interface StatusComponent {
  component_id: string
  component_name: string
  status: "operational" | "degraded" | "outage"
  uptime_pct: number
}

export interface StatusIncident {
  incident_id: string
  title: string
  status: "investigating" | "resolved"
  region_label: string
  started_at: string
  resolved_at?: string
  summary: string
}

export interface StatusPageContent {
  page_title: string
  page_subtitle: string
  overall_status: string
  uptime_label: string
  uptime_value: string
  last_updated_label: string
  components_title: string
  incidents_title: string
  no_incidents: string
  status_labels: Record<StatusComponent["status"], string>
  components: StatusComponent[]
  incidents: StatusIncident[]
}

export interface DocsArticle {
  article_id: string
  category: string
  title: string
  summary: string
  read_minutes: number
}

export interface DocsPageContent {
  page_title: string
  page_subtitle: string
  search_placeholder: string
  categories: string[]
  articles: DocsArticle[]
}

export interface CheckoutRegion {
  region_id: "fra" | "sin" | "nyc" | "tehran"
  label: string
  latency_hint: string
}

export interface CheckoutPageCopy {
  page_title: string
  page_subtitle: string
  summary_title: string
  region_label: string
  region_hint: string
  monthly_label: string
  per_month: string
  submit_label: string
  submitting_label: string
  sign_in_prompt: string
  sign_in_link: string
  register_link: string
  success_title: string
  success_message: string
  view_orders: string
  invalid_config: string
  promo_label: string
  promo_placeholder: string
  promo_apply: string
  promo_applied: string
  promo_invalid: string
  discount_label: string
  original_price_label: string
  regions: CheckoutRegion[]
}

export interface FaqItem {
  question_id: string
  question: string
  answer: string
}

export interface FaqPageContent {
  page_title: string
  page_subtitle: string
  items: FaqItem[]
}

export interface SlaMetric {
  metric_id: string
  label: string
  value: string
  description: string
}

export interface SlaPageContent {
  page_title: string
  page_subtitle: string
  commitment_title: string
  commitment_body: string
  metrics_title: string
  metrics: SlaMetric[]
  credits_title: string
  credits_body: string
  exclusions_title: string
  exclusions: string[]
}

const heroDataByLocale: Record<string, HeroData> = {
  fa: {
    main_title: "زیرساخت ابری\nبرای محصول جدی",
    sub_description:
      "NVMe Storage، Low Latency Routing و DDoS Protection روی شبکه‌ای که برای 99.99% Uptime ساخته شده. سریع لانچ کنید. بی‌سر و صدا مقیاس شوید.",
    call_to_action: "پیکربندی کنید",
    call_to_action_href: "#configurator",
    badge_text: "NVMe • 99.99% Uptime",
  },
  en: {
    main_title: "Cloud infrastructure\nfor serious builds",
    sub_description:
      "NVMe storage, low-latency routing, and DDoS protection on a network designed for 99.99% uptime. Launch fast. Stay in control.",
    call_to_action: "Configure now",
    call_to_action_href: "#configurator",
    badge_text: "NVMe • 99.99% Uptime",
  },
}

const pricingPageCopyByLocale: Record<string, PricingPageCopy> = {
  fa: {
    page_title: "پلن‌های\nزیرساخت",
    page_subtitle:
      "VPSهای اختصاصی با NVMe Storage، Low Latency Routing و DDoS Protection. شفاف، سریع و آماده تولید.",
    plans_section_title: "پلن‌ها",
    comparison_section_title: "مقایسه فنی",
    comparison_section_subtitle:
      "هر جزئیات مهم را بی‌ابهام ببینید.",
    recommended_badge: "پیشنهاد ما",
    per_month: "در ماه",
  },
  en: {
    page_title: "Infrastructure\nPlans",
    page_subtitle:
      "Dedicated VPS plans with NVMe storage, low-latency routing, and DDoS protection. Clear pricing. Serious performance.",
    plans_section_title: "Plans",
    comparison_section_title: "Technical comparison",
    comparison_section_subtitle:
      "See every detail that matters, without the noise.",
    recommended_badge: "Our pick",
    per_month: "per month",
  },
}

const pricingPlansByLocale: Record<string, PricingPlan[]> = {
  fa: [
    {
      plan_id: "starter",
      plan_name: "شروع",
      plan_description: "برای لانچ‌های سبک، محیط توسعه، و سرویس‌های کوچک.",
      monthly_price: 12,
      price_display: "$12",
      billing_period: "ماهانه",
      cpu_cores: 1,
      ram_gb: 2,
      storage_nvme: 40,
      bandwidth_tb: 2,
      is_recommended: false,
      features_list: [
        "۱ هسته CPU اختصاصی",
        "۲ GB RAM",
        "۴۰ GB NVMe Storage",
        "Low Latency Routing",
        "پشتیبان‌گیری هفتگی",
        "پشتیبانی ایمیل",
      ],
      cta_label: "انتخاب کنید",
    },
    {
      plan_id: "pro",
      plan_name: "رشد",
      plan_description: "تعادل ایده‌آل برای تیم‌ها و اپلیکیشن‌های پرترافیک.",
      monthly_price: 36,
      price_display: "$36",
      billing_period: "ماهانه",
      cpu_cores: 4,
      ram_gb: 8,
      storage_nvme: 160,
      bandwidth_tb: 5,
      is_recommended: true,
      features_list: [
        "۴ هسته CPU اختصاصی",
        "۸ GB RAM",
        "۱۶۰ GB NVMe Storage",
        "Low Latency Routing",
        "DDoS Protection",
        "پشتیبان‌گیری روزانه",
        "پشتیبانی اولویت‌دار",
      ],
      cta_label: "انتخاب پلن",
    },
    {
      plan_id: "enterprise",
      plan_name: "سازمانی",
      plan_description: "حداکثر توان برای بارهای کاری حساس و تیم‌های جدی.",
      monthly_price: 96,
      price_display: "$96",
      billing_period: "ماهانه",
      cpu_cores: 8,
      ram_gb: 32,
      storage_nvme: 512,
      bandwidth_tb: 10,
      is_recommended: false,
      features_list: [
        "۸ هسته CPU اختصاصی",
        "۳۲ GB RAM",
        "۵۱۲ GB NVMe Storage",
        "Low Latency Routing",
        "DDoS Protection",
        "Snapshot فوری",
        "IPv4 اختصاصی",
        "مدیر اختصاصی",
      ],
      cta_label: "تماس با فروش",
    },
  ],
  en: [
    {
      plan_id: "starter",
      plan_name: "Start",
      plan_description: "For lightweight launches, development, and smaller services.",
      monthly_price: 12,
      price_display: "$12",
      billing_period: "monthly",
      cpu_cores: 1,
      ram_gb: 2,
      storage_nvme: 40,
      bandwidth_tb: 2,
      is_recommended: false,
      features_list: [
        "1 dedicated CPU core",
        "2 GB RAM",
        "40 GB NVMe storage",
        "Low latency routing",
        "Weekly backups",
        "Email support",
      ],
      cta_label: "Choose plan",
    },
    {
      plan_id: "pro",
      plan_name: "Growth",
      plan_description: "The sweet spot for teams and high-traffic applications.",
      monthly_price: 36,
      price_display: "$36",
      billing_period: "monthly",
      cpu_cores: 4,
      ram_gb: 8,
      storage_nvme: 160,
      bandwidth_tb: 5,
      is_recommended: true,
      features_list: [
        "4 dedicated CPU cores",
        "8 GB RAM",
        "160 GB NVMe storage",
        "Low latency routing",
        "Daily backups",
        "DDoS protection",
        "Priority support",
      ],
      cta_label: "Select plan",
    },
    {
      plan_id: "enterprise",
      plan_name: "Scale",
      plan_description: "Maximum headroom for mission-critical workloads.",
      monthly_price: 96,
      price_display: "$96",
      billing_period: "monthly",
      cpu_cores: 8,
      ram_gb: 32,
      storage_nvme: 512,
      bandwidth_tb: 10,
      is_recommended: false,
      features_list: [
        "8 dedicated CPU cores",
        "32 GB RAM",
        "512 GB NVMe storage",
        "Low latency routing",
        "DDoS protection",
        "Instant snapshots",
        "Dedicated IPv4",
        "Dedicated manager",
      ],
      cta_label: "Talk to sales",
    },
  ],
}

const comparisonFeaturesByLocale: Record<string, ComparisonFeature[]> = {
  fa: [
    {
      feature_id: "cpu_cores",
      feature_label: "هسته‌های CPU",
      starter_value: "۱",
      pro_value: "۴",
      enterprise_value: "۸",
    },
    {
      feature_id: "ram_gb",
      feature_label: "حافظه RAM",
      starter_value: "۲ GB",
      pro_value: "۸ GB",
      enterprise_value: "۳۲ GB",
    },
    {
      feature_id: "storage_nvme",
      feature_label: "NVMe Storage",
      starter_value: "۴۰ GB",
      pro_value: "۱۶۰ GB",
      enterprise_value: "۵۱۲ GB",
    },
    {
      feature_id: "routing",
      feature_label: "Low Latency Routing",
      starter_value: "استاندارد",
      pro_value: "اولویت‌دار",
      enterprise_value: "اختصاصی",
    },
    {
      feature_id: "bandwidth",
      feature_label: "پهنای باند",
      starter_value: "۲ TB",
      pro_value: "۵ TB",
      enterprise_value: "۱۰ TB",
    },
    {
      feature_id: "ipv4",
      feature_label: "IPv4 اختصاصی",
      starter_value: "—",
      pro_value: "۱",
      enterprise_value: "۲",
    },
    {
      feature_id: "ddos",
      feature_label: "محافظت DDoS",
      starter_value: "پایه",
      pro_value: "پیشرفته",
      enterprise_value: "سازمانی",
    },
    {
      feature_id: "backups",
      feature_label: "پشتیبان‌گیری",
      starter_value: "هفتگی",
      pro_value: "روزانه",
      enterprise_value: "لحظه‌ای",
    },
    {
      feature_id: "support",
      feature_label: "پشتیبانی",
      starter_value: "ایمیل",
      pro_value: "اولویت‌دار",
      enterprise_value: "مدیر اختصاصی",
    },
  ],
  en: [
    {
      feature_id: "cpu_cores",
      feature_label: "CPU cores",
      starter_value: "1",
      pro_value: "4",
      enterprise_value: "8",
    },
    {
      feature_id: "ram_gb",
      feature_label: "RAM",
      starter_value: "2 GB",
      pro_value: "8 GB",
      enterprise_value: "32 GB",
    },
    {
      feature_id: "storage_nvme",
      feature_label: "NVMe storage",
      starter_value: "40 GB",
      pro_value: "160 GB",
      enterprise_value: "512 GB",
    },
    {
      feature_id: "routing",
      feature_label: "Low latency routing",
      starter_value: "Standard",
      pro_value: "Priority",
      enterprise_value: "Dedicated",
    },
    {
      feature_id: "bandwidth",
      feature_label: "Bandwidth",
      starter_value: "2 TB",
      pro_value: "5 TB",
      enterprise_value: "10 TB",
    },
    {
      feature_id: "ipv4",
      feature_label: "Dedicated IPv4",
      starter_value: "—",
      pro_value: "1",
      enterprise_value: "2",
    },
    {
      feature_id: "ddos",
      feature_label: "DDoS protection",
      starter_value: "Basic",
      pro_value: "Advanced",
      enterprise_value: "Enterprise",
    },
    {
      feature_id: "backups",
      feature_label: "Backups",
      starter_value: "Weekly",
      pro_value: "Daily",
      enterprise_value: "Instant",
    },
    {
      feature_id: "support",
      feature_label: "Support",
      starter_value: "Email",
      pro_value: "Priority",
      enterprise_value: "Dedicated manager",
    },
  ],
}

const aboutContentByLocale: Record<string, AboutContent> = {
  fa: {
    page_title: "درباره\nهاستینگ",
    mission_statement: "زیرساخت را بی‌صدا نگه می‌داریم تا محصول شما دیده شود.",
    mission_subtitle:
      "هاستینگ برای تیم‌هایی ساخته شده که به سرعت، شفافیت و کنترل واقعی اهمیت می‌دهند. هر سرویس با همان دقتی طراحی شده که از یک پلتفرم جدی انتظار دارید.",
    intro_label: "چرا هاستینگ",
    pillars: [
      {
        pillar_id: "clarity",
        pillar_title: "شفافیت کامل",
        pillar_body:
          "قیمت، منابع و محدودیت‌ها از ابتدا روشن‌اند. بدون هزینه پنهان. بدون شگفتی. هر پلن دقیق و قابل پیش‌بینی است.",
      },
      {
        pillar_id: "performance",
        pillar_title: "عملکردی که حس می‌شود",
        pillar_body:
          "NVMe Storage، Low Latency Routing و 99.99% Uptime کنار هم قرار گرفته‌اند تا بارهای کاری شما سبک‌تر حرکت کنند.",
      },
      {
        pillar_id: "support",
        pillar_title: "پشتیبانی نزدیک",
        pillar_body:
          "مهندسان واقعی، پاسخ‌های واقعی. فارسی و انگلیسی. وقتی لازم است، سریع و دقیق.",
      },
    ],
  },
  en: {
    page_title: "About\nHosting",
    mission_statement: "We keep infrastructure quiet so your product can take the spotlight.",
    mission_subtitle:
      "Hosting is built for teams that care about speed, clarity, and real control. Every service is designed with the precision you'd expect from a serious infrastructure platform.",
    intro_label: "Why Hosting",
    pillars: [
      {
        pillar_id: "clarity",
        pillar_title: "Clarity at every layer",
        pillar_body:
          "No hidden fees, no ambiguous contracts. Every resource, every plan, and every invoice is fully transparent. Predictability is part of the product.",
      },
      {
        pillar_id: "performance",
        pillar_title: "Performance without compromise",
        pillar_body:
          "NVMe storage, low-latency routing, and 99.99% uptime work together so your workloads move faster and feel lighter.",
      },
      {
        pillar_id: "support",
        pillar_title: "Support that stays close",
        pillar_body:
          "Behind every ticket is a real engineer — not a bot. Our team works in Persian and English, from first deployment to full-scale growth.",
      },
    ],
  },
}

const legalContentByLocale: Record<string, LegalContent> = {
  fa: {
    page_title: "شرایط\nاستفاده",
    page_subtitle: "برای استفاده شفاف، امن و حرفه‌ای از هاستینگ.",
    last_updated: "آخرین به‌روزرسانی: ۱ فروردین ۱۴۰۵",
    toc_label: "بخش‌ها",
    sections: [
      {
        section_id: "acceptance",
        section_title: "۱. پذیرش شرایط",
        section_body:
          "با دسترسی یا استفاده از خدمات هاستینگ، شما می‌پذیرید که به این شرایط و قوانین مربوط پایبند باشید. اگر با بخشی از این شرایط موافق نیستید، از خدمات استفاده نکنید.",
      },
      {
        section_id: "services",
        section_title: "۲. خدمات",
        section_body:
          "هاستینگ VPS، ذخیره‌سازی ابری و خدمات مرتبط را ارائه می‌دهد. ممکن است ویژگی‌ها، قیمت‌ها و مشخصات فنی با اطلاع‌رسانی قبلی تغییر کنند. تغییرات مهم از طریق ایمیل یا داشبورد اعلام می‌شوند.",
      },
      {
        section_id: "account",
        section_title: "۳. حساب و امنیت",
        section_body:
          "حفظ محرمانگی اطلاعات ورود با شماست. هر فعالیتی که از حساب شما انجام شود، به شما نسبت داده می‌شود. اگر نشانه‌ای از دسترسی غیرمجاز دیدید، فوراً به پشتیبانی اطلاع دهید.",
      },
      {
        section_id: "payment",
        section_title: "۴. پرداخت و صورتحساب",
        section_body:
          "خدمات به‌صورت پیش‌پرداخت ماهانه یا سالانه ارائه می‌شوند. تأخیر در پرداخت ممکن است باعث تعلیق یا قطع سرویس شود. بازپرداخت‌ها طبق سیاست بازپرداخت منتشرشده در وب‌سایت انجام می‌شوند.",
      },
      {
        section_id: "acceptable-use",
        section_title: "۵. استفاده مجاز",
        section_body:
          "استفاده از خدمات برای فعالیت‌های غیرقانونی، ارسال اسپم، حملات DDoS، استخراج رمزارز بدون مجوز یا هر فعالیتی که به زیرساخت آسیب بزند، ممنوع است. نقض این بند می‌تواند به قطع فوری سرویس بدون بازپرداخت منجر شود.",
      },
      {
        section_id: "sla",
        section_title: "۶. SLA و دسترس‌پذیری",
        section_body:
          "ما برای زیرساخت اصلی خود دسترس‌پذیری ۹۹.۹۹٪ را هدف قرار می‌دهیم. جزئیات SLA برای هر پلن به‌صورت جداگانه اعلام می‌شود و تعمیرات برنامه‌ریزی‌شده از قبل اطلاع داده می‌شوند.",
      },
      {
        section_id: "liability",
        section_title: "۷. محدودیت مسئولیت",
        section_body:
          "هاستینگ در قبال خسارات غیرمستقیم، از دست رفتن داده یا سود از دست‌رفته مسئولیتی ندارد. حداکثر مسئولیت ما برابر با مبلغی است که در ۱۲ ماه گذشته پرداخت کرده‌اید.",
      },
      {
        section_id: "termination",
        section_title: "۸. تعلیق و خاتمه",
        section_body:
          "هر یک از طرفین می‌تواند این توافق را با اطلاع قبلی خاتمه دهد. ما حق تعلیق یا قطع فوری سرویس در صورت نقض شرایط را محفوظ نگه می‌داریم. پس از خاتمه، داده‌ها طبق سیاست نگهداری حذف می‌شوند.",
      },
    ],
  },
  en: {
    page_title: "Terms of Service",
    page_subtitle: "Clear terms for using Hosting the right way.",
    last_updated: "Last updated: July 5, 2026",
    toc_label: "Sections",
    sections: [
      {
        section_id: "acceptance",
        section_title: "1. Acceptance of Terms",
        section_body:
          "By accessing or using Hosting services, you agree to these terms and all applicable laws. If any part of these terms is not acceptable to you, do not use the services.",
      },
      {
        section_id: "services",
        section_title: "2. Services",
        section_body:
          "Hosting provides virtual private server (VPS) hosting, cloud storage, and related services. Features, pricing, and technical details may change with notice. Material updates are shared by email or in the dashboard.",
      },
      {
        section_id: "account",
        section_title: "3. Account & Security",
        section_body:
          "You are responsible for keeping your account credentials confidential. Activity under your account is your responsibility. If you notice unauthorized access, notify support immediately.",
      },
      {
        section_id: "payment",
        section_title: "4. Payment & Billing",
        section_body:
          "Services are billed in advance on a monthly or annual basis. Late payment may result in suspension or termination. Refunds are handled under the refund policy published on our website.",
      },
      {
        section_id: "acceptable-use",
        section_title: "5. Acceptable Use",
        section_body:
          "Use of our services for illegal activity, spam, DDoS attacks, unauthorized crypto mining, or anything that harms the infrastructure is prohibited. Violations may result in immediate termination without refund.",
      },
      {
        section_id: "sla",
        section_title: "6. SLA & Availability",
        section_body:
          "We target 99.99% uptime for our core infrastructure. Compensation details are defined in each plan's dedicated SLA. Scheduled maintenance is announced in advance.",
      },
      {
        section_id: "liability",
        section_title: "7. Limitation of Liability",
        section_body:
          "Hosting is not liable for indirect damages, data loss, or lost profits. Our maximum liability is limited to the amount you paid in the preceding 12 months.",
      },
      {
        section_id: "termination",
        section_title: "8. Termination & Suspension",
        section_body:
          "Either party may terminate this agreement with prior notice. We reserve the right to immediately suspend or terminate service for terms violations. Upon termination, your data is deleted according to our retention policy.",
      },
    ],
  },
}

const contactPageCopyByLocale: Record<string, ContactPageCopy> = {
  fa: {
    page_title: "با ما\nدر تماس باشید",
    page_subtitle:
      "برای مشاوره زیرساخت، مهاجرت یا انتخاب پلن مستقیم پیام بدهید. معمولاً در کمتر از ۲۴ ساعت پاسخ می‌دهیم.",
    form_title: "ارسال درخواست",
    sender_name_label: "نام",
    sender_name_placeholder: "نام شما یا تیم شما",
    sender_email_label: "ایمیل",
    sender_email_placeholder: "name@company.com",
    form_subject_label: "موضوع",
    form_subject_placeholder: "مثلاً: مهاجرت به VPS",
    message_body_label: "پیام",
    message_body_placeholder: "پروژه را کوتاه و دقیق توضیح دهید...",
    submit_label: "ارسال درخواست",
    submitting_label: "در حال ارسال...",
    success_title: "درخواست ثبت شد",
    success_message:
      "پیام شما رسید. به‌زودی از سمت تیم ما پاسخ می‌گیرید.",
    response_time_label: "زمان پاسخ",
    response_time_value: "کمتر از ۲۴ ساعت",
    support_email_label: "ایمیل مستقیم",
    support_email_value: "support@hosting.io",
  },
  en: {
    page_title: "Contact\nUs",
    page_subtitle:
      "Need help with infrastructure, migration, or plan selection? Send us a direct message. We usually reply within 24 hours.",
    form_title: "Send a request",
    sender_name_label: "Name",
    sender_name_placeholder: "Your name or team",
    sender_email_label: "Email",
    sender_email_placeholder: "name@company.com",
    form_subject_label: "Subject",
    form_subject_placeholder: "For example: migrating to VPS",
    message_body_label: "Message",
    message_body_placeholder: "Tell us briefly and clearly what you need...",
    submit_label: "Send request",
    submitting_label: "Sending...",
    success_title: "Request received",
    success_message:
      "Your message landed. Our team will follow up shortly.",
    response_time_label: "Response time",
    response_time_value: "Under 24 hours",
    support_email_label: "Direct email",
    support_email_value: "support@hosting.io",
  },
}

const privacyContentByLocale: Record<string, PrivacyContent> = {
  fa: {
    page_title: "حریم\nخصوصی",
    page_subtitle:
      "حریم شما برای ما جدی است. این سیاست توضیح می‌دهد چه داده‌هایی را می‌گیریم و چطور از آن‌ها محافظت می‌کنیم.",
    last_updated_date: "تاریخ اجرا: ۱ فروردین ۱۴۰۵",
    toc_label: "بخش‌ها",
    policy_sections: [
      {
        section_id: "overview",
        section_heading: "۱. نمای کلی",
        section_content:
          "هاستینگ به حریم خصوصی کاربران خود احترام می‌گذارد. این سیاست توضیح می‌دهد چه داده‌هایی هنگام استفاده از وب‌سایت و خدمات ما جمع‌آوری، پردازش، ذخیره و محافظت می‌شوند.",
      },
      {
        section_id: "data-collection",
        section_heading: "۲. داده‌های جمع‌آوری‌شده",
        section_content:
          "ممکن است نام، آدرس ایمیل، اطلاعات پرداخت، IP، داده‌های استفاده از سرویس و اطلاعات فنی مربوط به سرورها را جمع‌آوری کنیم. این داده‌ها برای ارائه، بهبود و امنیت خدمات ضروری هستند.",
      },
      {
        section_id: "data-usage",
        section_heading: "۳. نحوه استفاده",
        section_content:
          "از داده‌های شما برای ارائه خدمات میزبانی، پردازش پرداخت، پاسخ به درخواست‌های پشتیبانی، ارسال اطلاع‌رسانی‌های ضروری و بهبود کیفیت زیرساخت استفاده می‌کنیم. ما داده‌های شما را نمی‌فروشیم.",
      },
      {
        section_id: "cookies",
        section_heading: "۴. کوکی‌ها و ردیابی",
        section_content:
          "از کوکی‌ها و فناوری‌های مشابه برای حفظ نشست کاربری، ذخیره ترجیحات و تحلیل استفاده از وب‌سایت بهره می‌بریم. می‌توانید کوکی‌ها را از طریق تنظیمات مرورگر خود مدیریت کنید.",
      },
      {
        section_id: "data-sharing",
        section_heading: "۵. اشتراک‌گذاری داده‌ها",
        section_content:
          "اطلاعات شما فقط با ارائه‌دهندگان خدمات مورد اعتماد، مثل درگاه پرداخت و زیرساخت ابری، یا در صورت الزام قانونی، به اشتراک گذاشته می‌شود.",
      },
      {
        section_id: "security",
        section_heading: "۶. امنیت داده‌ها",
        section_content:
          "ما از رمزنگاری، کنترل دسترسی و پایش امنیتی برای محافظت از داده‌های شما استفاده می‌کنیم. با این حال، هیچ روش انتقال یا ذخیره‌سازی الکترونیکی صددرصد امن نیست.",
      },
      {
        section_id: "your-rights",
        section_heading: "۷. حقوق شما",
        section_content:
          "شما حق دسترسی، اصلاح، حذف و محدود کردن پردازش داده‌های شخصی خود را دارید. برای اعمال این حقوق، با تیم پشتیبانی ما از طریق ایمیل تماس بگیرید.",
      },
      {
        section_id: "contact",
        section_heading: "۸. تماس با ما",
        section_content:
          "برای هر سؤال درباره این سیاست، از طریق privacy@hosting.io یا صفحه تماس با ما در ارتباط باشید.",
      },
    ],
  },
  en: {
    page_title: "Privacy\nPolicy",
    page_subtitle:
      "Your privacy matters. This policy explains what we collect and how we protect it.",
    last_updated_date: "Effective date: March 21, 2026",
    toc_label: "Sections",
    policy_sections: [
      {
        section_id: "overview",
        section_heading: "1. Overview",
        section_content:
          "Hosting respects the privacy of its users. This policy explains how personal information is collected, processed, stored, and protected when you use our website and services.",
      },
      {
        section_id: "data-collection",
        section_heading: "2. Data Collected",
        section_content:
          "We may collect your name, email address, payment information, IP address, usage data, and technical details related to your servers. That information helps us deliver, improve, and secure the service.",
      },
      {
        section_id: "data-usage",
        section_heading: "3. How We Use It",
        section_content:
          "We use your data to deliver hosting services, process payments, respond to support requests, send essential service updates, and improve infrastructure quality. We do not sell your data.",
      },
      {
        section_id: "cookies",
        section_heading: "4. Cookies & Tracking",
        section_content:
          "We use cookies and similar technologies to keep sessions active, remember preferences, and analyze website usage. You can manage cookies in your browser settings.",
      },
      {
        section_id: "data-sharing",
        section_heading: "5. Data Sharing",
        section_content:
          "Your information is shared only with trusted service providers, such as payment gateways and cloud infrastructure, or when required by law.",
      },
      {
        section_id: "security",
        section_heading: "6. Data Security",
        section_content:
          "We use encryption, access controls, and security monitoring to protect your data. However, no electronic transmission or storage method is 100% secure.",
      },
      {
        section_id: "your-rights",
        section_heading: "7. Your Rights",
        section_content:
          "You have the right to access, correct, delete, and restrict the processing of your personal data. To exercise those rights, contact our support team by email.",
      },
      {
        section_id: "contact",
        section_heading: "8. Contact Us",
        section_content:
          "For any questions about this policy, reach us at privacy@hosting.io or through our contact page.",
      },
    ],
  },
}

const statusPageContentByLocale: Record<string, StatusPageContent> = {
  fa: {
    page_title: "وضعیت\nسرویس",
    page_subtitle: "سلامت لحظه‌ای پلتفرم، مناطق و سرویس‌های اصلی.",
    overall_status: "همه سرویس‌ها عملیاتی",
    uptime_label: "آپتایم ۹۰ روز",
    uptime_value: "۹۹.۹۹٪",
    last_updated_label: "آخرین به‌روزرسانی",
    components_title: "اجزای پلتفرم",
    incidents_title: "حوادث اخیر",
    no_incidents: "حادثه فعالی وجود ندارد.",
    status_labels: {
      operational: "عملیاتی",
      degraded: "کاهش عملکرد",
      outage: "قطعی",
    },
    components: [
      { component_id: "api", component_name: "API و داشبورد", status: "operational", uptime_pct: 99.99 },
      { component_id: "compute", component_name: "Compute (KVM)", status: "operational", uptime_pct: 99.98 },
      { component_id: "network", component_name: "شبکه و DDoS", status: "operational", uptime_pct: 99.99 },
      { component_id: "storage", component_name: "Block Storage (NVMe)", status: "operational", uptime_pct: 99.97 },
      { component_id: "billing", component_name: "صورتحساب", status: "operational", uptime_pct: 99.99 },
      { component_id: "tehran", component_name: "منطقه تهران", status: "degraded", uptime_pct: 98.2 },
    ],
    incidents: [
      {
        incident_id: "inc_001",
        title: "کاهش عملکرد در منطقه تهران",
        status: "investigating",
        region_label: "تهران",
        started_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        summary: "تیم ما در حال بررسی latency بالاتر از حد معمول در node تهران است.",
      },
    ],
  },
  en: {
    page_title: "System\nstatus",
    page_subtitle: "Real-time health for the platform, regions, and core services.",
    overall_status: "All systems operational",
    uptime_label: "90-day uptime",
    uptime_value: "99.99%",
    last_updated_label: "Last updated",
    components_title: "Platform components",
    incidents_title: "Recent incidents",
    no_incidents: "No active incidents.",
    status_labels: {
      operational: "Operational",
      degraded: "Degraded",
      outage: "Outage",
    },
    components: [
      { component_id: "api", component_name: "API & dashboard", status: "operational", uptime_pct: 99.99 },
      { component_id: "compute", component_name: "Compute (KVM)", status: "operational", uptime_pct: 99.98 },
      { component_id: "network", component_name: "Network & DDoS", status: "operational", uptime_pct: 99.99 },
      { component_id: "storage", component_name: "Block storage (NVMe)", status: "operational", uptime_pct: 99.97 },
      { component_id: "billing", component_name: "Billing", status: "operational", uptime_pct: 99.99 },
      { component_id: "tehran", component_name: "Tehran region", status: "degraded", uptime_pct: 98.2 },
    ],
    incidents: [
      {
        incident_id: "inc_001",
        title: "Elevated latency in Tehran region",
        status: "investigating",
        region_label: "Tehran",
        started_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        summary: "Our team is investigating higher-than-normal latency on the Tehran node.",
      },
    ],
  },
}

const docsPageContentByLocale: Record<string, DocsPageContent> = {
  fa: {
    page_title: "مستندات",
    page_subtitle: "راهنماهای استقرار، شبکه، API و مهاجرت.",
    search_placeholder: "جستجو در مستندات...",
    categories: ["شروع سریع", "شبکه", "امنیت", "API", "مهاجرت"],
    articles: [
      { article_id: "d1", category: "شروع سریع", title: "اولین VPS خود را استقرار دهید", summary: "از پیکربندی تا SSH در کمتر از ۵ دقیقه.", read_minutes: 4 },
      { article_id: "d2", category: "شروع سریع", title: "اتصال SSH و کلیدها", summary: "کلید SSH را اضافه کنید و به سرور وصل شوید.", read_minutes: 3 },
      { article_id: "d3", category: "شبکه", title: "Floating IP و Reverse DNS", summary: "IP شناور بسازید و PTR تنظیم کنید.", read_minutes: 5 },
      { article_id: "d4", category: "امنیت", title: "فایروال و DDoS Protection", summary: "قوانین inbound و mitigation را پیکربندی کنید.", read_minutes: 6 },
      { article_id: "d5", category: "API", title: "REST API و توکن‌ها", summary: "اتوماسیون deploy با API tokens.", read_minutes: 7 },
      { article_id: "d6", category: "مهاجرت", title: "مهاجرت بدون downtime", summary: "Snapshot، sync و cutover امن.", read_minutes: 8 },
    ],
  },
  en: {
    page_title: "Documentation",
    page_subtitle: "Guides for deploy, networking, API access, and migrations.",
    search_placeholder: "Search documentation...",
    categories: ["Getting started", "Networking", "Security", "API", "Migration"],
    articles: [
      { article_id: "d1", category: "Getting started", title: "Deploy your first VPS", summary: "From configurator to SSH in under five minutes.", read_minutes: 4 },
      { article_id: "d2", category: "Getting started", title: "SSH access & keys", summary: "Add an SSH key and connect to your server.", read_minutes: 3 },
      { article_id: "d3", category: "Networking", title: "Floating IPs & reverse DNS", summary: "Provision floating IPs and configure PTR records.", read_minutes: 5 },
      { article_id: "d4", category: "Security", title: "Firewall & DDoS protection", summary: "Configure inbound rules and mitigation.", read_minutes: 6 },
      { article_id: "d5", category: "API", title: "REST API & tokens", summary: "Automate deploys with scoped API tokens.", read_minutes: 7 },
      { article_id: "d6", category: "Migration", title: "Zero-downtime migration", summary: "Snapshot, sync, and safe cutover.", read_minutes: 8 },
    ],
  },
}

const checkoutPageCopyByLocale: Record<string, CheckoutPageCopy> = {
  fa: {
    page_title: "ثبت\nسفارش",
    page_subtitle: "پیکربندی خود را بررسی کنید، منطقه را انتخاب کنید و سفارش را ارسال کنید.",
    summary_title: "خلاصه پیکربندی",
    region_label: "منطقه استقرار",
    region_hint: "نزدیک‌ترین منطقه به کاربران شما را انتخاب کنید.",
    monthly_label: "هزینه ماهانه",
    per_month: "در ماه",
    submit_label: "ثبت سفارش",
    submitting_label: "در حال ثبت...",
    sign_in_prompt: "برای ثبت سفارش وارد شوید یا حساب بسازید.",
    sign_in_link: "ورود",
    register_link: "ثبت‌نام",
    success_title: "سفارش ثبت شد",
    success_message: "تیم ما سفارش شما را بررسی می‌کند. وضعیت را در داشبورد پیگیری کنید.",
    view_orders: "مشاهده سفارش‌ها",
    invalid_config: "پیکربندی نامعتبر است. لطفاً دوباره از صفحه اصلی شروع کنید.",
    promo_label: "کد تخفیف",
    promo_placeholder: "مثلاً LAUNCH20",
    promo_apply: "اعمال",
    promo_applied: "کد اعمال شد",
    promo_invalid: "کد تخفیف معتبر نیست.",
    discount_label: "تخفیف",
    original_price_label: "قیمت اصلی",
    regions: [
      { region_id: "fra", label: "فرانکفورت", latency_hint: "~۲۸ms از اروپا" },
      { region_id: "sin", label: "سنگاپور", latency_hint: "~۴۵ms از آسیا" },
      { region_id: "nyc", label: "نیویورک", latency_hint: "~۳۲ms از آمریکا" },
      { region_id: "tehran", label: "تهران", latency_hint: "~۸ms از ایران" },
    ],
  },
  en: {
    page_title: "Checkout",
    page_subtitle: "Review your build, pick a region, and submit your deployment order.",
    summary_title: "Configuration summary",
    region_label: "Deploy region",
    region_hint: "Choose the region closest to your users.",
    monthly_label: "Monthly price",
    per_month: "per month",
    submit_label: "Submit order",
    submitting_label: "Submitting...",
    sign_in_prompt: "Sign in or create an account to place your order.",
    sign_in_link: "Sign in",
    register_link: "Create account",
    success_title: "Order submitted",
    success_message: "Our team will review your order. Track status in your dashboard.",
    view_orders: "View orders",
    invalid_config: "Invalid configuration. Please start again from the homepage configurator.",
    promo_label: "Promo code",
    promo_placeholder: "e.g. LAUNCH20",
    promo_apply: "Apply",
    promo_applied: "Code applied",
    promo_invalid: "That promo code is not valid.",
    discount_label: "Discount",
    original_price_label: "Original price",
    regions: [
      { region_id: "fra", label: "Frankfurt", latency_hint: "~28ms from EU" },
      { region_id: "sin", label: "Singapore", latency_hint: "~45ms from Asia" },
      { region_id: "nyc", label: "New York", latency_hint: "~32ms from US" },
      { region_id: "tehran", label: "Tehran", latency_hint: "~8ms from Iran" },
    ],
  },
}

export async function get_hero_data(locale: string): Promise<HeroData> {
  await new Promise((resolve) => setTimeout(resolve, 80))

  return heroDataByLocale[locale] ?? heroDataByLocale.fa
}

export async function get_pricing_plans(locale: string): Promise<PricingPlan[]> {
  await new Promise((resolve) => setTimeout(resolve, 80))

  return pricingPlansByLocale[locale] ?? pricingPlansByLocale.fa
}

export async function get_comparison_features(
  locale: string,
): Promise<ComparisonFeature[]> {
  await new Promise((resolve) => setTimeout(resolve, 80))

  return comparisonFeaturesByLocale[locale] ?? comparisonFeaturesByLocale.fa
}

export async function get_pricing_page_copy(
  locale: string,
): Promise<PricingPageCopy> {
  await new Promise((resolve) => setTimeout(resolve, 40))

  return pricingPageCopyByLocale[locale] ?? pricingPageCopyByLocale.fa
}

export async function get_about_content(locale: string): Promise<AboutContent> {
  await new Promise((resolve) => setTimeout(resolve, 80))

  return aboutContentByLocale[locale] ?? aboutContentByLocale.fa
}

export async function get_legal_content(locale: string): Promise<LegalContent> {
  await new Promise((resolve) => setTimeout(resolve, 80))

  return legalContentByLocale[locale] ?? legalContentByLocale.fa
}

export async function get_contact_page_copy(
  locale: string,
): Promise<ContactPageCopy> {
  await new Promise((resolve) => setTimeout(resolve, 40))

  return contactPageCopyByLocale[locale] ?? contactPageCopyByLocale.fa
}

export async function get_privacy_content(
  locale: string,
): Promise<PrivacyContent> {
  await new Promise((resolve) => setTimeout(resolve, 80))

  return privacyContentByLocale[locale] ?? privacyContentByLocale.fa
}

export async function get_status_page_content(
  locale: string,
): Promise<StatusPageContent> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  return statusPageContentByLocale[locale] ?? statusPageContentByLocale.fa
}

export async function get_docs_page_content(
  locale: string,
): Promise<DocsPageContent> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  return docsPageContentByLocale[locale] ?? docsPageContentByLocale.fa
}

const docsArticleBodiesByLocale: Record<string, Record<string, string[]>> = {
  en: {
    d1: [
      "Open the homepage configurator and choose CPU, RAM, storage type, and operating system. The live price updates as you adjust each slider.",
      "When you are ready, continue to checkout, pick a deploy region close to your users, and submit the order. Demo accounts can place orders immediately.",
      "After approval, the instance appears under Dashboard → Instances with an IPv4 address and reverse DNS hostname.",
      "Copy the IP, wait until status is Running, then connect with SSH using the key you registered in Account settings.",
      "From the instance detail page you can resize, snapshot, manage firewall rules, and open the web console if SSH is unavailable.",
    ],
    d2: [
      "Generate an ed25519 or RSA key pair on your workstation. Keep the private key offline and only upload the public key.",
      "In Dashboard → Account → SSH keys, give the key a short name and paste the public key line starting with ssh-ed25519 or ssh-rsa.",
      "New deploys inject every registered public key into authorized_keys for the default user (ubuntu, root, or Administrator depending on OS).",
      "Connect with: ssh -i ~/.ssh/your_key ubuntu@YOUR_IP. If you rebuild the instance, keys are re-injected automatically.",
    ],
    d3: [
      "Floating IPs let you move a public address between instances without waiting for DNS TTL to expire.",
      "Create a floating IP in Networking, then attach it to a running instance in the same region. Detach before moving it to another host.",
      "Reverse DNS (PTR) should match a forward A/AAAA record that points back to the same IP — required by many mail providers.",
      "Update PTR from the instance Network tab. Propagation is usually under an hour in this mock environment.",
    ],
    d4: [
      "Every instance starts with a default allow-all outbound policy. Inbound traffic is denied unless you add firewall rules.",
      "Add narrow TCP rules for SSH (22), HTTP (80), and HTTPS (443). Prefer your office CIDR over 0.0.0.0/0 when possible.",
      "Platform DDoS mitigation sits in front of the public network and absorbs volumetric floods before they reach your VPS.",
      "Combine firewall rules with fail2ban or cloud-init hardening for defense in depth on the guest OS.",
    ],
    d5: [
      "Create scoped API tokens under Account → API tokens. Secrets are shown once — store them in your CI secret manager.",
      "Authenticate requests with the Authorization: Bearer header. All resource IDs and payloads use snake_case JSON.",
      "Typical automation flows: create snapshot before deploy, resize after traffic spikes, and open support tickets from monitoring alerts.",
      "Revoke unused tokens immediately. Last-used timestamps help you spot forgotten CI credentials.",
    ],
    d6: [
      "Plan migrations in three phases: snapshot baseline, rsync or database replication, then a short cutover window.",
      "Take a snapshot of the source disk, provision the target VPS with matching or larger specs, and sync data while the source stays live.",
      "Lower DNS TTL a day ahead, switch floating IPs or update A records, then verify health checks before decommissioning the old host.",
      "Keep the source powered off but retained for 24–48 hours so you can roll back quickly if something fails.",
    ],
  },
  fa: {
    d1: [
      "از پیکربندی‌کننده صفحه اصلی، CPU، RAM، نوع ذخیره‌سازی و سیستم‌عامل را انتخاب کنید. قیمت به‌صورت زنده به‌روز می‌شود.",
      "سپس به تسویه بروید، منطقه استقرار نزدیک کاربران را انتخاب کنید و سفارش را ثبت کنید.",
      "پس از تأیید، سرور در داشبورد → سرورها با آدرس IPv4 و Reverse DNS ظاهر می‌شود.",
      "IP را کپی کنید، تا وضعیت Running صبر کنید، سپس با کلید SSH ثبت‌شده در تنظیمات حساب متصل شوید.",
      "از صفحه جزئیات سرور می‌توانید تغییر پلن، اسنپ‌شات، فایروال و کنسول وب را مدیریت کنید.",
    ],
    d2: [
      "روی ایستگاه کاری خود یک جفت کلید ed25519 یا RSA بسازید. کلید خصوصی را امن نگه دارید و فقط کلید عمومی را آپلود کنید.",
      "در داشبورد → حساب → کلیدهای SSH، نام کوتاه بگذارید و خط کلید عمومی را وارد کنید.",
      "استقرارهای جدید همه کلیدهای ثبت‌شده را در authorized_keys کاربر پیش‌فرض تزریق می‌کنند.",
      "با دستور ssh -i ~/.ssh/your_key ubuntu@YOUR_IP متصل شوید. پس از rebuild، کلیدها دوباره تزریق می‌شوند.",
    ],
    d3: [
      "IP شناور اجازه می‌دهد آدرس عمومی را بدون انتظار برای TTL بین سرورها جابه‌جا کنید.",
      "در بخش شبکه یک Floating IP بسازید و به سرور Running در همان منطقه متصل کنید.",
      "Reverse DNS باید با رکورد A/AAAA که به همان IP اشاره می‌کند هم‌خوان باشد — برای ایمیل ضروری است.",
      "PTR را از تب شبکه سرور به‌روز کنید. در محیط دمو معمولاً کمتر از یک ساعت طول می‌کشد.",
    ],
    d4: [
      "هر سرور با سیاست خروجی آزاد شروع می‌شود. ترافیک ورودی بدون قانون فایروال مسدود است.",
      "قوانین باریک TCP برای SSH، HTTP و HTTPS اضافه کنید. در صورت امکان به‌جای 0.0.0.0/0 از CIDR دفتر استفاده کنید.",
      "لایه DDoS پلتفرم قبل از رسیدن ترافیک حجمی به VPS، آن را جذب می‌کند.",
      "فایروال را با سخت‌سازی سیستم‌عامل ترکیب کنید تا دفاع لایه‌ای داشته باشید.",
    ],
    d5: [
      "توکن‌های API را در حساب → توکن‌های API بسازید. Secret فقط یک‌بار نمایش داده می‌شود.",
      "درخواست‌ها را با هدر Authorization: Bearer احراز هویت کنید. همه فیلدها snake_case هستند.",
      "اتوماسیون رایج: اسنپ‌شات قبل از deploy، resize پس از افزایش ترافیک، و باز کردن تیکت از مانیتورینگ.",
      "توکن‌های بلااستفاده را فوراً لغو کنید. زمان آخرین استفاده به شناسایی اعتبارنامه‌های فراموش‌شده کمک می‌کند.",
    ],
    d6: [
      "مهاجرت را در سه فاز برنامه‌ریزی کنید: اسنپ‌شات پایه، همگام‌سازی داده، سپس cutover کوتاه.",
      "از دیسک مبدأ اسنپ‌شات بگیرید، VPS مقصد را با مشخصات برابر یا بزرگ‌تر بسازید و در حالی که مبدأ زنده است داده را sync کنید.",
      "یک روز قبل TTL را کم کنید، Floating IP یا رکورد A را عوض کنید و قبل از خاموشی نهایی health check بگیرید.",
      "مبدأ را ۲۴ تا ۴۸ ساعت خاموش اما نگه دارید تا در صورت مشکل بتوانید سریع برگردید.",
    ],
  },
}

export async function get_docs_article(
  locale: string,
  article_id: string,
): Promise<{
  article: DocsArticle
  body_markdown_paragraphs: string[]
} | null> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  const page = docsPageContentByLocale[locale] ?? docsPageContentByLocale.fa
  const article = page.articles.find((item) => item.article_id === article_id)
  if (!article) {
    return null
  }

  const bodies = docsArticleBodiesByLocale[locale] ?? docsArticleBodiesByLocale.en
  const body_markdown_paragraphs = bodies[article_id]
  if (!body_markdown_paragraphs) {
    return null
  }

  return { article, body_markdown_paragraphs }
}

const faqPageContentByLocale: Record<string, FaqPageContent> = {
  fa: {
    page_title: "سؤالات\nمتداول",
    page_subtitle: "پاسخ‌های کوتاه درباره استقرار، شبکه، صورتحساب و پشتیبانی.",
    items: [
      {
        question_id: "q1",
        question: "چقدر طول می‌کشد تا VPS آماده شود؟",
        answer:
          "پس از تأیید سفارش، معمولاً کمتر از چند دقیقه تا وضعیت Running. در دمو، سفارش‌ها بلافاصله ثبت می‌شوند و پس از تأیید ادمین سرور ظاهر می‌شود.",
      },
      {
        question_id: "q2",
        question: "آیا می‌توانم بعداً منابع را افزایش دهم؟",
        answer:
          "بله. از تب Resize می‌توانید CPU، RAM و storage را افزایش دهید. کاهش storage پشتیبانی نمی‌شود.",
      },
      {
        question_id: "q3",
        question: "Snapshot با Backup چه تفاوتی دارد؟",
        answer:
          "Snapshot دستی و نقطه‌ای است. Backup سیاست زمان‌بندی‌شده با retention است که در تب Backups تنظیم می‌شود.",
      },
      {
        question_id: "q4",
        question: "آیا DDoS Protection فعال است؟",
        answer:
          "بله. لایه mitigation روی شبکه عمومی برای همه نمونه‌ها فعال است و حملات حجمی را قبل از رسیدن به VPS جذب می‌کند.",
      },
      {
        question_id: "q5",
        question: "چگونه DNS دامنه را مدیریت کنم؟",
        answer:
          "از داشبورد → DNS می‌توانید zone بسازید و رکوردهای A، AAAA، CNAME، MX و TXT را ویرایش کنید.",
      },
      {
        question_id: "q6",
        question: "صورتحساب چگونه صادر می‌شود؟",
        answer:
          "صورتحساب ماهانه برای هر سرور صادر می‌شود. می‌توانید کارت پرداخت اضافه کنید و فاکتورهای باز را از بخش Billing پرداخت کنید.",
      },
      {
        question_id: "q7",
        question: "پشتیبانی چگونه کار می‌کند؟",
        answer:
          "از بخش Support تیکت باز کنید. تیم ما معمولاً در کمتر از چند ساعت در ساعات کاری پاسخ می‌دهد.",
      },
    ],
  },
  en: {
    page_title: "Frequently\nasked questions",
    page_subtitle: "Short answers about deploy, networking, billing, and support.",
    items: [
      {
        question_id: "q1",
        question: "How long until my VPS is ready?",
        answer:
          "After order approval, most instances reach Running within minutes. In the demo, orders are recorded immediately and instances appear once an admin approves them.",
      },
      {
        question_id: "q2",
        question: "Can I upgrade resources later?",
        answer:
          "Yes. Use the Resize tab to increase CPU, RAM, and storage. Storage can only grow — downgrades are not supported.",
      },
      {
        question_id: "q3",
        question: "What is the difference between snapshots and backups?",
        answer:
          "Snapshots are manual point-in-time copies. Backups are scheduled policies with retention, managed from the Backups tab.",
      },
      {
        question_id: "q4",
        question: "Is DDoS protection included?",
        answer:
          "Yes. Platform mitigation sits in front of the public network and absorbs volumetric floods before they reach your VPS.",
      },
      {
        question_id: "q5",
        question: "How do I manage DNS for my domain?",
        answer:
          "Open Dashboard → DNS to create zones and edit A, AAAA, CNAME, MX, and TXT records.",
      },
      {
        question_id: "q6",
        question: "How does billing work?",
        answer:
          "Monthly invoices are issued per instance. Add a payment method and settle open invoices from Billing.",
      },
      {
        question_id: "q7",
        question: "How do I reach support?",
        answer:
          "Open a ticket under Support. Our team typically replies within a few hours during business hours.",
      },
    ],
  },
}

const slaPageContentByLocale: Record<string, SlaPageContent> = {
  fa: {
    page_title: "تعهد\nسطح سرویس",
    page_subtitle: "اهداف دسترس‌پذیری، اعتبارات و استثناها برای زیرساخت Hosting.",
    commitment_title: "تعهد ما",
    commitment_body:
      "ما برای شبکه و برق مناطق اصلی، دسترس‌پذیری ماهانه ۹۹.۹۹٪ را هدف قرار می‌دهیم. تعمیرات برنامه‌ریزی‌شده از قبل اعلام می‌شوند و در صورت امکان خارج از ساعات اوج انجام می‌گیرند.",
    metrics_title: "شاخص‌ها",
    metrics: [
      {
        metric_id: "m1",
        label: "آپتایم ماهانه",
        value: "۹۹.۹۹٪",
        description: "برای شبکه و برق در مناطق اصلی.",
      },
      {
        metric_id: "m2",
        label: "زمان پاسخ شبکه",
        value: "< ۵ms",
        description: "میانگین داخل منطقه بین گره و gateway.",
      },
      {
        metric_id: "m3",
        label: "پنجره نگهداری",
        value: "اعلان ۴۸ساعته",
        description: "برای تغییرات برنامه‌ریزی‌شده غیر اضطراری.",
      },
    ],
    credits_title: "اعتبار سرویس",
    credits_body:
      "اگر دسترس‌پذیری ماهانه از هدف کمتر شود، اعتبار نسبی روی صورتحساب بعدی اعمال می‌شود. درخواست اعتبار باید ظرف ۳۰ روز پس از حادثه ثبت شود.",
    exclusions_title: "استثناها",
    exclusions: [
      "قطعی ناشی از پیکربندی مشتری، سیستم‌عامل یا نرم‌افزار مهمان",
      "حملات DDoS در لایه‌هایی که mitigation فعال نشده یا قوانین فایروال باز است",
      "حوادث فورس ماژور و وابستگی‌های شخص ثالث خارج از کنترل ما",
      "پنجره‌های نگهداری اعلام‌شده از قبل",
    ],
  },
  en: {
    page_title: "Service\nlevel agreement",
    page_subtitle: "Availability targets, service credits, and exclusions for Hosting infrastructure.",
    commitment_title: "Our commitment",
    commitment_body:
      "We target 99.99% monthly availability for power and network in primary regions. Planned maintenance is announced in advance and scheduled outside peak hours whenever possible.",
    metrics_title: "Metrics",
    metrics: [
      {
        metric_id: "m1",
        label: "Monthly uptime",
        value: "99.99%",
        description: "Power and network in primary regions.",
      },
      {
        metric_id: "m2",
        label: "In-region latency",
        value: "< 5ms",
        description: "Average between node and gateway inside a region.",
      },
      {
        metric_id: "m3",
        label: "Maintenance window",
        value: "48h notice",
        description: "For non-emergency planned changes.",
      },
    ],
    credits_title: "Service credits",
    credits_body:
      "If monthly availability falls below the target, a proportional credit is applied to the next invoice. Credit requests must be filed within 30 days of the incident.",
    exclusions_title: "Exclusions",
    exclusions: [
      "Outages caused by customer configuration, guest OS, or application software",
      "DDoS events where mitigation is bypassed by overly permissive firewall rules",
      "Force majeure and third-party dependencies outside our control",
      "Previously announced maintenance windows",
    ],
  },
}

export async function get_faq_page_content(
  locale: string,
): Promise<FaqPageContent> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  return faqPageContentByLocale[locale] ?? faqPageContentByLocale.fa
}

export async function get_sla_page_content(
  locale: string,
): Promise<SlaPageContent> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  return slaPageContentByLocale[locale] ?? slaPageContentByLocale.fa
}

export async function get_checkout_page_copy(
  locale: string,
): Promise<CheckoutPageCopy> {
  await new Promise((resolve) => setTimeout(resolve, 40))
  return checkoutPageCopyByLocale[locale] ?? checkoutPageCopyByLocale.fa
}

export async function validate_promo_code(
  code: string,
): Promise<{
  success: boolean
  discount_percent: number
  promo_code?: string
  error_message?: string
}> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const normalized = code.trim().toUpperCase()
  if (normalized === "LAUNCH20") {
    return { success: true, discount_percent: 20, promo_code: "LAUNCH20" }
  }
  if (normalized === "WELCOME10") {
    return { success: true, discount_percent: 10, promo_code: "WELCOME10" }
  }
  return {
    success: false,
    discount_percent: 0,
    error_message: "Invalid promo code.",
  }
}

export async function submit_contact_form(
  payload: ContactPayload,
): Promise<ContactFormResult> {
  await new Promise((resolve) => setTimeout(resolve, 900))

  const sender_name = payload.sender_name.trim()
  const sender_email = payload.sender_email.trim()
  const form_subject = payload.form_subject.trim()
  const message_body = payload.message_body.trim()

  if (!sender_name || !sender_email || !form_subject || !message_body) {
    return {
      success: false,
      message: "Please complete every field.",
    }
  }

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email_pattern.test(sender_email)) {
    return {
      success: false,
      message: "Enter a valid email address.",
    }
  }

  return {
    success: true,
    message: "Message received. Our team will reply shortly.",
  }
}

interface MockUserRecord {
  account_password: string
  user: AuthUser
}

const mock_user_registry = new Map<string, MockUserRecord>()

function seed_mock_users(): void {
  if (mock_user_registry.size > 0) {
    return
  }

  mock_user_registry.set("demo@hosting.io", {
    account_password: "password123",
    user: {
      user_id: "usr_demo_001",
      full_name: "Demo User",
      email_address: "demo@hosting.io",
      account_status: "active",
      role: "user",
      created_at: "2026-01-01T00:00:00.000Z",
    },
  })

  mock_user_registry.set("admin@hosting.io", {
    account_password: "password123",
    user: {
      user_id: "usr_admin_001",
      full_name: "Platform Admin",
      email_address: "admin@hosting.io",
      account_status: "active",
      role: "admin",
      created_at: "2026-01-01T00:00:00.000Z",
    },
  })
}

function create_mock_tokens(user_id: string) {
  const timestamp = Date.now()

  return {
    access_token: `mock_access:${user_id}:${timestamp}`,
    refresh_token: `mock_refresh:${user_id}:${timestamp}`,
  }
}

function parse_user_id_from_token(token: string): string | null {
  const match = token.match(/^mock_access:([^:]+):/)
  return match?.[1] ?? null
}

function find_user_by_id(user_id: string): AuthUser | null {
  seed_mock_users()

  for (const record of mock_user_registry.values()) {
    if (record.user.user_id === user_id) {
      return record.user
    }
  }

  return null
}

const authPageCopyByLocale: Record<string, AuthPageCopy> = {
  fa: {
    login_title: "ورود\nایمن",
    login_subtitle: "به داشبورد، سرورها و تنظیمات خود دسترسی بگیرید.",
    register_title: "ساخت\nحساب",
    register_subtitle: "در چند ثانیه روی زیرساخت حرفه‌ای سوار شوید.",
    email_label: "ایمیل",
    password_label: "رمز عبور",
    full_name_label: "نام کامل",
    login_submit: "ورود به داشبورد",
    login_submitting: "در حال ورود...",
    register_submit: "ساخت حساب",
    register_submitting: "در حال ساخت...",
    no_account: "حساب ندارید؟",
    has_account: "قبلاً حساب ساخته‌اید؟",
    register_link: "ثبت‌نام کنید",
    login_link: "وارد شوید",
    login_success: "ورود با موفقیت انجام شد",
    register_success: "حساب شما ساخته شد",
    invalid_credentials: "ایمیل یا رمز عبور درست نیست.",
    email_taken: "این ایمیل قبلاً استفاده شده است.",
    validation_error: "فرم کامل نیست",
    forgot_password_link: "رمز عبور را فراموش کرده‌اید؟",
    forgot_password_title: "بازیابی\nرمز عبور",
    forgot_password_subtitle:
      "ایمیل خود را وارد کنید. اگر حسابی وجود داشته باشد، لینک بازیابی ارسال می‌شود.",
    forgot_password_submit: "ارسال لینک بازیابی",
    forgot_password_submitting: "در حال ارسال...",
    forgot_password_success:
      "اگر حسابی با این ایمیل وجود داشته باشد، لینک بازیابی ارسال شد.",
    forgot_password_back: "بازگشت به ورود",
    forgot_password_demo_hint:
      "برای حساب دمو، از لینک بازنشانی زیر استفاده کنید.",
    reset_password_title: "رمز جدید",
    reset_password_subtitle: "رمز عبور جدید خود را وارد و تأیید کنید.",
    reset_password_submit: "ذخیره رمز جدید",
    reset_password_submitting: "در حال ذخیره...",
    reset_password_success: "رمز عبور با موفقیت تغییر کرد. اکنون وارد شوید.",
    reset_password_invalid: "لینک بازنشانی نامعتبر یا منقضی شده است.",
    new_password_label: "رمز عبور جدید",
    confirm_password_label: "تأیید رمز عبور",
    password_mismatch: "رمزها یکسان نیستند.",
    terms_accept_label: "شرایط استفاده و حریم خصوصی را می‌پذیرم.",
    terms_required: "پذیرش شرایط الزامی است.",
  },
  en: {
    login_title: "Secure sign in",
    login_subtitle: "Access your dashboard, servers, and settings.",
    register_title: "Create your account",
    register_subtitle: "Get on premium infrastructure in seconds.",
    email_label: "Email",
    password_label: "Password",
    full_name_label: "Full name",
    login_submit: "Sign in",
    login_submitting: "Signing in...",
    register_submit: "Create account",
    register_submitting: "Creating account...",
    no_account: "New here?",
    has_account: "Already have an account?",
    register_link: "Create account",
    login_link: "Sign in",
    login_success: "Signed in successfully",
    register_success: "Account created",
    invalid_credentials: "Check your email and password, then try again.",
    email_taken: "That email is already in use.",
    validation_error: "Please complete the form.",
    forgot_password_link: "Forgot password?",
    forgot_password_title: "Reset your\npassword",
    forgot_password_subtitle:
      "Enter your email. If an account exists, we'll send a reset link.",
    forgot_password_submit: "Send reset link",
    forgot_password_submitting: "Sending...",
    forgot_password_success:
      "If an account exists for that email, a reset link has been sent.",
    forgot_password_back: "Back to sign in",
    forgot_password_demo_hint:
      "Demo: use the reset link below for demo@hosting.io.",
    reset_password_title: "Set a new\npassword",
    reset_password_subtitle: "Choose a new password and confirm it below.",
    reset_password_submit: "Save new password",
    reset_password_submitting: "Saving...",
    reset_password_success: "Password updated. You can sign in now.",
    reset_password_invalid: "This reset link is invalid or has expired.",
    new_password_label: "New password",
    confirm_password_label: "Confirm password",
    password_mismatch: "Passwords do not match.",
    terms_accept_label: "I accept the Terms of Service and Privacy Policy.",
    terms_required: "You must accept the terms to continue.",
  },
}

const password_reset_tokens = new Map<string, string>()

export async function get_auth_page_copy(locale: string): Promise<AuthPageCopy> {
  await new Promise((resolve) => setTimeout(resolve, 40))

  return authPageCopyByLocale[locale] ?? authPageCopyByLocale.fa
}

export async function request_password_reset(payload: {
  email_address: string
}): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  seed_mock_users()

  const email_address = payload.email_address.trim().toLowerCase()
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email_pattern.test(email_address)) {
    return { success: false, message: "Enter a valid email address." }
  }

  if (mock_user_registry.has(email_address)) {
    const reset_token =
      email_address === "demo@hosting.io"
        ? "demo-reset-token"
        : `reset_${Date.now()}`
    password_reset_tokens.set(reset_token, email_address)
  }

  return {
    success: true,
    message: "If an account exists for that email, a reset link has been sent.",
  }
}

export async function confirm_password_reset(payload: {
  reset_token: string
  new_password: string
}): Promise<{ success: boolean; error_message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  seed_mock_users()

  const reset_token = payload.reset_token.trim()
  const new_password = payload.new_password

  if (!reset_token || !new_password || new_password.length < 8) {
    return {
      success: false,
      error_message: "Enter a valid token and a password of at least 8 characters.",
    }
  }

  const email_address = password_reset_tokens.get(reset_token)
  if (!email_address) {
    return { success: false, error_message: "Invalid or expired reset token." }
  }

  const record = mock_user_registry.get(email_address)
  if (!record) {
    return { success: false, error_message: "Invalid or expired reset token." }
  }

  record.account_password = new_password
  password_reset_tokens.delete(reset_token)

  return { success: true }
}

export async function login_user(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  seed_mock_users()

  const email_address = credentials.email_address.trim().toLowerCase()
  const account_password = credentials.account_password

  if (!email_address || !account_password) {
    return {
      success: false,
      error_message: "Please enter your email and password.",
    }
  }

  const record = mock_user_registry.get(email_address)

  if (!record || record.account_password !== account_password) {
    return {
      success: false,
      error_message: "Check your email and password, then try again.",
    }
  }

  const tokens = create_mock_tokens(record.user.user_id)
  await establish_auth_session(tokens.access_token, tokens.refresh_token)

  return {
    success: true,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    user: record.user,
  }
}

export async function register_user(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  seed_mock_users()

  const full_name = payload.full_name.trim()
  const email_address = payload.email_address.trim().toLowerCase()
  const account_password = payload.account_password

  if (!payload.accepted_terms) {
    return {
      success: false,
      error_message: "You must accept the terms to continue.",
    }
  }

  if (!full_name || !email_address || !account_password) {
    return {
      success: false,
      error_message: "Please complete every field.",
    }
  }

  if (mock_user_registry.has(email_address)) {
    return {
      success: false,
      error_message: "That email is already in use.",
    }
  }

  const user: AuthUser = {
    user_id: `usr_${Date.now()}`,
    full_name,
    email_address,
    account_status: "active",
    role: "user",
    created_at: new Date().toISOString(),
  }

  mock_user_registry.set(email_address, {
    account_password,
    user,
  })

  const admin_state = seed_admin_state()
  admin_state.users.unshift({
    user_id: user.user_id,
    full_name: user.full_name,
    email_address: user.email_address,
    role: "user",
    account_status: "active",
    instance_count: 0,
    monthly_spend: 0,
    created_at: user.created_at,
  })

  const tokens = create_mock_tokens(user.user_id)
  await establish_auth_session(tokens.access_token, tokens.refresh_token)

  return {
    success: true,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    user,
  }
}

export async function get_current_user(): Promise<AuthUser | null> {
  const access_token = await get_access_token()

  if (!access_token) {
    return null
  }

  const user_id = parse_user_id_from_token(access_token)

  if (!user_id) {
    return null
  }

  return find_user_by_id(user_id)
}

export async function logout_user(): Promise<void> {
  await clear_auth_session()
}

export type StorageType = "nvme" | "ssd"
export type SelectedOs = "ubuntu" | "windows" | "arch_linux"

/** @deprecated Use StorageType */
export type StorageClass = StorageType
/** @deprecated Use SelectedOs */
export type OsDistribution = SelectedOs

export interface ConfiguratorAddons {
  dedicated_ips: number
  automated_backups: boolean
  ddos_protection: boolean
}

export interface ConfiguratorPayload {
  cpu_cores: number
  ram_gb: number
  storage_type: StorageType
  storage_size_gb: number
  selected_os: SelectedOs
  addons: ConfiguratorAddons
  monthly_price: number
}

export interface ConfiguratorPriceResult {
  monthly_price: number
  price_display: string
  breakdown: {
    base_cost: number
    cpu_cost: number
    ram_cost: number
    storage_cost: number
    os_cost: number
    addons_cost: number
  }
}

export interface ConfiguratorValidationResult {
  valid: boolean
  payload: ConfiguratorPayload
  monthly_price: number
  price_display: string
  breakdown: ConfiguratorPriceResult["breakdown"]
  error_message?: string
}

function is_valid_storage_type(value: string): value is StorageType {
  return value === "nvme" || value === "ssd"
}

function is_valid_selected_os(value: string): value is SelectedOs {
  return value === "ubuntu" || value === "windows" || value === "arch_linux"
}

function assert_valid_configuration(payload: ConfiguratorPayload): void {
  if (
    !Number.isFinite(payload.cpu_cores) ||
    !Number.isFinite(payload.ram_gb) ||
    !Number.isFinite(payload.storage_size_gb) ||
    !Number.isFinite(payload.monthly_price) ||
    !is_valid_storage_type(payload.storage_type) ||
    !is_valid_selected_os(payload.selected_os)
  ) {
    throw new Error("Invalid configuration payload.")
  }

  if (payload.cpu_cores < 1 || payload.cpu_cores > 32) {
    throw new Error("cpu_cores must be between 1 and 32.")
  }

  if (payload.ram_gb < 1 || payload.ram_gb > 128) {
    throw new Error("ram_gb must be between 1 and 128 GB.")
  }

  if (payload.storage_size_gb < 20 || payload.storage_size_gb > 2048) {
    throw new Error("storage_size_gb must be between 20 and 2048 GB.")
  }

  const dedicated_ips = payload.addons?.dedicated_ips ?? 0
  if (
    !Number.isFinite(dedicated_ips) ||
    dedicated_ips < 0 ||
    dedicated_ips > 8
  ) {
    throw new Error("dedicated_ips must be between 0 and 8.")
  }
}

function normalize_configurator_addons(
  addons?: ConfiguratorAddons,
): ConfiguratorAddons {
  return {
    dedicated_ips: Math.min(8, Math.max(0, Math.round(addons?.dedicated_ips ?? 0))),
    automated_backups: Boolean(addons?.automated_backups),
    ddos_protection: Boolean(addons?.ddos_protection),
  }
}

export async function validate_configuration(
  payload: ConfiguratorPayload,
  locale: string = "en",
): Promise<ConfiguratorValidationResult> {
  await new Promise((resolve) => setTimeout(resolve, 120))

  const { compute_vps_price, format_vps_price } = await import("@/lib/vps-pricing")
  const price_locale = locale === "fa" ? "fa" : "en"

  const normalized_payload: ConfiguratorPayload = {
    ...payload,
    addons: normalize_configurator_addons(payload.addons),
  }

  try {
    assert_valid_configuration(normalized_payload)

    const result = compute_vps_price(normalized_payload)
    const price_matches =
      Math.abs(normalized_payload.monthly_price - result.monthly_price) < 0.02

    if (!price_matches) {
      return {
        valid: false,
        payload: normalized_payload,
        monthly_price: result.monthly_price,
        price_display: format_vps_price(result.monthly_price, price_locale),
        breakdown: {
          base_cost: result.base_cost,
          cpu_cost: result.cpu_cost,
          ram_cost: result.ram_cost,
          storage_cost: result.storage_cost,
          os_cost: result.os_cost,
          addons_cost: result.addons_cost,
        },
        error_message: "monthly_price does not match server calculation.",
      }
    }

    return {
      valid: true,
      payload: {
        ...normalized_payload,
        monthly_price: result.monthly_price,
      },
      monthly_price: result.monthly_price,
      price_display: format_vps_price(result.monthly_price, price_locale),
      breakdown: {
        base_cost: result.base_cost,
        cpu_cost: result.cpu_cost,
        ram_cost: result.ram_cost,
        storage_cost: result.storage_cost,
        os_cost: result.os_cost,
        addons_cost: result.addons_cost,
      },
    }
  } catch (error) {
    return {
      valid: false,
      payload: normalized_payload,
      monthly_price: 0,
      price_display: format_vps_price(0, price_locale),
      breakdown: {
        base_cost: 0,
        cpu_cost: 0,
        ram_cost: 0,
        storage_cost: 0,
        os_cost: 0,
        addons_cost: 0,
      },
      error_message:
        error instanceof Error ? error.message : "Invalid configuration payload.",
    }
  }
}

export async function calculate_vps_price(
  payload: Omit<ConfiguratorPayload, "monthly_price"> & {
    monthly_price?: number
  },
): Promise<ConfiguratorPriceResult> {
  const { compute_vps_price, format_vps_price } = await import("@/lib/vps-pricing")

  const normalized_addons = normalize_configurator_addons(payload.addons)
  const pricing_input = {
    cpu_cores: payload.cpu_cores,
    ram_gb: payload.ram_gb,
    storage_type: payload.storage_type,
    storage_size_gb: payload.storage_size_gb,
    selected_os: payload.selected_os,
    addons: normalized_addons,
  }

  const priced_payload: ConfiguratorPayload = {
    ...pricing_input,
    monthly_price:
      payload.monthly_price ?? compute_vps_price(pricing_input).monthly_price,
  }

  assert_valid_configuration(priced_payload)

  const result = compute_vps_price(priced_payload)

  return {
    monthly_price: result.monthly_price,
    price_display: format_vps_price(result.monthly_price, "en"),
    breakdown: {
      base_cost: result.base_cost,
      cpu_cost: result.cpu_cost,
      ram_cost: result.ram_cost,
      storage_cost: result.storage_cost,
      os_cost: result.os_cost,
      addons_cost: result.addons_cost,
    },
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Client dashboard: mock workspace (instances, invoices, tickets)
   All payloads use snake_case, mirroring the future external API.
   ═══════════════════════════════════════════════════════════════════ */

type InternalRegion = "fra" | "sin" | "nyc" | "tehran"
type InternalPlanTier = "starter" | "pro" | "enterprise" | "custom"

interface InternalInstance {
  instance_id: string
  hostname: string
  status: ServerInstance["status"]
  ip_address: string
  reverse_dns: string
  region: InternalRegion
  plan_tier: InternalPlanTier
  cpu_cores: number
  ram_gb: number
  storage_gb: number
  storage_type: StorageType
  selected_os: SelectedOs
  monthly_price: number
  created_at: string
}

interface UserWorkspace {
  instances: InternalInstance[]
  invoices: Invoice[]
  orders: UserOrder[]
  tickets: SupportTicket[]
  snapshots: Snapshot[]
  firewall_rules: FirewallRule[]
  ssh_keys: SshKey[]
  api_tokens: ApiToken[]
  sessions: AccountSession[]
  activity: ActivityEntry[]
  floating_ips: FloatingIp[]
  block_volumes: BlockVolume[]
  backup_policies: BackupPolicy[]
  dns_zones: DnsZone[]
  payment_methods: PaymentMethod[]
  notification_preferences: NotificationPreferences
  two_factor_enabled: boolean
}

const user_workspaces = new Map<string, UserWorkspace>()

const region_labels: Record<string, Record<InternalRegion, string>> = {
  fa: { fra: "فرانکفورت", sin: "سنگاپور", nyc: "نیویورک", tehran: "تهران" },
  en: { fra: "Frankfurt", sin: "Singapore", nyc: "New York", tehran: "Tehran" },
}

const os_labels_map: Record<string, Record<SelectedOs, string>> = {
  fa: {
    ubuntu: "اوبونتو ۲۲.۰۴ LTS",
    windows: "ویندوز سرور ۲۰۲۲",
    arch_linux: "آرچ لینوکس",
  },
  en: {
    ubuntu: "Ubuntu 22.04 LTS",
    windows: "Windows Server 2022",
    arch_linux: "Arch Linux",
  },
}

const plan_labels: Record<string, Record<InternalPlanTier, string>> = {
  fa: { starter: "شروع", pro: "رشد", enterprise: "سازمانی", custom: "سفارشی" },
  en: { starter: "Start", pro: "Growth", enterprise: "Scale", custom: "Custom" },
}

function hash_seed(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seeded_random(seed: number): () => number {
  let state = seed || 1
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
}

function seed_user_workspace(user_id: string): UserWorkspace {
  const now = Date.now()
  const day = 1000 * 60 * 60 * 24

  const instances: InternalInstance[] = [
    {
      instance_id: `vps_${user_id}_a`,
      hostname: "aurora-edge-01",
      status: "running",
      ip_address: "185.42.108.24",
      reverse_dns: "aurora-edge-01.hosting.io",
      region: "fra",
      plan_tier: "pro",
      cpu_cores: 4,
      ram_gb: 8,
      storage_gb: 160,
      storage_type: "nvme",
      selected_os: "ubuntu",
      monthly_price: 36,
      created_at: new Date(now - 1000 * 60 * 60 * 24 * 96).toISOString(),
    },
    {
      instance_id: `vps_${user_id}_b`,
      hostname: "cinder-api-02",
      status: "running",
      ip_address: "139.84.201.77",
      reverse_dns: "cinder-api-02.hosting.io",
      region: "sin",
      plan_tier: "starter",
      cpu_cores: 2,
      ram_gb: 4,
      storage_gb: 80,
      storage_type: "nvme",
      selected_os: "arch_linux",
      monthly_price: 21,
      created_at: new Date(now - 1000 * 60 * 60 * 24 * 41).toISOString(),
    },
    {
      instance_id: `vps_${user_id}_c`,
      hostname: "obsidian-db-01",
      status: "stopped",
      ip_address: "198.51.100.19",
      reverse_dns: "obsidian-db-01.hosting.io",
      region: "nyc",
      plan_tier: "enterprise",
      cpu_cores: 8,
      ram_gb: 32,
      storage_gb: 512,
      storage_type: "nvme",
      selected_os: "windows",
      monthly_price: 110,
      created_at: new Date(now - 1000 * 60 * 60 * 24 * 12).toISOString(),
    },
  ]

  const snapshots: Snapshot[] = [
    {
      snapshot_id: `snap_${user_id}_1`,
      instance_id: `vps_${user_id}_a`,
      label: "pre-deploy-v2.4",
      size_gb: 42,
      status: "ready",
      created_at: new Date(now - day * 6).toISOString(),
    },
    {
      snapshot_id: `snap_${user_id}_2`,
      instance_id: `vps_${user_id}_c`,
      label: "db-migration-baseline",
      size_gb: 118,
      status: "ready",
      created_at: new Date(now - day * 13).toISOString(),
    },
  ]

  const firewall_rules: FirewallRule[] = [
    {
      rule_id: `fw_${user_id}_1`,
      instance_id: `vps_${user_id}_a`,
      label: "SSH",
      protocol: "tcp",
      port_range: "22",
      source: "0.0.0.0/0",
    },
    {
      rule_id: `fw_${user_id}_2`,
      instance_id: `vps_${user_id}_a`,
      label: "HTTPS",
      protocol: "tcp",
      port_range: "443",
      source: "0.0.0.0/0",
    },
    {
      rule_id: `fw_${user_id}_3`,
      instance_id: `vps_${user_id}_b`,
      label: "HTTP",
      protocol: "tcp",
      port_range: "80",
      source: "0.0.0.0/0",
    },
  ]

  const ssh_keys: SshKey[] = [
    {
      key_id: `ssh_${user_id}_1`,
      name: "workstation",
      fingerprint: "SHA256:9dQ4xR7mK2pLvT8nEwZ0cB3jH6yU1sA5fD8gN2qW4e",
      created_at: new Date(now - day * 90).toISOString(),
    },
  ]

  const api_tokens: ApiToken[] = [
    {
      token_id: `tok_${user_id}_1`,
      name: "ci-deploy",
      token_preview: "hst_live_••••7f3a",
      created_at: new Date(now - day * 30).toISOString(),
      last_used_at: new Date(now - 1000 * 60 * 60 * 4).toISOString(),
    },
  ]

  const sessions: AccountSession[] = [
    {
      session_id: `ses_${user_id}_1`,
      device: "Chrome · macOS",
      location: "Frankfurt, DE",
      ip_address: "185.42.108.10",
      last_active: new Date(now - 1000 * 60 * 3).toISOString(),
      is_current: true,
    },
    {
      session_id: `ses_${user_id}_2`,
      device: "Safari · iPhone",
      location: "Tehran, IR",
      ip_address: "5.116.44.201",
      last_active: new Date(now - 1000 * 60 * 60 * 20).toISOString(),
      is_current: false,
    },
  ]

  const activity: ActivityEntry[] = [
    {
      entry_id: `act_${user_id}_1`,
      category: "instance",
      action: "instance.start",
      target: "aurora-edge-01",
      created_at: new Date(now - 1000 * 60 * 42).toISOString(),
    },
    {
      entry_id: `act_${user_id}_2`,
      category: "billing",
      action: "invoice.paid",
      target: "HST-2026-0301",
      created_at: new Date(now - day * 4).toISOString(),
    },
    {
      entry_id: `act_${user_id}_3`,
      category: "security",
      action: "ssh_key.added",
      target: "workstation",
      created_at: new Date(now - day * 90).toISOString(),
    },
    {
      entry_id: `act_${user_id}_4`,
      category: "network",
      action: "reverse_dns.updated",
      target: "185.42.108.24",
      created_at: new Date(now - day * 5).toISOString(),
    },
  ]

  const floating_ips: FloatingIp[] = [
    {
      floating_ip_id: `fip_${user_id}_1`,
      ip_address: "45.77.120.9",
      region_label: "Frankfurt",
      attached_hostname: "aurora-edge-01",
    },
    {
      floating_ip_id: `fip_${user_id}_2`,
      ip_address: "45.77.120.42",
      region_label: "Singapore",
      attached_hostname: null,
    },
  ]

  const block_volumes: BlockVolume[] = [
    {
      volume_id: `vol_${user_id}_1`,
      name: "postgres-data",
      size_gb: 250,
      region_label: "New York",
      attached_hostname: "obsidian-db-01",
      created_at: new Date(now - day * 20).toISOString(),
    },
    {
      volume_id: `vol_${user_id}_2`,
      name: "media-cache",
      size_gb: 100,
      region_label: "Frankfurt",
      attached_hostname: null,
      created_at: new Date(now - day * 8).toISOString(),
    },
  ]

  const invoices: Invoice[] = [
    {
      invoice_id: `inv_${user_id}_1`,
      invoice_number: "HST-2026-0412",
      description: "aurora-edge-01 · monthly renewal",
      amount: 36,
      status: "pending",
      issued_at: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
      due_at: new Date(now + 1000 * 60 * 60 * 24 * 4).toISOString(),
    },
    {
      invoice_id: `inv_${user_id}_2`,
      invoice_number: "HST-2026-0388",
      description: "cinder-api-02 · monthly renewal",
      amount: 21,
      status: "pending",
      issued_at: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(),
      due_at: new Date(now + 1000 * 60 * 60 * 24 * 6).toISOString(),
    },
    {
      invoice_id: `inv_${user_id}_3`,
      invoice_number: "HST-2026-0301",
      description: "obsidian-db-01 · setup + first month",
      amount: 110,
      status: "paid",
      issued_at: new Date(now - 1000 * 60 * 60 * 24 * 33).toISOString(),
      due_at: new Date(now - 1000 * 60 * 60 * 24 * 26).toISOString(),
      paid_at: new Date(now - 1000 * 60 * 60 * 24 * 30).toISOString(),
    },
    {
      invoice_id: `inv_${user_id}_4`,
      invoice_number: "HST-2026-0255",
      description: "aurora-edge-01 · monthly renewal",
      amount: 36,
      status: "paid",
      issued_at: new Date(now - 1000 * 60 * 60 * 24 * 63).toISOString(),
      due_at: new Date(now - 1000 * 60 * 60 * 24 * 56).toISOString(),
      paid_at: new Date(now - 1000 * 60 * 60 * 24 * 60).toISOString(),
    },
  ]

  const tickets: SupportTicket[] = [
    {
      ticket_id: `tkt_${user_id}_1`,
      subject: "Reverse DNS setup for aurora-edge-01",
      status: "open",
      priority: "normal",
      created_at: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
      updated_at: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
      messages: [
        {
          message_id: "msg_1",
          author_role: "user",
          author_name: "You",
          body: "Could you set the PTR record for 185.42.108.24 to aurora-edge-01.hosting.io?",
          created_at: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
        },
        {
          message_id: "msg_2",
          author_role: "support",
          author_name: "Hosting Support",
          body: "Happy to help. We've queued the PTR update — it should propagate within the hour. We'll confirm once it's live.",
          created_at: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
        },
      ],
    },
    {
      ticket_id: `tkt_${user_id}_2`,
      subject: "Bandwidth spike on cinder-api-02",
      status: "closed",
      priority: "high",
      created_at: new Date(now - 1000 * 60 * 60 * 24 * 9).toISOString(),
      updated_at: new Date(now - 1000 * 60 * 60 * 24 * 8).toISOString(),
      messages: [
        {
          message_id: "msg_1",
          author_role: "user",
          author_name: "You",
          body: "Seeing an unusual bandwidth spike overnight. Is everything okay on the network side?",
          created_at: new Date(now - 1000 * 60 * 60 * 24 * 9).toISOString(),
        },
        {
          message_id: "msg_2",
          author_role: "support",
          author_name: "Hosting Support",
          body: "We traced it to a legitimate backup job. No abuse detected and DDoS mitigation stayed idle. Closing this out — reopen anytime.",
          created_at: new Date(now - 1000 * 60 * 60 * 24 * 8).toISOString(),
        },
      ],
    },
  ]

  const workspace: UserWorkspace = {
    instances,
    invoices,
    orders: [],
    tickets,
    snapshots,
    firewall_rules,
    ssh_keys,
    api_tokens,
    sessions,
    activity,
    floating_ips,
    block_volumes,
    backup_policies: [
      {
        backup_id: `bak_${user_id}_1`,
        instance_id: `vps_${user_id}_a`,
        enabled: true,
        frequency: "daily",
        retention_days: 7,
        last_backup_at: new Date(now - day).toISOString(),
        next_backup_at: new Date(now + day).toISOString(),
      },
    ],
    dns_zones: [
      {
        zone_id: `zone_${user_id}_1`,
        domain_name: "example.com",
        created_at: new Date(now - day * 40).toISOString(),
        records: [
          {
            record_id: `rec_${user_id}_1`,
            record_type: "A",
            name: "@",
            value: "185.42.108.24",
            ttl: 300,
          },
          {
            record_id: `rec_${user_id}_2`,
            record_type: "AAAA",
            name: "@",
            value: "2a01:4f8:c0c:1234::1",
            ttl: 300,
          },
          {
            record_id: `rec_${user_id}_3`,
            record_type: "CNAME",
            name: "www",
            value: "example.com",
            ttl: 300,
          },
          {
            record_id: `rec_${user_id}_4`,
            record_type: "MX",
            name: "@",
            value: "mail.example.com",
            ttl: 3600,
            priority: 10,
          },
          {
            record_id: `rec_${user_id}_5`,
            record_type: "TXT",
            name: "@",
            value: "v=spf1 include:_spf.hosting.io ~all",
            ttl: 3600,
          },
        ],
      },
    ],
    payment_methods: [
      {
        method_id: `pm_${user_id}_1`,
        brand: "Visa",
        last_four: "4242",
        exp_month: 12,
        exp_year: 2028,
        is_default: true,
      },
    ],
    notification_preferences: {
      billing_email: true,
      ticket_email: true,
      security_email: true,
      marketing_email: false,
      usage_alerts: true,
    },
    two_factor_enabled: false,
  }
  user_workspaces.set(user_id, workspace)
  return workspace
}

function find_user_by_email(email_address: string): AuthUser | null {
  seed_mock_users()

  for (const record of mock_user_registry.values()) {
    if (record.user.email_address === email_address) {
      return record.user
    }
  }

  return null
}

function support_ticket_to_admin(
  ticket: SupportTicket,
  user: AuthUser,
): AdminTicket {
  return {
    ticket_id: ticket.ticket_id,
    subject: ticket.subject,
    status: ticket.status,
    priority: ticket.priority,
    user_name: user.full_name,
    user_email: user.email_address,
    created_at: ticket.created_at,
    updated_at: ticket.updated_at,
    messages: ticket.messages,
  }
}

function sync_ticket_to_admin(ticket: SupportTicket, user: AuthUser): void {
  const state = seed_admin_state()
  const admin_ticket = support_ticket_to_admin(ticket, user)
  const index = state.tickets.findIndex(
    (item) => item.ticket_id === ticket.ticket_id,
  )

  if (index >= 0) {
    state.tickets[index] = admin_ticket
    return
  }

  state.tickets.unshift(admin_ticket)
}

function sync_admin_reply_to_user(ticket: AdminTicket): void {
  const user = find_user_by_email(ticket.user_email)
  if (!user) {
    return
  }

  const workspace = get_workspace(user.user_id)
  const user_ticket = workspace.tickets.find(
    (item) => item.ticket_id === ticket.ticket_id,
  )

  if (!user_ticket) {
    workspace.tickets.unshift({
      ticket_id: ticket.ticket_id,
      subject: ticket.subject,
      status: ticket.status,
      priority: ticket.priority,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
      messages: [...ticket.messages],
    })
    return
  }

  user_ticket.messages = [...ticket.messages]
  user_ticket.status = ticket.status
  user_ticket.updated_at = ticket.updated_at
}

function infer_region_from_label(region_label: string): InternalRegion {
  const normalized = region_label.toLowerCase()
  if (normalized.includes("singapore") || normalized.includes("سنگاپور")) {
    return "sin"
  }
  if (normalized.includes("new york") || normalized.includes("نیویورک")) {
    return "nyc"
  }
  if (normalized.includes("tehran") || normalized.includes("تهران")) {
    return "tehran"
  }
  return "fra"
}

function generate_mock_ip(seed: string): string {
  const hash = hash_seed(seed)
  const octet = (offset: number) => ((hash >> offset) & 255) || 1
  return `${100 + (octet(0) % 155)}.${octet(8)}.${octet(16)}.${octet(24)}`
}

function provision_instance_from_order(order: AdminOrder): void {
  const user =
    (order.user_id ? find_user_by_id(order.user_id) : null) ??
    find_user_by_email(order.user_email)

  if (!user) {
    return
  }

  const workspace = get_workspace(user.user_id)
  const region = infer_region_from_label(order.region_label)
  const suffix = order.order_id.slice(-4)
  const hostname = `vps-${suffix}-${Date.now().toString(36).slice(-4)}`
  const instance_id = `vps_${user.user_id}_${Date.now()}`

  const instance: InternalInstance = {
    instance_id,
    hostname,
    status: "provisioning",
    ip_address: generate_mock_ip(order.order_id),
    reverse_dns: `${hostname}.hosting.io`,
    region,
    plan_tier: "custom",
    cpu_cores: order.cpu_cores,
    ram_gb: order.ram_gb,
    storage_gb: order.storage_gb,
    storage_type: order.storage_type ?? "nvme",
    selected_os: order.selected_os ?? "ubuntu",
    monthly_price: order.monthly_price,
    created_at: new Date().toISOString(),
  }

  workspace.instances.unshift(instance)

  const user_order = workspace.orders.find(
    (item) => item.order_id === order.order_id,
  )
  if (user_order) {
    user_order.status = "approved"
    user_order.instance_id = instance_id
  }

  const admin_state = seed_admin_state()
  const admin_user = admin_state.users.find(
    (item) => item.user_id === user.user_id,
  )
  if (admin_user) {
    admin_user.instance_count += 1
    admin_user.monthly_spend += order.monthly_price
  }

  log_activity(workspace, "instance", "order.approved", order.order_id)
}

function sync_demo_tickets_to_admin(): void {
  const demo_user = find_user_by_id("usr_demo_001")
  if (!demo_user) {
    return
  }

  const workspace = get_workspace("usr_demo_001")
  for (const ticket of workspace.tickets) {
    sync_ticket_to_admin(ticket, demo_user)
  }
}

function log_activity(
  workspace: UserWorkspace,
  category: ActivityEntry["category"],
  action: string,
  target: string,
): void {
  workspace.activity.unshift({
    entry_id: `act_${Date.now()}_${Math.round(Math.random() * 1000)}`,
    category,
    action,
    target,
    created_at: new Date().toISOString(),
  })
}

async function require_current_user(): Promise<AuthUser> {
  const user = await get_current_user()
  if (!user) {
    throw new Error("Not authenticated.")
  }
  return user
}

function get_workspace(user_id: string): UserWorkspace {
  return user_workspaces.get(user_id) ?? seed_user_workspace(user_id)
}

function to_public_instance(
  instance: InternalInstance,
  locale: string,
): ServerInstance {
  const lang = locale === "fa" ? "fa" : "en"

  return {
    instance_id: instance.instance_id,
    hostname: instance.hostname,
    status: instance.status,
    ip_address: instance.ip_address,
    reverse_dns: instance.reverse_dns,
    region: instance.region,
    region_label: region_labels[lang][instance.region],
    plan_name: plan_labels[lang][instance.plan_tier],
    cpu_cores: instance.cpu_cores,
    ram_gb: instance.ram_gb,
    storage_gb: instance.storage_gb,
    storage_type: instance.storage_type,
    selected_os: instance.selected_os,
    os_label: os_labels_map[lang][instance.selected_os],
    monthly_price: instance.monthly_price,
    created_at: instance.created_at,
  }
}

export async function get_instances(
  locale: string,
): Promise<ServerInstance[]> {
  await new Promise((resolve) => setTimeout(resolve, 120))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return workspace.instances.map((instance) =>
    to_public_instance(instance, locale),
  )
}

export async function get_instance(
  instance_id: string,
  locale: string,
): Promise<ServerInstance | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )

  return instance ? to_public_instance(instance, locale) : null
}

export async function perform_instance_action(
  instance_id: string,
  action: InstanceAction,
  locale: string,
): Promise<{ success: boolean; instance: ServerInstance | null }> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )

  if (!instance) {
    return { success: false, instance: null }
  }

  switch (action) {
    case "start":
      instance.status = "running"
      break
    case "stop":
      instance.status = "stopped"
      break
    case "restart":
      instance.status = "running"
      break
    case "rebuild":
      instance.status = "running"
      instance.created_at = new Date().toISOString()
      break
  }

  return { success: true, instance: to_public_instance(instance, locale) }
}

export async function update_instance_hostname(
  instance_id: string,
  hostname: string,
  locale: string,
): Promise<{ success: boolean; instance: ServerInstance | null }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )
  const next = hostname.trim().toLowerCase()
  if (!instance || !next) {
    return { success: false, instance: null }
  }

  instance.hostname = next
  log_activity(workspace, "instance", "instance.hostname_updated", next)
  return { success: true, instance: to_public_instance(instance, locale) }
}

export async function reset_instance_root_password(
  instance_id: string,
): Promise<{ success: boolean; temporary_password?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )
  if (!instance) {
    return { success: false }
  }

  const temporary_password = `Tmp!${Math.random().toString(36).slice(2, 10)}A1`
  log_activity(
    workspace,
    "security",
    "instance.root_password_reset",
    instance.hostname,
  )
  return { success: true, temporary_password }
}

export async function rebuild_instance(
  instance_id: string,
  selected_os: SelectedOs,
  locale: string,
): Promise<{ success: boolean; instance: ServerInstance | null }> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )
  if (!instance || !is_valid_selected_os(selected_os)) {
    return { success: false, instance: null }
  }

  instance.selected_os = selected_os
  instance.status = "running"
  instance.created_at = new Date().toISOString()
  log_activity(workspace, "instance", "instance.rebuild", instance.hostname)
  return { success: true, instance: to_public_instance(instance, locale) }
}

export async function destroy_instance(
  instance_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.instances.findIndex(
    (item) => item.instance_id === instance_id,
  )
  if (index < 0) {
    return { success: false }
  }

  const [removed] = workspace.instances.splice(index, 1)
  workspace.snapshots = workspace.snapshots.filter(
    (item) => item.instance_id !== instance_id,
  )
  workspace.firewall_rules = workspace.firewall_rules.filter(
    (item) => item.instance_id !== instance_id,
  )
  workspace.backup_policies = workspace.backup_policies.filter(
    (item) => item.instance_id !== instance_id,
  )
  log_activity(workspace, "instance", "instance.destroy", removed.hostname)
  return { success: true }
}

export async function get_instance_backup_policy(
  instance_id: string,
): Promise<BackupPolicy | null> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  return (
    workspace.backup_policies.find((item) => item.instance_id === instance_id) ??
    null
  )
}

export async function update_instance_backup_policy(
  instance_id: string,
  payload: {
    enabled: boolean
    frequency: BackupFrequency
    retention_days: number
  },
): Promise<{ success: boolean; policy: BackupPolicy | null }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )
  if (!instance) {
    return { success: false, policy: null }
  }

  let policy = workspace.backup_policies.find(
    (item) => item.instance_id === instance_id,
  )
  const now = Date.now()
  const day = 1000 * 60 * 60 * 24
  const next_offset = payload.frequency === "weekly" ? day * 7 : day

  if (!policy) {
    policy = {
      backup_id: `bak_${Date.now()}`,
      instance_id,
      enabled: payload.enabled,
      frequency: payload.frequency,
      retention_days: payload.retention_days,
      last_backup_at: null,
      next_backup_at: payload.enabled
        ? new Date(now + next_offset).toISOString()
        : null,
    }
    workspace.backup_policies.push(policy)
  } else {
    policy.enabled = payload.enabled
    policy.frequency = payload.frequency
    policy.retention_days = Math.max(1, Math.min(90, payload.retention_days))
    policy.next_backup_at = payload.enabled
      ? new Date(now + next_offset).toISOString()
      : null
  }

  log_activity(workspace, "instance", "backup.policy_updated", instance.hostname)
  return { success: true, policy: { ...policy } }
}

export async function get_instance_usage(
  instance_id: string,
): Promise<UsageSeries> {
  await new Promise((resolve) => setTimeout(resolve, 140))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )

  const point_count = 24
  const labels = Array.from({ length: point_count }, (_, i) => {
    const hour = (i + 1) % 24
    return `${hour.toString().padStart(2, "0")}:00`
  })

  const is_running = instance?.status === "running"
  const rng = seeded_random(hash_seed(instance_id))

  const cpu_percent: number[] = []
  const bandwidth_mbps: number[] = []
  const memory_percent: number[] = []

  let cpu_base = 18 + rng() * 22
  let mem_base = 34 + rng() * 20
  let bw_base = 40 + rng() * 60

  for (let i = 0; i < point_count; i += 1) {
    if (!is_running) {
      cpu_percent.push(0)
      bandwidth_mbps.push(0)
      memory_percent.push(0)
      continue
    }

    cpu_base += (rng() - 0.5) * 16
    mem_base += (rng() - 0.5) * 8
    bw_base += (rng() - 0.5) * 40

    const spike = rng() > 0.88 ? rng() * 45 : 0

    cpu_percent.push(Math.round(Math.min(98, Math.max(3, cpu_base + spike))))
    memory_percent.push(Math.round(Math.min(95, Math.max(20, mem_base))))
    bandwidth_mbps.push(Math.round(Math.max(2, bw_base + spike * 2)))
  }

  const average = (values: number[]) =>
    values.length
      ? Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
      : 0

  return {
    cpu_percent,
    bandwidth_mbps,
    memory_percent,
    labels,
    cpu_avg: average(cpu_percent),
    bandwidth_avg: average(bandwidth_mbps),
    memory_avg: average(memory_percent),
  }
}

export async function get_invoices(): Promise<Invoice[]> {
  await new Promise((resolve) => setTimeout(resolve, 110))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return [...workspace.invoices].sort(
    (a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime(),
  )
}

export async function pay_invoice(
  invoice_id: string,
): Promise<{ success: boolean; invoice: Invoice | null }> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const invoice = workspace.invoices.find(
    (item) => item.invoice_id === invoice_id,
  )

  if (!invoice) {
    return { success: false, invoice: null }
  }

  invoice.status = "paid"
  invoice.paid_at = new Date().toISOString()

  return { success: true, invoice }
}

export async function get_tickets(): Promise<SupportTicket[]> {
  await new Promise((resolve) => setTimeout(resolve, 110))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return [...workspace.tickets].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  )
}

export async function get_ticket(
  ticket_id: string,
): Promise<SupportTicket | null> {
  await new Promise((resolve) => setTimeout(resolve, 90))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return workspace.tickets.find((item) => item.ticket_id === ticket_id) ?? null
}

export async function create_ticket(payload: {
  subject: string
  body: string
  priority: TicketPriority
}): Promise<{ success: boolean; ticket: SupportTicket | null }> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  const subject = payload.subject.trim()
  const body = payload.body.trim()

  if (!subject || !body) {
    return { success: false, ticket: null }
  }

  const now = new Date().toISOString()
  const ticket: SupportTicket = {
    ticket_id: `tkt_${user.user_id}_${Date.now()}`,
    subject,
    status: "open",
    priority: payload.priority,
    created_at: now,
    updated_at: now,
    messages: [
      {
        message_id: `msg_${Date.now()}`,
        author_role: "user",
        author_name: user.full_name,
        body,
        created_at: now,
      },
    ],
  }

  workspace.tickets.unshift(ticket)
  sync_ticket_to_admin(ticket, user)

  return { success: true, ticket }
}

export async function reply_ticket(
  ticket_id: string,
  body: string,
): Promise<{ success: boolean; ticket: SupportTicket | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const ticket = workspace.tickets.find((item) => item.ticket_id === ticket_id)

  const trimmed = body.trim()
  if (!ticket || !trimmed) {
    return { success: false, ticket: ticket ?? null }
  }

  const now = new Date().toISOString()
  ticket.messages.push({
    message_id: `msg_${Date.now()}`,
    author_role: "user",
    author_name: user.full_name,
    body: trimmed,
    created_at: now,
  })
  ticket.status = "pending"
  ticket.updated_at = now
  sync_ticket_to_admin(ticket, user)

  return { success: true, ticket }
}

export async function get_user_orders(): Promise<UserOrder[]> {
  await new Promise((resolve) => setTimeout(resolve, 110))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return [...workspace.orders].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

export async function submit_vps_order(payload: {
  configuration: ConfiguratorPayload
  region: InternalRegion
  locale?: string
}): Promise<{ success: boolean; order_id?: string; error_message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  const user = await require_current_user()
  if (user.account_status === "suspended") {
    return {
      success: false,
      error_message: "Your account is suspended. Contact support to continue.",
    }
  }

  const locale = payload.locale === "fa" ? "fa" : "en"
  const validation = await validate_configuration(payload.configuration, locale)

  if (!validation.valid) {
    return {
      success: false,
      error_message:
        validation.error_message ?? "Invalid configuration. Please review your build.",
    }
  }

  const config = validation.payload
  const region_label = region_labels[locale][payload.region]
  const order_id = `ord_${Date.now()}`
  const now = new Date().toISOString()
  const plan_summary = `Custom · ${region_label}`

  const user_order: UserOrder = {
    order_id,
    plan_summary,
    cpu_cores: config.cpu_cores,
    ram_gb: config.ram_gb,
    storage_gb: config.storage_size_gb,
    storage_type: config.storage_type,
    selected_os: config.selected_os,
    region_label,
    monthly_price: validation.monthly_price,
    status: "pending",
    created_at: now,
  }

  const workspace = get_workspace(user.user_id)
  workspace.orders.unshift(user_order)

  workspace.invoices.unshift({
    invoice_id: `inv_${user.user_id}_${Date.now()}`,
    invoice_number: `HST-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
    description: `${plan_summary} · first month`,
    amount: validation.monthly_price,
    status: "pending",
    issued_at: now,
    due_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  })

  const admin_state = seed_admin_state()
  admin_state.orders.unshift({
    order_id,
    user_id: user.user_id,
    user_name: user.full_name,
    user_email: user.email_address,
    plan_summary,
    cpu_cores: config.cpu_cores,
    ram_gb: config.ram_gb,
    storage_gb: config.storage_size_gb,
    storage_type: config.storage_type,
    selected_os: config.selected_os,
    region_label,
    monthly_price: validation.monthly_price,
    status: "pending",
    created_at: now,
  })

  log_activity(workspace, "billing", "order.submitted", order_id)

  return { success: true, order_id }
}

export async function get_dashboard_overview(
  locale: string,
): Promise<DashboardOverview> {
  await new Promise((resolve) => setTimeout(resolve, 130))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  const public_instances = workspace.instances.map((instance) =>
    to_public_instance(instance, locale),
  )
  const active_instances = public_instances.filter(
    (instance) => instance.status === "running",
  ).length
  const monthly_spend = public_instances.reduce(
    (sum, instance) => sum + instance.monthly_price,
    0,
  )
  const pending_invoices = workspace.invoices.filter(
    (invoice) => invoice.status !== "paid",
  )
  const pending_invoice_total = pending_invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0,
  )
  const open_tickets = workspace.tickets.filter(
    (ticket) => ticket.status !== "closed",
  )

  return {
    full_name: user.full_name,
    active_instances,
    total_instances: public_instances.length,
    monthly_spend,
    pending_invoice_total,
    pending_invoice_count: pending_invoices.length,
    open_ticket_count: open_tickets.length,
    recent_instances: public_instances.slice(0, 3),
    pending_invoices: pending_invoices.slice(0, 3),
    recent_tickets: [...workspace.tickets]
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
      .slice(0, 3),
  }
}

export async function get_dashboard_page_copy(
  locale: string,
): Promise<DashboardPageCopy> {
  await new Promise((resolve) => setTimeout(resolve, 30))
  return dashboardPageCopyByLocale[locale] ?? dashboardPageCopyByLocale.fa
}

/* ═══════════════════════════════════════════════════════════════════
   Instance management: resize, snapshots, firewall, reverse DNS, console
   ═══════════════════════════════════════════════════════════════════ */

const RESIZE_CONSTRAINTS: ResizeConstraints = {
  cpu_min: 1,
  cpu_max: 32,
  ram_min: 1,
  ram_max: 128,
  storage_min: 20,
  storage_max: 2048,
}

export async function get_resize_constraints(): Promise<ResizeConstraints> {
  return { ...RESIZE_CONSTRAINTS }
}

export async function resize_instance(
  instance_id: string,
  next: { cpu_cores: number; ram_gb: number; storage_gb: number },
  mode: ResizeMode,
  locale: string,
): Promise<{ success: boolean; instance: ServerInstance | null }> {
  await new Promise((resolve) => setTimeout(resolve, mode === "cold" ? 1100 : 800))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )

  if (!instance) {
    return { success: false, instance: null }
  }

  const cpu_cores = Math.min(
    RESIZE_CONSTRAINTS.cpu_max,
    Math.max(RESIZE_CONSTRAINTS.cpu_min, Math.round(next.cpu_cores)),
  )
  const ram_gb = Math.min(
    RESIZE_CONSTRAINTS.ram_max,
    Math.max(RESIZE_CONSTRAINTS.ram_min, Math.round(next.ram_gb)),
  )
  // Storage can only grow (matches real providers).
  const storage_gb = Math.min(
    RESIZE_CONSTRAINTS.storage_max,
    Math.max(instance.storage_gb, Math.round(next.storage_gb)),
  )

  const { compute_vps_price } = await import("@/lib/vps-pricing")
  const base_old = compute_vps_price({
    cpu_cores: instance.cpu_cores,
    ram_gb: instance.ram_gb,
    storage_type: instance.storage_type,
    storage_size_gb: instance.storage_gb,
    selected_os: instance.selected_os,
  }).monthly_price
  const base_new = compute_vps_price({
    cpu_cores,
    ram_gb,
    storage_type: instance.storage_type,
    storage_size_gb: storage_gb,
    selected_os: instance.selected_os,
  }).monthly_price

  const next_price =
    Math.round((instance.monthly_price + (base_new - base_old)) * 100) / 100

  instance.cpu_cores = cpu_cores
  instance.ram_gb = ram_gb
  instance.storage_gb = storage_gb
  instance.monthly_price = Math.max(0, next_price)
  instance.status = "running"

  log_activity(workspace, "instance", "instance.resized", instance.hostname)

  return { success: true, instance: to_public_instance(instance, locale) }
}

export async function get_instance_snapshots(
  instance_id: string,
): Promise<Snapshot[]> {
  await new Promise((resolve) => setTimeout(resolve, 90))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return workspace.snapshots
    .filter((snapshot) => snapshot.instance_id === instance_id)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
}

export async function create_snapshot(
  instance_id: string,
  label: string,
): Promise<{ success: boolean; snapshot: Snapshot | null }> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )
  const trimmed = label.trim()

  if (!instance || !trimmed) {
    return { success: false, snapshot: null }
  }

  const snapshot: Snapshot = {
    snapshot_id: `snap_${Date.now()}`,
    instance_id,
    label: trimmed,
    size_gb: Math.round(instance.storage_gb * (0.2 + Math.random() * 0.3)),
    status: "ready",
    created_at: new Date().toISOString(),
  }

  workspace.snapshots.unshift(snapshot)
  log_activity(workspace, "instance", "snapshot.created", trimmed)

  return { success: true, snapshot }
}

export async function restore_snapshot(
  snapshot_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const snapshot = workspace.snapshots.find(
    (item) => item.snapshot_id === snapshot_id,
  )

  if (!snapshot) {
    return { success: false }
  }

  log_activity(workspace, "instance", "snapshot.restored", snapshot.label)
  return { success: true }
}

export async function delete_snapshot(
  snapshot_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.snapshots.findIndex(
    (item) => item.snapshot_id === snapshot_id,
  )

  if (index === -1) {
    return { success: false }
  }

  const [removed] = workspace.snapshots.splice(index, 1)
  log_activity(workspace, "instance", "snapshot.deleted", removed.label)
  return { success: true }
}

export async function get_firewall_rules(
  instance_id: string,
): Promise<FirewallRule[]> {
  await new Promise((resolve) => setTimeout(resolve, 90))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return workspace.firewall_rules.filter(
    (rule) => rule.instance_id === instance_id,
  )
}

export async function create_firewall_rule(
  instance_id: string,
  rule: {
    label: string
    protocol: FirewallProtocol
    port_range: string
    source: string
  },
): Promise<{ success: boolean; rule: FirewallRule | null }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  const label = rule.label.trim()
  const port_range = rule.port_range.trim()
  const source = rule.source.trim() || "0.0.0.0/0"

  if (!label || (rule.protocol !== "icmp" && !port_range)) {
    return { success: false, rule: null }
  }

  const created: FirewallRule = {
    rule_id: `fw_${Date.now()}`,
    instance_id,
    label,
    protocol: rule.protocol,
    port_range: rule.protocol === "icmp" ? "—" : port_range,
    source,
  }

  workspace.firewall_rules.push(created)
  log_activity(workspace, "network", "firewall.rule_added", label)

  return { success: true, rule: created }
}

export async function delete_firewall_rule(
  rule_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.firewall_rules.findIndex(
    (rule) => rule.rule_id === rule_id,
  )

  if (index === -1) {
    return { success: false }
  }

  const [removed] = workspace.firewall_rules.splice(index, 1)
  log_activity(workspace, "network", "firewall.rule_removed", removed.label)
  return { success: true }
}

export async function update_reverse_dns(
  instance_id: string,
  reverse_dns: string,
  locale: string,
): Promise<{ success: boolean; instance: ServerInstance | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const instance = workspace.instances.find(
    (item) => item.instance_id === instance_id,
  )
  const trimmed = reverse_dns.trim()

  if (!instance || !trimmed) {
    return { success: false, instance: null }
  }

  instance.reverse_dns = trimmed
  log_activity(workspace, "network", "reverse_dns.updated", instance.ip_address)

  return { success: true, instance: to_public_instance(instance, locale) }
}

/* ═══════════════════════════════════════════════════════════════════
   Account: profile, security, SSH keys, API tokens, sessions, activity
   ═══════════════════════════════════════════════════════════════════ */

export async function get_account_profile(): Promise<AccountProfile> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  return {
    full_name: user.full_name,
    email_address: user.email_address,
    two_factor_enabled: workspace.two_factor_enabled,
    created_at: user.created_at,
  }
}

export async function update_account_profile(
  full_name: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const trimmed = full_name.trim()

  if (!trimmed) {
    return { success: false }
  }

  seed_mock_users()
  const record = mock_user_registry.get(user.email_address)
  if (record) {
    record.user.full_name = trimmed
  }

  const workspace = get_workspace(user.user_id)
  log_activity(workspace, "security", "profile.updated", trimmed)

  return { success: true }
}

export async function change_account_password(payload: {
  current_password: string
  new_password: string
}): Promise<{ success: boolean; error_message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 700))
  const user = await require_current_user()
  seed_mock_users()
  const record = mock_user_registry.get(user.email_address)

  if (!record || record.account_password !== payload.current_password) {
    return { success: false, error_message: "invalid_current" }
  }

  if (payload.new_password.length < 6) {
    return { success: false, error_message: "too_short" }
  }

  record.account_password = payload.new_password
  const workspace = get_workspace(user.user_id)
  log_activity(workspace, "security", "password.changed", user.email_address)

  return { success: true }
}

export async function toggle_two_factor(
  enabled: boolean,
): Promise<{ success: boolean; two_factor_enabled: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  workspace.two_factor_enabled = enabled
  log_activity(
    workspace,
    "security",
    enabled ? "two_factor.enabled" : "two_factor.disabled",
    user.email_address,
  )

  return { success: true, two_factor_enabled: enabled }
}

export async function get_ssh_keys(): Promise<SshKey[]> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  const user = await require_current_user()
  return [...get_workspace(user.user_id).ssh_keys]
}

export async function add_ssh_key(payload: {
  name: string
  public_key: string
}): Promise<{ success: boolean; key: SshKey | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const name = payload.name.trim()
  const public_key = payload.public_key.trim()

  if (!name || !public_key.startsWith("ssh-")) {
    return { success: false, key: null }
  }

  const seed = hash_seed(public_key).toString(16).padStart(8, "0")
  const key: SshKey = {
    key_id: `ssh_${Date.now()}`,
    name,
    fingerprint: `SHA256:${seed}${seed}${seed.slice(0, 6)}`,
    created_at: new Date().toISOString(),
  }

  workspace.ssh_keys.unshift(key)
  log_activity(workspace, "security", "ssh_key.added", name)

  return { success: true, key }
}

export async function delete_ssh_key(
  key_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.ssh_keys.findIndex((key) => key.key_id === key_id)

  if (index === -1) {
    return { success: false }
  }

  const [removed] = workspace.ssh_keys.splice(index, 1)
  log_activity(workspace, "security", "ssh_key.removed", removed.name)
  return { success: true }
}

export async function get_api_tokens(): Promise<ApiToken[]> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  const user = await require_current_user()
  return get_workspace(user.user_id).api_tokens.map((token) => ({
    ...token,
    secret: undefined,
  }))
}

export async function create_api_token(
  name: string,
): Promise<{ success: boolean; token: ApiToken | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const trimmed = name.trim()

  if (!trimmed) {
    return { success: false, token: null }
  }

  const secret = `hst_live_${hash_seed(trimmed + Date.now()).toString(16)}${Math.round(
    Math.random() * 1e8,
  ).toString(16)}`

  const token: ApiToken = {
    token_id: `tok_${Date.now()}`,
    name: trimmed,
    token_preview: `hst_live_••••${secret.slice(-4)}`,
    created_at: new Date().toISOString(),
    last_used_at: null,
    secret,
  }

  workspace.api_tokens.unshift({ ...token, secret: undefined })
  log_activity(workspace, "security", "api_token.created", trimmed)

  return { success: true, token }
}

export async function revoke_api_token(
  token_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.api_tokens.findIndex(
    (token) => token.token_id === token_id,
  )

  if (index === -1) {
    return { success: false }
  }

  const [removed] = workspace.api_tokens.splice(index, 1)
  log_activity(workspace, "security", "api_token.revoked", removed.name)
  return { success: true }
}

export async function get_account_sessions(): Promise<AccountSession[]> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  const user = await require_current_user()
  return [...get_workspace(user.user_id).sessions]
}

export async function revoke_session(
  session_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const session = workspace.sessions.find(
    (item) => item.session_id === session_id,
  )

  if (!session || session.is_current) {
    return { success: false }
  }

  workspace.sessions = workspace.sessions.filter(
    (item) => item.session_id !== session_id,
  )
  log_activity(workspace, "security", "session.revoked", session.device)
  return { success: true }
}

export async function get_activity_log(): Promise<ActivityEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 90))
  const user = await require_current_user()
  return [...get_workspace(user.user_id).activity].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Networking: floating IPs + block storage volumes
   ═══════════════════════════════════════════════════════════════════ */

export async function get_floating_ips(): Promise<FloatingIp[]> {
  await new Promise((resolve) => setTimeout(resolve, 90))
  const user = await require_current_user()
  return [...get_workspace(user.user_id).floating_ips]
}

export async function get_block_volumes(): Promise<BlockVolume[]> {
  await new Promise((resolve) => setTimeout(resolve, 90))
  const user = await require_current_user()
  return [...get_workspace(user.user_id).block_volumes]
}

function random_ip(): string {
  const octet = () => Math.floor(Math.random() * 254) + 1
  return `45.77.${octet()}.${octet()}`
}

export async function create_floating_ip(
  region_label: string,
): Promise<{ success: boolean; floating_ip: FloatingIp | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)

  const floating_ip: FloatingIp = {
    floating_ip_id: `fip_${Date.now()}`,
    ip_address: random_ip(),
    region_label,
    attached_hostname: null,
  }

  workspace.floating_ips.unshift(floating_ip)
  log_activity(workspace, "network", "floating_ip.created", floating_ip.ip_address)
  return { success: true, floating_ip }
}

export async function set_floating_ip_attachment(
  floating_ip_id: string,
  instance_id: string | null,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const floating_ip = workspace.floating_ips.find(
    (item) => item.floating_ip_id === floating_ip_id,
  )

  if (!floating_ip) {
    return { success: false }
  }

  if (instance_id) {
    const instance = workspace.instances.find(
      (item) => item.instance_id === instance_id,
    )
    floating_ip.attached_hostname = instance?.hostname ?? null
    log_activity(workspace, "network", "floating_ip.attached", floating_ip.ip_address)
  } else {
    floating_ip.attached_hostname = null
    log_activity(workspace, "network", "floating_ip.detached", floating_ip.ip_address)
  }

  return { success: true }
}

export async function delete_floating_ip(
  floating_ip_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.floating_ips.findIndex(
    (item) => item.floating_ip_id === floating_ip_id,
  )

  if (index === -1) {
    return { success: false }
  }

  const [removed] = workspace.floating_ips.splice(index, 1)
  log_activity(workspace, "network", "floating_ip.released", removed.ip_address)
  return { success: true }
}

export async function create_block_volume(payload: {
  name: string
  size_gb: number
  region_label: string
}): Promise<{ success: boolean; volume: BlockVolume | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const name = payload.name.trim()
  const size_gb = Math.min(4096, Math.max(10, Math.round(payload.size_gb)))

  if (!name) {
    return { success: false, volume: null }
  }

  const volume: BlockVolume = {
    volume_id: `vol_${Date.now()}`,
    name,
    size_gb,
    region_label: payload.region_label,
    attached_hostname: null,
    created_at: new Date().toISOString(),
  }

  workspace.block_volumes.unshift(volume)
  log_activity(workspace, "network", "volume.created", name)
  return { success: true, volume }
}

export async function set_volume_attachment(
  volume_id: string,
  instance_id: string | null,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const volume = workspace.block_volumes.find(
    (item) => item.volume_id === volume_id,
  )

  if (!volume) {
    return { success: false }
  }

  if (instance_id) {
    const instance = workspace.instances.find(
      (item) => item.instance_id === instance_id,
    )
    volume.attached_hostname = instance?.hostname ?? null
    log_activity(workspace, "network", "volume.attached", volume.name)
  } else {
    volume.attached_hostname = null
    log_activity(workspace, "network", "volume.detached", volume.name)
  }

  return { success: true }
}

export async function delete_block_volume(
  volume_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.block_volumes.findIndex(
    (item) => item.volume_id === volume_id,
  )

  if (index === -1) {
    return { success: false }
  }

  const [removed] = workspace.block_volumes.splice(index, 1)
  log_activity(workspace, "network", "volume.deleted", removed.name)
  return { success: true }
}

export async function get_dns_zones(): Promise<DnsZone[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  return workspace.dns_zones.map((zone) => ({
    ...zone,
    records: zone.records.map((record) => ({ ...record })),
  }))
}

export async function create_dns_zone(
  domain_name: string,
): Promise<{ success: boolean; zone: DnsZone | null }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const normalized = domain_name.trim().toLowerCase()
  if (!normalized || !normalized.includes(".")) {
    return { success: false, zone: null }
  }

  if (workspace.dns_zones.some((zone) => zone.domain_name === normalized)) {
    return { success: false, zone: null }
  }

  const zone: DnsZone = {
    zone_id: `zone_${Date.now()}`,
    domain_name: normalized,
    created_at: new Date().toISOString(),
    records: [],
  }
  workspace.dns_zones.unshift(zone)
  log_activity(workspace, "network", "dns.zone_created", normalized)
  return { success: true, zone: { ...zone, records: [] } }
}

export async function delete_dns_zone(
  zone_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.dns_zones.findIndex((zone) => zone.zone_id === zone_id)
  if (index < 0) {
    return { success: false }
  }
  const [removed] = workspace.dns_zones.splice(index, 1)
  log_activity(workspace, "network", "dns.zone_deleted", removed.domain_name)
  return { success: true }
}

export async function add_dns_record(
  zone_id: string,
  record: {
    record_type: DnsRecordType
    name: string
    value: string
    ttl: number
    priority?: number
  },
): Promise<{ success: boolean; record: DnsRecord | null }> {
  await new Promise((resolve) => setTimeout(resolve, 450))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const zone = workspace.dns_zones.find((item) => item.zone_id === zone_id)
  const name = record.name.trim() || "@"
  const value = record.value.trim()
  if (!zone || !value) {
    return { success: false, record: null }
  }

  const created: DnsRecord = {
    record_id: `rec_${Date.now()}`,
    record_type: record.record_type,
    name,
    value,
    ttl: Math.max(60, Math.min(86400, Math.round(record.ttl) || 300)),
    ...(record.record_type === "MX"
      ? { priority: record.priority ?? 10 }
      : {}),
  }
  zone.records.push(created)
  log_activity(workspace, "network", "dns.record_added", `${name} ${zone.domain_name}`)
  return { success: true, record: { ...created } }
}

export async function update_dns_record(
  zone_id: string,
  record_id: string,
  patch: {
    record_type?: DnsRecordType
    name?: string
    value?: string
    ttl?: number
    priority?: number
  },
): Promise<{ success: boolean; record: DnsRecord | null }> {
  await new Promise((resolve) => setTimeout(resolve, 450))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const zone = workspace.dns_zones.find((item) => item.zone_id === zone_id)
  const record = zone?.records.find((item) => item.record_id === record_id)
  if (!zone || !record) {
    return { success: false, record: null }
  }

  if (patch.record_type) record.record_type = patch.record_type
  if (patch.name !== undefined) record.name = patch.name.trim() || "@"
  if (patch.value !== undefined) record.value = patch.value.trim()
  if (patch.ttl !== undefined) {
    record.ttl = Math.max(60, Math.min(86400, Math.round(patch.ttl)))
  }
  if (record.record_type === "MX") {
    record.priority = patch.priority ?? record.priority ?? 10
  } else {
    delete record.priority
  }

  log_activity(workspace, "network", "dns.record_updated", record.name)
  return { success: true, record: { ...record } }
}

export async function delete_dns_record(
  zone_id: string,
  record_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 350))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const zone = workspace.dns_zones.find((item) => item.zone_id === zone_id)
  if (!zone) {
    return { success: false }
  }
  const index = zone.records.findIndex((item) => item.record_id === record_id)
  if (index < 0) {
    return { success: false }
  }
  zone.records.splice(index, 1)
  log_activity(workspace, "network", "dns.record_deleted", zone.domain_name)
  return { success: true }
}

export async function get_payment_methods(): Promise<PaymentMethod[]> {
  await new Promise((resolve) => setTimeout(resolve, 80))
  const user = await require_current_user()
  return get_workspace(user.user_id).payment_methods.map((method) => ({
    ...method,
  }))
}

export async function add_payment_method(): Promise<{
  success: boolean
  method: PaymentMethod | null
}> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const brands = ["Visa", "Mastercard", "Amex"] as const
  const method: PaymentMethod = {
    method_id: `pm_${Date.now()}`,
    brand: brands[workspace.payment_methods.length % brands.length],
    last_four: String(1000 + Math.floor(Math.random() * 9000)),
    exp_month: 1 + Math.floor(Math.random() * 12),
    exp_year: 2027 + Math.floor(Math.random() * 4),
    is_default: workspace.payment_methods.length === 0,
  }
  workspace.payment_methods.push(method)
  log_activity(workspace, "billing", "payment_method.added", method.last_four)
  return { success: true, method: { ...method } }
}

export async function set_default_payment_method(
  method_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 350))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const target = workspace.payment_methods.find(
    (item) => item.method_id === method_id,
  )
  if (!target) {
    return { success: false }
  }
  for (const method of workspace.payment_methods) {
    method.is_default = method.method_id === method_id
  }
  log_activity(workspace, "billing", "payment_method.default_set", target.last_four)
  return { success: true }
}

export async function delete_payment_method(
  method_id: string,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 350))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  const index = workspace.payment_methods.findIndex(
    (item) => item.method_id === method_id,
  )
  if (index < 0) {
    return { success: false }
  }
  const [removed] = workspace.payment_methods.splice(index, 1)
  if (removed.is_default && workspace.payment_methods[0]) {
    workspace.payment_methods[0].is_default = true
  }
  log_activity(workspace, "billing", "payment_method.deleted", removed.last_four)
  return { success: true }
}

export async function get_notification_preferences(): Promise<NotificationPreferences> {
  await new Promise((resolve) => setTimeout(resolve, 60))
  const user = await require_current_user()
  return { ...get_workspace(user.user_id).notification_preferences }
}

export async function update_notification_preferences(
  prefs: NotificationPreferences,
): Promise<{ success: boolean; preferences: NotificationPreferences }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  const user = await require_current_user()
  const workspace = get_workspace(user.user_id)
  workspace.notification_preferences = { ...prefs }
  log_activity(workspace, "security", "notifications.updated", user.email_address)
  return {
    success: true,
    preferences: { ...workspace.notification_preferences },
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Backoffice (admin panel): platform-wide mock data + role gating.
   ═══════════════════════════════════════════════════════════════════ */

async function require_admin(): Promise<AuthUser> {
  const user = await require_current_user()
  if (user.role !== "admin") {
    throw new Error("Forbidden: admin access required.")
  }
  return user
}

interface AdminState {
  users: AdminUser[]
  orders: AdminOrder[]
  nodes: AdminNode[]
  tickets: AdminTicket[]
}

let admin_state: AdminState | null = null

function seed_admin_state(): AdminState {
  if (admin_state) {
    return admin_state
  }

  const now = Date.now()
  const day = 1000 * 60 * 60 * 24

  const users: AdminUser[] = [
    {
      user_id: "usr_demo_001",
      full_name: "Demo User",
      email_address: "demo@hosting.io",
      role: "user",
      account_status: "active",
      instance_count: 3,
      monthly_spend: 167,
      created_at: new Date(now - day * 120).toISOString(),
    },
    {
      user_id: "usr_nova_002",
      full_name: "Nova Kian",
      email_address: "nova@orbit.dev",
      role: "user",
      account_status: "active",
      instance_count: 5,
      monthly_spend: 412,
      created_at: new Date(now - day * 88).toISOString(),
    },
    {
      user_id: "usr_atlas_003",
      full_name: "Atlas Reza",
      email_address: "atlas@shipfast.io",
      role: "user",
      account_status: "suspended",
      instance_count: 1,
      monthly_spend: 21,
      created_at: new Date(now - day * 54).toISOString(),
    },
    {
      user_id: "usr_lumen_004",
      full_name: "Lumen Sato",
      email_address: "lumen@pixel.jp",
      role: "user",
      account_status: "active",
      instance_count: 2,
      monthly_spend: 96,
      created_at: new Date(now - day * 33).toISOString(),
    },
    {
      user_id: "usr_admin_001",
      full_name: "Platform Admin",
      email_address: "admin@hosting.io",
      role: "admin",
      account_status: "active",
      instance_count: 0,
      monthly_spend: 0,
      created_at: new Date(now - day * 200).toISOString(),
    },
  ]

  const orders: AdminOrder[] = [
    {
      order_id: "ord_9241",
      user_name: "Nova Kian",
      user_email: "nova@orbit.dev",
      plan_summary: "Custom · Frankfurt",
      cpu_cores: 8,
      ram_gb: 32,
      storage_gb: 512,
      region_label: "Frankfurt",
      monthly_price: 132,
      status: "pending",
      created_at: new Date(now - 1000 * 60 * 90).toISOString(),
    },
    {
      order_id: "ord_9238",
      user_name: "Lumen Sato",
      user_email: "lumen@pixel.jp",
      plan_summary: "Custom · Singapore",
      cpu_cores: 4,
      ram_gb: 16,
      storage_gb: 200,
      region_label: "Singapore",
      monthly_price: 68,
      status: "pending",
      created_at: new Date(now - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      order_id: "ord_9231",
      user_name: "Demo User",
      user_email: "demo@hosting.io",
      plan_summary: "Growth · Frankfurt",
      cpu_cores: 4,
      ram_gb: 8,
      storage_gb: 160,
      region_label: "Frankfurt",
      monthly_price: 36,
      status: "approved",
      created_at: new Date(now - day * 2).toISOString(),
    },
    {
      order_id: "ord_9225",
      user_name: "Atlas Reza",
      user_email: "atlas@shipfast.io",
      plan_summary: "Start · New York",
      cpu_cores: 2,
      ram_gb: 4,
      storage_gb: 80,
      region_label: "New York",
      monthly_price: 21,
      status: "rejected",
      created_at: new Date(now - day * 4).toISOString(),
    },
  ]

  const nodes: AdminNode[] = [
    {
      node_id: "node_fra_01",
      name: "fra-hyperion-01",
      region_label: "Frankfurt",
      status: "online",
      cpu_load: 62,
      ram_load: 71,
      instance_count: 148,
      capacity: 200,
      uptime_days: 412,
    },
    {
      node_id: "node_sin_01",
      name: "sin-tethys-01",
      region_label: "Singapore",
      status: "online",
      cpu_load: 48,
      ram_load: 55,
      instance_count: 96,
      capacity: 200,
      uptime_days: 289,
    },
    {
      node_id: "node_nyc_01",
      name: "nyc-rhea-01",
      region_label: "New York",
      status: "degraded",
      cpu_load: 88,
      ram_load: 91,
      instance_count: 182,
      capacity: 200,
      uptime_days: 134,
    },
    {
      node_id: "node_thr_01",
      name: "thr-mimas-01",
      region_label: "Tehran",
      status: "offline",
      cpu_load: 0,
      ram_load: 0,
      instance_count: 0,
      capacity: 160,
      uptime_days: 0,
    },
  ]

  const tickets: AdminTicket[] = [
    {
      ticket_id: "atkt_5001",
      subject: "Upgrade path from Growth to Scale",
      status: "open",
      priority: "normal",
      user_name: "Nova Kian",
      user_email: "nova@orbit.dev",
      created_at: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
      updated_at: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
      messages: [
        {
          message_id: "m1",
          author_role: "user",
          author_name: "Nova Kian",
          body: "We're outgrowing the Growth plan. Can we live-migrate to Scale without downtime?",
          created_at: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
        },
      ],
    },
    {
      ticket_id: "atkt_4998",
      subject: "Invoice discrepancy on HST-2026-0388",
      status: "pending",
      priority: "high",
      user_name: "Lumen Sato",
      user_email: "lumen@pixel.jp",
      created_at: new Date(now - day * 1).toISOString(),
      updated_at: new Date(now - 1000 * 60 * 60 * 6).toISOString(),
      messages: [
        {
          message_id: "m1",
          author_role: "user",
          author_name: "Lumen Sato",
          body: "I was charged twice for the same renewal this month.",
          created_at: new Date(now - day * 1).toISOString(),
        },
        {
          message_id: "m2",
          author_role: "support",
          author_name: "Hosting Support",
          body: "Thanks for flagging — we're reviewing the transaction log and will refund any duplicate within 48h.",
          created_at: new Date(now - 1000 * 60 * 60 * 6).toISOString(),
        },
      ],
    },
    {
      ticket_id: "atkt_4990",
      subject: "Region availability in Tehran",
      status: "closed",
      priority: "low",
      user_name: "Atlas Reza",
      user_email: "atlas@shipfast.io",
      created_at: new Date(now - day * 6).toISOString(),
      updated_at: new Date(now - day * 5).toISOString(),
      messages: [
        {
          message_id: "m1",
          author_role: "user",
          author_name: "Atlas Reza",
          body: "When will the Tehran node be back online?",
          created_at: new Date(now - day * 6).toISOString(),
        },
        {
          message_id: "m2",
          author_role: "support",
          author_name: "Hosting Support",
          body: "Maintenance is scheduled to complete next week. We'll notify all affected customers.",
          created_at: new Date(now - day * 5).toISOString(),
        },
      ],
    },
  ]

  admin_state = { users, orders, nodes, tickets }
  sync_demo_tickets_to_admin()
  return admin_state
}

export async function get_admin_metrics(): Promise<AdminMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 130))
  await require_admin()
  const state = seed_admin_state()

  const revenue_series = [
    38200, 41100, 39800, 44500, 47200, 46100, 51800, 55300, 54100, 59900,
    63400, 68200,
  ]
  const revenue_labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const current = revenue_series[revenue_series.length - 1]
  const previous = revenue_series[revenue_series.length - 2]
  const revenue_change_pct = Math.round(((current - previous) / previous) * 1000) / 10

  return {
    monthly_revenue: current,
    revenue_change_pct,
    active_nodes: state.nodes.filter((node) => node.status === "online").length,
    total_nodes: state.nodes.length,
    pending_orders: state.orders.filter((order) => order.status === "pending")
      .length,
    total_users: state.users.filter((user) => user.role === "user").length,
    active_instances: state.nodes.reduce(
      (sum, node) => sum + node.instance_count,
      0,
    ),
    open_tickets: state.tickets.filter((ticket) => ticket.status !== "closed")
      .length,
    revenue_series,
    revenue_labels,
  }
}

export async function get_admin_users(): Promise<AdminUser[]> {
  await new Promise((resolve) => setTimeout(resolve, 110))
  await require_admin()
  return [...seed_admin_state().users]
}

export async function update_user_status(
  user_id: string,
  status: AdminAccountStatus,
): Promise<{ success: boolean; user: AdminUser | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  await require_admin()
  const state = seed_admin_state()
  const user = state.users.find((item) => item.user_id === user_id)

  if (!user || user.role === "admin") {
    return { success: false, user: null }
  }

  user.account_status = status

  const record = [...mock_user_registry.entries()].find(
    ([, item]) => item.user.user_id === user_id,
  )
  if (record) {
    record[1].user.account_status = status
  }

  return { success: true, user }
}

export async function get_admin_orders(): Promise<AdminOrder[]> {
  await new Promise((resolve) => setTimeout(resolve, 110))
  await require_admin()
  return [...seed_admin_state().orders].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

export async function update_order_status(
  order_id: string,
  status: Exclude<OrderStatus, "pending">,
): Promise<{ success: boolean; order: AdminOrder | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  await require_admin()
  const state = seed_admin_state()
  const order = state.orders.find((item) => item.order_id === order_id)

  if (!order) {
    return { success: false, order: null }
  }

  order.status = status

  if (status === "approved") {
    provision_instance_from_order(order)
  } else {
    const user =
      (order.user_id ? find_user_by_id(order.user_id) : null) ??
      find_user_by_email(order.user_email)
    if (user) {
      const workspace = get_workspace(user.user_id)
      const user_order = workspace.orders.find(
        (item) => item.order_id === order.order_id,
      )
      if (user_order) {
        user_order.status = status
      }
    }
  }

  return { success: true, order }
}

export async function get_admin_nodes(): Promise<AdminNode[]> {
  await new Promise((resolve) => setTimeout(resolve, 110))
  await require_admin()
  return [...seed_admin_state().nodes]
}

export async function get_admin_tickets(): Promise<AdminTicket[]> {
  await new Promise((resolve) => setTimeout(resolve, 110))
  await require_admin()
  return [...seed_admin_state().tickets].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  )
}

export async function get_admin_ticket(
  ticket_id: string,
): Promise<AdminTicket | null> {
  await new Promise((resolve) => setTimeout(resolve, 90))
  await require_admin()
  return (
    seed_admin_state().tickets.find((item) => item.ticket_id === ticket_id) ??
    null
  )
}

export async function reply_admin_ticket(
  ticket_id: string,
  body: string,
): Promise<{ success: boolean; ticket: AdminTicket | null }> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  await require_admin()
  const state = seed_admin_state()
  const ticket = state.tickets.find((item) => item.ticket_id === ticket_id)
  const trimmed = body.trim()

  if (!ticket || !trimmed) {
    return { success: false, ticket: ticket ?? null }
  }

  const iso = new Date().toISOString()
  ticket.messages.push({
    message_id: `m_${Date.now()}`,
    author_role: "support",
    author_name: "Hosting Support",
    body: trimmed,
    created_at: iso,
  })
  ticket.status = "pending"
  ticket.updated_at = iso
  sync_admin_reply_to_user(ticket)

  return { success: true, ticket }
}

const adminPageCopyByLocale: Record<string, AdminPageCopy> = {
  fa: {
    portal_label: "بک‌آفیس",
    sign_out: "خروج",
    nav: {
      dashboard: "داشبورد",
      users: "کاربران",
      orders: "سفارش‌ها",
      nodes: "نودها",
      tickets: "تیکت‌ها",
    },
    dashboard: {
      title: "نمای کلی پلتفرم",
      subtitle: "درآمد، نودها و سفارش‌های در انتظار در یک نگاه.",
      monthly_revenue: "درآمد ماهانه",
      active_nodes: "نودهای فعال",
      pending_orders: "سفارش‌های در انتظار",
      total_users: "کل کاربران",
      active_instances: "سرورهای فعال",
      open_tickets: "تیکت‌های باز",
      revenue_title: "روند درآمد",
      revenue_avg: "میانگین",
      vs_last_month: "نسبت به ماه قبل",
      nodes_title: "وضعیت نودها",
      orders_title: "سفارش‌های اخیر",
      view_all: "مشاهده همه",
    },
    users: {
      title: "مدیریت کاربران",
      subtitle: "حساب‌ها را مشاهده، تعلیق یا خاتمه دهید.",
      user: "کاربر",
      role: "نقش",
      status: "وضعیت",
      instances: "سرورها",
      spend: "هزینه ماهانه",
      joined: "عضویت",
      actions: "عملیات",
      suspend: "تعلیق",
      activate: "فعال‌سازی",
      terminate: "خاتمه",
      role_labels: { user: "کاربر", admin: "مدیر" },
      status_labels: {
        active: "فعال",
        suspended: "معلق",
        terminated: "خاتمه‌یافته",
      },
      confirm: "مطمئن هستید؟",
    },
    orders: {
      title: "مدیریت سفارش‌ها",
      subtitle: "پیکربندی‌های در انتظار را تأیید یا رد کنید.",
      order: "سفارش",
      customer: "مشتری",
      config: "پیکربندی",
      monthly: "ماهانه",
      status: "وضعیت",
      approve: "تأیید",
      reject: "رد",
      status_labels: {
        pending: "در انتظار",
        approved: "تأییدشده",
        rejected: "ردشده",
      },
      empty: "سفارشی وجود ندارد.",
    },
    nodes: {
      title: "پایش نودها",
      subtitle: "وضعیت سرورهای فیزیکی اصلی.",
      cpu_load: "بار CPU",
      ram_load: "بار RAM",
      instances: "سرورها",
      uptime: "آپتایم",
      days: "روز",
      status_labels: {
        online: "آنلاین",
        degraded: "کاهش‌یافته",
        offline: "آفلاین",
      },
    },
    tickets: {
      title: "مدیریت تیکت‌ها",
      subtitle: "به درخواست‌های پشتیبانی کاربران پاسخ دهید.",
      open_by: "ثبت‌شده توسط",
      reply_placeholder: "پاسخ خود را بنویسید...",
      send_reply: "ارسال پاسخ",
      sending: "در حال ارسال...",
      back: "بازگشت به تیکت‌ها",
      reply_success: "پاسخ ارسال شد",
      status_labels: { open: "باز", pending: "در انتظار", closed: "بسته" },
      priority_labels: { low: "کم", normal: "معمولی", high: "زیاد" },
      you_support: "پشتیبانی هاستینگ",
      customer: "مشتری",
      empty: "تیکتی وجود ندارد.",
    },
  },
  en: {
    portal_label: "Backoffice",
    sign_out: "Sign out",
    nav: {
      dashboard: "Dashboard",
      users: "Users",
      orders: "Orders",
      nodes: "Nodes",
      tickets: "Tickets",
    },
    dashboard: {
      title: "Platform overview",
      subtitle: "Revenue, nodes, and pending orders at a glance.",
      monthly_revenue: "Monthly revenue",
      active_nodes: "Active nodes",
      pending_orders: "Pending orders",
      total_users: "Total users",
      active_instances: "Active instances",
      open_tickets: "Open tickets",
      revenue_title: "Revenue trend",
      revenue_avg: "avg",
      vs_last_month: "vs last month",
      nodes_title: "Node status",
      orders_title: "Recent orders",
      view_all: "View all",
    },
    users: {
      title: "User management",
      subtitle: "View, suspend, or terminate client accounts.",
      user: "User",
      role: "Role",
      status: "Status",
      instances: "Instances",
      spend: "Monthly spend",
      joined: "Joined",
      actions: "Actions",
      suspend: "Suspend",
      activate: "Activate",
      terminate: "Terminate",
      role_labels: { user: "User", admin: "Admin" },
      status_labels: {
        active: "Active",
        suspended: "Suspended",
        terminated: "Terminated",
      },
      confirm: "Are you sure?",
    },
    orders: {
      title: "Order management",
      subtitle: "Approve or reject pending VPS configurations.",
      order: "Order",
      customer: "Customer",
      config: "Configuration",
      monthly: "Monthly",
      status: "Status",
      approve: "Approve",
      reject: "Reject",
      status_labels: {
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
      },
      empty: "No orders to show.",
    },
    nodes: {
      title: "Node monitoring",
      subtitle: "Live status of core physical servers.",
      cpu_load: "CPU load",
      ram_load: "RAM load",
      instances: "Instances",
      uptime: "Uptime",
      days: "days",
      status_labels: {
        online: "Online",
        degraded: "Degraded",
        offline: "Offline",
      },
    },
    tickets: {
      title: "Ticket management",
      subtitle: "Answer customer support requests.",
      open_by: "Opened by",
      reply_placeholder: "Write your reply...",
      send_reply: "Send reply",
      sending: "Sending...",
      back: "Back to tickets",
      reply_success: "Reply sent",
      status_labels: { open: "Open", pending: "Pending", closed: "Closed" },
      priority_labels: { low: "Low", normal: "Normal", high: "High" },
      you_support: "Hosting Support",
      customer: "Customer",
      empty: "No tickets to show.",
    },
  },
}

export async function get_admin_page_copy(
  locale: string,
): Promise<AdminPageCopy> {
  await new Promise((resolve) => setTimeout(resolve, 30))
  return adminPageCopyByLocale[locale] ?? adminPageCopyByLocale.fa
}
