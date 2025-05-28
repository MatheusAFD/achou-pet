import { Config, defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema:
    process.env.NODE_ENV === 'production'
      ? './dist/src/drizzle/schema'
      : './src/drizzle/schema',
  out: './src/drizzle/migrations',
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
