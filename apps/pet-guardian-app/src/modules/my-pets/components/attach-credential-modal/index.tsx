'use client'

import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@user-app/modules/@shared/components'
import { useDisclosure, useSteps } from '@user-app/modules/@shared/hooks'

import { AttachCredentialFormSteps } from '../../types'
import { AttachCredentialForm } from '../attach-credential-form'
import { ScanPetCredential } from '../scan-pet-credential'

export const AttachCredentialModal = (props: PropsWithChildren) => {
  const { children } = props

  const { isOpen, onOpenChange } = useDisclosure()

  const { formStep } = useSteps<AttachCredentialFormSteps>()

  const componentByStep = {
    [AttachCredentialFormSteps.ScanQrCode]: ScanPetCredential,
    [AttachCredentialFormSteps.PetData]: AttachCredentialForm
  }

  const CurrentStepComponent = componentByStep[formStep]

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-full h-full flex flex-col justify-start md:h-auto md:min-w-[40rem] overflow-auto ">
        <DialogHeader className="h-fit">
          <DialogTitle>Novo Pet</DialogTitle>
          <DialogDescription>
            Informe as características e informações do seu animal.
          </DialogDescription>
        </DialogHeader>

        <CurrentStepComponent onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
