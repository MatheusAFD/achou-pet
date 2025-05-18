import { ApiProperty } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString
} from 'class-validator'

import { PetGenderEnum, PetSizeEnum } from '@common/enums'

export class CreatePetDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birthDate?: Date

  @ApiProperty()
  @IsString()
  species: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  breed?: string

  @ApiProperty({ enum: PetSizeEnum })
  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(PetSizeEnum)
  size: keyof typeof PetSizeEnum

  @ApiProperty({ enum: PetGenderEnum })
  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(PetGenderEnum)
  gender: keyof typeof PetGenderEnum

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isVaccinated?: boolean

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  hasAllergies?: boolean

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  needsMedication?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  medicationDescription?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  photoUrl?: string

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  @IsOptional()
  photo?: File
}
