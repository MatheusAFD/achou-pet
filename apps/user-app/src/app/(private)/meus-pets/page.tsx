import { Button, Container } from '@user-app/modules/@shared/components'
import { AttachCredentialModal } from '@user-app/modules/my-pets/components'
import { PetCard } from '@user-app/modules/my-pets/components/pet-card'
import { getMyPets } from '@user-app/modules/my-pets/services/get-my-pets'

export default async function MyPetsPage() {
  const [error, data] = await getMyPets()

  console.log('data', data)
  console.log('error', error)

  return (
    <Container>
      <AttachCredentialModal>
        <Button className="w-fit">Cadastrar novo</Button>
      </AttachCredentialModal>

      <section className="mt-8">
        <PetCard
          pet={{
            petName: 'Rex',
            createdAt: new Date().toISOString()
          }}
        />
      </section>
    </Container>
  )
}
