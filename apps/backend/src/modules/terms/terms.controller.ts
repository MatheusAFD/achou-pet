import { Controller, Get, Post, Body } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'

import { UpdateUserTermSituationDto } from './dto/update-user-term-situation.dto'
import { TermsService } from './terms.service'

@Controller('terms')
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Get('pending')
  @Roles('USER')
  async getPendingTerm(@CurrentUser() user: AuthUser) {
    const { term } = await this.termsService.getPendingTermForUser(user.id)

    return term
  }

  @Post('situation')
  @Roles('USER')
  async updateUserTermSituation(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateUserTermSituationDto
  ) {
    return this.termsService.updateUserTermSituation(user.id, dto.situation)
  }
}
