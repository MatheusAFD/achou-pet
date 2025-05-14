import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'

import { User } from '@modules/users/entities/user.entity'

import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

import { AddressesService } from './addresses.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { Address } from './entities/address.entity'

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @Roles(RoleEnum.USER)
  create(
    @Body() createAddressDto: CreateAddressDto,
    @CurrentUser() user: User
  ) {
    return this.addressesService.create(user.id, createAddressDto)
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
}
