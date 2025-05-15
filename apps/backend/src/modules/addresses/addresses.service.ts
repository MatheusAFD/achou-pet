import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { asc, eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { addresses } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { Address } from './entities/address.entity'

@Injectable()
export class AddressesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    try {
      const [createdAddress] = await this.db
        .insert(addresses)
        .values({ ...createAddressDto, userId })
        .returning()

      return createdAddress
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(userId: string): Promise<Address[]> {
    const addressesData = await this.db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, userId))
      .orderBy(asc(addresses.type))

    return addressesData
  }

  async findOne(id: string): Promise<Address> {
    const [address] = await this.db
      .select()
      .from(addresses)
      .where(eq(addresses.id, id))
      .limit(1)

    if (!address) {
      throw new NotFoundException('Address not found')
    }

    return address
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto
  ): Promise<Address> {
    const address = await this.findOne(id)

    const [updatedAddress] = await this.db
      .update(addresses)
      .set({
        address: updateAddressDto.address ?? address.address,
        city: updateAddressDto.city ?? address.city,
        state: updateAddressDto.state ?? address.state,
        zipCode: updateAddressDto.zipCode ?? address.zipCode,
        neighborhood: updateAddressDto.neighborhood ?? address.neighborhood,
        number: updateAddressDto.number ?? address.number,
        complement: updateAddressDto.complement ?? address.complement,
        reference: updateAddressDto.reference ?? address.reference
      })
      .where(eq(addresses.id, id))
      .returning()

    return updatedAddress
  }
}
