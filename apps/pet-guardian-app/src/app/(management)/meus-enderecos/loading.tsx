import { Container } from '@user-app/modules/@shared/components'
import {
  AddressesListSkeleton,
  MyAddressesHeader
} from '@user-app/modules/addresses/components'

export default function LoadingPage() {
  return (
    <Container>
      <MyAddressesHeader />
      <AddressesListSkeleton />
    </Container>
  )
}
