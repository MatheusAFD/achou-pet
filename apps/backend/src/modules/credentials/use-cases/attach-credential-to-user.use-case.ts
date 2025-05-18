import {
  Inject,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'
import { pets } from '@db/drizzle/schema/pets'

import { CredentialsStatusEnum } from '@common/enums'

import { CreatePetDto } from '../../pets/dto/create-pet.dto'
import { StorageService } from '../../storage/storage.service'

interface AttachCredentialToUser {
  userId: string
  credentialId: string
}

export class AttachCredentialToUserUseCase {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    @Inject(StorageService)
    private readonly storageService: StorageService
  ) {}

  async execute(
    relations: AttachCredentialToUser,
    payload: CreatePetDto & { photo?: any }
  ) {
    const { userId, credentialId } = relations
    const {
      gender,
      name,
      size,
      species,
      birthDate,
      breed,
      color,
      hasAllergies,
      isVaccinated,
      medicationDescription,
      needsMedication,
      photoUrl,
      photo
    } = payload

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

    const finalPhotoUrl = await this.handlePetPhotoAttach(photo, photoUrl)

    const [createdPet] = await this.db
      .insert(pets)
      .values({
        gender,
        name,
        birthDate: birthDate ?? null,
        species,
        breed,
        size,
        color,
        isVaccinated,
        hasAllergies,
        medicationDescription,
        photoUrl: finalPhotoUrl,
        credentialId,
        needsMedication
      })
      .returning()

    const [updatedCredential] = await this.db
      .update(credentials)
      .set({
        userId,
        status: CredentialsStatusEnum.ACTIVE,
        activatedAt: new Date()
      })
      .where(eq(credentials.id, credentialId))
      .returning()

    return { credential: updatedCredential, pet: createdPet }
  }

  private async handlePetPhotoAttach(
    photo?: any,
    photoUrl?: string
  ): Promise<string | null> {
    if (photo && (photo.buffer || photo instanceof Buffer)) {
      let buffer: Buffer
      if (Buffer.isBuffer(photo.buffer)) {
        buffer = photo.buffer
      } else if (photo.buffer) {
        buffer = Buffer.from(photo.buffer)
      } else {
        buffer = Buffer.from(photo)
      }
      let mimetype = 'image/jpeg'
      if (photo.mimetype) {
        mimetype = String(photo.mimetype)
      }
      return await this.storageService.uploadFile(
        buffer,
        `pets/${Date.now()}.jpeg`,
        mimetype
      )
    }
    if (typeof photoUrl === 'string' && photoUrl) {
      return photoUrl
    }
    return null
  }
}
