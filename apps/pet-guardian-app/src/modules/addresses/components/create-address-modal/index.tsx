'use client'

import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LineBadge
} from '@user-app/modules/@shared/components'

import { AddressForm } from '../address-form'

export const CreateAddressModal = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-full h-full flex flex-col justify-start md:h-auto md:min-w-[40rem] overflow-auto ">
        <DialogHeader className="h-fit">
          <LineBadge hideOnMobile />
          <DialogTitle>Cadastrar novo endereço</DialogTitle>
          <DialogDescription className="text-xs">
            Campos marcados com (*) são obrigatórios
          </DialogDescription>

          <AddressForm onSubmit={(data) => console.log(data)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
