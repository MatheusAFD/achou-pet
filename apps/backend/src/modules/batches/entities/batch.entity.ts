import { batches } from '@db/drizzle/schema'

type BatchType = typeof batches.$inferSelect

export class Batch implements BatchType {
  id: string
  shortId: number
  description: string
  comments: string | null
  totalCredentialsGenerated: string
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
