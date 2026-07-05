"use client"

import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle } from "@phosphor-icons/react"
import { useState, useTransition } from "react"

import {
  submit_contact_form,
  type ContactPageCopy,
  type ContactPayload,
} from "@/actions"
import { Button } from "@/components/ui/button"
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

export function ContactForm({ copy, locale }: ContactFormProps) {
  const [form_state, set_form_state] = useState<ContactPayload>(empty_payload)
  const [is_success, set_is_success] = useState(false)
  const [error_message, set_error_message] = useState<string | null>(null)
  const [is_pending, start_transition] = useTransition()

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
              "rounded-2xl border border-primary/20 bg-primary/5 p-10 backdrop-blur-md",
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
                  {locale === "fa" ? "ارسال پیام جدید" : "Send another message"}
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
              "rounded-2xl border border-border/40 bg-card/20 p-8 backdrop-blur-md md:p-10",
              "ltr:text-left rtl:text-right",
            )}
          >
            <h2 className="mb-8 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {copy.form_title}
            </h2>

            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="sender_name"
                    className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
                  >
                    {copy.sender_name_label}
                  </label>
                  <Input
                    id="sender_name"
                    name="sender_name"
                    value={form_state.sender_name}
                    onChange={(event) =>
                      update_field("sender_name", event.target.value)
                    }
                    placeholder={copy.sender_name_placeholder}
                    required
                    disabled={is_pending}
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="sender_email"
                    className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
                  >
                    {copy.sender_email_label}
                  </label>
                  <Input
                    id="sender_email"
                    name="sender_email"
                    type="email"
                    value={form_state.sender_email}
                    onChange={(event) =>
                      update_field("sender_email", event.target.value)
                    }
                    placeholder={copy.sender_email_placeholder}
                    required
                    disabled={is_pending}
                    autoComplete="email"
                    dir="ltr"
                    className="ltr:text-left rtl:text-left"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="form_subject"
                  className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {copy.form_subject_label}
                </label>
                <Input
                  id="form_subject"
                  name="form_subject"
                  value={form_state.form_subject}
                  onChange={(event) =>
                    update_field("form_subject", event.target.value)
                  }
                  placeholder={copy.form_subject_placeholder}
                  required
                  disabled={is_pending}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message_body"
                  className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  {copy.message_body_label}
                </label>
                <Textarea
                  id="message_body"
                  name="message_body"
                  value={form_state.message_body}
                  onChange={(event) =>
                    update_field("message_body", event.target.value)
                  }
                  placeholder={copy.message_body_placeholder}
                  required
                  disabled={is_pending}
                />
              </div>

              {error_message && (
                <p className="text-sm text-destructive" role="alert">
                  {error_message}
                </p>
              )}

              <Button
                type="submit"
                disabled={is_pending}
                className="h-11 w-full rounded-full text-sm font-medium tracking-wide md:w-auto md:px-10"
              >
                {is_pending ? copy.submitting_label : copy.submit_label}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
