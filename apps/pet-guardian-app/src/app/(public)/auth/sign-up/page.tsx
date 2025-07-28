import { Metadata } from 'next'

import { CustomCard } from '@user-app/modules/@shared/components'
import { StepsProvider } from '@user-app/modules/@shared/contexts'
import { RegisterUser } from '@user-app/modules/auth/sign-up/components'
import { RegisterUserStepsEnum } from '@user-app/modules/auth/sign-up/types'

export const metadata: Metadata = {
  title: 'Cadastro'
}

export default function RegisterPage() {
  return (
    <>
      <section className="flex w-full justify-center md:mt-16">
        <CustomCard className="h-lvh w-full p-8 md:h-auto md:w-[34rem] md:p-8">
          <StepsProvider initialStep={RegisterUserStepsEnum.USER_DATA}>
            <RegisterUser />
          </StepsProvider>
        </CustomCard>
      </section>
    </>
  )
}
