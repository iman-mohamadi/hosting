import { get_auth_page_copy } from "@/actions"
import { AuthCard } from "@/components/auth/auth-card"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>
}

export default async function ForgotPasswordPage({
  params,
}: ForgotPasswordPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const copy = await get_auth_page_copy(locale)

  return (
    <AuthCard
      locale={locale}
      title={copy.forgot_password_title}
      subtitle={copy.forgot_password_subtitle}
    >
      <ForgotPasswordForm copy={copy} locale={locale} />
    </AuthCard>
  )
}
