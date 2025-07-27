import { useOptimistic, useCallback, startTransition } from 'react'

import { toast } from 'sonner'

import { toggleMissingAlert } from '../services/toggle-missing-alert'

export function useOptimisticMissing(initialMissing: boolean, petId: string) {
  const [optimisticMissing, setOptimisticMissing] =
    useOptimistic(initialMissing)

  const toggleMissing = useCallback(async () => {
    startTransition(() => {
      setOptimisticMissing((prev: boolean) => !prev)
    })

    const [error, data] = await toggleMissingAlert(petId)

    if (error) {
      toast.error('Erro', {
        description: 'Erro ao alternar alerta de desaparecimento'
      })

      return
    }

    const currentMissingText = data?.isMissing ? 'ativado' : 'desativado'

    toast.success('Sucesso', {
      description: `Alerta de desaparecimento ${currentMissingText}`
    })

    return
  }, [petId, setOptimisticMissing])

  return {
    optimisticMissing,
    toggleMissing
  }
}
