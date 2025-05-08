import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common'

import * as archiver from 'archiver'
import * as QRCode from 'qrcode'
import { PassThrough } from 'stream'

import { CredentialsService } from '../../credentials/credentials.service'
import { BatchesService } from '../batches.service'

@Injectable()
export class ExportBatchCredentialsQRCodesUseCase {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly batchesService: BatchesService
  ) {}

  async execute(batchId: string): Promise<StreamableFile> {
    const batch = await this.batchesService.findOne(batchId)

    const credentials = await this.credentialsService.findAllByBatchId(batch.id)

    if (!credentials || credentials.length === 0) {
      throw new NotFoundException('No credentials found for this batch')
    }

    const zipStream = new PassThrough()
    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(zipStream)

    const QR_CODE_SIZE_CM = 4
    const DPI = 300
    const CM_TO_INCH = 2.54
    const QR_CODE_SIZE_PX = Math.round((QR_CODE_SIZE_CM / CM_TO_INCH) * DPI)
    const QR_CODE_MARGIN_PX = 1
    const QR_CODE_COLOR_DARK = '#06343a'
    const QR_CODE_COLOR_LIGHT = '#00000000'

    for (const credential of credentials) {
      const qrUrl = `http://localhost:3000/${credential.id}`
      const qrBuffer = await QRCode.toBuffer(qrUrl, {
        width: QR_CODE_SIZE_PX,
        margin: QR_CODE_MARGIN_PX,
        color: {
          dark: QR_CODE_COLOR_DARK,
          light: QR_CODE_COLOR_LIGHT
        }
      })

      archive.append(qrBuffer, { name: `${credential.shortId}.png` })
    }

    await archive.finalize()
    return new StreamableFile(zipStream, {
      type: 'application/zip',
      disposition: `attachment; filename="batch-${batch.shortId}-qrcodes.zip"`
    })
  }
}
