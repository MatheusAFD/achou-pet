import { pgPetGenderEnum } from '@common/enums'

export class Pet {
  id: string
  name: string
  gender: keyof typeof pgPetGenderEnum
  birthDate?: Date
  species: string
  breed?: string
  size?: string
  color?: string
  isVaccinated: boolean
  hasAllergies: boolean
  needsMedication: boolean
  medicationDescription?: string
  photoUrl?: string
  credentialId: string
  createdAt: Date
  updatedAt: Date
}
