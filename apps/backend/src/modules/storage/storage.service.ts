import { Injectable } from '@nestjs/common'

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import * as sharp from 'sharp'

import { env } from '../../../env'

@Injectable()
export class StorageService {
  private s3 = new S3Client({
    region: env.R2_REGION,
    endpoint: env.R2_ENDPOINT,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY
    }
  })

  async uploadFile(buffer: Buffer, key: string, mimetype: string) {
    let uploadBuffer = buffer
    let uploadMime = mimetype
    if (mimetype.startsWith('image/')) {
      const optimized = await sharp(buffer)
        .resize(800, 800, { fit: 'inside' })
        .toFormat('jpeg', { quality: 80 })
        .toBuffer()
      uploadBuffer = optimized
      uploadMime = 'image/jpeg'
    }

    await this.s3.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: uploadBuffer,
        ContentType: uploadMime
      })
    )
    return this.getPublicUrl(key)
  }

  getPublicUrl(key: string) {
    const publicEndpoint = process.env.R2_PUBLIC_ENDPOINT

    return `/${env.R2_BUCKET_NAME}/${publicEndpoint}/${key}`
  }

  async deleteFile(key: string) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key
      })
    )
  }
}
