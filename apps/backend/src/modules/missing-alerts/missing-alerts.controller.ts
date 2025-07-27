import { Controller, Get, Body, Post } from '@nestjs/common'

import { ToggleMissingAlertDto } from './dto/toggle-missing-alert.dto'
import { MissingAlert } from './entities/missing-alert.entity'
import { MissingAlertsService } from './missing-alerts.service'
import { ToggleMissingAlertUseCase } from './use-cases/toggle-missing-alert.use-case'

@Controller('missing-alerts')
export class MissingAlertsController {
  constructor(
    private readonly missingAlertsService: MissingAlertsService,
    private readonly toggleMissingAlertUseCase: ToggleMissingAlertUseCase
  ) {}

  @Get('active')
  findAllActive(): Promise<MissingAlert[]> {
    return this.missingAlertsService.findAllActive()
  }

  @Post('toggle')
  async toggle(@Body() toggleMissingAlertDto: ToggleMissingAlertDto) {
    return this.toggleMissingAlertUseCase.execute(toggleMissingAlertDto)
  }
}
