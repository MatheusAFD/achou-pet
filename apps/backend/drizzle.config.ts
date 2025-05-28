import { Config, defineConfig } from 'drizzle-kit'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  dialect: 'postgresql',
  schema: isProd ? './dist/src/drizzle/schema' : './src/drizzle/schema',
  out: isProd ? './dist/src/drizzle/migrations' : './src/drizzle/migrations',
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
