import { Inject, NotFoundException } from '@nestjs/common'

import { eq, and } from 'drizzle-orm'

import { plainToClass } from 'class-transformer'
import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { addresses, users } from '@db/drizzle/schema/schema'
import { credentials } from '@db/drizzle/schema/credentials'
import { pets } from '@db/drizzle/schema/pets'

import { Address } from '@modules/addresses/entities/address.entity'
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
          userId: credentials.userId
        },
        user: {
          name: users.name,
          lastName: users.lastName,
          email: users.email,
          phone: users.phone,
          canDisplayAddress: users.canDisplayAddress
        }
      })
      .from(credentials)
      .where(eq(credentials.id, id))
      .leftJoin(users, eq(users.id, credentials.userId))
      .limit(1)

    if (!result.credential) {
      throw new NotFoundException('Credential not found')
    }

    let primaryAddress: Address | null = null

    if (!!result.user?.canDisplayAddress && result.credential.userId) {
      const [address] = await this.db
        .select()
        .from(addresses)
        .where(
          and(
            eq(addresses.userId, result.credential.userId),
            eq(addresses.type, 'PRIMARY')
          )
        )
        .limit(1)
      primaryAddress = address ? (address as Address) : null
    }

    const [pet] = await this.db
      .select()
      .from(pets)
      .where(eq(pets.credentialId, id))
      .limit(1)

    return {
      ...result.credential,
      user: plainToClass(User, result.user),
      primaryAddress,
      pet
    }
  }
}
