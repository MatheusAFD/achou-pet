import { AttachCredentialFormData } from '../../components/pet-form/types'

export interface AttachCredentialBody extends AttachCredentialFormData {
  credentialId: string
}

export interface AttachCredentialResponse {
  id: string
  shortId: string
  petName: string
  status: string
  description: string | null
  hasLifetimeAccess: boolean
  expirationDate: Date | null
  userId: string
  batchId: string
  activatedAt: string | Date | null
  updatedAt: string | Date | null
  createdAt: string | Date | null
  deletedAt: null
}
