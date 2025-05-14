'use client'

import { useForm } from 'react-hook-form'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@user-app/modules/@shared/components'
import {
  MaskField,
  PasswordField,
  TextField
} from '@user-app/modules/@shared/components/fields'

import { createAccount } from '../../services/create-account'
import { RegisterUserFormData, registerUserSchema } from './types'

export const RegisterUserForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful }
  } = useForm<RegisterUserFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    },
    resolver: zodResolver(registerUserSchema)
  })

  const onSubmit = async (data: RegisterUserFormData) => {
    const [error] = await createAccount(data)

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao criar conta. Tente novamente mais tarde.'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Conta criada com sucesso!',
      action: (
        <Link href="/auth/sign-in" onClick={() => toast.dismiss()}>
          <Button size="sm" className="ml-2">
            Entrar
          </Button>
        </Link>
      ),
      duration: Infinity
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

        <TextField
          {...register('email')}
          type="email"
          label="E-mail"
          placeholder="Informe seu e-mail"
          errorMessage={errors.email?.message}
          required
        />

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

      <footer className="flex flex-col items-end gap-2 mt-8">
        <Link href={'/auth/sign-in'}>
          <Button variant="link">Já possui uma conta?</Button>
        </Link>

        <div className="flex gap-4 justify-end">
          <Link href="/auth/sign-in">
            <Button variant="outline">Cancelar</Button>
          </Link>

          <Button
            type="submit"
            disabled={!isValid || isSubmitting || isSubmitSuccessful}
            isLoading={isSubmitting}
          >
            Criar conta
          </Button>
        </div>
      </footer>
    </form>
  )
}
