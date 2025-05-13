import { Inject, Injectable } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'
import { pets } from '@db/drizzle/schema/pets'

import { Pet } from './entities/pet.entity'

@Injectable()
export class PetsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async findAllByUser(userId: string): Promise<Pet[]> {
    const result = await this.db
      .select()
      .from(pets)
      .leftJoin(credentials, eq(pets.credentialId, credentials.id))
      .where(eq(credentials.userId, userId))

    return result.map(({ pets: pet }) => ({
      ...pet,
      gender: pet.gender as keyof typeof import('@common/enums').pgPetGenderEnum
    })) as Pet[]
  }
}
