import { ApiProperty, PartialType } from '@nestjs/swagger'

import { CreatePetDto } from './create-pet.dto'

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  photo?: any
}
