import { ApiProperty } from '@nestjs/swagger'

import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString
} from 'class-validator'

import { pgPetGenderEnum } from '@common/enums'

export class CreatePetDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ enum: pgPetGenderEnum })
  @IsEnum(pgPetGenderEnum)
  gender: keyof typeof pgPetGenderEnum

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  size?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isVaccinated?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  hasAllergies?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
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
