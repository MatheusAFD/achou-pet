import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { GetUserCredentialsUseCase } from './use-cases'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [UsersService, GetUserCredentialsUseCase],
  exports: [UsersService]
})
export class UsersModule {}
