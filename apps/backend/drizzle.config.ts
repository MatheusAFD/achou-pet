import { Config, defineConfig } from 'drizzle-kit'

import fs from 'fs'

function resolvePath(primary: string, fallback: string) {
  return fs.existsSync(primary) ? primary : fallback
}

export default defineConfig({
  dialect: 'postgresql',
  schema: resolvePath('./dist/src/drizzle/schema', './src/drizzle/schema'),
  out: resolvePath('./dist/src/drizzle/migrations', './src/drizzle/migrations'),
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      (() => {
        throw new Error('DATABASE_URL environment variable is not set')
      })()
  },
  verbose: true,
  strict: true
} satisfies Config)
