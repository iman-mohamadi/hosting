import { notFound } from "next/navigation"

import {
  get_block_volumes,
  get_dashboard_page_copy,
  get_floating_ips,
  get_instances,
} from "@/actions"
import { PortalPageHeader } from "@/components/dashboard/dashboard-ui"
import { NetworkingPanel } from "@/components/dashboard/networking-panel"
import { isValidLocale, type Locale } from "@/i18n/config"

interface NetworkingPageProps {
  params: Promise<{ locale: string }>
}

export default async function NetworkingPage({ params }: NetworkingPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [floating_ips, block_volumes, instances, copy] = await Promise.all([
    get_floating_ips(),
    get_block_volumes(),
    get_instances(locale),
    get_dashboard_page_copy(locale),
  ])

  return (
    <div>
      <PortalPageHeader
        title={copy.networking.title}
        subtitle={copy.networking.subtitle}
        isRTL={isRTL}
      />
      <NetworkingPanel
        floating_ips={floating_ips}
        block_volumes={block_volumes}
        instances={instances}
        copy={copy.networking}
        locale={locale}
      />
    </div>
  )
}
