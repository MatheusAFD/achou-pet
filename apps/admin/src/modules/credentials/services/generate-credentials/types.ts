export interface GenerateCredentialsBody {
  numberOfCredentials: number
  description: string
}

export interface GenerateCredentialsResponse {
  credentialsCreated: number
}
