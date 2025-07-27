import { Module } from '@nestjs/common'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'

import { MissingAlertsController } from './missing-alerts.controller'
import { MissingAlertsService } from './missing-alerts.service'
import { ToggleMissingAlertUseCase } from './use-cases/toggle-missing-alert.use-case'

@Module({
  imports: [DrizzleModule],
  controllers: [MissingAlertsController],
  providers: [MissingAlertsService, ToggleMissingAlertUseCase],
  exports: [MissingAlertsService]
})
export class MissingAlertsModule {}
