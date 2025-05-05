import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class DefaultFilterDTO {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value).toLocaleLowerCase().trim())
  search: string

  @IsOptional()
  @Transform(({ value }) => parseInt(String(value), 10), { toClassOnly: true })
  @IsInt()
  page: number

  @IsOptional()
  @Transform(({ value }) => parseInt(String(value), 10), { toClassOnly: true })
  @IsInt()
  limit: number
}
