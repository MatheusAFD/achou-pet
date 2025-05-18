import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { DrizzleModule } from '@modules/drizzle/drizzle.module'
import { TermsModule } from '@modules/terms/terms.module'
import { UsersModule } from '@modules/users/users.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    DrizzleModule,
    PassportModule,
    forwardRef(() => UsersModule),
    forwardRef(() => TermsModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h', algorithm: 'HS256' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
