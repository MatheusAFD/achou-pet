'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { Button } from '@user-app/modules/@shared/components'
import { updateUserTermSituation } from '@user-app/modules/terms/services/update-user-term-situation'

export function TermsActions() {
  const [loading, setLoading] = useState<'ACCEPTED' | 'REFUSED' | null>(null)

  const router = useRouter()

  const handleClick = async (situation: 'ACCEPTED' | 'REFUSED') => {
    setLoading(situation)

    const [err] = await updateUserTermSituation(situation)

    if (situation === 'ACCEPTED') {
      toast.success('Termo aceito com sucesso!', {
        description: 'Você já pode usar o sistema.'
      })

      router.push('/meus-pets')
    }

    if (err) {
      toast.error('Erro', {
        description: 'Ocorreu um erro ao atualizar a situação do termo.'
      })
    }

    setLoading(null)
  }

  return (
    <footer className="flex flex-1 flex-row gap-4 pt-6 pb-2">
      <Button
        variant="destructive"
        disabled={loading === 'REFUSED'}
        isLoading={loading === 'REFUSED'}
        onClick={() => handleClick('REFUSED')}
      >
        Recusar
      </Button>
      <Button
        disabled={loading === 'ACCEPTED'}
        isLoading={loading === 'ACCEPTED'}
        onClick={() => handleClick('ACCEPTED')}
      >
        Aceitar
      </Button>
    </footer>
  )
}
