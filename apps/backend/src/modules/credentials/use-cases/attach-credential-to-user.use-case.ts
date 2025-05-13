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
    payload: AttachCredentialToUserDto & { pet: CreatePetDto }
  ) {
    const { credentialId, userId } = relations
    const { description, pet } = payload

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

    const petData = {
      ...pet,
      credentialId
    }

    const [createdPet] = await this.db
      .insert(pets)
      .values({
        gender: pet.gender as 'MALE' | 'FEMALE' | 'UNKNOWN',
        name: pet.name,
        birthDate: pet.birthDate ?? null,
        species: pet.species,
        breed: pet.breed,
        size: pet.size,
        color: pet.color,
        isVaccinated: pet.isVaccinated,
        hasAllergies: pet.hasAllergies,
        medicationDescription: pet.medicationDescription,
        photoUrl: pet.photoUrl,
        credentialId: petData.credentialId,
        needsMedication: pet.needsMedication
      })
      .returning()

    const [updatedCredential] = await this.db
      .update(credentials)
      .set({
        userId,
        description,
        status: CredentialsStatusEnum.ACTIVE,
        activatedAt: new Date()
      })
      .where(eq(credentials.id, credentialId))
      .returning()

    return { credential: updatedCredential, pet: createdPet }
  }
}
