import { Controller, Query, Get } from '@nestjs/common'

import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

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
