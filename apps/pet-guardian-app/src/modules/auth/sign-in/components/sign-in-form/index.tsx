'use client'

import { useForm } from 'react-hook-form'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleUser } from 'lucide-react'
import { toast } from 'sonner'

import { Button, buttonVariants } from '@user-app/modules/@shared/components'
import {
  PasswordField,
  TextField
} from '@user-app/modules/@shared/components/fields'

import { signIn } from '../../services/sign-in'
import { SignInUserFormData, signInUserSchema } from './types'

export const SignInForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting, isSubmitSuccessful }
  } = useForm<SignInUserFormData>({
    resolver: zodResolver(signInUserSchema)
  })

  const onSubmit = async (data: SignInUserFormData) => {
    const [error] = await signIn(data)

    if (error) {
      toast.error('Erro!', {
        description: 'E-mail ou senha inválidos.'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Você será redirecionado em alguns instantes.'
    })

    router.push('/meus-pets')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        {...register('email')}
        type="email"
        label="E-mail"
        placeholder="Informe o seu e-mail"
        errorMessage={errors.email?.message}
        required
      />
      <PasswordField
        {...register('password')}
        label="Senha"
        placeholder="Informe sua senha"
        errorMessage={errors.password?.message}
        required
      />

      <footer className="flex flex-col gap-2 mt-5">
        <Button
          type="submit"
          disabled={!isValid || isSubmitSuccessful}
          isLoading={isSubmitting}
        >
          Entrar
        </Button>

        <Link
          href="/auth/sign-up"
          className={buttonVariants({ variant: 'link' })}
        >
          <CircleUser size={14} />
          Ainda não possui uma conta? Criar
        </Link>
      </footer>
    </form>
  )
}
