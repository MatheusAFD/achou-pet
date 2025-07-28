import React from 'react'

import { Portal } from '@radix-ui/react-select'
import { Loader2 } from 'lucide-react'

import { Conditional } from '../conditional'

interface LoadingProps {
  isGlobal?: boolean
  isLoading?: boolean
}

export const Loading = ({
  isGlobal = false,
  isLoading = false
}: LoadingProps) => {
  if (isGlobal && isLoading) {
    return (
      <Portal>
        <div
          className="animate-fade-in pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-white/70 transition-opacity duration-1000"
          style={{ pointerEvents: 'auto' }}
        >
          <Loader2 className="text-primary animate-spin" size={48} />
        </div>
      </Portal>
    )
  }
  return (
    <Conditional condition={isLoading}>
      <div className="flex w-full items-center justify-center">
        <Loader2 className="text-green-principal animate-spin" size={48} />
      </div>
    </Conditional>
  )
}
