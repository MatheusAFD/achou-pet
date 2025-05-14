import { Injectable, Inject, NotFoundException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'

import { Credential } from './entities/credential.entity'

@Injectable()
export class CredentialsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async findOne(id: string): Promise<Credential> {
    const [credential] = await this.db
      .select()
      .from(credentials)
      .where(eq(credentials.id, id))
      .limit(1)

    if (!credential) {
      throw new NotFoundException('Credential not found')
    }

    return credential
  }

  async findAllByBatchId(batchId: string): Promise<Credential[]> {
    const result = await this.db
      .select()
      .from(credentials)
      .where(eq(credentials.batchId, batchId))

    return result
  }
}
