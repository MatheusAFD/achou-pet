'use client'

import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  LineBadge
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

  const onSubmit = async (formData: PetFormData) => {
    const [error] = await updatePet({
      petId: petId!,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: formData as any
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

    const [error, pet] = await getPet(petId)

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao buscar pet.'
      })

      return
    }

    return {
      ...pet,
      photo: pet?.photoUrl
    }
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
          <LineBadge hideOnMobile />
          <DialogTitle>Editar pet</DialogTitle>
          <DialogDescription className="text-xs">
            Campos marcados com (*) são obrigatórios
          </DialogDescription>
        </DialogHeader>

        <PetForm
          actionText="Salvar"
          defaultValues={defaultValues}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSubmit={onSubmit as any}
        />
      </DialogContent>
    </Dialog>
  )
}
