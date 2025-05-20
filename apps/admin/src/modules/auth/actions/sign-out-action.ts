'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signOut = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('achout-pet-token')
  cookieStore.delete('achout-pet-refresh-token')

  redirect('/auth/sign-in')
}
