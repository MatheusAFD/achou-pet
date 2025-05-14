import { use } from 'react'

import { StepsContext, StepsContextProps } from '../contexts'

export const useSteps = <T>() => {
  const context = use(StepsContext)

  if (!context) {
    throw new Error('useSteps must be used within a StepsProvider')
  }

  return context as StepsContextProps<T>
}
