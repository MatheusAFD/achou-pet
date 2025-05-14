import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { desc, eq, getTableColumns } from 'drizzle-orm'

import { DrizzleSchema } from 'src/drizzle/types'

import { DrizzleAsyncProvider } from '@db/drizzle/drizzle.provider'
import { credentials } from '@db/drizzle/schema/credentials'
import { pets } from '@db/drizzle/schema/pets'

import { UpdatePetDto } from './dto/update-pet.dto'
import { Pet } from './entities/pet.entity'

@Injectable()
export class PetsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: DrizzleSchema
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

  async update(id: string, data: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id)

    if (!pet) {
      throw new NotFoundException('Pet not found')
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
        photoUrl: data.photoUrl ?? pet.photoUrl
      })
      .where(eq(pets.id, id))
      .returning()

    if (!updatedPet) {
      throw new InternalServerErrorException('Error updating pet')
    }

    return pet
  }
}
