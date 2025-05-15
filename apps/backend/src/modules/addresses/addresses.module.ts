import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { AddressesController } from './addresses.controller'
import { AddressesService } from './addresses.service'
import { SetPrimaryAddressUseCase } from './use-cases'

@Module({
  imports: [DrizzleModule],
  controllers: [AddressesController],
  providers: [AddressesService, SetPrimaryAddressUseCase],
  exports: [AddressesService, SetPrimaryAddressUseCase]
})
export class AddressesModule {}
