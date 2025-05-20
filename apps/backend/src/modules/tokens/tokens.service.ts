import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { and, eq } from 'drizzle-orm'

import { env } from 'process'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { tokens } from '@db/drizzle/schema/tokens'
import { DrizzleSchema } from '@db/drizzle/types'

import { EmailsService } from '@modules/emails/emails.service'

import { CheckTokenDto } from './dto/check-token.dto'
import { CreateTokenDto } from './dto/create-token.dto'
import { generateSixDigitToken } from './utils'

@Injectable()
export class TokensService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    private readonly emailsService: EmailsService
  ) {}

  async sendToken(createTokenDto: CreateTokenDto) {
    try {
      const { key } = createTokenDto

      const [token] = await this.db
        .select()
        .from(tokens)
        .where(eq(tokens.key, key))
        .limit(1)

      const tokenIsValid = new Date(token?.expiresAt).getTime() > Date.now()

      if (tokenIsValid) {
        return {
          isValid: true,
          token
        }
      }

      const value = generateSixDigitToken()

      const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000

      const expiresAt = new Date(
        Date.now() + ONE_HOUR_IN_MILLISECONDS
      ).toISOString()

      const [createdToken] = await this.db
        .insert(tokens)
        .values({
          expiresAt,
          key,
          value
        })
        .returning()

      await this.emailsService.send({
        from: env.RESEND_EMAIL_FROM,
        subject: 'Achou Pet - Seu código de verificação',
        to: key,
        html: `<h1>Seu código de verificação é: <strong>${createdToken.value}</strong></h1>`
      })

      return createdToken
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async check(body: CheckTokenDto) {
    const { key, value } = body

    const [token] = await this.db
      .select()
      .from(tokens)
      .where(and(eq(tokens.value, value), eq(tokens.key, key)))

    if (!token) {
      throw new NotFoundException('Token not found')
    }

    const tokenHasExpired = new Date(token.expiresAt) < new Date()

    if (tokenHasExpired) {
      throw new BadRequestException('Token has expired')
    }

    return {
      isValid: true,
      token
    }
  }
}
