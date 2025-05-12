import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { pgRoleEnum } from '@common/enums'
import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { addresses } from './addresses'
import { credentials } from './credentials'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  phone: text('phone').notNull(),
  role: pgRoleEnum().notNull(),
  canDisplayAddress: boolean('allow_show_address').notNull().default(false),
  lastLogin: timestamp('last_login'),
  ...timestamps
})

export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
  credentials: many(credentials)
}))
