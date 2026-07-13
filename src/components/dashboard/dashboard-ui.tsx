import Link from "next/link"

import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"
import type {
  InstanceStatus,
  InvoiceStatus,
  TicketPriority,
  TicketStatus,
} from "@/types/dashboard"

type StatusTone = "success" | "warning" | "danger" | "neutral" | "info"

export function instance_status_tone(status: InstanceStatus): StatusTone {
  switch (status) {
    case "running":
      return "success"
    case "stopped":
      return "neutral"
    case "rebooting":
      return "warning"
    case "provisioning":
      return "info"
  }
}

export function invoice_status_tone(status: InvoiceStatus): StatusTone {
  switch (status) {
    case "paid":
      return "success"
    case "pending":
      return "warning"
    case "overdue":
      return "danger"
  }
}

export function ticket_status_tone(status: TicketStatus): StatusTone {
  switch (status) {
    case "open":
      return "info"
    case "pending":
      return "warning"
    case "closed":
      return "neutral"
  }
}

export function ticket_priority_tone(priority: TicketPriority): StatusTone {
  switch (priority) {
    case "high":
      return "danger"
    case "normal":
      return "info"
    case "low":
      return "neutral"
  }
}

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "border-success/25 bg-success/10 text-[#0e9e68]",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-600",
  danger: "border-destructive/25 bg-destructive/10 text-destructive",
  neutral: "border-border bg-secondary text-muted-foreground",
  info: "border-primary/25 bg-primary/10 text-primary",
}

export function StatusBadge({
  label,
  tone,
  className,
  withDot = true,
}: {
  label: string
  tone: StatusTone
  className?: string
  withDot?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {withDot && (
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
      )}
      {label}
    </span>
  )
}

export function PortalPageHeader({
  title,
  subtitle,
  isRTL,
  action,
}: {
  title: string
  subtitle?: string
  isRTL: boolean
  action?: React.ReactNode
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  isRTL,
}: {
  label: string
  value: string
  hint?: string
  icon?: React.ReactNode
  isRTL?: boolean
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border glass p-6">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/40 to-transparent"
      />
      <div className="flex items-start justify-between gap-4">
        <p
          className={cn(
            "text-xs tracking-wide text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {label}
        </p>
        {icon && <span className="text-acid/70">{icon}</span>}
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
        {value}
      </p>
      {hint && (
        <p
          className={cn(
            "mt-1 text-xs text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export function Panel({
  title,
  action,
  isRTL,
  children,
  className,
}: {
  title?: string
  action?: React.ReactNode
  isRTL?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-[1.35rem] border border-border bg-card p-6 shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && (
            <h2
              className={cn(
                "text-sm font-medium tracking-wide text-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function PanelLink({
  href,
  label,
  locale,
}: {
  href: string
  label: string
  locale: Locale
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-acid hover:underline",
        locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
      )}
    >
      {label}
    </Link>
  )
}

export function EmptyState({ label, isRTL }: { label: string; isRTL: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground",
        isRTL && "font-[family-name:var(--font-vazirmatn)]",
      )}
    >
      {label}
    </div>
  )
}

export interface TabItem<T extends string = string> {
  id: T
  label: string
}

export function TabBar<T extends string>({
  tabs,
  active,
  on_change,
  isRTL,
}: {
  tabs: TabItem<T>[]
  active: T
  on_change: (id: T) => void
  isRTL: boolean
}) {
  return (
    <div
      role="tablist"
      className="mb-8 flex flex-wrap gap-1 rounded-2xl border border-border bg-muted p-1"
    >
      {tabs.map((tab) => {
        const selected = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => on_change(tab.id)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
              selected
                ? "bg-acid/10 text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
