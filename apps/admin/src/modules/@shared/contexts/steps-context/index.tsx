'use client'

import React, { createContext, useState, PropsWithChildren } from 'react'

export interface StepsContextProps<T, F = Record<string, unknown>> {
  formStep: T
  formData: F
  updateFormStep: (step: T) => void
  updateFormData: (data: Partial<F>) => void
}

export const StepsContext = createContext<
  StepsContextProps<unknown, Record<string, unknown>> | undefined
>(undefined)

export function StepsProvider({
  children,
  initialStep
}: PropsWithChildren<{ initialStep: unknown }>) {
  const [formStep, setFormStep] = useState<unknown>(initialStep)
  const [formData, setFormData] = useState<Record<string, unknown>>({})

  const updateFormStep = (step: unknown) => {
    setFormStep(step)
  }

  const updateFormData = (data: Partial<Record<string, unknown>>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const contextValue: StepsContextProps<unknown, Record<string, unknown>> = {
    formStep,
    formData,
    updateFormStep,
    updateFormData
  }

  return (
    <StepsContext.Provider value={contextValue}>
      {children}
    </StepsContext.Provider>
  )
}
