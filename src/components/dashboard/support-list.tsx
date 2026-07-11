"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Plus, X } from "@phosphor-icons/react"

import { create_ticket } from "@/actions"
import {
  EmptyState,
  StatusBadge,
  ticket_priority_tone,
  ticket_status_tone,
} from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_datetime } from "@/lib/format"
import { cn } from "@/lib/utils"
import type {
  DashboardPageCopy,
  SupportTicket,
  TicketPriority,
} from "@/types/dashboard"

interface SupportListProps {
  tickets: SupportTicket[]
  copy: DashboardPageCopy["support"]
  locale: Locale
}

const PRIORITIES: TicketPriority[] = ["low", "normal", "high"]

export function SupportList({ tickets, copy, locale }: SupportListProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()

  const [open, set_open] = useState(false)
  const [subject, set_subject] = useState("")
  const [body, set_body] = useState("")
  const [priority, set_priority] = useState<TicketPriority>("normal")
  const [is_pending, start_transition] = useTransition()

  function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    start_transition(async () => {
      const result = await create_ticket({ subject, body, priority })
      if (result.success) {
        show_toast({ variant: "success", title: copy.created_success })
        set_subject("")
        set_body("")
        set_priority("normal")
        set_open(false)
        router.refresh()
      } else {
        show_toast({ variant: "error", title: copy.submit })
      }
    })
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Button
          type="button"
          variant={open ? "glass" : "acid"}
          size="pill"
          onClick={() => set_open((prev) => !prev)}
          className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
        >
          {open ? (
            <X weight="bold" />
          ) : (
            <Plus weight="bold" />
          )}
          {copy.new_ticket}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handle_submit}
            className="mb-8 overflow-hidden"
          >
            <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.015] p-6">
              <FloatingInput
                id="ticket_subject"
                label={copy.subject}
                value={subject}
                onChange={set_subject}
                required
                disabled={is_pending}
              />
              <div>
                <label
                  className={cn(
                    "mb-2 block text-xs tracking-wide text-muted-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {copy.priority}
                </label>
                <div className="flex gap-2">
                  {PRIORITIES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => set_priority(item)}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm transition-colors",
                        priority === item
                          ? "border-acid/50 bg-acid/10 text-acid"
                          : "border-white/10 text-muted-foreground hover:text-foreground",
                        isRTL && "font-[family-name:var(--font-vazirmatn)]",
                      )}
                    >
                      {copy.priority_labels[item]}
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                placeholder={copy.message_placeholder}
                value={body}
                onChange={(event) => set_body(event.target.value)}
                required
                disabled={is_pending}
                className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="acid"
                  size="pill"
                  disabled={is_pending}
                >
                  {is_pending ? copy.submitting : copy.submit}
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {tickets.length === 0 ? (
        <EmptyState label={copy.empty} isRTL={isRTL} />
      ) : (
        <ul className="space-y-3">
          {tickets.map((ticket) => (
            <li key={ticket.ticket_id}>
              <Link
                href={localizePathname(
                  `/dashboard/support/${ticket.ticket_id}`,
                  locale,
                )}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.015] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge
                      label={copy.status_labels[ticket.status]}
                      tone={ticket_status_tone(ticket.status)}
                    />
                    <StatusBadge
                      label={copy.priority_labels[ticket.priority]}
                      tone={ticket_priority_tone(ticket.priority)}
                      withDot={false}
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-2 truncate text-sm font-medium text-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {ticket.subject}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format_datetime(ticket.updated_at, locale)}
                  </p>
                </div>
                <ArrowRight
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1",
                    isRTL && "rotate-180 group-hover:-translate-x-1",
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
