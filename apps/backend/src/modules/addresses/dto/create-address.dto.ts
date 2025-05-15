import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'

import { addresses, AddressTypeEnum } from '@db/drizzle/schema'

type CreateAddressInsert = Omit<typeof addresses.$inferInsert, 'userId'>

export class CreateAddressDto implements CreateAddressInsert {
  @IsString()
  address: string

  @IsString()
  @MinLength(1)
  number: string

  @IsNotEmpty()
  @IsString()
  neighborhood: string

  @MinLength(3)
  @IsString()
  city: string

  @MinLength(3)
  @IsString()
  state: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  zipCode: string

  @IsNotEmpty()
  @IsString()
  @IsEnum(AddressTypeEnum)
  type: keyof typeof AddressTypeEnum

  @IsString()
  reference: string

  @IsOptional()
  @IsString()
  complement: string
}
