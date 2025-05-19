import { tokens } from '@db/drizzle/schema/tokens'

type TokenType = typeof tokens.$inferSelect

export class Token implements TokenType {
  id: string
  value: string
  key: string
  expiresAt: string
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
