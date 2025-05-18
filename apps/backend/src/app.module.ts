import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ThrottlerModule } from '@nestjs/throttler'

import { AuthModule } from '@modules/auth/auth.module'
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard'
import { RolesGuard } from '@modules/auth/role.guard'
import { ThrottlerUserGuard } from '@modules/auth/throttler-user.guard'
import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AddressesModule } from './modules/addresses/addresses.module'
import { BatchesModule } from './modules/batches/batches.module'
import { CredentialsModule } from './modules/credentials/credentials.module'
import { PetsModule } from './modules/pets/pets.module'
import { StorageModule } from './modules/storage/storage.module'
import { UsersModule } from './modules/users/users.module'
import { TermsModule } from './modules/terms/terms.module';

const ONE_MINUTE_IN_MS = 60 * 1000

@Module({
  imports: [
    DrizzleModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: ONE_MINUTE_IN_MS,
          limit: 100
        }
      ]
    }),
    UsersModule,
    AddressesModule,
    CredentialsModule,
    BatchesModule,
    PetsModule,
    StorageModule,
    TermsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerUserGuard
    }
  ]
})
export class AppModule {}
