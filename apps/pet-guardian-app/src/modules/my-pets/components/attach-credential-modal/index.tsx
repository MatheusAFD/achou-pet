'use client'

import { PropsWithChildren, useState } from 'react'

import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@user-app/modules/@shared/components'
import { useDisclosure, useSteps } from '@user-app/modules/@shared/hooks'

import { attatchCredential } from '../../services'
import { AttachCredentialFormSteps } from '../../types'
import { PetForm } from '../pet-form'
import { PetFormData } from '../pet-form/types'
import { ScanPetCredential } from '../scan-pet-credential'

const AttachCredentialModal = (props: PropsWithChildren) => {
  const { children } = props

  const { isOpen, onOpenChange } = useDisclosure()

  const { formStep, updateFormStep } = useSteps<AttachCredentialFormSteps>()

  const [scannedCredentialId, setScannedCredentialId] = useState<string | null>(
    null
  )

  const onSubmit = async (data: PetFormData) => {
    const [error] = await attatchCredential({
      ...data,
      credentialId: String(scannedCredentialId)
    })

    if (error) {
      toast.error('Erro!', {
        description: 'Ocorreu um erro ao cadastrar o pet.'
      })

      return
    }

    onOpenChange(false)

    toast.success('Sucesso!', {
      description: 'Pet cadastrado com sucesso!'
    })
  }

  const componentByStep = {
    [AttachCredentialFormSteps.ScanQrCode]: (
      <ScanPetCredential
        onFindCredential={(id) => setScannedCredentialId(id)}
      />
    ),
    [AttachCredentialFormSteps.PetData]: <PetForm onSubmit={onSubmit} />
  }

  const CurrentStepComponent = componentByStep[formStep]

  const descriptionByStep = {
    [AttachCredentialFormSteps.ScanQrCode]: '1. Escanear Tag',
    [AttachCredentialFormSteps.PetData]:
      'Campos marcados com (*) são obrigatórios'
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          updateFormStep(AttachCredentialFormSteps.ScanQrCode)
        }
        return onOpenChange(open)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-full h-full flex flex-col justify-start md:h-auto md:min-w-[40rem] overflow-auto ">
        <DialogHeader className="h-fit">
          <DialogTitle>Cadastrar novo Pet</DialogTitle>
          <DialogDescription className="text-xs">
            {descriptionByStep[formStep]}
          </DialogDescription>
        </DialogHeader>

        {CurrentStepComponent}
      </DialogContent>
    </Dialog>
  )
}

export default AttachCredentialModal
