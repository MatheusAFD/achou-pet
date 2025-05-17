import { forwardRef, Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'
import { StorageModule } from '@modules/storage/storage.module'

import { PetsController } from './pets.controller'
import { PetsService } from './pets.service'

@Module({
  imports: [DrizzleModule, forwardRef(() => StorageModule)],
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {}
