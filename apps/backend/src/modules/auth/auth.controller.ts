import { Controller, Post, Body, Get } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

import { TermsService } from '@modules/terms/terms.service'
import { UsersService } from '@modules/users/users.service'

import { Public } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'

import { AuthService } from './auth.service'
import { SigninDTO } from './dto/'
import { AuthUser } from './entities/auth.entity'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly termsService: TermsService
  ) {}

  @Post('sign-in')
  @Public()
  @ApiBody({ type: SigninDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 201, description: 'OK' })
  create(@Body() { email, password }: SigninDTO) {
    return this.authService.signin({ email, password })
  }

  @Get('get-me')
  async getMe(@CurrentUser() user: AuthUser) {
    const userData = await this.userService.findOne(user.id)

    const hasPendingTerm = await this.termsService.hasPendingTerm(user.id)
    return { ...userData, hasPendingTerm }
  }
}
