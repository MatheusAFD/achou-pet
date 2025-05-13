import { credentials } from '@db/drizzle/schema/credentials'

import { CredentialsStatusEnum } from '@common/enums'

type CredentialType = typeof credentials.$inferSelect

export class Credential implements CredentialType {
  id: string
  shortId: string
  status: keyof typeof CredentialsStatusEnum | null
  batchId: string
  description: string | null
  hasLifetimeAccess: boolean | null
  expirationDate: Date | null
  userId: string | null
  activatedAt: Date | null
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}
