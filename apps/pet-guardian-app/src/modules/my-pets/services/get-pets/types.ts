export type GetMyPetsResponse = Pet[] | []

export interface Pet {
  id: string
  shortId: string
  petName: string
  status: string
  description: string | null
  hasLifetimeAccess: boolean
  expirationDate: string | Date | null
  userId: string
  batchId: string
  activatedAt: string
  updatedAt: string | Date | null
  createdAt: string | Date | null
  deletedAt: string | Date | null
}
