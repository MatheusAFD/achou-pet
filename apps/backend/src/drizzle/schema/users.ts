import { pgTable, text } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),

  ...timestamps
})
