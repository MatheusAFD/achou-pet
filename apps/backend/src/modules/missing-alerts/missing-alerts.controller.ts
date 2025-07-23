import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common'

import { CreateMissingAlertDto } from './dto/create-missing-alert.dto'
import { MissingAlert } from './entities/missing-alert.entity'
import { MissingAlertsService } from './missing-alerts.service'
import { CreateMissingAlertUseCase } from './use-cases/create-missing-alert.use-case'
import { RemoveMissingAlertUseCase } from './use-cases/remove-missing-alert.use-case'

@Controller('missing-alerts')
export class MissingAlertsController {
  constructor(
    private readonly createMissingAlertUseCase: CreateMissingAlertUseCase,
    private readonly removeMissingAlertUseCase: RemoveMissingAlertUseCase,
    private readonly missingAlertsService: MissingAlertsService
  ) {}

  @Post()
  create(
    @Body() createMissingAlertDto: CreateMissingAlertDto
  ): Promise<MissingAlert> {
    return this.createMissingAlertUseCase.execute(createMissingAlertDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<MissingAlert> {
    return this.removeMissingAlertUseCase.execute(id)
  }

  @Get('active')
  findAllActive(): Promise<MissingAlert[]> {
    return this.missingAlertsService.findAllActive()
  }
}
