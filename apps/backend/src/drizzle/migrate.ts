import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { env } from 'env'
import path from 'path'
import pg from 'pg'
import { exit } from 'process'

import * as schema from './schema'

void (async () => {
  const pool = new pg.Pool({
    connectionString: env.DATABASE_URL
  })
  let db: NodePgDatabase<typeof schema> | null = null
  db = drizzle(pool, {
    schema: {
      ...schema
    }
  })

  const migrationPath = path.join(process.cwd(), 'src/drizzle/migrations')

  await migrate(db, { migrationsFolder: migrationPath })

  console.log('Migration complete')
  exit(0)
})()
