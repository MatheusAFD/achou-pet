import { Metadata } from 'next'

import { CustomCard, LineBadge } from '@admin/modules/@shared/components'
import { SignInForm } from '@admin/modules/auth/sign-in/components'

export const metadata: Metadata = {
  title: 'Entrar'
}

export default function SignInPage() {
  return (
    <main className="w-full">
      <section className="flex justify-center w-full md:pt-16">
        <CustomCard className="w-full md:w-[34rem] h-lvh md:h-auto p-8">
          <LineBadge size="sm" />
          <h1 className="text-xl font-medium pb-6">Entrar</h1>

          <SignInForm />
        </CustomCard>
      </section>
    </main>
  )
}
