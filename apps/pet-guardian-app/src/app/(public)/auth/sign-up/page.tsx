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
      <section className="flex justify-center w-full md:mt-16 ">
        <CustomCard className="w-full md:w-[34rem] h-lvh md:h-auto p-8 md:p-8">
          <StepsProvider initialStep={RegisterUserStepsEnum.USER_DATA}>
            <RegisterUser />
          </StepsProvider>
        </CustomCard>
      </section>
    </>
  )
}
