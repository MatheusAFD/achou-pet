'use client'

import { useSteps } from '@user-app/modules/@shared/hooks'

import { RegisterUserStepsEnum } from '../../types'
import { RegisterUserForm } from '../user-data-step'
import { UserEmailConfirmationStep } from '../user-email-confirmation-step'
import { UserPasswordStep } from '../user-password-step'

export const RegisterUser = () => {
  const { formStep } = useSteps<RegisterUserStepsEnum>()

  const componenteByStep = {
    [RegisterUserStepsEnum.USER_DATA]: RegisterUserForm,
    [RegisterUserStepsEnum.PASSWORD]: UserPasswordStep,
    [RegisterUserStepsEnum.TOKEN]: UserEmailConfirmationStep
  }

  const CurrentStepComponent = componenteByStep[formStep]

  return <CurrentStepComponent />
}
