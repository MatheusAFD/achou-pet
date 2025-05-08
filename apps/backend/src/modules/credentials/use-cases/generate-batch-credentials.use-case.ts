import { Inject, InternalServerErrorException } from '@nestjs/common'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'

import { BatchesService } from '@modules/batches/batches.service'

import { createCustomId } from '@common/lib/id'

import { CreateCredentialDto } from '../dto/create-credentials.dto'

export class GenerateBatchCredentialsUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    private readonly batchesService: BatchesService
  ) {}

  async execute(createCredentialDto: CreateCredentialDto) {
    const { numberOfCredentials, description } = createCredentialDto

    try {
      const response = await this.db.transaction(async (tx) => {
        const newBatch = await this.batchesService.create({
          description,
          totalCredentialsGenerated: numberOfCredentials
        })

        if (!newBatch) {
          tx.rollback()
        }

        const toInsert = Array.from({
          length: numberOfCredentials
        }).map((_, index) => ({
          id: createCustomId(),
          batchId: newBatch.id,
          shortId: `${newBatch.shortId}${index}`
        }))

        await tx
          .insert(credentials)
          .values(toInsert)
          .onConflictDoUpdate({
            target: credentials.id,
            set: {
              id: createCustomId()
            }
          })

        return numberOfCredentials
      })

      return {
        credentialsCreated: response
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
