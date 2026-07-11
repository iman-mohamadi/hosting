export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: Record<string, unknown> | FormData
  auth_token?: string
}

export class ApiError extends Error {
  status_code: number
  error_message: string

  constructor(status_code: number, error_message: string) {
    super(error_message)
    this.name = "ApiError"
    this.status_code = status_code
    this.error_message = error_message
  }
}

function get_base_url(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.hosting.io"
}

function build_headers(
  options: ApiRequestOptions,
): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json"
  }

  if (options.auth_token) {
    headers.Authorization = `Bearer ${options.auth_token}`
  }

  return headers
}

export async function api_request<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const fetch_options = { ...options }
  const body = fetch_options.body
  delete fetch_options.body
  delete fetch_options.auth_token

  const response = await fetch(`${get_base_url()}${path}`, {
    ...fetch_options,
    headers: build_headers(options),
    body:
      body instanceof FormData
        ? body
        : body
          ? JSON.stringify(body)
          : undefined,
  })

  if (!response.ok) {
    let error_message = `Request failed with status ${response.status}`

    try {
      const error_body = (await response.json()) as { error_message?: string }
      if (error_body.error_message) {
        error_message = error_body.error_message
      }
    } catch {
      // Response body is not JSON — use default message.
    }

    throw new ApiError(response.status, error_message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export async function api_get<T>(
  path: string,
  options?: ApiRequestOptions,
): Promise<T> {
  return api_request<T>(path, { ...options, method: "GET" })
}

export async function api_post<T>(
  path: string,
  body: Record<string, unknown>,
  options?: ApiRequestOptions,
): Promise<T> {
  return api_request<T>(path, { ...options, method: "POST", body })
}
