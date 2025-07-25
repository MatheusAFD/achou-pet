import { Inject, InternalServerErrorException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { missingAlerts } from '@db/drizzle/schema/missing-alerts'
import { pets } from '@db/drizzle/schema/pets'
import { DrizzleSchema } from '@db/drizzle/types'

import { CreateMissingAlertDto } from '../dto/create-missing-alert.dto'
import { MissingAlert } from '../entities/missing-alert.entity'

export class CreateMissingAlertUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async execute(
    createMissingAlertDto: CreateMissingAlertDto
  ): Promise<MissingAlert> {
    try {
      const result = await this.db.transaction(async (tx) => {
        const [createdAlert] = await tx
          .insert(missingAlerts)
          .values(createMissingAlertDto)
          .returning()

        await tx
          .update(pets)
          .set({ isMissing: true })
          .where(eq(pets.id, createMissingAlertDto.petId))

        return createdAlert
      })
      return result
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
