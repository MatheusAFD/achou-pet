import { lazy } from 'react'

import { Metadata } from 'next'

import { PawPrint } from 'lucide-react'

import {
  Button,
  Container,
  LineBadge
} from '@user-app/modules/@shared/components'
import { StepsProvider } from '@user-app/modules/@shared/contexts'
import { PetsContainer } from '@user-app/modules/my-pets/components'
import { AttachCredentialFormSteps } from '@user-app/modules/my-pets/types'

const AttachCredentialModal = lazy(() =>
  import('@user-app/modules/my-pets/components').then((mod) => ({
    default: mod.AttachCredentialModal
  }))
)

export const metadata: Metadata = {
  title: 'Meus Pets'
}

export default async function MyPetsPage() {
  return (
    <Container>
      <LineBadge />
      <h1 className="text-3xl">Meus pets</h1>
      <StepsProvider initialStep={AttachCredentialFormSteps.ScanQrCode}>
        <AttachCredentialModal>
          <Button className="w-fit mt-4">
            <PawPrint /> Cadastrar novo
          </Button>
        </AttachCredentialModal>
      </StepsProvider>

      <PetsContainer />
    </Container>
  )
}
