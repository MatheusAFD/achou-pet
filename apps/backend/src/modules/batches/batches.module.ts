import { forwardRef, Module } from '@nestjs/common'

import { CredentialsModule } from '@modules/credentials/credentials.module'
import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { BatchesController } from './batches.controller'
import { BatchesService } from './batches.service'
import { ExportBatchCredentialsQRCodesUseCase } from './use-cases/export-batch-credentials-qrcodes.use-case'

@Module({
  imports: [DrizzleModule, forwardRef(() => CredentialsModule)],
  controllers: [BatchesController],
  providers: [BatchesService, ExportBatchCredentialsQRCodesUseCase],
  exports: [BatchesService]
})
export class BatchesModule {}
