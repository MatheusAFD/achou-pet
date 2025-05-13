'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from 'sonner'

import { Button } from '@user-app/modules/@shared/components'
import {
  TextareaField,
  TextField
} from '@user-app/modules/@shared/components/fields'

import { attatchCredential } from '../../services'
import { AttachCredentialFormData, attachCredentialFormSchema } from './types'

interface AttachCredentialFormProps {
  onSuccess?: VoidFunction
}

export const AttachCredentialForm = (props: AttachCredentialFormProps) => {
  const { onSuccess } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<AttachCredentialFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(attachCredentialFormSchema)
  })

  const onSubmit = async (data: AttachCredentialFormData) => {
    const [error] = await attatchCredential({
      ...data,
      credentialId: '01JTQTY8AXAGKPAXVD29NKH8Y5'
    })

    if (error) {
      toast.error('Erro!', {
        description: 'Ocorreu um erro ao cadastrar o pet.'
      })

      return
    }

    onSuccess?.()

    toast.success('Sucesso!', {
      description: 'Pet cadastrado com sucesso!'
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-4">
        <TextField
          {...register('name')}
          label="Nome"
          placeholder="Informe o nome do Pet"
          errorMessage={errors.name?.message}
          required
        />

        <TextareaField
          {...register('description')}
          label="Descrição"
          placeholder="Ex: Gato de cor preta com duas manchas na pata direita."
          errorMessage={errors.description?.message}
          required
        />
      </div>
      <footer className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-4 ">
        <DialogClose asChild>
          <Button variant="outline" type="submit">
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit" disabled={!isValid} isLoading={isSubmitting}>
          Cadastrar
        </Button>
      </footer>
    </form>
  )
}
