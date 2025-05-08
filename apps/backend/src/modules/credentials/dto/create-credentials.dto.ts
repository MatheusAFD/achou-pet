import { IsNumber, IsString, Min } from 'class-validator'

export class CreateCredentialDto {
  @IsNumber()
  @Min(1)
  numberOfCredentials: number

  @IsString()
  description: string
}
