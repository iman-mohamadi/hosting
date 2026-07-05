"use server"

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

const heroDataByLocale: Record<string, HeroData> = {
  fa: {
    main_title: "زیرساخت ابری\nبدون مرز",
    sub_description:
      "سرورهای مجازی پرسرعت با زیرساخت جهانی. امن، مقیاس‌پذیر و آماده برای هر پروژه‌ای که تصور می‌کنید.",
    call_to_action: "شروع کنید",
    call_to_action_href: "#plans",
    badge_text: "نسخه جدید ۲۰۲۶",
  },
  en: {
    main_title: "Cloud\nInfrastructure",
    sub_description:
      "High-performance virtual servers on global infrastructure. Secure, scalable, and ready for whatever you build next.",
    call_to_action: "Get Started",
    call_to_action_href: "#plans",
    badge_text: "New Release 2026",
  },
}

const pricingPageCopyByLocale: Record<string, PricingPageCopy> = {
  fa: {
    page_title: "پلن‌های\nمیزبانی",
    page_subtitle:
      "سرورهای مجازی با منابع اختصاصی، شبکه پرسرعت و پشتیبانی ۲۴/۷. بدون قرارداد بلندمدت.",
    plans_section_title: "انتخاب پلن",
    comparison_section_title: "مقایسه جزئیات",
    comparison_section_subtitle:
      "تمام مشخصات فنی را در یک نگاه بررسی کنید.",
    recommended_badge: "پیشنهاد ویژه",
    per_month: "ماهانه",
  },
  en: {
    page_title: "Hosting\nPlans",
    page_subtitle:
      "Virtual servers with dedicated resources, high-speed networking, and 24/7 support. No long-term contracts.",
    plans_section_title: "Choose a plan",
    comparison_section_title: "Compare in detail",
    comparison_section_subtitle:
      "Review every technical specification at a glance.",
    recommended_badge: "Recommended",
    per_month: "per month",
  },
}

const pricingPlansByLocale: Record<string, PricingPlan[]> = {
  fa: [
    {
      plan_id: "starter",
      plan_name: "استارتر",
      plan_description: "برای پروژه‌های کوچک و محیط توسعه.",
      monthly_price: 9,
      price_display: "$۹",
      billing_period: "ماهانه",
      cpu_cores: 1,
      ram_gb: 2,
      storage_nvme: 40,
      bandwidth_tb: 2,
      is_recommended: false,
      features_list: [
        "۱ هسته CPU اختصاصی",
        "۲ گیگابایت RAM",
        "۴۰ گیگابایت NVMe",
        "پشتیبان‌گیری هفتگی",
        "پشتیبانی ایمیل",
      ],
      cta_label: "شروع کنید",
    },
    {
      plan_id: "pro",
      plan_name: "حرفه‌ای",
      plan_description: "تعادل ایده‌آل برای استارتاپ‌ها و اپلیکیشن‌های پرترافیک.",
      monthly_price: 29,
      price_display: "$۲۹",
      billing_period: "ماهانه",
      cpu_cores: 4,
      ram_gb: 8,
      storage_nvme: 160,
      bandwidth_tb: 5,
      is_recommended: true,
      features_list: [
        "۴ هسته CPU اختصاصی",
        "۸ گیگابایت RAM",
        "۱۶۰ گیگابایت NVMe",
        "پشتیبان‌گیری روزانه",
        "DDoS Protection",
        "پشتیبانی اولویت‌دار",
      ],
      cta_label: "انتخاب پلن",
    },
    {
      plan_id: "enterprise",
      plan_name: "سازمانی",
      plan_description: "حداکثر عملکرد برای بارهای کاری بحرانی.",
      monthly_price: 79,
      price_display: "$۷۹",
      billing_period: "ماهانه",
      cpu_cores: 8,
      ram_gb: 32,
      storage_nvme: 512,
      bandwidth_tb: 10,
      is_recommended: false,
      features_list: [
        "۸ هسته CPU اختصاصی",
        "۳۲ گیگابایت RAM",
        "۵۱۲ گیگابایت NVMe",
        "Snapshot لحظه‌ای",
        "IPv4 اختصاصی",
        "مدیر حساب اختصاصی",
      ],
      cta_label: "تماس با فروش",
    },
  ],
  en: [
    {
      plan_id: "starter",
      plan_name: "Starter",
      plan_description: "For small projects and development environments.",
      monthly_price: 9,
      price_display: "$9",
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
        "Weekly backups",
        "Email support",
      ],
      cta_label: "Get started",
    },
    {
      plan_id: "pro",
      plan_name: "Pro",
      plan_description: "The sweet spot for startups and high-traffic apps.",
      monthly_price: 29,
      price_display: "$29",
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
        "Daily backups",
        "DDoS protection",
        "Priority support",
      ],
      cta_label: "Choose plan",
    },
    {
      plan_id: "enterprise",
      plan_name: "Enterprise",
      plan_description: "Maximum performance for mission-critical workloads.",
      monthly_price: 79,
      price_display: "$79",
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
        "Instant snapshots",
        "Dedicated IPv4",
        "Account manager",
      ],
      cta_label: "Contact sales",
    },
  ],
}

