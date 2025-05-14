import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common'

import { AuthUser } from '@modules/auth/entities/auth.entity'

import { Public, Roles } from '@common/decorators/auth'
import { CurrentUser } from '@common/decorators/user'
import { RoleEnum } from '@common/enums'

import { CreatePetDto } from '../pets/dto/create-pet.dto'
import { CredentialsService } from './credentials.service'
import { CreateCredentialDto } from './dto/'
import {
  GetCredentialDetailsUseCase,
  AttachCredentialToUserUseCase,
  GenerateBatchCredentialsUseCase
} from './use-cases'

@Controller('credentials')
export class CredentialsController {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly getCredentialDetailsUseCase: GetCredentialDetailsUseCase,
    private readonly attachCredentialToUserUseCase: AttachCredentialToUserUseCase,
    private readonly generateBatchCredentialsUseCase: GenerateBatchCredentialsUseCase
  ) {}

  @Post()
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  create(@Body() createCredentiaslDto: CreateCredentialDto) {
    return this.generateBatchCredentialsUseCase.execute(createCredentiaslDto)
  }

  @Get(':id')
  @Roles(RoleEnum.USER)
  async getOne(@Param('id') id: string) {
    return this.credentialsService.findOne(id)
  }

  @Get('details/:id')
  @Public()
  async getCredentialDetails(@Param('id') id: string) {
    return this.getCredentialDetailsUseCase.execute(id)
  }

  @Patch(':id')
  @Roles(RoleEnum.USER)
  update(
    @Param('id') id: string,
    @Body()
    attachCredentialDto: CreatePetDto,
    @CurrentUser() user: AuthUser
  ) {
    return this.attachCredentialToUserUseCase.execute(
      {
        credentialId: id,
        userId: user.id
      },
      attachCredentialDto
    )
  }
}
