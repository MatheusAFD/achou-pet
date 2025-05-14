'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@user-app/modules/@shared/components'
import { DialogProps } from '@user-app/modules/@shared/types'

import { getPet } from '../../services/get-pet'
import { updatePet } from '../../services/update-pet'
import { PetForm } from '../pet-form'
import { PetFormData } from '../pet-form/types'

interface EditPetModalProps extends DialogProps {
  petId: string | null
  onClose: VoidFunction
}

export const EditPetModal = (props: EditPetModalProps) => {
  const { petId, isOpen, onOpenChange, onClose } = props

  const [isFetching, setIsFetching] = useState(false)

  const onSubmit = async (data: PetFormData) => {
    const [error] = await updatePet({
      petId: petId!,
      ...data
    })

    if (error) {
      toast.error('Erro!', {
        description: 'Ocorreu um erro ao atualizar o pet.'
      })

      return
    }

    onOpenChange(false)

    toast.success('Sucesso!', {
      description: 'Pet editado com sucesso!'
    })
  }

  const defaultValues = async () => {
    if (!petId) {
      return
    }

    setIsFetching(true)

    const [error, pet] = await getPet(petId)

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao buscar pet.'
      })

      setIsFetching(false)

      return
    }

    setIsFetching(false)

    return pet
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }

        onOpenChange(open)
      }}
    >
      <DialogContent className="min-w-full h-full flex flex-col justify-start md:h-auto md:min-w-[40rem] overflow-auto ">
        <DialogHeader className="h-fit">
          <DialogTitle>Editar pet</DialogTitle>
          <DialogDescription className="text-xs">
            Campos marcados com (*) são obrigatórios
          </DialogDescription>
        </DialogHeader>

        <PetForm
          actionText="Editar"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isFetchingDefaultValues={isFetching}
        />
      </DialogContent>
    </Dialog>
  )
}
