import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text().primaryKey().default('createCustomId()'),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: text().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at')
})
