import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { Public, Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get('/me/credentials')
  @Roles(RoleEnum.USER)
  findAllByUser(@CurrentUser() user: AuthUser) {
    return this.getUserCredentialsUseCase.execute(user.id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }
}
