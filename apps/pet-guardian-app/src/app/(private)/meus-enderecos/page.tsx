import { Metadata } from 'next'

import { MapPinHouse } from 'lucide-react'

import {
  Button,
  Container,
  LineBadge
} from '@user-app/modules/@shared/components'
import {
  AddressesContainer,
  CreateAddressModal
} from '@user-app/modules/addresses/components'

export const metadata: Metadata = {
  title: 'Meus Endereços'
}

export default function MyAddressesPage() {
  return (
    <Container>
      <LineBadge />
      <h1 className="text-3xl">Meus endereços</h1>
      <CreateAddressModal>
        <Button className="w-fit mt-4">
          <MapPinHouse /> Cadastrar novo
        </Button>
      </CreateAddressModal>

      <AddressesContainer />
    </Container>
  )
}
