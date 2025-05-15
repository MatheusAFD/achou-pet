export interface Address {
  id: string
  type: string
  address: string
  number: string
  complement: string | null
  neighborhood: string
  reference: string
  city: string
  state: string
  country: string
  zipCode: string
  userId: string
  updatedAt: string | Date | null
  createdAt: string | Date | null
  deletedAt: string | Date | null
}
