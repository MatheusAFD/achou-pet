import { IsEnum, IsString } from 'class-validator'

import { MissingAlertsStatusEnum } from '@common/enums/db-enums'

export class CreateMissingAlertDto {
  @IsString()
  petId: string

  @IsEnum(MissingAlertsStatusEnum)
  status: keyof typeof MissingAlertsStatusEnum
}
