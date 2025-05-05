import { Injectable } from '@nestjs/common'

import { drizzle } from 'drizzle-orm/node-postgres'

import { Pool } from 'pg'

// This provider creates and exports a Drizzle instance for NestJS DI
export const DRIZZLE = 'DRIZZLE'

@Injectable()
export class DrizzleProvider {
  public client
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL
    })
    this.client = drizzle(pool)
  }
}
