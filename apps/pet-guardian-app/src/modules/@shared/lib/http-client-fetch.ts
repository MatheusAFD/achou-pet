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

  const response = await fetch(`${baseURL}${config.url}`, {
    method: config.method.toUpperCase(),
    body: config.data ? JSON.stringify(config.data) : undefined,
    signal: config.signal,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`
    },
    cache: config.cache,
    next: config.next
  })

  const data = response != null ? await response.json() : null

  if (!response.ok) {
    return [data as TError, null]
  }

  return [null, data as TData]
}
