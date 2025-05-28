import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { eq, and, desc } from 'drizzle-orm'

import { plainToClass } from 'class-transformer'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { userTerms, users, RoleEnum } from '@db/drizzle/schema/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { UserTermSituationEnum } from '@common/enums/db-enums'
import { encryptData } from '@common/lib'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await encryptData(createUserDto.password)

      const [createdUser] = await this.db
        .insert(users)
        .values({
          ...createUserDto,
          password: hashedPassword,
          role: RoleEnum.USER
        })
        .returning()

      return plainToClass(User, createdUser)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string) {
    const [result] = await this.db
      .select({
        user: users,
        pendingTermId: userTerms.termId
      })
      .from(users)
      .leftJoin(
        userTerms,
        and(
          eq(userTerms.userId, users.id),
          eq(userTerms.situation, UserTermSituationEnum.PENDING)
        )
      )
      .where(eq(users.id, id))
      .orderBy(desc(userTerms.createdAt))
      .limit(1)

    if (!result || !result.user) {
      throw new NotFoundException('User not found')
    }

    const hasPendingTerm = !!result.pendingTermId
    const user = plainToClass(User, result.user)

    return { ...user, hasPendingTerm }
  }
}
