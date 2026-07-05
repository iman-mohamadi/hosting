"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { login_user } from "@/actions"
import { FloatingInput } from "@/components/ui/floating-input"
import { Button } from "@/components/ui/button"
import { use_toast } from "@/components/providers/toast-provider"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { use_auth_store } from "@/stores/auth-store"
import type { AuthPageCopy } from "@/types/auth"

interface LoginFormProps {
  copy: AuthPageCopy
  locale: Locale
}

export function LoginForm({ copy, locale }: LoginFormProps) {
  const router = useRouter()
  const { show_toast } = use_toast()
  const set_user = use_auth_store((state) => state.set_user)

  const [email_address, set_email_address] = useState("")
  const [account_password, set_account_password] = useState("")
  const [is_pending, start_transition] = useTransition()

  function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    start_transition(async () => {
      const result = await login_user({ email_address, account_password })

      if (result.success && result.user) {
        set_user(result.user)
        show_toast({
          variant: "success",
          title: copy.login_success,
          message: result.user.full_name,
        })
        router.push(localizePathname("/", locale))
        router.refresh()
        return
      }

      show_toast({
        variant: "error",
        title: copy.validation_error,
        message: result.error_message ?? copy.invalid_credentials,
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
        id="email_address"
        label={copy.email_label}
        type="email"
        value={email_address}
        onChange={set_email_address}
        required
        disabled={is_pending}
        autoComplete="email"
        dir="ltr"
      />

      <FloatingInput
        id="account_password"
        label={copy.password_label}
        type="password"
        value={account_password}
        onChange={set_account_password}
        required
        disabled={is_pending}
        autoComplete="current-password"
      />

      <Button
        type="submit"
        disabled={is_pending}
        className="h-11 w-full rounded-full text-sm font-medium tracking-wide"
      >
        {is_pending ? copy.login_submitting : copy.login_submit}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {copy.no_account}{" "}
        <Link
          href={localizePathname("/register", locale)}
          className="text-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-80"
        >
          {copy.register_link}
        </Link>
      </p>
    </motion.form>
  )
}
