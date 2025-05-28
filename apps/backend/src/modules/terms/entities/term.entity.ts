import { terms, userTerms } from '@db/drizzle/schema/schema'

import { UserTermSituationEnum } from '@common/enums/db-enums'

type TermType = typeof terms.$inferInsert
type UserTermType = typeof userTerms.$inferSelect

export class Term implements TermType {
  id: string
  version: string
  content: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export class UserTerm implements UserTermType {
  id: string
  userId: string
  termId: string
  situation: keyof typeof UserTermSituationEnum
  acceptedAt: Date | null
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}
