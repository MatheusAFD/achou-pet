import { IsString, IsNotEmpty } from 'class-validator'

export class CreateTermDto {
  @IsString()
  @IsNotEmpty()
  version: string

  @IsString()
  @IsNotEmpty()
  content: string // HTML string
}
