import { Controller, Get, Post, Body } from '@nestjs/common'

import { CheckTokenDto } from './dto/check-token.dto'
import { CreateTokenDto } from './dto/create-token.dto'
import { TokensService } from './tokens.service'

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.sendToken(createTokenDto)
  }

  @Get('check-token')
  findOne(@Body() body: CheckTokenDto) {
    return this.tokensService.check(body)
  }
}
