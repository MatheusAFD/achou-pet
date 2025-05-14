import { MapPinHouse } from 'lucide-react'

import { Button, Container } from '@user-app/modules/@shared/components'

export default function MyAddressesPage() {
  return (
    <Container>
      <Button className="w-fit ">
        {' '}
        <MapPinHouse /> Cadastrar novo
      </Button>
    </Container>
  )
}
