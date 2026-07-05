import { get_auth_page_copy } from "@/actions"
import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface LoginPageProps {
  params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const copy = await get_auth_page_copy(locale)

  return (
    <AuthCard
      locale={locale}
      title={copy.login_title}
      subtitle={copy.login_subtitle}
    >
      <LoginForm copy={copy} locale={locale} />
    </AuthCard>
  )
}
