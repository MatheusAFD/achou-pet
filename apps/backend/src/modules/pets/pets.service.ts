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

  async create(data: CreatePetDto, photo?: any): Promise<Pet> {
    let photoUrl = data.photoUrl ?? null
    if (photo && photo.buffer && photo.mimetype) {
      const buffer: Buffer = Buffer.isBuffer(photo.buffer)
        ? photo.buffer
        : Buffer.from(photo.buffer)
      photoUrl = await this.storageService.uploadFile(
        buffer,
        `pets/${Date.now()}.jpeg`,
        String(photo.mimetype)
      )
    }
    const [createdPet] = await this.db
      .insert(pets)
      .values({
        ...data,
        photoUrl
      })
      .returning()
    if (!createdPet) {
      throw new InternalServerErrorException('Error creating pet')
    }
    return createdPet
  }

  async update(id: string, data: UpdatePetDto, photo?: any): Promise<Pet> {
    const pet = await this.findOne(id)

    if (!pet) {
      throw new NotFoundException('Pet not found')
    }

    let photoUrl = data.photoUrl ?? pet.photoUrl
    if (photo && photo.buffer && photo.mimetype) {
      const buffer: Buffer = Buffer.isBuffer(photo.buffer)
        ? photo.buffer
        : Buffer.from(photo.buffer)
      photoUrl = await this.storageService.uploadFile(
        buffer,
        `pets/${id}-${Date.now()}.jpeg`,
        String(photo.mimetype)
      )
    }

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

    return pet
  }
}
