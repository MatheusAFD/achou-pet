import { Injectable, Inject } from '@nestjs/common'

import { eq, and, desc } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { terms, userTerms } from '@db/drizzle/schema'
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
    const [latestTerm] = await this.db
      .select()
      .from(terms)
      .orderBy(desc(terms.createdAt))
      .limit(1)

    if (!latestTerm) {
      return { term: null }
    }

    const [userTerm] = await this.db
      .select()
      .from(userTerms)
      .where(
        and(eq(userTerms.userId, userId), eq(userTerms.termId, latestTerm.id))
      )

    if (
      !userTerm ||
      userTerm.situation === UserTermSituationEnum.PENDING ||
      userTerm.situation === UserTermSituationEnum.REFUSED
    ) {
      return { term: latestTerm as Term }
    }

    return { term: null }
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

  async hasPendingTerm(userId: string): Promise<{ hasPending: boolean }> {
    const { term } = await this.getPendingTermForUser(userId)

    return { hasPending: Boolean(term) }
  }
}
