import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { env } from 'env'
import { Request } from 'express'

import { IS_PUBLIC_KEY } from '@common/decorators/auth'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    if (!token) {
      throw new UnauthorizedException('Token not found')
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: env.JWT_SECRET
      })

      request['user'] = payload
    } catch (err) {
      console.log('Error verifying token:', err)
      throw new UnauthorizedException(err)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    if (type === 'Bearer' && token) {
      return token
    }

    const xAccessToken =
      request.headers['x-access-token'] || request.get?.('x-access-token')
    if (xAccessToken) {
      return Array.isArray(xAccessToken) ? xAccessToken[0] : xAccessToken
    }
    return undefined
  }
}
