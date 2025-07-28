import { MissingAlert } from '@modules/missing-alerts/entities'
import { Pet } from '@modules/pets/entities'

interface MissingAlertType extends MissingAlert {
  id: string
  petId: string
  status: 'ACTIVE' | 'INACTIVE'
  pet: Pet
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
}

export type FindMissingAlertsResponse = MissingAlertType[]
