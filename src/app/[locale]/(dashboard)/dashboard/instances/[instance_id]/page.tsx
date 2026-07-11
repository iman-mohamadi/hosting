import { notFound } from "next/navigation"

import {
  get_block_volumes,
  get_dashboard_page_copy,
  get_firewall_rules,
  get_floating_ips,
  get_instance,
  get_instance_backup_policy,
  get_instance_snapshots,
  get_instance_usage,
  get_resize_constraints,
} from "@/actions"
import { InstanceDetail } from "@/components/dashboard/instance-detail"
import { isValidLocale, type Locale } from "@/i18n/config"

interface InstanceDetailPageProps {
  params: Promise<{ locale: string; instance_id: string }>
}

export default async function InstanceDetailPage({
  params,
}: InstanceDetailPageProps) {
  const { locale: localeParam, instance_id } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const [
    instance,
    usage,
    copy,
    snapshots,
    firewall_rules,
    constraints,
    floating_ips,
    block_volumes,
    backup_policy,
  ] = await Promise.all([
    get_instance(instance_id, locale),
    get_instance_usage(instance_id),
    get_dashboard_page_copy(locale),
    get_instance_snapshots(instance_id),
    get_firewall_rules(instance_id),
    get_resize_constraints(),
    get_floating_ips(),
    get_block_volumes(),
    get_instance_backup_policy(instance_id),
  ])

  if (!instance) {
    notFound()
  }

  return (
    <InstanceDetail
      instance={instance}
      usage={usage}
      snapshots={snapshots}
      firewall_rules={firewall_rules}
      constraints={constraints}
      floating_ips={floating_ips}
      block_volumes={block_volumes}
      backup_policy={backup_policy}
      copy={copy}
      locale={locale}
    />
  )
}
