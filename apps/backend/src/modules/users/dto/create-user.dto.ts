import { IsString, IsEmail, MinLength } from 'class-validator'

import { users } from '@db/drizzle/schema/schema'

type CreateUserInsert = Omit<typeof users.$inferInsert, 'role'>

export class CreateUserDto implements CreateUserInsert {
  @IsString()
  name: string

  @IsString()
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  @MinLength(11)
  phone: string
}
