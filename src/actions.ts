"use server"

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
  },
}

export async function get_auth_page_copy(locale: string): Promise<AuthPageCopy> {
  await new Promise((resolve) => setTimeout(resolve, 40))

  return authPageCopyByLocale[locale] ?? authPageCopyByLocale.fa
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
    created_at: new Date().toISOString(),
  }

  mock_user_registry.set(email_address, {
    account_password,
    user,
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

export interface ConfiguratorPayload {
  cpu_cores: number
  ram_gb: number
  storage_type: StorageType
  storage_size_gb: number
  selected_os: SelectedOs
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
}

export async function validate_configuration(
  payload: ConfiguratorPayload,
): Promise<ConfiguratorValidationResult> {
  await new Promise((resolve) => setTimeout(resolve, 120))

  const { compute_vps_price, format_vps_price } = await import("@/lib/vps-pricing")

  try {
    assert_valid_configuration(payload)

    const result = compute_vps_price(payload)
    const price_matches =
      Math.abs(payload.monthly_price - result.monthly_price) < 0.02

    if (!price_matches) {
      return {
        valid: false,
        payload,
        monthly_price: result.monthly_price,
        price_display: format_vps_price(result.monthly_price, "en"),
        breakdown: {
          base_cost: result.base_cost,
          cpu_cost: result.cpu_cost,
          ram_cost: result.ram_cost,
          storage_cost: result.storage_cost,
          os_cost: result.os_cost,
        },
        error_message: "monthly_price does not match server calculation.",
      }
    }

    return {
      valid: true,
      payload: {
        ...payload,
        monthly_price: result.monthly_price,
      },
      monthly_price: result.monthly_price,
      price_display: format_vps_price(result.monthly_price, "en"),
      breakdown: {
        base_cost: result.base_cost,
        cpu_cost: result.cpu_cost,
        ram_cost: result.ram_cost,
        storage_cost: result.storage_cost,
        os_cost: result.os_cost,
      },
    }
  } catch (error) {
    return {
      valid: false,
      payload,
      monthly_price: 0,
      price_display: format_vps_price(0, "en"),
      breakdown: {
        base_cost: 0,
        cpu_cost: 0,
        ram_cost: 0,
        storage_cost: 0,
        os_cost: 0,
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

  const priced_payload: ConfiguratorPayload = {
    cpu_cores: payload.cpu_cores,
    ram_gb: payload.ram_gb,
    storage_type: payload.storage_type,
    storage_size_gb: payload.storage_size_gb,
    selected_os: payload.selected_os,
    monthly_price: payload.monthly_price ?? compute_vps_price(payload).monthly_price,
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
    },
  }
}
