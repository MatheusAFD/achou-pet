export type MissingAlertToggleResponse = {
  id: string
  petId: string
  status: 'ACTIVE' | 'INACTIVE'
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
  isMissing: boolean
}
