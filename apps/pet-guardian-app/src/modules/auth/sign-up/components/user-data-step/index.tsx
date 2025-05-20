'use client'

import { useForm } from 'react-hook-form'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button, LineBadge } from '@user-app/modules/@shared/components'
import {
  MaskField,
  TextField
} from '@user-app/modules/@shared/components/fields'
import { useSteps } from '@user-app/modules/@shared/hooks'

import { sendToken } from '../../services'
import { RegisterUserStepsEnum } from '../../types'
import { UserDataFormStep, userDataStepSchema } from './types'

export const RegisterUserForm = () => {
  const { formData, updateFormStep, updateFormData } = useSteps<
    RegisterUserStepsEnum,
    UserDataFormStep
  >()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<UserDataFormStep>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: formData.name ?? '',
      lastName: formData.lastName ?? '',
      email: formData.email ?? '',
      phone: formData.phone ?? ''
    },
    resolver: zodResolver(userDataStepSchema)
  })

  const onSubmit = async (data: UserDataFormStep) => {
    const [error] = await sendToken(data.email)

    if (error) {
      toast.error('Erro', {
        description: 'Erro ao enviar o código de verificação para o seu e-mail'
      })

      return
    }

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
          Informe seus dados cadastrais
        </h2>
        <p className="text-xs text-foreground/50">
          Esses dados serão utilizados para acessar sua conta
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          {...register('name')}
          label="Nome"
          placeholder="Informe seu nome"
          errorMessage={errors.name?.message}
          required
        />

        <TextField
          {...register('lastName')}
          label="Sobrenome"
          placeholder="Informe seu sobrenome"
          errorMessage={errors.lastName?.message}
          required
        />

        <TextField
          {...register('email')}
          type="email"
          label="E-mail"
          placeholder="Informe seu e-mail"
          errorMessage={errors.email?.message}
          required
        />

        <MaskField
          control={control}
          name="phone"
          label="Telefone"
          type="tel"
          pattern="(00) 0 0000-0000"
          placeholder="Informe seu telefone"
          errorMessage={errors.phone?.message}
          required
        />
      </div>

      <footer className="flex flex-col items-end gap-2 mt-4">
        <Link href={'/auth/sign-in'}>
          <Button variant="link">Já possui uma conta?</Button>
        </Link>

        <div className="flex gap-4 w-full justify-end">
          <Link href="/auth/sign-in">
            <Button variant="outline">Cancelar</Button>
          </Link>

          <Button type="submit" disabled={!isValid} isLoading={isSubmitting}>
            Avançar
          </Button>
        </div>
      </footer>
    </form>
  )
}
