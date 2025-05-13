import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { pgPetGenderEnum } from '@common/enums'
import { createCustomId } from '@common/lib'
import { timestamps } from '@common/utils'

import { credentials } from './credentials'

export const pets = pgTable('pets', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  name: text('name').notNull(),
  gender: pgPetGenderEnum('gender').notNull(),
  birthDate: timestamp('birth_date'),
  species: text('species').notNull(),
  breed: text('breed'),
  size: text('size'),
  color: text('color'),
  isVaccinated: boolean('is_vaccinated').default(false),
  hasAllergies: boolean('has_allergies').default(false),
  needsMedication: boolean('needs_medication').default(false),
  medicationDescription: text('medication_description'),
  photoUrl: text('photo_url'),
  credentialId: text('credential_id')
    .unique()
    .references(() => credentials.id),
  ...timestamps
})

export const petsRelations = relations(pets, ({ one }) => ({
  credential: one(credentials, {
    fields: [pets.credentialId],
    references: [credentials.id]
  })
}))
