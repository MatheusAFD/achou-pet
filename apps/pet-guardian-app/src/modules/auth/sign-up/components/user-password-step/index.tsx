'use client'

import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button, LineBadge } from '@user-app/modules/@shared/components'
import { PasswordField } from '@user-app/modules/@shared/components/fields'
import { useSteps } from '@user-app/modules/@shared/hooks'

import { createAccount } from '../../services/create-account'
import { RegisterUserStepsEnum } from '../../types'
import { checkPasswordCharacters } from '../../utils'
import { UserDataFormStep } from '../user-data-step/types'
import { UserEmailConfirmationFormData } from '../user-email-confirmation-step/types'
import { userPasswordSchema, UserPasswordFormData } from './types'

type AllFormData = UserPasswordFormData &
  UserDataFormStep &
  UserEmailConfirmationFormData

export const UserPasswordStep = () => {
  const router = useRouter()

  const { formData, updateFormStep } = useSteps<
    RegisterUserStepsEnum,
    AllFormData
  >()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting }
  } = useForm<UserPasswordFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      password: formData.password ?? '',
      confirmPassword: formData.confirmPassword ?? ''
    },
    resolver: zodResolver(userPasswordSchema)
  })

  const onSubmit = async (data: UserPasswordFormData) => {
    const [error] = await createAccount({
      email: formData.email,
      password: data.password,
      name: formData.name,
      lastName: formData.lastName,
      phone: formData.phone
    })

    if (error) {
      toast.error('Erro', {
        description: 'Erro ao criar a conta'
      })

      return
    }

    toast.success('Conta criada com sucesso', {
      description: 'Você já pode acessar sua conta'
    })

    router.push('/auth/sign-in')
  }

  const { hasLowercase, hasNumber, hasSpecialChar, hasUppercase } =
    checkPasswordCharacters(watch().password)

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

        <div className="text-xs text-foreground/70 font-medium">
          <strong className="text-sm mb-.5">
            A senha deve conter no mínimo
          </strong>
          <p className={hasUppercase ? 'text-green-700' : ''}>
            1 letra maíuscula
          </p>
          <p className={hasLowercase ? 'text-green-700' : ''}>
            1 letra minúscula
          </p>
          <p className={hasNumber ? 'text-green-700' : ''}>1 número</p>
          <p className={hasSpecialChar ? 'text-green-700' : ''}>
            1 caractere especial
          </p>
        </div>
      </div>

      <footer className="flex gap-4 justify-end">
        <Button
          variant="outline"
          onClick={() => updateFormStep(RegisterUserStepsEnum.TOKEN)}
        >
          Voltar
        </Button>

        <Button type="submit" disabled={!isValid} isLoading={isSubmitting}>
          Finalizar
        </Button>
      </footer>
    </form>
  )
}
