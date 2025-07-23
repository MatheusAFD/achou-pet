import { PetGenderEnum, pets, PetSizeEnum } from '@db/drizzle/schema'

type PetType = typeof pets.$inferSelect

export class Pet implements PetType {
  id: string
  name: string
  gender: keyof typeof PetGenderEnum
  birthDate: Date | null
  species: string
  breed: string | null
  isMissing: boolean | null
  size: keyof typeof PetSizeEnum
  color: string | null
  isVaccinated: boolean
  hasAllergies: boolean
  needsMedication: boolean
  medicationDescription: string | null
  photoUrl: string | null
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
  credentialId: string | null
}
