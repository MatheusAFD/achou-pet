import { Suspense } from 'react'

import {
  Container,
  LineBadge,
  Loading
} from '@admin/modules/@shared/components'
import { BatchesContainer } from '@admin/modules/credentials/components/batches-container'

export default function CredentialsPage() {
  return (
    <Container>
      <LineBadge />
      <h1 className="text-3xl mb-8">Credenciais geradas</h1>

      <Suspense fallback={<Loading isLoading isGlobal />}>
        <BatchesContainer />
      </Suspense>
    </Container>
  )
}
