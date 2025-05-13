import { Button, Container } from '@user-app/modules/@shared/components'
import { AttachCredentialModal } from '@user-app/modules/my-pets/components'
import { PetCard } from '@user-app/modules/my-pets/components/pet-card'
import { getPets } from '@user-app/modules/my-pets/services/get-pets'

export default async function MyPetsPage() {
  const [error, data] = await getPets()

  console.log('data', data)
  console.log('error', error)

  return (
    <Container>
      <AttachCredentialModal>
        <Button className="w-fit ">Cadastrar novo</Button>
      </AttachCredentialModal>

      <section className="mt-8">
        {data?.map((pet) => {
          return <PetCard key={pet.id} pet={pet} />
        })}
      </section>
    </Container>
  )
}
