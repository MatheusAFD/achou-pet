import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { addresses, AddressTypeEnum } from '@db/drizzle/schema'

type CreateAddressInsert = Omit<typeof addresses.$inferInsert, 'userId'>

export class CreateAddressDto implements CreateAddressInsert {
  @IsString()
  address: string

  @IsString()
  number: string

  @IsNotEmpty()
  @IsString()
  neighborhood: string

  @IsString()
  city: string

  @IsString()
  state: string

  @IsNotEmpty()
  @IsString()
  country: string

  @IsNotEmpty()
  @IsString()
  zipCode: string

  @IsNotEmpty()
  @IsString()
  @IsEnum(AddressTypeEnum)
  type: keyof typeof AddressTypeEnum

  @IsOptional()
  @IsString()
  reference: string

  @IsOptional()
  @IsString()
  complement: string
}
