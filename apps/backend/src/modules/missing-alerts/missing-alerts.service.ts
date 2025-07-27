import { Injectable, Inject, NotFoundException } from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { missingAlerts } from '@db/drizzle/schema/missing-alerts'
import { DrizzleSchema } from '@db/drizzle/types'

import { MissingAlertsStatusEnum } from '@common/enums/db-enums'

import { MissingAlert } from './entities/missing-alert.entity'

@Injectable()
export class MissingAlertsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async findOne(id: string): Promise<MissingAlert> {
    const [activeAlert] = await this.db
      .select()
      .from(missingAlerts)
      .where(eq(missingAlerts.id, id))
      .limit(1)

    if (!activeAlert) {
      throw new NotFoundException(`Missing alert not found`)
    }

    return activeAlert
  }

  async findAllActive(): Promise<MissingAlert[]> {
    const activeAlerts = await this.db
      .select()
      .from(missingAlerts)
      .where(eq(missingAlerts.status, MissingAlertsStatusEnum.ACTIVE))

    return activeAlerts
  }
}
