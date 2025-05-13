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

export const pgPetGenderEnum = pgEnum('pet_gender', [
  'MALE',
  'FEMALE',
  'UNKNOWN'
])

export const RoleEnum = z.enum(pgRoleEnum.enumValues).Enum
export const AddressTypeEnum = z.enum(pgAddressTypeEnum.enumValues).Enum
export const CredentialsStatusEnum = z.enum(
  pgCredentialsStatusEnum.enumValues
).Enum
