import { lazy } from 'react'

import { Metadata } from 'next'

import { PawPrint } from 'lucide-react'

import { Button, Container } from '@user-app/modules/@shared/components'
import { StepsProvider } from '@user-app/modules/@shared/contexts'
import { PetsList } from '@user-app/modules/my-pets/components'
import { getPets } from '@user-app/modules/my-pets/services/get-pets'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, data] = await getPets()

  return (
    <Container>
      <StepsProvider initialStep={AttachCredentialFormSteps.ScanQrCode}>
        <AttachCredentialModal>
          <Button className="w-fit ">
            {' '}
            <PawPrint /> Cadastrar novo
          </Button>
        </AttachCredentialModal>
      </StepsProvider>

      <PetsList data={data} />
    </Container>
  )
}
