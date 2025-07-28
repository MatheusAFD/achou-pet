'use client'

import { useForm, Controller } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { toast } from 'sonner'

import { Button, LineBadge } from '@user-app/modules/@shared/components'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@user-app/modules/@shared/components/ui/input-otp'
import { useSteps } from '@user-app/modules/@shared/hooks'

import { checkToken } from '../../services/check-token'
import { RegisterUserStepsEnum } from '../../types'
import { UserDataFormStep } from '../user-data-step/types'
import {
  userEmailConfirmationSchema,
  UserEmailConfirmationFormData
} from './types'

export const UserEmailConfirmationStep = () => {
  const { formData, updateFormStep, updateFormData } = useSteps<
    RegisterUserStepsEnum,
    UserEmailConfirmationFormData & UserDataFormStep
  >()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<UserEmailConfirmationFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      pin: formData.pin ?? ''
    },
    resolver: zodResolver(userEmailConfirmationSchema)
  })

  const onSubmit = async (data: UserEmailConfirmationFormData) => {
    const [error, response] = await checkToken({
      key: formData.email,
      token: data.pin
    })

    if (error) {
      toast.error('Erro', {
        description: 'Erro ao verificar o código de verificação'
      })

      return
    }

    if (!response?.isValid) {
      toast.error('Erro', {
        description: 'Código inválido ou expirado'
      })

      return
    }

    toast.success('Código verificado com sucesso', {
      description: 'Agora você pode criar sua senha'
    })

    updateFormData(data)
    updateFormStep(RegisterUserStepsEnum.PASSWORD)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="animate-fade-render w-full"
    >
      <div className="mb-4">
        <LineBadge />
        <h2 className="text-foreground/90 font-medium">
          Informe o código que enviamos para o seu e-mail
        </h2>
        <p className="text-foreground/50 text-xs">
          Caso não encontre, verifique a caixa de spam
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
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
          <span className="text-sm text-red-500">{errors.pin.message}</span>
        )}

        <p className="text-foreground/80 mb-4 text-xs font-medium">
          O código é válido por 60 minutos
        </p>
      </div>

      <footer className="mt-4 flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => updateFormStep(RegisterUserStepsEnum.USER_DATA)}
        >
          Voltar
        </Button>

        <Button type="submit" disabled={!isValid} isLoading={isSubmitting}>
          Avançar
        </Button>
      </footer>
    </form>
  )
}
