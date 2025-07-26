import { Container } from '@user-app/modules/@shared/components'
import {
  MyPetsHeader,
  PetsListSkeleton
} from '@user-app/modules/my-pets/components'

export default function LoadingPage() {
  return (
    <Container>
      <MyPetsHeader />
      <PetsListSkeleton />
    </Container>
  )
}
