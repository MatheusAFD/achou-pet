import { IsString, IsNotEmpty } from 'class-validator'

import { missingAlerts } from '@db/drizzle/schema/missing-alerts'

type MissingAlertType = Omit<typeof missingAlerts.$inferInsert, 'status'>

export class ToggleMissingAlertDto implements MissingAlertType {
  @IsString()
  @IsNotEmpty()
  petId: string
}
