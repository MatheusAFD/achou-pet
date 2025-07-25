import { missingAlerts } from '@db/drizzle/schema/missing-alerts'

import { MissingAlertsStatusEnum } from '@common/enums'

type MissingAlertType = typeof missingAlerts.$inferSelect

export class MissingAlert implements MissingAlertType {
  id: string
  petId: string
  status: keyof typeof MissingAlertsStatusEnum
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
