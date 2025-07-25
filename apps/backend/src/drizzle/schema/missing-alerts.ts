import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'

import { pgMissingAlertStatusEnum } from '@common/enums'
import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { pets } from './pets'

export const missingAlerts = pgTable('missing_alerts', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  status: pgMissingAlertStatusEnum('status').notNull(),
  petId: text('pet_id')
    .notNull()
    .references(() => pets.id),
  ...timestamps
})

export const missingAlertsRelations = relations(missingAlerts, ({ one }) => ({
  pet: one(pets, {
    fields: [missingAlerts.petId],
    references: [pets.id]
  })
}))
