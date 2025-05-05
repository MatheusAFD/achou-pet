import { Injectable, Inject } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DRIZZLE, DrizzleProvider } from './drizzle.provider'
import { users } from './users.schema'

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private readonly drizzleProvider: DrizzleProvider
  ) {}

  async findByEmail(email: string) {
    const db = this.drizzleProvider.client
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] || null
  }

  async createUser(data: any) {
    const db = this.drizzleProvider.client
    const [user] = await db.insert(users).values(data).returning()
    return user
  }
}
