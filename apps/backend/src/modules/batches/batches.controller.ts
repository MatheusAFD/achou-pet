import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  StreamableFile,
  Query
} from '@nestjs/common'

import { Response } from 'express'

import { Roles } from '@common/decorators/auth'
import { DefaultFilterDTO } from '@common/dto'
import { RoleEnum } from '@common/enums'
import { ResponseWithPagination } from '@common/types'

import { BatchesService } from './batches.service'
import { CreateBatchDto } from './dto/create-batch.dto'
import { Batch } from './entities/batch.entity'
import { ExportBatchCredentialsQRCodesUseCase } from './use-cases'

@Controller('batches')
export class BatchesController {
  constructor(
    private readonly batchesService: BatchesService,
    private readonly exportBatchCredentialsQRCodesUseCase: ExportBatchCredentialsQRCodesUseCase
  ) {}

  @Post()
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  create(@Body() createBatchDto: CreateBatchDto): Promise<Batch> {
    return this.batchesService.create(createBatchDto)
  }

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  findAll(
    @Query() filters: DefaultFilterDTO
  ): Promise<ResponseWithPagination<Batch[]>> {
    return this.batchesService.findAll(filters)
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  findOne(@Param('id') id: string): Promise<Batch> {
    return this.batchesService.findOne(id)
  }

  @Post('export-qrcodes/:batchId')
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  async exportQRCodes(
    @Param('batchId') batchId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {
    const file =
      await this.exportBatchCredentialsQRCodesUseCase.execute(batchId)

    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': file.options?.disposition || 'attachment'
    })

    return file
  }
}
