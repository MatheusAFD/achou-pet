export interface Token {
  key: string
  id: string
  value: string
  expiresAt: string
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
