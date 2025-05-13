import { Controller, Get } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

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
}
