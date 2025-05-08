import {
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { addresses } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

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
      throw new InternalServerErrorException(error)
    }
  }

  findByUserId(id: number) {
    return `This action returns a #${id} address`
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address ${updateAddressDto}`
  }
}
