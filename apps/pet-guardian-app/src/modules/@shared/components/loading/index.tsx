import React from 'react'

import { Portal } from '@radix-ui/react-dialog'
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 pointer-events-auto transition-opacity duration-1000 animate-fade-in"
          style={{ pointerEvents: 'auto' }}
        >
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </Portal>
    )
  }
  return (
    <Conditional condition={isLoading}>
      <div className="w-full flex justify-center items-center">
        <Loader2 className="animate-spin text-green-principal" size={48} />
      </div>
    </Conditional>
  )
}
