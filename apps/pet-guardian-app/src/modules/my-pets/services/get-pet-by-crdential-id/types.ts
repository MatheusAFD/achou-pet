import { Address } from '@user-app/modules/addresses/services/get-address/types'

import { Pet } from '../get-pet/types'

export interface GetPetByCredentialIdResponse {
  id: string
  status: 'ACTIVE' | 'INACTIVE'
  userId: string
  user: User
  pet: Pet | null
  primaryAddress: Address | null
}

export interface User {
  name: string
  lastName: string
  email: string
  phone: string
  canDisplayAddress: boolean
}
