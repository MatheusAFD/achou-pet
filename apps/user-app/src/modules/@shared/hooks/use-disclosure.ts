'use client'

import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, onOpenChange] = useState(false)

  return {
    isOpen,
    onOpenChange
  }
}
