'use server'

import { getAuthToken } from '../utils'

export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url: string
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
  params?: Record<string, unknown>
  data?: TData | FormData
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
  signal?: AbortSignal
  headers?: HeadersInit
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

export type ResponseConfig<TData = unknown, TError = unknown> =
  | [TError, null]
  | [null, TData]

export const httpClientFetch = async <
  TData,
  TError = unknown,
  TVariables = unknown
>({
  baseURL = process.env.NEXT_PUBLIC_API_BASE_URL,
  ...config
}: RequestConfig<TVariables>): Promise<ResponseConfig<TData, TError>> => {
  const { token } = await getAuthToken()

  const isFormData = config.data instanceof FormData

  let headers: Record<string, string> = {
    Authorization: `Bearer ${token?.value}`
  }

  if (config.headers) {
    if (config.headers instanceof Headers) {
      config.headers.forEach((value, key) => {
        headers[key] = value
      })
    } else if (Array.isArray(config.headers)) {
      config.headers.forEach(([key, value]) => {
        headers[key] = value
      })
    } else {
      headers = { ...headers, ...config.headers }
    }
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = isFormData ? undefined! : 'application/json'
  }

  if (isFormData && headers['Content-Type']) {
    delete headers['Content-Type']
  }

  let body: BodyInit | undefined
  if (config.data) {
    if (isFormData) {
      body = config.data as FormData
    } else if (typeof config.data === 'string') {
      body = config.data
    } else {
      body = JSON.stringify(config.data)
    }
  }

  const response = await fetch(`${baseURL}${config.url}`, {
    method: config.method.toUpperCase(),
    body,
    signal: config.signal,
    headers,
    cache: config.cache,
    next: config.next
  })

  const data = response != null ? await response.json() : null

  if (!response.ok) {
    return [data as TError, null]
  }

  return [null, data as TData]
}
