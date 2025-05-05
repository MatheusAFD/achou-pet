import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { env } from 'env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: env.CORS_ALLOWED_ORIGINS,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(env.NEST_API_PORT ?? 4000)
}
void bootstrap()
