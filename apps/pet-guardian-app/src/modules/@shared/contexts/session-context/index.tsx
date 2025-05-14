'use client'

import React, { createContext, PropsWithChildren } from 'react'

import { User } from '../../types/user'

export interface SessionContextProps {
  session: User | null
  tokenExpirationTime?: number
}

export const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
)

export const SessionProvider = ({
  children,
  session,
  tokenExpirationTime
}: PropsWithChildren<SessionContextProps>) => {
  const contextValue = {
    session,
    tokenExpirationTime
  }

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  )
}
