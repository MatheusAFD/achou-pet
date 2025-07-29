'use client'

import { useState } from 'react'

import { useDisclosure } from '@user-app/modules/@shared/hooks'

import { GetMyPetsResponse } from '../../services/get-pets/types'
import { EditPetModal } from '../edit-pet-modal'
import { PetCard } from '../pet-card'

interface PetsListProps {
  data: GetMyPetsResponse | null
}
export const PetsList = (props: PetsListProps) => {
  const { data } = props

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const { isOpen, onOpenChange } = useDisclosure()

  const onCloseEditModal = () => {
    setSelectedPetId(null)
  }

  return (
    <ul className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
      {data?.map((pet) => {
        return (
          <PetCard
            key={pet.id}
            pet={pet}
            onEdit={() => {
              setSelectedPetId(pet.id)
              onOpenChange(true)
            }}
          />
        )
      })}

      <EditPetModal
        petId={selectedPetId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onCloseEditModal}
      />
    </ul>
  )
}
