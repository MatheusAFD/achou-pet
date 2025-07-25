import { Inject, InternalServerErrorException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { missingAlerts } from '@db/drizzle/schema/missing-alerts'
import { pets } from '@db/drizzle/schema/pets'
import { DrizzleSchema } from '@db/drizzle/types'

import { MissingAlertsStatusEnum } from '@common/enums/db-enums'

import { MissingAlert } from '../entities/missing-alert.entity'
import { MissingAlertsService } from '../missing-alerts.service'

export class RemoveMissingAlertUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    private readonly missingAlertsService: MissingAlertsService
  ) {}

  async execute(id: string): Promise<MissingAlert> {
    try {
      const result = await this.db.transaction(async (tx) => {
        const alert = await this.missingAlertsService.findOne(id)

        const [updatedAlert] = await tx
          .update(missingAlerts)
          .set({ status: MissingAlertsStatusEnum.INACTIVE })
          .where(eq(missingAlerts.id, alert.id))
          .returning()

        await tx
          .update(pets)
          .set({ isMissing: false })
          .where(eq(pets.id, alert.petId))

        return updatedAlert
      })
      return result
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
