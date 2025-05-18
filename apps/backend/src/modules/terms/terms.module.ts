import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { TermsController } from './terms.controller'
import { TermsService } from './terms.service'

@Module({
  imports: [DrizzleModule],
  controllers: [TermsController],
  providers: [TermsService],
  exports: [TermsService]
})
export class TermsModule {}
