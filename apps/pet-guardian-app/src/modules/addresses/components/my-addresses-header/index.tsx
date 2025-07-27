import { MapPinHouse } from 'lucide-react'

import { Button, LineBadge } from '@user-app/modules/@shared/components'

import { CreateAddressModal } from '../create-address-modal'

export const MyAddressesHeader = () => {
  return (
    <header>
      <LineBadge />
      <h1 className="text-3xl">Meus endereços</h1>
      <CreateAddressModal>
        <Button className="w-fit mt-4" data-testid="create-address">
          <MapPinHouse /> Cadastrar novo
        </Button>
      </CreateAddressModal>
    </header>
  )
}
