export interface Credential {
  id: string
  shortId: string
  status: 'INACTIVE' | 'ACTIVE'
  description: string | null
  hasLifetimeAccess: boolean
  expirationDate: string | null
  userId: string | null
  batchId: string
  activatedAt: string | null
  updatedAt: string | Date | null
  createdAt: string | Date | null
  deletedAt: string | Date | null
}
