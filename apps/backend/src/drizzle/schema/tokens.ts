import { pgTable, text, varchar } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

export const tokens = pgTable('tokens', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  value: varchar('value', {
    length: 6
  }).notNull(),
  key: text('key').notNull(),
  expiresAt: text('expires_at').notNull(),
  ...timestamps
})
