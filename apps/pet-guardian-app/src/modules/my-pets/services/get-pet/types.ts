export interface Pet {
  id: string
  name: string
  gender: 'MALE' | 'FEMALE'
  birthDate: string | Date | null
  species: string
  breed?: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  color?: string
  isMissing: boolean
  isVaccinated: boolean
  hasAllergies: boolean
  needsMedication: boolean
  medicationDescription: string | null
  photoUrl: string | null
  credentialId: string
  updatedAt: string | Date | null
  createdAt: string | Date | null
  deletedAt: string | Date | null
}
