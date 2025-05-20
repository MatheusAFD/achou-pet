import { IsString, MinLength } from 'class-validator'

export class CheckTokenDto {
  @IsString()
  @MinLength(6)
  value: string

  @IsString()
  key: string
}
