'use server'

import { getAuthToken } from '../utils'

export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url: string
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
  params?: Record<string, unknown>
  data?: TData | FormData
  contentType?: string
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
  contentType = 'application/json',
  ...config
}: RequestConfig<TVariables>): Promise<ResponseConfig<TData, TError>> => {
  const { token } = await getAuthToken()

  let body: BodyInit | undefined
  let headers: HeadersInit = {
    ...config.headers,
    Authorization: `Bearer ${token?.value}`
  }

  if (config.data instanceof FormData) {
    body = config.data
  }

  if (!(config.data instanceof FormData)) {
    body = JSON.stringify(config.data)
    headers = {
      ...headers,
      'Content-Type': contentType || 'application/json'
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

  const data = contentType === 'application/json' ? await response.json() : []

  if (!response.ok) {
    return [data as TError, null]
  }

  return [null, data as TData]
}
