import { Injectable, Inject } from '@nestjs/common'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

import { desc, eq, getTableColumns } from 'drizzle-orm'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'
import { pets } from '@db/drizzle/schema/pets'

import { StorageService } from '../storage/storage.service'
import { CreatePetDto } from './dto/create-pet.dto'
import { UpdatePetDto } from './dto/update-pet.dto'
import { Pet } from './entities/pet.entity'

@Injectable()
export class PetsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema,
    @Inject(StorageService)
    private readonly storageService: StorageService
  ) {}

  async findAllByUser(userId: string): Promise<Pet[]> {
    const data = await this.db
      .select({
        ...getTableColumns(pets)
      })
      .from(pets)
      .leftJoin(credentials, eq(pets.credentialId, credentials.id))
      .where(eq(credentials.userId, userId))
      .orderBy(desc(pets.createdAt))

    return data
  }

  async findOne(id: string): Promise<Pet> {
    const [pet] = await this.db
      .select()
      .from(pets)
      .where(eq(pets.id, id))
      .limit(1)

    if (!pet) {
      throw new NotFoundException('Pet not found')
    }

    return pet
  }

  async create(data: CreatePetDto): Promise<Pet> {
    try {
      const [createdPet] = await this.db
        .insert(pets)
        .values({
          ...data,
          photoUrl: data.photoUrl ?? null
        })
        .returning()

      if (!createdPet) {
        throw new InternalServerErrorException('Error creating pet')
      }

      return createdPet
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: string, data: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id)
    if (!pet) {
      throw new NotFoundException('Pet not found')
    }

    const photoUrl = await this.handlePetPhotoUpdate(pet, data)

    const [updatedPet] = await this.db
      .update(pets)
      .set({
        name: data.name ?? pet.name,
        species: data.species ?? pet.species,
        breed: data.breed ?? pet.breed,
        size: data.size ?? pet.size,
        color: data.color ?? pet.color,
        gender: data.gender ?? pet.gender,
        birthDate: data.birthDate ?? pet.birthDate,
        isVaccinated: data.isVaccinated ?? pet.isVaccinated,
        hasAllergies: data.hasAllergies ?? pet.hasAllergies,
        needsMedication: data.needsMedication ?? pet.needsMedication,
        medicationDescription:
          data.medicationDescription ?? pet.medicationDescription,
        photoUrl
      })
      .where(eq(pets.id, id))
      .returning()

    if (!updatedPet) {
      throw new InternalServerErrorException('Error updating pet')
    }

    return updatedPet
  }

  private async handlePetPhotoUpdate(
    pet: Pet,
    data: UpdatePetDto
  ): Promise<string | null> {
    const oldPhotoUrl = pet.photoUrl

    const extractKey = (url: string) => {
      return url.replace(/^https?:\/\/[^/]+\/[^/]+\//, '')
    }

    if (data.photoUrl === '') {
      if (oldPhotoUrl) {
        const key = extractKey(oldPhotoUrl)
        await this.storageService.deleteFile(key)
      }
      return null
    }

    if (data.photoUrl && data.photoUrl !== oldPhotoUrl) {
      if (oldPhotoUrl) {
        const key = extractKey(oldPhotoUrl)
        await this.storageService.deleteFile(key)
      }
      return data.photoUrl
    }

    return oldPhotoUrl
  }
}
