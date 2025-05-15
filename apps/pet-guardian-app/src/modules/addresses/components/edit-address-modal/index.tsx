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

import { getAddress, updateAddress } from '../../services'
import { AddressForm } from '../address-form'
import { AddressFormData } from '../address-form/types'

interface EditAddressModalProps extends DialogProps {
  addressId: string
  onClose: VoidFunction
}

export const EditAddressModal = (props: EditAddressModalProps) => {
  const { addressId, isOpen, onOpenChange, onClose } = props

  const onSubmit = async (data: AddressFormData) => {
    const [error] = await updateAddress({
      addressId,
      data
    })

    if (error) {
      toast.error('Erro!', {
        description: 'Ocorrreu um erro ao atualizar o endereço'
      })

      return
    }

    onOpenChange(false)

    toast.success('Sucesso!', {
      description: 'Endereço atualizado com sucesso!'
    })
  }

  const defaultValues = async () => {
    const [error, response] = await getAddress(addressId)

    if (error) {
      toast.error('Erro!', {
        description: 'Ocorreu um erro ao buscar o endereço'
      })
    }

    return response
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
      <DialogContent className="min-w-full h-full flex flex-col gap-4 justify-start md:h-auto md:min-w-[40rem] overflow-auto ">
        <DialogHeader>
          <LineBadge hideOnMobile />
          <DialogTitle>Cadastrar novo endereço</DialogTitle>
          <DialogDescription className="text-xs">
            Campos marcados com (*) são obrigatórios
          </DialogDescription>
        </DialogHeader>

        <AddressForm
          actionText="Salvar endereço"
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  )
}
