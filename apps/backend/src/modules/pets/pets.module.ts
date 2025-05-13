import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { PetsController } from './pets.controller'
import { PetsService } from './pets.service'

@Module({
  imports: [DrizzleModule],
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {}
