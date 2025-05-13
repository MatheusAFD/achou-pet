import { IsString, MinLength } from 'class-validator'

export class AttachCredentialToUserDto {
  @MinLength(1)
  @IsString()
  petName: string

  @IsString()
  description: string | null
}
