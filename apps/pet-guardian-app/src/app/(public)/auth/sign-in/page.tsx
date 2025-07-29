import { Metadata } from 'next'

import { CustomCard, LineBadge } from '@user-app/modules/@shared/components'
import { SignInForm } from '@user-app/modules/auth/sign-in/components'

export const metadata: Metadata = {
  title: 'Entrar'
}

export default function SignInPage() {
  return (
    <>
      <section className="flex w-full justify-center md:pt-16">
        <CustomCard className="h-lvh w-full p-8 md:h-auto md:w-[34rem]">
          <LineBadge size="lg" />
          <h1 className="pb-6 text-xl font-medium">Entrar</h1>

          <SignInForm />
        </CustomCard>
      </section>
    </>
  )
}
