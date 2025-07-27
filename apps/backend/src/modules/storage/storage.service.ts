import { Injectable } from '@nestjs/common'

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { env } from '../../../env'

@Injectable()
export class StorageService {
  private readonly s3 = new S3Client({
    region: env.R2_REGION,
    endpoint: env.R2_ENDPOINT,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY
    }
  })

  async getPresignedUrl(filename: string, contentType: string) {
    const prefix = env.R2_IMAGE_PREFIX || 'stage'
    const key = `${prefix}/pets/${Date.now()}-${filename}`
    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType
    })
    const url = await getSignedUrl(this.s3, command, { expiresIn: 60 * 10 })
    return { url, key }
  }

  getPublicUrl(key: string) {
    const publicEndpoint = process.env.R2_PUBLIC_ENDPOINT
    const publicUrl = `${publicEndpoint}/${env.R2_BUCKET_NAME}/${key}`
    return publicUrl
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
