import { get_auth_page_copy } from "@/actions"
import { AuthCard } from "@/components/auth/auth-card"
import { RegisterForm } from "@/components/auth/register-form"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface RegisterPageProps {
  params: Promise<{ locale: string }>
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const copy = await get_auth_page_copy(locale)

  return (
    <AuthCard
      locale={locale}
      title={copy.register_title}
      subtitle={copy.register_subtitle}
    >
      <RegisterForm copy={copy} locale={locale} />
    </AuthCard>
  )
}
