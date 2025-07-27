import { Inject, InternalServerErrorException } from '@nestjs/common'

import { eq, and } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { missingAlerts } from '@db/drizzle/schema/missing-alerts'
import { pets } from '@db/drizzle/schema/pets'
import { DrizzleSchema } from '@db/drizzle/types'

import { MissingAlertsStatusEnum } from '@common/enums/db-enums'

import { ToggleMissingAlertDto } from '../dto/toggle-missing-alert.dto'
import { MissingAlert } from '../entities/missing-alert.entity'

export class ToggleMissingAlertUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async execute(dto: ToggleMissingAlertDto): Promise<MissingAlert | null> {
    try {
      const result = await this.db.transaction(async (tx) => {
        const [activeAlert] = await tx
          .select()
          .from(missingAlerts)
          .where(
            and(
              eq(missingAlerts.petId, dto.petId),
              eq(missingAlerts.status, MissingAlertsStatusEnum.ACTIVE)
            )
          )
          .limit(1)

        if (activeAlert) {
          const [updatedAlert] = await tx
            .update(missingAlerts)
            .set({ status: MissingAlertsStatusEnum.INACTIVE })
            .where(eq(missingAlerts.id, activeAlert.id))
            .returning()

          await tx
            .update(pets)
            .set({ isMissing: false })
            .where(eq(pets.id, dto.petId))

          return {
            ...updatedAlert,
            isMissing: false
          }
        }

        const [createdAlert] = await tx
          .insert(missingAlerts)
          .values({ ...dto, status: MissingAlertsStatusEnum.ACTIVE })
          .returning()

        await tx
          .update(pets)
          .set({ isMissing: true })
          .where(eq(pets.id, dto.petId))

        return {
          ...createdAlert,
          isMissing: true
        }
      })
      return result
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
