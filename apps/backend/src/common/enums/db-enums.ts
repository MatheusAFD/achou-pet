import { pgEnum } from 'drizzle-orm/pg-core'

import { z } from 'zod'

export const pgRoleEnum = pgEnum('role', ['USER', 'ADMIN', 'SUPER_ADMIN'])
export const pgCredentialsStatusEnum = pgEnum('credentialStatus', [
  'ACTIVE',
  'INACTIVE',
  'PENDING'
])
export const pgAddressTypeEnum = pgEnum('address_type', [
  'PRIMARY',
  'SECONDARY'
])

export const pgPetGenderEnum = pgEnum('pet_gender', ['MALE', 'FEMALE'])

export const pgPetSizeEnum = pgEnum('pet_size', ['SMALL', 'MEDIUM', 'LARGE'])

export const RoleEnum = z.enum(pgRoleEnum.enumValues).Enum
export const AddressTypeEnum = z.enum(pgAddressTypeEnum.enumValues).Enum
export const CredentialsStatusEnum = z.enum(
  pgCredentialsStatusEnum.enumValues
).Enum

export const PetSizeEnum = z.enum(pgPetSizeEnum.enumValues).Enum
export const PetGenderEnum = z.enum(pgPetGenderEnum.enumValues).Enum
