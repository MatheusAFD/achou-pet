import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { count, desc, eq, ilike, or } from 'drizzle-orm'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { batches } from '@db/drizzle/schema'
import { DrizzleSchema } from '@db/drizzle/types'

import { DefaultFilterDTO } from '@common/dto'
import { ResponseWithPagination } from '@common/types'
import { calculatePagination, calculateQueryOffset } from '@common/utils'

import { CreateBatchDto } from './dto/create-batch.dto'
import { Batch } from './entities/batch.entity'

@Injectable()
export class BatchesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    const { description, totalCredentialsGenerated } = createBatchDto

    const [createdBatch] = await this.db
      .insert(batches)
      .values({
        description,
        totalCredentialsGenerated: String(totalCredentialsGenerated)
      })
      .returning()

    if (!createdBatch) {
      throw new InternalServerErrorException('Error creating batch')
    }

    return createdBatch
  }

  async findAll(
    filters: DefaultFilterDTO
  ): Promise<ResponseWithPagination<Batch[]>> {
    const { search = '', limit, page } = filters

    const isSearchingByBatchId = !isNaN(Number(search))

    const [{ count: totalItems }] = await this.db
      .select({ count: count() })
      .from(batches)
      .where(
        or(
          ilike(batches.description, `%${search}%`),
          isSearchingByBatchId ? eq(batches.shortId, Number(search)) : undefined
        )
      )

    const data = await this.db
      .select()
      .from(batches)
      .where(
        or(
          ilike(batches.description, `%${search}%`),
          isSearchingByBatchId ? eq(batches.shortId, Number(search)) : undefined
        )
      )
      .orderBy(desc(batches.createdAt))
      .offset(calculateQueryOffset(page, limit))
      .limit(limit)

    const pagination = calculatePagination({
      limit,
      page,
      totalItems
    })

    return { data, pagination }
  }

  async findOne(id: string): Promise<Batch> {
    const [batch] = await this.db
      .select()
      .from(batches)
      .where(eq(batches.id, id))
      .limit(1)

    if (!batch) {
      throw new NotFoundException('Batch not found')
    }

    return batch
  }
}
