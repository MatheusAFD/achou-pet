import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { CredentialsStatusEnum, pgCredentialsStatusEnum } from '@common/enums'
import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { batches, users } from './'

export const credentials = pgTable('credentials', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  shortId: text('short_id').notNull().unique(),
  petName: text('pet_name'),
  status: pgCredentialsStatusEnum().default(CredentialsStatusEnum.INACTIVE),
  description: text('description'),
  hasLifetimeAccess: boolean('is_foverer').default(true),
  expirationDate: timestamp('valid_until'),
  userId: text('user_id').references(() => users.id),
  batchId: text('batch_id')
    .notNull()
    .references(() => batches.id),
  activatedAt: timestamp('activated_at'),
  ...timestamps
})

export const credentialsRelations = relations(credentials, ({ one }) => ({
  user: one(users, {
    fields: [credentials.userId],
    references: [users.id]
  }),
  batch: one(batches, {
    fields: [credentials.batchId],
    references: [batches.id]
  })
}))
