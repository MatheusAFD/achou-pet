'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button, LineBadge } from '@user-app/modules/@shared/components'
import { PasswordField } from '@user-app/modules/@shared/components/fields'
import { useSteps } from '@user-app/modules/@shared/hooks'

import { RegisterUserStepsEnum } from '../../types'
import { userPasswordSchema, UserPasswordFormData } from './types'

export const UserPasswordStep = () => {
  const { formData, updateFormStep, updateFormData } = useSteps<
    RegisterUserStepsEnum,
    UserPasswordFormData
  >()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<UserPasswordFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      password: formData.password ?? '',
      confirmPassword: formData.confirmPassword ?? ''
    },
    resolver: zodResolver(userPasswordSchema)
  })

  const onSubmit = (data: UserPasswordFormData) => {
    updateFormData(data)
    updateFormStep(RegisterUserStepsEnum.TOKEN)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full animate-fade-render"
    >
      <div className="mb-4">
        <LineBadge />
        <h2 className="text-foreground/90 font-medium">
          Crie sua senha de acesso
        </h2>

        <p className="text-xs text-foreground/50">
          Senha utilizada para acessar sua conta
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <PasswordField
          {...register('password')}
          label="Senha"
          placeholder="Crie uma senha"
          errorMessage={errors.password?.message}
          required
        />

        <PasswordField
          {...register('confirmPassword')}
          label="Confirmar senha"
          placeholder="Crie a senha"
          errorMessage={errors.confirmPassword?.message}
          required
        />
      </div>

      <footer className="flex gap-4 justify-end">
        <Button
          variant="outline"
          onClick={() => updateFormStep(RegisterUserStepsEnum.TOKEN)}
        >
          Voltar
        </Button>

        <Button type="submit" disabled={!isValid}>
          Finalizar
        </Button>
      </footer>
    </form>
  )
}
