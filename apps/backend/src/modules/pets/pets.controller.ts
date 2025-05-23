import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

import { CreatePetDto } from './dto/create-pet.dto'
import { UpdatePetDto } from './dto/update-pet.dto'
import { Pet } from './entities/pet.entity'
import { PetsService } from './pets.service'

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get('/me')
  @Roles(RoleEnum.USER)
  async findAllByUser(@CurrentUser() user: AuthUser): Promise<Pet[]> {
    return this.petsService.findAllByUser(user.id)
  }

  @Get(':id')
  @Roles(RoleEnum.USER)
  async findOne(@Param('id') id: string): Promise<Pet> {
    return this.petsService.findOne(id)
  }

  @Patch(':id')
  @Roles(RoleEnum.USER)
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto
  ): Promise<Pet> {
    return this.petsService.update(id, updatePetDto)
  }

  @Post()
  @Roles(RoleEnum.USER)
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.create(createPetDto)
  }
}
