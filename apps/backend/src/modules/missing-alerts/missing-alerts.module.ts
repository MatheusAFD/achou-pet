import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { MissingAlertsController } from './missing-alerts.controller'
import { MissingAlertsService } from './missing-alerts.service'
import { CreateMissingAlertUseCase } from './use-cases/create-missing-alert.use-case'
import { RemoveMissingAlertUseCase } from './use-cases/remove-missing-alert.use-case'

@Module({
  imports: [DrizzleModule],
  controllers: [MissingAlertsController],
  providers: [
    MissingAlertsService,
    CreateMissingAlertUseCase,
    RemoveMissingAlertUseCase
  ],
  exports: [MissingAlertsService]
})
export class MissingAlertsModule {}
