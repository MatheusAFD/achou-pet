import { PropsWithChildren } from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar'
}

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full bg-primary/50">
      <section className="p-0 md:p-8 h-screen relative">{children}</section>
    </main>
  )
}
