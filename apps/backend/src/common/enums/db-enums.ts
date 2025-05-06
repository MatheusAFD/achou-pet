import { pgEnum } from 'drizzle-orm/pg-core'

import { z } from 'zod'

export const pgRoleEnum = pgEnum('role', ['USER', 'ADMIN', 'SUPER_ADMIN'])
export const pgAddressTypeEnum = pgEnum('address_type', [
  'PRIMARY',
  'SECONDARY'
])

export const RoleEnum = z.enum(pgRoleEnum.enumValues).Enum
export const AddressTypeEnum = z.enum(pgAddressTypeEnum.enumValues).Enum
