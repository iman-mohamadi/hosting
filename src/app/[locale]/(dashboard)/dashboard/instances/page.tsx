import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { get_dashboard_page_copy, get_instances } from "@/actions"
import {
  EmptyState,
  PortalPageHeader,
  StatusBadge,
  instance_status_tone,
} from "@/components/dashboard/dashboard-ui"
import { isValidLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_money } from "@/lib/format"
import { cn } from "@/lib/utils"

interface InstancesPageProps {
  params: Promise<{ locale: string }>
}

export default async function InstancesPage({ params }: InstancesPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [instances, copy] = await Promise.all([
    get_instances(locale),
    get_dashboard_page_copy(locale),
  ])
  const c = copy.instances

  return (
    <div>
      <PortalPageHeader title={c.title} subtitle={c.subtitle} isRTL={isRTL} />

      {instances.length === 0 ? (
        <div className="space-y-4">
          <EmptyState label={copy.overview.empty_instances} isRTL={isRTL} />
          <div className="text-center">
            <Link
              href={isRTL ? "/#configurator" : "/en/#configurator"}
              className={cn(
                "inline-flex text-sm text-acid underline-offset-4 hover:underline",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.overview.empty_instances_cta}
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {instances.map((instance) => (
            <Link
              key={instance.instance_id}
              href={localizePathname(
                `/dashboard/instances/${instance.instance_id}`,
                locale,
              )}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-mono text-base text-foreground">
                    {instance.hostname}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {instance.ip_address}
                  </p>
                </div>
                <StatusBadge
                  label={c.status_labels[instance.status]}
                  tone={instance_status_tone(instance.status)}
                />
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">{c.specs}</dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {instance.cpu_cores} vCPU · {instance.ram_gb}GB
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">{c.region}</dt>
                  <dd
                    className={cn(
                      "mt-1 font-medium text-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {instance.region_label}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {instance.os_label}
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {instance.storage_gb}GB {instance.storage_type.toUpperCase()}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">{c.monthly}</dt>
                  <dd className="mt-1 font-medium text-foreground tabular-nums">
                    {format_money(instance.monthly_price, locale)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span
                  className={cn(
                    "text-xs text-muted-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {c.manage}
                </span>
                <ArrowRight
                  className={cn(
                    "size-4 text-acid transition-transform group-hover:translate-x-1",
                    isRTL && "rotate-180 group-hover:-translate-x-1",
                  )}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
