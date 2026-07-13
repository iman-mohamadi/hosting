"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Trash } from "@phosphor-icons/react"

import {
  add_dns_record,
  create_dns_zone,
  delete_dns_record,
  delete_dns_zone,
} from "@/actions"
import {
  EmptyState,
  Panel,
} from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"
import type {
  DashboardPageCopy,
  DnsRecordType,
  DnsZone,
} from "@/types/dashboard"

const RECORD_TYPES: DnsRecordType[] = ["A", "AAAA", "CNAME", "MX", "TXT"]

interface DnsPanelProps {
  zones: DnsZone[]
  copy: DashboardPageCopy["dns"]
  locale: Locale
}

export function DnsPanel({ zones, copy, locale }: DnsPanelProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [domain_name, set_domain_name] = useState("")
  const [active_zone_id, set_active_zone_id] = useState(zones[0]?.zone_id ?? "")
  const [record_type, set_record_type] = useState<DnsRecordType>("A")
  const [record_name, set_record_name] = useState("@")
  const [record_value, set_record_value] = useState("")
  const [record_ttl, set_record_ttl] = useState("300")
  const [record_priority, set_record_priority] = useState("10")
  const [is_pending, start_transition] = useTransition()

  const active_zone =
    zones.find((zone) => zone.zone_id === active_zone_id) ?? zones[0] ?? null

  function handle_create_zone(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await create_dns_zone(domain_name)
      if (result.success && result.zone) {
        show_toast({ variant: "success", title: copy.zone_created })
        set_domain_name("")
        set_active_zone_id(result.zone.zone_id)
        router.refresh()
      }
    })
  }

  function handle_delete_zone(zone_id: string) {
    start_transition(async () => {
      const result = await delete_dns_zone(zone_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.zone_deleted })
        router.refresh()
      }
    })
  }

  function handle_add_record(event: React.FormEvent) {
    event.preventDefault()
    if (!active_zone) return
    start_transition(async () => {
      const result = await add_dns_record(active_zone.zone_id, {
        record_type,
        name: record_name,
        value: record_value,
        ttl: Number(record_ttl) || 300,
        priority: record_type === "MX" ? Number(record_priority) || 10 : undefined,
      })
      if (result.success) {
        show_toast({ variant: "success", title: copy.record_added })
        set_record_value("")
        router.refresh()
      }
    })
  }

  function handle_delete_record(record_id: string) {
    if (!active_zone) return
    start_transition(async () => {
      const result = await delete_dns_record(active_zone.zone_id, record_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.record_deleted })
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-8">
      <Panel
        title={copy.zones_title}
        action={
          <form onSubmit={handle_create_zone} className="flex flex-wrap gap-2">
            <div className="min-w-[200px] flex-1">
              <FloatingInput
                id="domain_name"
                label={copy.domain_placeholder}
                value={domain_name}
                onChange={set_domain_name}
                disabled={is_pending}
                dir="ltr"
              />
            </div>
            <Button type="submit" variant="acid" size="pill" disabled={is_pending}>
              {is_pending ? copy.creating_zone : copy.create_zone}
            </Button>
          </form>
        }
      >
        {zones.length === 0 ? (
          <EmptyState label={copy.empty_zones} isRTL={isRTL} />
        ) : (
          <ul className="space-y-2">
            {zones.map((zone) => (
              <li
                key={zone.zone_id}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
                  active_zone?.zone_id === zone.zone_id
                    ? "border-acid/40 bg-acid/[0.06]"
                    : "border-border",
                )}
              >
                <button
                  type="button"
                  onClick={() => set_active_zone_id(zone.zone_id)}
                  className="font-mono text-sm text-foreground"
                >
                  {zone.domain_name}
                </button>
                <button
                  type="button"
                  onClick={() => handle_delete_zone(zone.zone_id)}
                  disabled={is_pending}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  aria-label={copy.delete_zone}
                >
                  <Trash className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {active_zone && (
        <Panel title={`${copy.records_title} · ${active_zone.domain_name}`}>
          <form
            onSubmit={handle_add_record}
            className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
          >
            <label className="text-xs text-muted-foreground">
              {copy.record_type}
              <select
                value={record_type}
                onChange={(event) =>
                  set_record_type(event.target.value as DnsRecordType)
                }
                className="mt-1 w-full rounded-xl border border-border bg-transparent px-3 py-3 text-sm text-foreground"
              >
                {RECORD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <FloatingInput
              id="record_name"
              label={copy.record_name}
              value={record_name}
              onChange={set_record_name}
              dir="ltr"
            />
            <div className="sm:col-span-2">
              <FloatingInput
                id="record_value"
                label={copy.record_value}
                value={record_value}
                onChange={set_record_value}
                dir="ltr"
              />
            </div>
            <FloatingInput
              id="record_ttl"
              label={copy.record_ttl}
              value={record_ttl}
              onChange={set_record_ttl}
              dir="ltr"
            />
            {record_type === "MX" ? (
              <FloatingInput
                id="record_priority"
                label={copy.record_priority}
                value={record_priority}
                onChange={set_record_priority}
                dir="ltr"
              />
            ) : (
              <Button type="submit" variant="outline" size="pill" disabled={is_pending}>
                {is_pending ? copy.adding_record : copy.add_record}
              </Button>
            )}
            {record_type === "MX" && (
              <Button type="submit" variant="outline" size="pill" disabled={is_pending}>
                {is_pending ? copy.adding_record : copy.add_record}
              </Button>
            )}
          </form>

          {active_zone.records.length === 0 ? (
            <EmptyState label={copy.empty_records} isRTL={isRTL} />
          ) : (
            <ul className="divide-y divide-white/5">
              {active_zone.records.map((record) => (
                <li
                  key={record.record_id}
                  className="flex flex-wrap items-center justify-between gap-3 py-4"
                >
                  <div className="min-w-0 font-mono text-sm">
                    <span className="text-acid">{record.record_type}</span>{" "}
                    <span className="text-foreground">{record.name}</span>{" "}
                    <span className="text-muted-foreground">{record.value}</span>
                    <span className="ms-3 text-xs text-muted-foreground">
                      TTL {record.ttl}
                      {record.priority !== undefined
                        ? ` · pri ${record.priority}`
                        : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handle_delete_record(record.record_id)}
                    disabled={is_pending}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    {copy.delete_record}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      )}
    </div>
  )
}
