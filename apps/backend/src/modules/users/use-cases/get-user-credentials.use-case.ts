import { Inject } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'

export class GetUserCredentialsUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async execute(id: string) {
    const data = await this.db
      .select()
      .from(credentials)
      .where(eq(credentials.userId, id))

    return data
  }
}
