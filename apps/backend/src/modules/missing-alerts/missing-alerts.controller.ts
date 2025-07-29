import { Controller, Get, Body, Post } from '@nestjs/common'

import { Public } from '@common/decorators/auth'

import { ToggleMissingAlertDto } from './dto/toggle-missing-alert.dto'
import { MissingAlertsService } from './missing-alerts.service'
import { FindMissingAlertsResponse } from './types'
import { ToggleMissingAlertUseCase } from './use-cases/toggle-missing-alert.use-case'

@Controller('missing-alerts')
export class MissingAlertsController {
  constructor(
    private readonly missingAlertsService: MissingAlertsService,
    private readonly toggleMissingAlertUseCase: ToggleMissingAlertUseCase
  ) {}

  @Public()
  @Get('active')
  findAllActive(): Promise<FindMissingAlertsResponse> {
    return this.missingAlertsService.findAllActive()
  }

  @Post('toggle')
  async toggle(@Body() toggleMissingAlertDto: ToggleMissingAlertDto) {
    return this.toggleMissingAlertUseCase.execute(toggleMissingAlertDto)
  }
}
