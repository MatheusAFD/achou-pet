import { Controller, Post, Body, Get } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

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
    private readonly userService: UsersService
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
  getMe(@CurrentUser() user: AuthUser) {
    return this.userService.findOne(user.id)
  }
}
