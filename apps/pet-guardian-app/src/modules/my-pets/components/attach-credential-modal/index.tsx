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
import { useDisclosure } from '@user-app/modules/@shared/hooks'

import { AttachCredentialForm } from '../attach-credential-form'

export const AttachCredentialModal = (props: PropsWithChildren) => {
  const { children } = props

  const { isOpen, onOpenChange } = useDisclosure()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-full h-full flex flex-col justify-start md:h-auto md:min-w-[40rem] ">
        <DialogHeader className=" h-fit">
          <DialogTitle>Novo Pet</DialogTitle>
          <DialogDescription>
            Informe as características e informações do seu animal.
          </DialogDescription>
        </DialogHeader>

        <AttachCredentialForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
