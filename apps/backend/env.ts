import { z } from 'zod'

const envSchema = z.object({
  NEST_API_PORT: z.coerce.number().min(1000),
  BCRYPT_ROUNDS: z.coerce.number().min(1),
  CORS_ALLOWED_ORIGINS: z.array(z.string()),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
  RESEND_EMAIL_FROM: z.string(),
  POSTGRES_PASSWORD: z.string(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
  R2_PUBLIC_ENDPOINT: z.string(),
  R2_ENDPOINT: z.string().url(),
  R2_REGION: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string().url()
})

export const env = envSchema.parse({
  ...process.env,
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS?.split(',')
})
