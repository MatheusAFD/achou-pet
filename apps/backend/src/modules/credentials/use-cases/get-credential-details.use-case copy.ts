import { Inject, NotFoundException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { plainToClass } from 'class-transformer'
import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { addresses, users } from '@db/drizzle/schema'
import { credentials } from '@db/drizzle/schema/credentials'

import { User } from '@modules/users/entities/user.entity'

export class GetCredentialDetailsUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async execute(id: string) {
    const [result] = await this.db
      .select({
        credential: {
          id: credentials.id,
          status: credentials.status,
          batchId: credentials.batchId,
          userId: credentials.userId,
          activatedAt: credentials.activatedAt
        },
        user: {
          name: users.name,
          lastName: users.lastName,
          email: users.email,
          phone: users.phone,
          canDisplayAddress: users.canDisplayAddress
        },
        addresses
      })
      .from(credentials)
      .where(eq(credentials.id, id))
      .leftJoin(users, eq(users.id, credentials.userId))
      .leftJoin(addresses, eq(addresses.userId, users.id))
      .limit(1)

    if (!result || !result.credential) {
      throw new NotFoundException('Credential not found')
    }

    return {
      ...result.credential,
      user: plainToClass(User, result.user),
      address: result.addresses
    }
  }
}
