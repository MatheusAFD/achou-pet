import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { and, eq, asc, desc } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { addresses } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { AddressTypeEnum } from '@common/enums/db-enums'

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
      const [primaryAddress] = await this.db
        .select()
        .from(addresses)
        .where(
          and(
            eq(addresses.userId, userId),
            eq(addresses.type, AddressTypeEnum.PRIMARY)
          )
        )
        .limit(1)

      const hasPrimaryAddress = !!primaryAddress

      const type = hasPrimaryAddress
        ? AddressTypeEnum.SECONDARY
        : AddressTypeEnum.PRIMARY

      const [createdAddress] = await this.db
        .insert(addresses)
        .values({ ...createAddressDto, userId, type })
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
      .orderBy(asc(addresses.type), desc(addresses.createdAt))

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
