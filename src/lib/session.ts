import { cookies } from "next/headers"

export const ACCESS_TOKEN_COOKIE = "access_token"
export const REFRESH_TOKEN_COOKIE = "refresh_token"

const cookie_options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
}

export async function establish_auth_session(
  access_token: string,
  refresh_token: string,
): Promise<void> {
  const cookie_store = await cookies()

  cookie_store.set(ACCESS_TOKEN_COOKIE, access_token, cookie_options)
  cookie_store.set(REFRESH_TOKEN_COOKIE, refresh_token, cookie_options)
}

export async function clear_auth_session(): Promise<void> {
  const cookie_store = await cookies()

  cookie_store.delete(ACCESS_TOKEN_COOKIE)
  cookie_store.delete(REFRESH_TOKEN_COOKIE)
}

export async function get_access_token(): Promise<string | undefined> {
  const cookie_store = await cookies()
  return cookie_store.get(ACCESS_TOKEN_COOKIE)?.value
}
