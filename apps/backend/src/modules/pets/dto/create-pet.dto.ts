import { ApiProperty } from '@nestjs/swagger'

import { Transform } from 'class-transformer'
import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString
} from 'class-validator'

import { PetSizeEnum, pgPetGenderEnum } from '@common/enums'

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
  @IsEnum(PetSizeEnum)
  @Transform(({ value }) => String(value).toUpperCase())
  size?: keyof typeof PetSizeEnum

  @ApiProperty({ enum: pgPetGenderEnum })
  @IsEnum(pgPetGenderEnum)
  @Transform(({ value }) => String(value).toUpperCase())
  gender: keyof typeof pgPetGenderEnum

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string

  @ApiProperty({ required: false })
  @IsBoolean()
  isVaccinated?: boolean

  @ApiProperty({ required: false })
  @IsBoolean()
  hasAllergies?: boolean

  @ApiProperty({ required: false })
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

  @ApiProperty()
  @IsString()
  credentialId: string
}
