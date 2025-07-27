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

import { SignInUserFormData, signInUserSchema } from './types'

export const SignInForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting }
  } = useForm<SignInUserFormData>({
    resolver: zodResolver(signInUserSchema)
  })

  const onSubmit = async (data: SignInUserFormData) => {
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!res.ok) {
        toast.error('Erro!', {
          description: 'E-mail ou senha inválidos.'
        })

        return
      }

      toast.success('Sucesso!', {
        description: 'Você será redirecionado em alguns instantes.'
      })

      router.push('/meus-pets')
    } catch {
      toast.error('Erro!', {
        description: 'Erro de conexão.'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        {...register('email')}
        type="email"
        id="email"
        label="E-mail"
        placeholder="Informe o seu e-mail"
        errorMessage={errors.email?.message}
        required
      />
      <PasswordField
        {...register('password')}
        label="Senha"
        id="password"
        placeholder="Informe sua senha"
        errorMessage={errors.password?.message}
        required
      />

      <footer className="flex flex-col gap-2 mt-5">
        <Button
          type="submit"
          size="lg"
          id="submit-sign-in"
          disabled={!isValid}
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
