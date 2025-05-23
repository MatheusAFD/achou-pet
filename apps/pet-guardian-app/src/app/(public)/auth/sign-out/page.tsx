'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Loading } from '@user-app/modules/@shared/components'

export default function SignOutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/auth/sign-out-server')
      .then(() => {
        router.replace('/auth/sign-in')
      })
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return <Loading isLoading isGlobal />
  }

  return null
}
