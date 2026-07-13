"use client"

import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle } from "@phosphor-icons/react"
import { useState, useTransition } from "react"

import {
  submit_contact_form,
  type ContactPageCopy,
  type ContactPayload,
} from "@/actions"
import { ShimmerButton } from "@/components/animate-ui/shimmer-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface ContactFormProps {
  copy: ContactPageCopy
  locale: Locale
}

const empty_payload: ContactPayload = {
  sender_name: "",
  sender_email: "",
  form_subject: "",
  message_body: "",
}

const fieldClass =
  "rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none backdrop-blur-none focus:border-primary focus:ring-0 focus:ring-offset-0"

function FieldShell({
  id,
  label,
  active,
  children,
}: {
  id: string
  label: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative space-y-2">
      <label
        htmlFor={id}
        className={cn(
          "text-xs font-medium tracking-wide uppercase transition-colors duration-300",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </label>
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center bg-primary"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export function ContactForm({ copy, locale }: ContactFormProps) {
  const [form_state, set_form_state] = useState<ContactPayload>(empty_payload)
  const [is_success, set_is_success] = useState(false)
  const [error_message, set_error_message] = useState<string | null>(null)
  const [is_pending, start_transition] = useTransition()
  const [focused, set_focused] = useState<string | null>(null)

  function update_field(field: keyof ContactPayload, value: string) {
    set_form_state((prev) => ({ ...prev, [field]: value }))
  }

  function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    set_error_message(null)

    start_transition(async () => {
      const result = await submit_contact_form(form_state)

      if (result.success) {
        set_is_success(true)
        set_form_state(empty_payload)
        return
      }

      set_error_message(result.message)
    })
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {is_success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "rounded-2xl border border-primary/20 bg-primary/5 p-10",
              "ltr:text-left rtl:text-right",
            )}
            role="status"
          >
            <div className="flex items-start gap-4">
              <CheckCircle
                weight="duotone"
                className="size-8 shrink-0 text-primary"
                aria-hidden
              />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {copy.success_title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {copy.success_message}
                </p>
                <button
                  type="button"
                  onClick={() => set_is_success(false)}
                  className="mt-4 text-xs font-medium tracking-wide text-primary uppercase transition-opacity hover:opacity-70"
                >
                  {locale === "fa"
                    ? "درخواست دیگری بفرستید"
                    : "Send another request"}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handle_submit}
            className={cn(
              "border border-border bg-card/40 p-8 backdrop-blur-md md:p-10",
              "ltr:text-left rtl:text-right",
            )}
          >
            <h2 className="mb-10 font-mono text-xs tracking-[0.25em] text-primary uppercase">
              {copy.form_title}
            </h2>

            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <FieldShell
                  id="sender_name"
                  label={copy.sender_name_label}
                  active={focused === "sender_name"}
                >
                  <Input
                    id="sender_name"
                    name="sender_name"
                    value={form_state.sender_name}
                    onChange={(event) =>
                      update_field("sender_name", event.target.value)
                    }
                    onFocus={() => set_focused("sender_name")}
                    onBlur={() => set_focused(null)}
                    placeholder={copy.sender_name_placeholder}
                    required
                    disabled={is_pending}
                    autoComplete="name"
                    className={fieldClass}
                  />
                </FieldShell>

                <FieldShell
                  id="sender_email"
                  label={copy.sender_email_label}
                  active={focused === "sender_email"}
                >
                  <Input
                    id="sender_email"
                    name="sender_email"
                    type="email"
                    value={form_state.sender_email}
                    onChange={(event) =>
                      update_field("sender_email", event.target.value)
                    }
                    onFocus={() => set_focused("sender_email")}
                    onBlur={() => set_focused(null)}
                    placeholder={copy.sender_email_placeholder}
                    required
                    disabled={is_pending}
                    autoComplete="email"
                    dir="ltr"
                    className={cn(fieldClass, "ltr:text-left rtl:text-left")}
                  />
                </FieldShell>
              </div>

              <FieldShell
                id="form_subject"
                label={copy.form_subject_label}
                active={focused === "form_subject"}
              >
                <Input
                  id="form_subject"
                  name="form_subject"
                  value={form_state.form_subject}
                  onChange={(event) =>
                    update_field("form_subject", event.target.value)
                  }
                  onFocus={() => set_focused("form_subject")}
                  onBlur={() => set_focused(null)}
                  placeholder={copy.form_subject_placeholder}
                  required
                  disabled={is_pending}
                  className={fieldClass}
                />
              </FieldShell>

              <FieldShell
                id="message_body"
                label={copy.message_body_label}
                active={focused === "message_body"}
              >
                <Textarea
                  id="message_body"
                  name="message_body"
                  value={form_state.message_body}
                  onChange={(event) =>
                    update_field("message_body", event.target.value)
                  }
                  onFocus={() => set_focused("message_body")}
                  onBlur={() => set_focused(null)}
                  placeholder={copy.message_body_placeholder}
                  required
                  disabled={is_pending}
                  className={cn(
                    fieldClass,
                    "min-h-28 resize-none rounded-none",
                  )}
                />
              </FieldShell>

              {error_message && (
                <p className="text-sm text-destructive" role="alert">
                  {error_message}
                </p>
              )}

              <ShimmerButton type="submit" disabled={is_pending}>
                {is_pending ? copy.submitting_label : copy.submit_label}
              </ShimmerButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
