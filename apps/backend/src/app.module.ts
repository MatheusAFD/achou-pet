import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { AuthModule } from '@modules/auth/auth.module'
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard'
import { RolesGuard } from '@modules/auth/role.guard'
import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AddressesModule } from './modules/addresses/addresses.module'
import { BatchesModule } from './modules/batches/batches.module'
import { CredentialsModule } from './modules/credentials/credentials.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    DrizzleModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AddressesModule,
    CredentialsModule,
    BatchesModule
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
    }
  ]
})
export class AppModule {}
