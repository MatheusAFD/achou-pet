import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  Get
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    if (!file || !(file.buffer instanceof Buffer) || !file.mimetype) {
      return { url: null }
    }
    const url = await this.storageService.uploadFile(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      file.buffer,
      `pets/${Date.now()}-${file.originalname}`,
      String(file.mimetype)
    )
    return { url }
  }

  @Get('presigned-url')
  async getPresignedUrl(
    @Query('filename') filename: string,
    @Query('contentType') contentType: string
  ) {
    const { url, key } = await this.storageService.getPresignedUrl(
      filename,
      contentType
    )
    return { url, key }
  }
}
