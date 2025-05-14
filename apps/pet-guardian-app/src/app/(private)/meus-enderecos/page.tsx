import { Metadata } from 'next'

import { MapPinHouse } from 'lucide-react'

import { Button, Container } from '@user-app/modules/@shared/components'
import { CreateAddressModal } from '@user-app/modules/addresses/components'

export const metadata: Metadata = {
  title: 'Meus Endereços'
}

export default function MyAddressesPage() {
  return (
    <Container>
      <CreateAddressModal>
        <Button className="w-fit">
          <MapPinHouse /> Cadastrar novo
        </Button>
      </CreateAddressModal>
    </Container>
  )
}
