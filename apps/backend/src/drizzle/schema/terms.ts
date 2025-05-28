import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { pgUserTermSituationEnum } from '../../common/enums/db-enums'
import { createCustomId } from '../../common/lib'
import { timestamps } from '../../common/utils'
import { users } from './users'

export const terms = pgTable('terms', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  version: text('version').notNull(),
  content: text('content').notNull(),
  ...timestamps
})

export const userTerms = pgTable('user_terms', {
  id: text('id')
    .primaryKey()
    .$default(() => createCustomId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  termId: text('term_id')
    .notNull()
    .references(() => terms.id),
  situation: pgUserTermSituationEnum('situation').notNull().default('PENDING'),
  acceptedAt: timestamp('accepted_at'),
  ...timestamps
})

export const termsRelations = relations(terms, ({ many }) => ({
  userTerms: many(userTerms)
}))

export const userTermsRelations = relations(userTerms, ({ one }) => ({
  user: one(users, {
    fields: [userTerms.userId],
    references: [users.id]
  }),
  term: one(terms, {
    fields: [userTerms.termId],
    references: [terms.id]
  })
}))
