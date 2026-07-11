export interface LoginCredentials {
  email_address: string
  account_password: string
}

export interface RegisterPayload {
  full_name: string
  email_address: string
  account_password: string
  accepted_terms: boolean
}

export type AccountRole = "user" | "admin"

export interface AuthUser {
  user_id: string
  full_name: string
  email_address: string
  account_status: string
  role: AccountRole
  created_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface AuthResponse {
  success: boolean
  access_token?: string
  refresh_token?: string
  user?: AuthUser
  error_message?: string
}

export interface AuthPageCopy {
  login_title: string
  login_subtitle: string
  register_title: string
  register_subtitle: string
  email_label: string
  password_label: string
  full_name_label: string
  login_submit: string
  login_submitting: string
  register_submit: string
  register_submitting: string
  no_account: string
  has_account: string
  register_link: string
  login_link: string
  login_success: string
  register_success: string
  invalid_credentials: string
  email_taken: string
  validation_error: string
  forgot_password_link: string
  forgot_password_title: string
  forgot_password_subtitle: string
  forgot_password_submit: string
  forgot_password_submitting: string
  forgot_password_success: string
  forgot_password_back: string
  forgot_password_demo_hint: string
  reset_password_title: string
  reset_password_subtitle: string
  reset_password_submit: string
  reset_password_submitting: string
  reset_password_success: string
  reset_password_invalid: string
  new_password_label: string
  confirm_password_label: string
  password_mismatch: string
  terms_accept_label: string
  terms_required: string
}
