import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'
import { SkipThrottle } from '@nestjs/throttler'

import { Public } from '@common/decorators/auth'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
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
  @SkipThrottle()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }
}
