import { PetFormData } from '../../components/pet-form/types'

export interface UpdatePetParams extends PetFormData {
  petId: string
}
