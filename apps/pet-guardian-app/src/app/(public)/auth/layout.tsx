import { PropsWithChildren } from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar'
}

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="bg-primary/50 w-full">
      <section className="relative h-screen p-0 md:p-8">{children}</section>
    </main>
  )
}
