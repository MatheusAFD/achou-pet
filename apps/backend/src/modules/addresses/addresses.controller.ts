import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'

import { User } from '@modules/users/entities/user.entity'

import { CurrentUser } from '@common/decorators/user'

import { AddressesService } from './addresses.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
    @CurrentUser() user: User
  ) {
    console.log('user', user)
    return this.addressesService.create(user.id, createAddressDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto)
  }
}
