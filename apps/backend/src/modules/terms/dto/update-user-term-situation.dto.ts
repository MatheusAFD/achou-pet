import { IsEnum } from 'class-validator'

import { UserTermSituationEnum } from '@common/enums/db-enums'

export class UpdateUserTermSituationDto {
  @IsEnum(UserTermSituationEnum)
  situation: keyof typeof UserTermSituationEnum
}
