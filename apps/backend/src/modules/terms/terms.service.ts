import { Injectable, Inject } from '@nestjs/common'

import { eq, and } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { terms, userTerms } from '@db/drizzle/schema/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { UserTermSituationEnum } from '@common/enums/db-enums'

import { Term, UserTerm } from './entities/term.entity'

@Injectable()
export class TermsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async getPendingTermForUser(userId: string): Promise<{ term: Term | null }> {
    const allTermIds = (await this.db.select({ id: terms.id }).from(terms)).map(
      (t) => t.id
    )
    if (!allTermIds.length) return { term: null }

    const acceptedTermIds = new Set(
      (
        await this.db
          .select({ termId: userTerms.termId })
          .from(userTerms)
          .where(
            and(
              eq(userTerms.userId, userId),
              eq(userTerms.situation, UserTermSituationEnum.ACCEPTED)
            )
          )
      ).map((t) => t.termId)
    )

    const pendingTermId = allTermIds.find((id) => !acceptedTermIds.has(id))
    if (!pendingTermId) return { term: null }

    const [pendingTerm] = await this.db
      .select()
      .from(terms)
      .where(eq(terms.id, pendingTermId))
      .limit(1)
    return { term: pendingTerm as Term }
  }

  async updateUserTermSituation(
    userId: string,
    situation: keyof typeof UserTermSituationEnum
  ): Promise<UserTerm | null> {
    const { term } = await this.getPendingTermForUser(userId)

    if (!term) {
      return null
    }

    const [userTerm] = await this.db
      .insert(userTerms)
      .values({
        userId,
        termId: term.id,
        situation,
        acceptedAt:
          situation === UserTermSituationEnum.ACCEPTED ? new Date() : null
      })
      .returning()

    return userTerm as UserTerm
  }

  async hasPendingTerm(userId: string): Promise<boolean> {
    const { term } = await this.getPendingTermForUser(userId)

    return Boolean(term)
  }
}
