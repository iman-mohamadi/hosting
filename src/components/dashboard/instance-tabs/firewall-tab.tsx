"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Trash } from "@phosphor-icons/react"

import { create_firewall_rule, delete_firewall_rule } from "@/actions"
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
  FirewallProtocol,
  FirewallRule,
} from "@/types/dashboard"

interface FirewallTabProps {
  instance_id: string
  rules: FirewallRule[]
  copy: DashboardPageCopy["firewall"]
  locale: Locale
}

const PROTOCOLS: FirewallProtocol[] = ["tcp", "udp", "icmp"]

export function FirewallTab({
  instance_id,
  rules,
  copy,
  locale,
}: FirewallTabProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [label, set_label] = useState("")
  const [protocol, set_protocol] = useState<FirewallProtocol>("tcp")
  const [port_range, set_port_range] = useState("")
  const [source, set_source] = useState("0.0.0.0/0")
  const [is_pending, start_transition] = useTransition()

  function handle_add(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await create_firewall_rule(instance_id, {
        label,
        protocol,
        port_range,
        source,
      })

      if (result.success) {
        show_toast({ variant: "success", title: copy.added_success })
        set_label("")
        set_port_range("")
        router.refresh()
      }
    })
  }

  function handle_delete(rule_id: string) {
    start_transition(async () => {
      const result = await delete_firewall_rule(rule_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.deleted_success })
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-6">
      <Panel title={copy.title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-6 max-w-2xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.subtitle}
        </p>

        <form
          onSubmit={handle_add}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <FloatingInput
            id="fw-label"
            label={copy.label}
            value={label}
            onChange={set_label}
            disabled={is_pending}
          />
          <div>
            <label
              htmlFor="fw-protocol"
              className={cn(
                "mb-2 block text-xs text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.protocol}
            </label>
            <select
              id="fw-protocol"
              value={protocol}
              onChange={(event) =>
                set_protocol(event.target.value as FirewallProtocol)
              }
              disabled={is_pending}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground outline-none focus:border-acid/40"
            >
              {PROTOCOLS.map((item) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <FloatingInput
            id="fw-port"
            label={copy.port_placeholder}
            value={port_range}
            onChange={set_port_range}
            disabled={is_pending || protocol === "icmp"}
          />
          <FloatingInput
            id="fw-source"
            label={copy.source_placeholder}
            value={source}
            onChange={set_source}
            disabled={is_pending}
          />
          <div className="sm:col-span-2 lg:col-span-4">
            <Button
              type="submit"
              variant="acid"
              size="pill"
              disabled={!label.trim() || is_pending}
              className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
            >
              {is_pending ? copy.adding : copy.add_rule}
            </Button>
          </div>
        </form>
      </Panel>

      {rules.length === 0 ? (
        <EmptyState label={copy.empty} isRTL={isRTL} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div
            className={cn(
              "border-b border-white/10 bg-white/[0.02] px-5 py-3 text-xs font-medium tracking-wide text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.inbound}
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-start text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">{copy.label}</th>
                <th className="px-5 py-3 font-medium">{copy.protocol}</th>
                <th className="px-5 py-3 font-medium">{copy.port_range}</th>
                <th className="px-5 py-3 font-medium">{copy.source}</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr
                  key={rule.rule_id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-4 text-foreground">{rule.label}</td>
                  <td className="px-5 py-4 font-mono uppercase text-muted-foreground">
                    {rule.protocol}
                  </td>
                  <td className="px-5 py-4 font-mono text-muted-foreground">
                    {rule.protocol === "icmp" ? "—" : rule.port_range}
                  </td>
                  <td className="px-5 py-4 font-mono text-muted-foreground">
                    {rule.source}
                  </td>
                  <td className="px-5 py-4 text-end">
                    <button
                      type="button"
                      disabled={is_pending}
                      onClick={() => handle_delete(rule.rule_id)}
                      aria-label={copy.delete}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive disabled:opacity-50"
                    >
                      <Trash className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
