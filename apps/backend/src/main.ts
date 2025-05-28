import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import './instrument'

import { env } from 'env'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.set('trust proxy', process.env.NODE_ENV === 'production' ? true : 1)

  app.setGlobalPrefix('api')

  const origins = env.CORS_ALLOWED_ORIGINS

  app.enableCors({
    origin: origins,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
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
