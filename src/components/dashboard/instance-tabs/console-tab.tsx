"use client"

import { useEffect, useRef, useState } from "react"
import { TerminalWindow } from "@phosphor-icons/react"

import { Panel } from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"
import type { DashboardPageCopy, InstanceStatus } from "@/types/dashboard"

interface ConsoleTabProps {
  hostname: string
  status: InstanceStatus
  copy: DashboardPageCopy["console"]
  locale: Locale
}

const MOCK_LINES = [
  "Connecting to serial console...",
  "Kernel 6.8.0-45-generic on x86_64",
  "",
  "Ubuntu 24.04 LTS {hostname} ttyS0",
  "",
  "{hostname} login: root",
  "Password: ********",
  "",
  "Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-45-generic x86_64)",
  "",
  "root@{hostname}:~# _",
]

export function ConsoleTab({
  hostname,
  status,
  copy,
  locale,
}: ConsoleTabProps) {
  const isRTL = locale === "fa"
  const [connected, set_connected] = useState(false)
  const [connecting, set_connecting] = useState(false)
  const scroll_ref = useRef<HTMLPreElement>(null)

  const can_connect = status === "running"

  useEffect(() => {
    if (scroll_ref.current) {
      scroll_ref.current.scrollTop = scroll_ref.current.scrollHeight
    }
  }, [connected, connecting])

  function handle_connect() {
    if (!can_connect || connecting) return
    set_connecting(true)
    window.setTimeout(() => {
      set_connecting(false)
      set_connected(true)
    }, 900)
  }

  function handle_disconnect() {
    set_connected(false)
    set_connecting(false)
  }

  const lines = MOCK_LINES.map((line) => line.replaceAll("{hostname}", hostname))

  return (
    <Panel title={copy.title} isRTL={isRTL}>
      <p
        className={cn(
          "mb-6 max-w-2xl text-sm text-muted-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {copy.subtitle}
      </p>

      {!can_connect && (
        <p
          className={cn(
            "mb-4 text-sm text-amber-300",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.offline_note}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TerminalWindow className="size-4 text-acid" />
            <span className="font-mono">{hostname}</span>
          </div>
          <span
            className={cn(
              "text-xs",
              connected ? "text-acid" : "text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {connecting
              ? copy.connecting
              : connected
                ? copy.connected
                : copy.hint}
          </span>
        </div>
        <pre
          ref={scroll_ref}
          className="max-h-[360px] overflow-auto p-4 font-mono text-xs leading-relaxed text-emerald-300/90"
        >
          {connected || connecting
            ? lines.join("\n")
            : "// " + copy.hint}
        </pre>
      </div>

      <div className="mt-6 flex gap-3">
        {!connected ? (
          <Button
            type="button"
            variant="acid"
            size="pill"
            disabled={!can_connect || connecting}
            onClick={handle_connect}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {connecting ? copy.connecting : copy.connect}
          </Button>
        ) : (
          <Button
            type="button"
            variant="glass"
            size="pill"
            onClick={handle_disconnect}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {copy.disconnect}
          </Button>
        )}
      </div>
    </Panel>
  )
}
