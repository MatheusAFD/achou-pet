import { IsString } from 'class-validator'

export class CreateTokenDto {
  @IsString()
  key: string
}
