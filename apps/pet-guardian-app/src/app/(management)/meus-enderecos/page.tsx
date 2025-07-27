import { Metadata } from 'next'

import { Container } from '@user-app/modules/@shared/components'
import {
  AddressesContainer,
  MyAddressesHeader
} from '@user-app/modules/addresses/components'

export const experimental_ppr = true

export const metadata: Metadata = {
  title: 'Meus Endereços'
}

export default function MyAddressesPage() {
  return (
    <Container>
      <MyAddressesHeader />
      <AddressesContainer />
    </Container>
  )
}
