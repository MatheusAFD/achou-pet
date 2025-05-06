import {
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'

import { plainToClass } from 'class-transformer'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { RoleEnum, users } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { encryptData } from '@common/lib'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
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

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${JSON.stringify(updateUserDto)}`
  }
}
