import { Metadata } from 'next'

import { Container } from '@user-app/modules/@shared/components'
import {
  MyPetsHeader,
  PetsContainer
} from '@user-app/modules/my-pets/components'

export const experimental_ppr = true

export const metadata: Metadata = {
  title: 'Meus Pets'
}

export default function MyPetsPage() {
  return (
    <Container>
      <MyPetsHeader />
      <PetsContainer />
    </Container>
  )
}
