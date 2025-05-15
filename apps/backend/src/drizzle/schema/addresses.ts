import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'

import { pgAddressTypeEnum } from '@common/enums/db-enums'
import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { users } from './users'

export const addresses = pgTable('addresses', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  type: pgAddressTypeEnum().notNull(),
  address: text('address').notNull(),
  number: text('number').notNull(),
  complement: text('complement'),
  neighborhood: text('neighborhood').notNull(),
  reference: text('reference'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  ...timestamps
})

export const addressRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id]
  })
}))
