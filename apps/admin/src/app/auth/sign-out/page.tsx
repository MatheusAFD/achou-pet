'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Loading } from '@admin/modules/@shared/components'

export default function SignOutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/auth/sign-out-server')
      .then(() => {
        router.push('/auth/sign-in')
      })
      .finally(() => {
        setLoading(false)
        router.push('/auth/sign-in')
      })
  }, [router])

  if (loading) {
    return <Loading isLoading isGlobal />
  }

  return null
}
