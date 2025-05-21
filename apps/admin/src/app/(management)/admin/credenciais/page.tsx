import { Suspense } from 'react'

import { Metadata } from 'next'

import { Plus } from 'lucide-react'

import {
  Button,
  Container,
  LineBadge,
  Loading
} from '@admin/modules/@shared/components'
import { GenerateCredentialsModal } from '@admin/modules/credentials/components'
import { BatchesContainer } from '@admin/modules/credentials/components/batches-container'

export const metadata: Metadata = {
  title: 'Credenciais geradas'
}

export default function CredentialsPage() {
  return (
    <Container>
      <LineBadge />
      <h1 className="text-3xl">Credenciais geradas</h1>

      <GenerateCredentialsModal>
        <Button className="w-fit my-4 mb-8">
          <Plus /> Gerar novo lote
        </Button>
      </GenerateCredentialsModal>

      <Suspense fallback={<Loading isLoading isGlobal />}>
        <BatchesContainer />
      </Suspense>
    </Container>
  )
}
