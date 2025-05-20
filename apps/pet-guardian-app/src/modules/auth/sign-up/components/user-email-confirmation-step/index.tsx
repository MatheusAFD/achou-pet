'use client'

import { useForm, Controller } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { Button, LineBadge } from '@user-app/modules/@shared/components'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@user-app/modules/@shared/components/ui/input-otp'
import { useSteps } from '@user-app/modules/@shared/hooks'

import { RegisterUserStepsEnum } from '../../types'
import {
  userEmailConfirmationSchema,
  UserEmailConfirmationFormData
} from './types'

export const UserEmailConfirmationStep = () => {
  const { formData, updateFormStep, updateFormData } = useSteps<
    RegisterUserStepsEnum,
    UserEmailConfirmationFormData
  >()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<UserEmailConfirmationFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      pin: formData.pin ?? ''
    },
    resolver: zodResolver(userEmailConfirmationSchema)
  })

  const onSubmit = (data: UserEmailConfirmationFormData) => {
    updateFormData(data)
    updateFormStep(RegisterUserStepsEnum.PASSWORD)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full animate-fade-render"
    >
      <div className="mb-4">
        <LineBadge />
        <h2 className="text-foreground/90 font-medium">
          Informe o código que enviamos para o seu e-mail
        </h2>
        <p className="text-xs text-foreground/50">
          Caso não encontre, verifique a caixa de spam
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center pt-4">
        <Controller
          name="pin"
          control={control}
          render={({ field }) => (
            <InputOTP
              pattern={REGEXP_ONLY_DIGITS}
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              inputMode="numeric"
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, idx) => (
                  <InputOTPSlot key={idx} index={idx} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.pin && (
          <span className="text-red-500 text-sm">{errors.pin.message}</span>
        )}

        <p className="mb-4 text-xs text-foreground/80 font-medium">
          O código é válido por 60 minutos
        </p>
      </div>

      <footer className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => updateFormStep(RegisterUserStepsEnum.USER_DATA)}
        >
          Voltar
        </Button>

        <Button type="submit" disabled={!isValid}>
          Avançar
        </Button>
      </footer>
    </form>
  )
}
