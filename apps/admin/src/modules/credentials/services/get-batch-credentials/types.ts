export interface Batch {
  id: string
  shortId: number
  description: string
  comments: string | null
  totalCredentialsGenerated: string
  updatedAt: Date | null
  createdAt: Date | null | string
  deletedAt: null
}
