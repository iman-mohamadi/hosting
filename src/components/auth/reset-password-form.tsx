"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { confirm_password_reset } from "@/actions"
import { FloatingInput } from "@/components/ui/floating-input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/providers/toast-provider"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import type { AuthPageCopy } from "@/types/auth"

interface ResetPasswordFormProps {
  copy: AuthPageCopy
  locale: Locale
  reset_token: string
}

export function ResetPasswordForm({
  copy,
  locale,
  reset_token,
}: ResetPasswordFormProps) {
  const router = useRouter()
  const { show_toast } = useToast()
  const [new_password, set_new_password] = useState("")
  const [confirm_password, set_confirm_password] = useState("")
  const [is_pending, start_transition] = useTransition()

  if (!reset_token) {
    return (
      <div className={cn("space-y-6 text-center", "ltr:text-left rtl:text-right")}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.reset_password_invalid}
        </p>
        <Button asChild variant="outline" size="pill" className="w-full justify-center">
          <Link href={localizePathname("/forgot-password", locale)}>
            {copy.forgot_password_submit}
          </Link>
        </Button>
      </div>
    )
  }

  function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (new_password !== confirm_password) {
      show_toast({
        variant: "error",
        title: copy.password_mismatch,
      })
      return
    }

    start_transition(async () => {
      const result = await confirm_password_reset({
        reset_token,
        new_password,
      })

      if (result.success) {
        show_toast({
          variant: "success",
          title: copy.reset_password_success,
        })
        router.push(localizePathname("/login", locale))
        return
      }

      show_toast({
        variant: "error",
        title: copy.reset_password_invalid,
        message: result.error_message,
      })
    })
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
        id="new_password"
        label={copy.new_password_label}
        type="password"
        value={new_password}
        onChange={set_new_password}
        required
        disabled={is_pending}
        autoComplete="new-password"
      />

      <FloatingInput
        id="confirm_password"
        label={copy.confirm_password_label}
        type="password"
        value={confirm_password}
        onChange={set_confirm_password}
        required
        disabled={is_pending}
        autoComplete="new-password"
      />

      <Button
        type="submit"
        variant="acid"
        size="pill"
        disabled={is_pending}
        className="w-full justify-center"
      >
        {is_pending ? copy.reset_password_submitting : copy.reset_password_submit}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={localizePathname("/login", locale)}
          className="text-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-80"
        >
          {copy.login_link}
        </Link>
      </p>
    </motion.form>
  )
}
