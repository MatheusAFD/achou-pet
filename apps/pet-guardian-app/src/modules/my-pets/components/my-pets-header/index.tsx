import { lazy } from 'react'

import { PawPrint } from 'lucide-react'

import { Button, LineBadge } from '@user-app/modules/@shared/components'
import { StepsProvider } from '@user-app/modules/@shared/contexts'

import { AttachCredentialFormSteps } from '../../types'

const AttachCredentialModal = lazy(() =>
  import('@user-app/modules/my-pets/components').then((mod) => ({
    default: mod.AttachCredentialModal
  }))
)

export const MyPetsHeader = () => {
  return (
    <header>
      <LineBadge />
      <h1 className="text-3xl">Meus pets</h1>
      <StepsProvider initialStep={AttachCredentialFormSteps.ScanQrCode}>
        <AttachCredentialModal>
          <Button className="mt-4 w-fit">
            <PawPrint /> Cadastrar novo
          </Button>
        </AttachCredentialModal>
      </StepsProvider>
    </header>
  )
}
