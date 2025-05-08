import { forwardRef, Module } from '@nestjs/common'

import { BatchesModule } from '@modules/batches/batches.module'
import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { CredentialsController } from './credentials.controller'
import { CredentialsService } from './credentials.service'
import {
  GetCredentialDetailsUseCase,
  AttachCredentialToUserUseCase,
  GenerateBatchCredentialsUseCase
} from './use-cases'

@Module({
  imports: [DrizzleModule, forwardRef(() => BatchesModule)],
  controllers: [CredentialsController],
  providers: [
    CredentialsService,
    GetCredentialDetailsUseCase,
    AttachCredentialToUserUseCase,
    GenerateBatchCredentialsUseCase
  ],
  exports: [CredentialsService]
})
export class CredentialsModule {}
