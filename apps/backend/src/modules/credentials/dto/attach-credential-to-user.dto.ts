import { IsOptional, IsString } from 'class-validator'

export class AttachCredentialToUserDto {
  @IsString()
  @IsOptional()
  description: string | null
}
