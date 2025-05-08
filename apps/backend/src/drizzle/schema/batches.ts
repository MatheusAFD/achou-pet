import { relations } from 'drizzle-orm'
import { numeric, pgTable, serial, text } from 'drizzle-orm/pg-core'

import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { credentials } from './credentials'

export const batches = pgTable('batches', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  shortId: serial('short_id').unique(),
  description: text('description').notNull(),
  comments: text('comments'),
  totalCredentialsGenerated: numeric('totalCredentialsGenerated').notNull(),
  ...timestamps
})

export const batchesRelations = relations(batches, ({ many }) => ({
  credentials: many(credentials)
}))
