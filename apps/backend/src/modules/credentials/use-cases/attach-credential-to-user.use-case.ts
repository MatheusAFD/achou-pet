import {
  Inject,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'

import { CredentialsStatusEnum } from '@common/enums'

import { AttachCredentialToUserDto } from '../dto/attach-credential-to-user.dto'

interface AttachCredentialToUser {
  userId: string
  credentialId: string
}

export class AttachCredentialToUserUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
  ) {}

  async execute(
    relations: AttachCredentialToUser,
    payload: AttachCredentialToUserDto
  ) {
    const { credentialId, userId } = relations
    const { petName } = payload

    const [credential] = await this.db
      .select()
      .from(credentials)
      .where(eq(credentials.id, credentialId))
      .limit(1)

    if (!credential) {
      throw new NotFoundException('Credential not found')
    }

    const credentialAlreadyAttached = credential.userId !== null
    const isCredentialReassignment =
      credentialAlreadyAttached && credential.userId !== userId

    if (credentialAlreadyAttached || isCredentialReassignment) {
      throw new InternalServerErrorException(
        'Credential already attached to a user'
      )
    }

    const [updatedCredential] = await this.db
      .update(credentials)
      .set({
        userId,
        petName,
        status: CredentialsStatusEnum.ACTIVE,
        activatedAt: new Date()
      })
      .where(eq(credentials.id, credentialId))
      .returning()

    return updatedCredential
  }
}
