import { Controller, Post, Body } from '@nestjs/common'

import { Public } from '@common/decorators/auth'

import { CreateUserDto } from './dto/create-user.dto'
import { GetUserCredentialsUseCase } from './use-cases'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly getUserCredentialsUseCase: GetUserCredentialsUseCase
  ) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
