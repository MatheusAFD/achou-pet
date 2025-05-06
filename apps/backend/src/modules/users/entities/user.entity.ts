import { Exclude } from 'class-transformer'

import { RoleEnum, users } from '@db/drizzle/schema'

type UserSelect = typeof users.$inferSelect

export class User implements UserSelect {
  id: string
  name: string
  lastName: string
  email: string

  @Exclude()
  password: string

  phone: string
  role: keyof typeof RoleEnum

  lastLogin: Date | null
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
