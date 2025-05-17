import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

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
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @UploadedFile() photo?: any
  ): Promise<Pet> {
    return this.petsService.update(id, updatePetDto, photo)
  }

  @Post()
  @Roles(RoleEnum.USER)
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFile() photo?: any
  ): Promise<Pet> {
    return this.petsService.create(createPetDto, photo)
  }
}
