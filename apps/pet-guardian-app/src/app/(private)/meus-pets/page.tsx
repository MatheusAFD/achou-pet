import { Metadata } from 'next'

import { Button, Container } from '@user-app/modules/@shared/components'
import { StepsProvider } from '@user-app/modules/@shared/contexts'
import { AttachCredentialModal } from '@user-app/modules/my-pets/components'
import { PetCard } from '@user-app/modules/my-pets/components/pet-card'
import { getPets } from '@user-app/modules/my-pets/services/get-pets'
import { AttachCredentialFormSteps } from '@user-app/modules/my-pets/types'

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
          <Button className="w-fit ">Cadastrar novo</Button>
        </AttachCredentialModal>
      </StepsProvider>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
        {data?.map((pet) => {
          return <PetCard key={pet.id} pet={pet} />
        })}
      </section>
    </Container>
  )
}
