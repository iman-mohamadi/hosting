"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useTransition } from "react"

import { request_password_reset } from "@/actions"
import { FloatingInput } from "@/components/ui/floating-input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/providers/toast-provider"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import type { AuthPageCopy } from "@/types/auth"

interface ForgotPasswordFormProps {
  copy: AuthPageCopy
  locale: Locale
}

export function ForgotPasswordForm({ copy, locale }: ForgotPasswordFormProps) {
  const { show_toast } = useToast()
  const [email_address, set_email_address] = useState("")
  const [submitted_email, set_submitted_email] = useState<string | null>(null)
  const [is_pending, start_transition] = useTransition()

  function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    start_transition(async () => {
      const result = await request_password_reset({ email_address })
      if (result.success) {
        set_submitted_email(email_address.trim().toLowerCase())
        show_toast({
          variant: "success",
          title: copy.forgot_password_success,
        })
        return
      }

      show_toast({
        variant: "error",
        title: copy.validation_error,
        message: result.message,
      })
    })
  }

  if (submitted_email) {
    const is_demo = submitted_email === "demo@hosting.io"

    return (
      <div className={cn("space-y-6 text-center", "ltr:text-left rtl:text-right")}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.forgot_password_success}
        </p>
        {is_demo && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm">
            <p className="text-muted-foreground">{copy.forgot_password_demo_hint}</p>
            <Link
              href={localizePathname("/reset-password?token=demo-reset-token", locale)}
              className="mt-3 inline-block font-mono text-xs text-acid underline-offset-4 hover:underline"
            >
              /reset-password?token=demo-reset-token
            </Link>
          </div>
        )}
        <Button asChild variant="outline" size="pill" className="w-full justify-center">
          <Link href={localizePathname("/login", locale)}>{copy.forgot_password_back}</Link>
        </Button>
      </div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handle_submit}
      className={cn("space-y-6", "ltr:text-left rtl:text-right")}
    >
      <FloatingInput
        id="reset_email_address"
        label={copy.email_label}
        type="email"
        value={email_address}
        onChange={set_email_address}
        required
        disabled={is_pending}
        autoComplete="email"
        dir="ltr"
      />

      <Button
        type="submit"
        variant="acid"
        size="pill"
        disabled={is_pending}
        className="w-full justify-center"
      >
        {is_pending ? copy.forgot_password_submitting : copy.forgot_password_submit}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={localizePathname("/login", locale)}
          className="text-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-80"
        >
          {copy.forgot_password_back}
        </Link>
      </p>
    </motion.form>
  )
}
