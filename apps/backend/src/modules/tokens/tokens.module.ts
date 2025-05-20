import { forwardRef, Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'
import { EmailsModule } from '@modules/emails/emails.module'

import { TokensController } from './tokens.controller'
import { TokensService } from './tokens.service'

@Module({
  imports: [DrizzleModule, forwardRef(() => EmailsModule)],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService]
})
export class TokensModule {}
