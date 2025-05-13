export type GetMyPetsResponse = Pet[] | []

export interface Pet {
  id: string
  name: string
  gender: string
  birthDate: string | Date | null
  species: string
  breed: string
  size: string
  color: string
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
