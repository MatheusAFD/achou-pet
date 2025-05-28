import { Inject, NotFoundException } from '@nestjs/common'

import { and, eq } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { addresses } from '@db/drizzle/schema/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { AddressTypeEnum } from '@common/enums/db-enums'

import { Address } from '../entities/address.entity'

export class SetPrimaryAddressUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async execute(userId: string, addressId: string): Promise<Address> {
    return await this.db.transaction(async (tx) => {
      const [addressToSet] = await tx
        .select()
        .from(addresses)
        .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
        .limit(1)

      if (!addressToSet) {
        throw new NotFoundException('User address not found')
      }

      await tx
        .update(addresses)
        .set({ type: AddressTypeEnum.SECONDARY })
        .where(eq(addresses.userId, userId))

      const [updated] = await tx
        .update(addresses)
        .set({ type: AddressTypeEnum.PRIMARY })
        .where(eq(addresses.id, addressId))
        .returning()

      return updated
    })
  }
}
