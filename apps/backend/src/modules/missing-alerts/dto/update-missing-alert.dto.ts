import { PartialType } from '@nestjs/swagger'

import { CreateMissingAlertDto } from './create-missing-alert.dto'

export class UpdateMissingAlertDto extends PartialType(CreateMissingAlertDto) {}
