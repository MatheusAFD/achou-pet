import { Button, Container } from '@user-app/modules/@shared/components'

export default function MyPetsPage() {
  return (
    <Container className="mt-4 md:mt-8">
      <Button className="w-fit">Cadastrar novo</Button>

      <section>Meus Pets</section>
    </Container>
  )
}
