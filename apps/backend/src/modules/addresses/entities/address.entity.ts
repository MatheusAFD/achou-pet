import { addresses, AddressTypeEnum } from '@db/drizzle/schema'

type AddressType = typeof addresses.$inferSelect

export class Address implements AddressType {
  number: string
  id: string
  type: keyof typeof AddressTypeEnum
  address: string
  complement: string | null
  neighborhood: string
  reference: string | null
  city: string
  state: string
  country: string
  zipCode: string
  updatedAt: Date | null
  createdAt: Date
  deletedAt: Date | null
  userId: string
}
