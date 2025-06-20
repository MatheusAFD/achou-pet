import { Controller, Post, Body } from '@nestjs/common'

import { Public } from '@common/decorators/auth'

import { CheckTokenDto } from './dto/check-token.dto'
import { CreateTokenDto } from './dto/create-token.dto'
import { TokensService } from './tokens.service'

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Public()
  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.sendToken(createTokenDto)
  }

  @Public()
  @Post('check-token')
  findOne(@Body() body: CheckTokenDto) {
    return this.tokensService.check(body)
  }
}