const comparisonFeaturesByLocale: Record<string, ComparisonFeature[]> = {
  fa: [
    {
      feature_id: "cpu_cores",
      feature_label: "هسته CPU",
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
      feature_label: "ذخیره‌سازی NVMe",
      starter_value: "۴۰ GB",
      pro_value: "۱۶۰ GB",
      enterprise_value: "۵۱۲ GB",
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
    page_title: "درباره\nما",
    mission_statement: "ما زیرساخت را ساده می‌کنیم تا شما بتوانید روی ساخت تمرکز کنید.",
    mission_subtitle:
      "هاستینگ با یک باور ساده شروع شد: دسترسی به زیرساخت ابری در سطح جهانی نباید پیچیده، گران یا غیرشفاف باشد.",
    intro_label: "فلسفه ما",
    pillars: [
      {
        pillar_id: "clarity",
        pillar_title: "شفافیت در هر لایه",
        pillar_body:
          "بدون هزینه‌های پنهان، بدون قراردادهای مبهم. هر منبع، هر پلن و هر فاکتور با جزئیات کامل در دسترس شماست. ما معتقدیم اعتماد، پیش‌نیاز هر زیرساخت پایدار است.",
      },
      {
        pillar_id: "performance",
        pillar_title: "عملکرد بدون مصالحه",
        pillar_body:
          "سرورهای NVMe، شبکه پرسرعت و دیتاسنترهای منتخب در نقاط استراتژیک جهان. هر میلی‌ثانیه تأخیر برای ما اهمیت دارد — چون برای شما هم اهمیت دارد.",
      },
      {
        pillar_id: "support",
        pillar_title: "پشتیبانی انسانی، ۲۴/۷",
        pillar_body:
          "پشت هر تیکت، یک مهندس واقعی پاسخگوست — نه یک ربات. تیم ما به فارسی و انگلیسی در کنار شماست، از اولین استقرار تا مقیاس‌پذیری کامل.",
      },
    ],
  },
  en: {
    page_title: "About\nUs",
    mission_statement: "We simplify infrastructure so you can focus on building.",
    mission_subtitle:
      "Hosting started with a simple belief: access to world-class cloud infrastructure should never be complex, expensive, or opaque.",
    intro_label: "Our philosophy",
    pillars: [
      {
        pillar_id: "clarity",
        pillar_title: "Clarity at every layer",
        pillar_body:
          "No hidden fees, no ambiguous contracts. Every resource, every plan, and every invoice is fully transparent. We believe trust is the foundation of reliable infrastructure.",
      },
      {
        pillar_id: "performance",
        pillar_title: "Performance without compromise",
        pillar_body:
          "NVMe servers, high-speed networking, and hand-picked datacenters at strategic global locations. Every millisecond of latency matters to us — because it matters to you.",
      },
      {
        pillar_id: "support",
        pillar_title: "Human support, 24/7",
        pillar_body:
          "Behind every ticket is a real engineer — not a bot. Our team stands beside you in Persian and English, from first deployment to full-scale growth.",
      },
    ],
  },
}

const legalContentByLocale: Record<string, LegalContent> = {
  fa: {
    page_title: "شرایط استفاده",
    page_subtitle: "لطفاً پیش از استفاده از خدمات هاستینگ، این شرایط را با دقت مطالعه کنید.",
    last_updated: "آخرین به‌روزرسانی: ۱ فروردین ۱۴۰۵",
    toc_label: "فهرست",
    sections: [
      {
        section_id: "acceptance",
        section_title: "۱. پذیرش شرایط",
        section_body:
          "با دسترسی یا استفاده از خدمات هاستینگ، شما موافقت می‌کنید که به این شرایط استفاده و تمامی قوانین و مقررات قابل اجرا پایبند باشید. در صورت عدم موافقت با هر بخش از این شرایط، استفاده از خدمات مجاز نیست.",
      },
      {
        section_id: "services",
        section_title: "۲. خدمات ارائه‌شده",
        section_body:
          "هاستینگ خدمات میزبانی مجازی سرور (VPS)، ذخیره‌سازی ابری و خدمات مرتبط را ارائه می‌دهد. ما حق داریم ویژگی‌ها، قیمت‌ها و مشخصات فنی را با اطلاع‌رسانی قبلی تغییر دهیم. تمامی تغییرات مهم از طریق ایمیل یا پنل کاربری اعلام خواهد شد.",
      },
      {
        section_id: "account",
        section_title: "۳. حساب کاربری و امنیت",
        section_body:
          "شما مسئول حفظ محرمانگی اطلاعات ورود به حساب خود هستید. هرگونه فعالیت انجام‌شده تحت حساب شما، مسئولیت شماست. در صورت مشاهده دسترسی غیرمجاز، فوراً به تیم پشتیبانی اطلاع دهید.",
      },
      {
        section_id: "payment",
        section_title: "۴. پرداخت و صورتحساب",
        section_body:
          "خدمات به صورت پیش‌پرداخت ماهانه یا سالانه ارائه می‌شوند. عدم پرداخت به موقع ممکن است منجر به تعلیق یا قطع سرویس شود. بازپرداخت‌ها طبق سیاست بازپرداخت منتشرشده در وب‌سایت انجام می‌شود.",
      },
      {
        section_id: "acceptable-use",
        section_title: "۵. استفاده مجاز",
        section_body:
          "استفاده از خدمات برای فعالیت‌های غیرقانونی، ارسال اسپم، حملات DDoS، استخراج رمزارز بدون مجوز یا هرگونه فعالیتی که به زیرساخت آسیب برساند، ممنوع است. نقض این بند می‌تواند منجر به قطع فوری سرویس بدون بازپرداخت شود.",
      },
      {
        section_id: "sla",
        section_title: "۶. توافق‌نامه سطح خدمات",
        section_body:
          "ما متعهد به دسترس‌پذیری ۹۹.۹٪ برای زیرساخت شبکه و سرورهای خود هستیم. جزئیات جبران خسارت در SLA اختصاصی هر پلن ذکر شده است. تعمیرات برنامه‌ریزی‌شده از قبل اطلاع‌رسانی می‌شوند.",
      },
      {
        section_id: "liability",
        section_title: "۷. محدودیت مسئولیت",
        section_body:
          "هاستینگ در قبال خسارات غیرمستقیم، از دست رفتن داده یا سود از دست‌رفته مسئولیتی ندارد. حداکثر مسئولیت ما معادل مبلغ پرداخت‌شده توسط شما در ۱۲ ماه گذشته است.",
      },
      {
        section_id: "termination",
        section_title: "۸. فسخ و تعلیق",
        section_body:
          "هر یک از طرفین می‌تواند این توافق را با اطلاع قبلی فسخ کند. ما حق تعلیق یا قطع فوری سرویس در صورت نقض شرایط را محفوظ می‌داریم. پس از فسخ، داده‌های شما طبق سیاست نگهداری داده حذف خواهند شد.",
      },
    ],
  },
  en: {
    page_title: "Terms of Service",
    page_subtitle: "Please read these terms carefully before using Hosting services.",
    last_updated: "Last updated: March 21, 2026",
    toc_label: "Contents",
    sections: [
      {
        section_id: "acceptance",
        section_title: "1. Acceptance of Terms",
        section_body:
          "By accessing or using Hosting services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
      },
      {
        section_id: "services",
        section_title: "2. Services Provided",
        section_body:
          "Hosting provides virtual private server (VPS) hosting, cloud storage, and related services. We reserve the right to modify features, pricing, and technical specifications with prior notice. All material changes will be communicated via email or the client dashboard.",
      },
      {
        section_id: "account",
        section_title: "3. Account & Security",
        section_body:
          "You are responsible for maintaining the confidentiality of your account credentials. All activity under your account is your responsibility. If you detect unauthorized access, notify our support team immediately.",
      },
      {
        section_id: "payment",
        section_title: "4. Payment & Billing",
        section_body:
          "Services are provided on a prepaid monthly or annual basis. Failure to pay on time may result in suspension or termination of service. Refunds are processed according to the refund policy published on our website.",
      },
      {
        section_id: "acceptable-use",
        section_title: "5. Acceptable Use",
        section_body:
          "Use of our services for illegal activities, spam distribution, DDoS attacks, unauthorized cryptocurrency mining, or any activity that harms infrastructure is prohibited. Violation may result in immediate termination without refund.",
      },
      {
        section_id: "sla",
        section_title: "6. Service Level Agreement",
        section_body:
          "We commit to 99.9% uptime for our network and server infrastructure. Compensation details are outlined in the dedicated SLA for each plan. Scheduled maintenance will be announced in advance.",
      },
      {
        section_id: "liability",
        section_title: "7. Limitation of Liability",
        section_body:
          "Hosting is not liable for indirect damages, data loss, or lost profits. Our maximum liability is limited to the amount paid by you in the preceding 12 months.",
      },
      {
        section_id: "termination",
        section_title: "8. Termination & Suspension",
        section_body:
          "Either party may terminate this agreement with prior notice. We reserve the right to immediately suspend or terminate service for terms violations. Upon termination, your data will be deleted according to our data retention policy.",
      },
    ],
  },
}

const contactPageCopyByLocale: Record<string, ContactPageCopy> = {
  fa: {
    page_title: "تماس\nبا ما",
    page_subtitle:
      "سؤالی دارید؟ تیم ما آماده پاسخگویی است. پیام خود را بفرستید — معمولاً ظرف ۲۴ ساعت پاسخ می‌دهیم.",
    form_title: "ارسال پیام",
    sender_name_label: "نام",
    sender_name_placeholder: "نام و نام خانوادگی",
    sender_email_label: "ایمیل",
    sender_email_placeholder: "you@example.com",
    form_subject_label: "موضوع",
    form_subject_placeholder: "موضوع پیام شما",
    message_body_label: "پیام",
    message_body_placeholder: "پیام خود را اینجا بنویسید...",
    submit_label: "ارسال پیام",
    submitting_label: "در حال ارسال...",
    success_title: "پیام شما دریافت شد",
    success_message:
      "از تماس شما سپاسگزاریم. تیم پشتیبانی به زودی با شما در ارتباط خواهد بود.",
    response_time_label: "زمان پاسخ",
    response_time_value: "کمتر از ۲۴ ساعت",
    support_email_label: "ایمیل پشتیبانی",
    support_email_value: "support@hosting.io",
  },
  en: {
    page_title: "Contact\nUs",
    page_subtitle:
      "Have a question? Our team is ready to help. Send us a message — we typically respond within 24 hours.",
    form_title: "Send a message",
    sender_name_label: "Name",
    sender_name_placeholder: "Your full name",
    sender_email_label: "Email",
    sender_email_placeholder: "you@example.com",
    form_subject_label: "Subject",
    form_subject_placeholder: "What is this regarding?",
    message_body_label: "Message",
    message_body_placeholder: "Write your message here...",
    submit_label: "Send message",
    submitting_label: "Sending...",
    success_title: "Message received",
    success_message:
      "Thank you for reaching out. Our support team will get back to you shortly.",
    response_time_label: "Response time",
    response_time_value: "Under 24 hours",
    support_email_label: "Support email",
    support_email_value: "support@hosting.io",
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
      message: "All fields are required.",
    }
  }

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email_pattern.test(sender_email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  return {
    success: true,
    message: "Contact form submitted successfully.",
  }
}
