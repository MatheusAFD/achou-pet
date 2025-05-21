'use client'

import { PropsWithChildren, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LineBadge
} from '@admin/modules/@shared/components'

import { GenerateCredentialsForm } from '../generate-credentials-form'

export const GenerateCredentialsModal = (props: PropsWithChildren) => {
  const { children } = props

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-full h-full flex flex-col justify-start md:h-auto md:min-w-[40rem] overflow-auto ">
        <DialogHeader className="h-fit">
          <LineBadge hideOnMobile />
          <DialogTitle>Gerar credencias em lote</DialogTitle>
          <DialogDescription className="text-xs">
            Campos marcados com (*) são obrigatórios
          </DialogDescription>
        </DialogHeader>

        <GenerateCredentialsForm onSuccess={closeModal} />
      </DialogContent>
    </Dialog>
  )
}
