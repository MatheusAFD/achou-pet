import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'
import { User } from '@modules/users/entities/user.entity'

import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

import { AddressesService } from './addresses.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { Address } from './entities/address.entity'
import { SetPrimaryAddressUseCase } from './use-cases/set-primary-address.use-case'

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly setPrimaryAddressUseCase: SetPrimaryAddressUseCase
  ) {}

  @Post()
  @Roles(RoleEnum.USER)
  create(
    @Body() createAddressDto: CreateAddressDto,
    @CurrentUser() user: User
  ) {
    return this.addressesService.create(user.id, createAddressDto)
  }

  @Get()
  @Roles(RoleEnum.USER)
  findAll(@CurrentUser() user: AuthUser): Promise<Address[]> {
    return this.addressesService.findAll(user.id)
  }

  @Get(':id')
  @Roles(RoleEnum.USER)
  findOne(@Param('id') id: string): Promise<Address> {
    return this.addressesService.findOne(id)
  }

  @Patch(':id')
  @Roles(RoleEnum.USER)
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto
  ): Promise<Address> {
    return this.addressesService.update(id, updateAddressDto)
  }

  @Patch('set-primary/:id')
  @Roles(RoleEnum.USER)
  async setPrimary(
    @Param('id') id: string,
    @CurrentUser() user: User
  ): Promise<Address> {
    return this.setPrimaryAddressUseCase.execute(user.id, id)
  }
}
