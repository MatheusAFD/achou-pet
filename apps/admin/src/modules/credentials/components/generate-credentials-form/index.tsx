'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button, DialogClose } from '@admin/modules/@shared/components'
import {
  TextareaField,
  TextField
} from '@admin/modules/@shared/components/fields'

import { generateCredentials } from '../../services/generate-credentials'
import {
  GenerateCredentialsFormData,
  GenerateCredentialsFormProps,
  generateCredentialsFormSchema
} from './types'

export const GenerateCredentialsForm = ({
  onSuccess
}: GenerateCredentialsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors }
  } = useForm<GenerateCredentialsFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(generateCredentialsFormSchema),
    defaultValues: {
      description: '',
      numberOfCredentials: 1
    }
  })

  const onSubmit = async (data: GenerateCredentialsFormData) => {
    const [error] = await generateCredentials(data)

    if (error) {
      toast.error('Erro!', {
        description: 'Não foi possível gerar as credenciais'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Credenciais geradas com sucesso'
    })

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextField
        {...register('numberOfCredentials')}
        type="number"
        inputMode="numeric"
        label="Quantidade de credenciais"
        required
        errorMessage={errors.numberOfCredentials?.message}
      />
      <TextareaField
        {...register('description')}
        label="Ex: Lote de credenciais para o evento X"
        placeholder="Descrição do lote de credenciais"
        required
        errorMessage={errors.description?.message}
      />

      <footer className="flex gap-4 w-full justify-end">
        <DialogClose asChild>
          <Button variant="outline" size="lg">
            Cancelar
          </Button>
        </DialogClose>

        <Button
          type="submit"
          size="lg"
          disabled={!isValid}
          isLoading={isSubmitting}
        >
          Criar
        </Button>
      </footer>
    </form>
  )
}
