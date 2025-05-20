export interface CheckTokenRequestBody {
  token: string
  key: string
}

export interface CheckTokenResponse {
  isValid: boolean
  token: string
}
