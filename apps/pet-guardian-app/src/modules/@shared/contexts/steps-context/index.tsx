'use client'

import React, { createContext, useState, PropsWithChildren } from 'react'

export interface StepsContextProps<T> {
  formStep: T
  updateFormStep: (step: T) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StepsContext = createContext<StepsContextProps<any> | undefined>(
  undefined
)

export function StepsProvider<T>({
  children,
  initialStep
}: PropsWithChildren<{ initialStep: T }>) {
  const [formStep, setFormStep] = useState<T>(initialStep)

  const updateFormStep = (step: T) => {
    setFormStep(step)
  }

  const contextValue: StepsContextProps<T> = {
    formStep,
    updateFormStep
  }

  return (
    <StepsContext.Provider value={contextValue}>
      {children}
    </StepsContext.Provider>
  )
}
