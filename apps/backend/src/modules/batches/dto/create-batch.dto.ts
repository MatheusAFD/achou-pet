import { IsOptional, IsString } from 'class-validator'

import { batches } from '@db/drizzle/schema'

type CreateBatch = Omit<
  typeof batches.$inferInsert,
  'totalCredentialsGenerated'
>

export class CreateBatchDto implements CreateBatch {
  @IsString()
  description: string

  @IsOptional()
  totalCredentialsGenerated: number
}
