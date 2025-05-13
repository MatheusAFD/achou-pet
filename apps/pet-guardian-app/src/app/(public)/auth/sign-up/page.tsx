import { Metadata } from 'next'

import { CustomCard, LineBadge } from '@user-app/modules/@shared/components'
import { RegisterUserForm } from '@user-app/modules/auth/sign-up/components'

export const metadata: Metadata = {
  title: 'Cadastro'
}

export default function RegisterPage() {
  return (
    <>
      <section className="flex justify-center w-full md:mt-16 ">
        <CustomCard className="w-full md:w-[48rem] h-lvh md:h-auto p-8 md:p-8">
          <LineBadge size="lg" />
          <h1 className="text-xl font-medium pb-6">Cadastro</h1>

          <RegisterUserForm />
        </CustomCard>
      </section>
    </>
  )
}
