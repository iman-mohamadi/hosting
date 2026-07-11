"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

import { reply_ticket } from "@/actions"
import {
  StatusBadge,
  ticket_priority_tone,
  ticket_status_tone,
} from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_datetime } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { DashboardPageCopy, SupportTicket } from "@/types/dashboard"

interface TicketThreadProps {
  ticket: SupportTicket
  copy: DashboardPageCopy["support"]
  locale: Locale
}

export function TicketThread({ ticket, copy, locale }: TicketThreadProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [body, set_body] = useState("")
  const [is_pending, start_transition] = useTransition()

  const Back = isRTL ? ArrowRight : ArrowLeft

  function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!body.trim()) return

    start_transition(async () => {
      const result = await reply_ticket(ticket.ticket_id, body)
      if (result.success) {
        show_toast({ variant: "success", title: copy.reply_success })
        set_body("")
        router.refresh()
      } else {
        show_toast({ variant: "error", title: copy.send_reply })
      }
    })
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={localizePathname("/dashboard/support", locale)}
        className={cn(
          "group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        <Back className="size-4 transition-transform group-hover:-translate-x-0.5" />
        {copy.back}
      </Link>

      <div className="mb-8">
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
        <h1
          className={cn(
            "mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {ticket.subject}
        </h1>
      </div>

      <ol className="space-y-4">
        {ticket.messages.map((message) => {
          const is_support = message.author_role === "support"
          return (
            <li
              key={message.message_id}
              className={cn(
                "flex flex-col gap-2 rounded-2xl border p-5",
                is_support
                  ? "border-acid/20 bg-acid/[0.04]"
                  : "border-white/10 bg-white/[0.015]",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={cn(
                    "text-sm font-medium",
                    is_support ? "text-acid" : "text-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {is_support ? copy.support_agent : copy.you}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {format_datetime(message.created_at, locale)}
                </span>
              </div>
              <p
                className={cn(
                  "text-sm leading-relaxed text-muted-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {message.body}
              </p>
            </li>
          )
        })}
      </ol>

      {ticket.status !== "closed" && (
        <form onSubmit={handle_submit} className="mt-6 space-y-4">
          <Textarea
            placeholder={copy.reply_placeholder}
            value={body}
            onChange={(event) => set_body(event.target.value)}
            disabled={is_pending}
            className={cn(
              "min-h-28",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="acid"
              size="pill"
              disabled={is_pending || !body.trim()}
            >
              {is_pending ? copy.sending : copy.send_reply}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
