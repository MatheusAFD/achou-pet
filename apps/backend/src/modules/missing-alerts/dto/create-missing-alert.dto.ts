import { IsEnum, IsString } from 'class-validator'

import { missingAlerts } from '@db/drizzle/schema/missing-alerts'

import { MissingAlertsStatusEnum } from '@common/enums/db-enums'

type CreateMissingAlert = typeof missingAlerts.$inferInsert

export class CreateMissingAlertDto implements CreateMissingAlert {
  @IsString()
  petId: string

  @IsEnum(MissingAlertsStatusEnum)
  status: keyof typeof MissingAlertsStatusEnum
}
