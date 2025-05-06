import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { AddressesController } from './addresses.controller'
import { AddressesService } from './addresses.service'

@Module({
  imports: [DrizzleModule],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {}
