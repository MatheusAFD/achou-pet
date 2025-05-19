import { Injectable, Inject } from '@nestjs/common'

import { eq, and, desc, isNull } from 'drizzle-orm'

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
    const [result] = await this.db
      .select({ term: terms })
      .from(terms)
      .leftJoin(
        userTerms,
        and(
          eq(userTerms.termId, terms.id),
          eq(userTerms.userId, userId),
          eq(userTerms.situation, UserTermSituationEnum.ACCEPTED)
        )
      )
      .where(isNull(userTerms.id))
      .orderBy(desc(terms.createdAt))
      .limit(1)

    if (result && result.term) {
      return { term: result.term as Term }
    }

    return { term: {} as Term }
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
