'use client'

import { PropsWithChildren } from 'react'

import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LineBadge
} from '@user-app/modules/@shared/components'
import { useDisclosure } from '@user-app/modules/@shared/hooks'

import { createAddress } from '../../services'
import { AddressForm } from '../address-form'
import { AddressFormData } from '../address-form/types'

export const CreateAddressModal = (props: PropsWithChildren) => {
  const { isOpen, onOpenChange } = useDisclosure()

  const onSubmit = async (data: AddressFormData) => {
    const [error] = await createAddress(data)

    if (error) {
      toast.error('Erro!', {
        description: 'Ocorrreu um erro ao cadastrar o endereço'
      })

      return
    }

    onOpenChange(false)

    toast.success('Sucesso!', {
      description: 'Endereço cadastrado com sucesso!'
    })
  }

  const { children } = props
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-full h-full flex flex-col gap-4 justify-start md:h-auto md:min-w-[40rem] overflow-auto ">
        <DialogHeader>
          <LineBadge hideOnMobile />
          <DialogTitle>Cadastrar novo endereço</DialogTitle>
          <DialogDescription className="text-xs">
            Campos marcados com (*) são obrigatórios
          </DialogDescription>
        </DialogHeader>
        <AddressForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
