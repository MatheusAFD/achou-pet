'use client'

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
import { PetForm } from '../pet-form'
import { AttachCredentialFormData } from '../pet-form/types'

interface EditPetModalProps extends DialogProps {
  petId: string | null
  onClose: VoidFunction
}

export const EditPetModal = (props: EditPetModalProps) => {
  const { petId, isOpen, onOpenChange, onClose } = props

  const onSubmit = async (data: AttachCredentialFormData) => {
    console.log('data', data, petId)
    // const [error] = await attatchCredential({
    //   ...data,
    //   credentialId: String(scannedCredentialId)
    // })

    // if (error) {
    //   toast.error('Erro!', {
    //     description: 'Ocorreu um erro ao cadastrar o pet.'
    //   })

    //   return
    // }

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
        description: 'Erro ao buscar unidade.'
      })

      return
    }

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
          <DialogDescription>Editar informações do meu pet</DialogDescription>
        </DialogHeader>

        <PetForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
