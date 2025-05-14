'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { toast } from 'sonner'

import { Button, Conditional } from '@user-app/modules/@shared/components'
import {
  CheckboxField,
  SelectedField,
  TextareaField,
  TextField
} from '@user-app/modules/@shared/components/fields'

import { animalGenderOptions, animalSizeOptions } from '../../constants'
import { attatchCredential } from '../../services'
import { AttachCredentialFormData, attachCredentialFormSchema } from './types'

interface AttachCredentialFormProps {
  onSuccess?: VoidFunction
}

export const AttachCredentialForm = (props: AttachCredentialFormProps) => {
  const { onSuccess } = props

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm<AttachCredentialFormData>({
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      color: '',
      isVaccinated: false,
      hasAllergies: false,
      needsMedication: false,
      medicationDescription: null
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(attachCredentialFormSchema)
  })

  const onSubmit = async (data: AttachCredentialFormData) => {
    const [error] = await attatchCredential({
      ...data,
      credentialId: '01JTQTY8AXG8841XVQ5RP63PDX'
    })

    if (error) {
      console.error('Error attaching credential', error)
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

  const needsMedication = watch('needsMedication')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full gap-4 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          {...register('name')}
          id="name"
          label="Nome"
          placeholder="Informe o nome do Pet"
          errorMessage={errors.name?.message}
          required
        />

        <TextField
          {...register('species')}
          id="species"
          label="Espécie"
          placeholder="Ex: Cachorro"
          errorMessage={errors.species?.message}
          required
        />

        <TextField
          {...register('breed')}
          id="breed"
          label="Raça"
          placeholder="Informe a raça do animal"
          errorMessage={errors.breed?.message}
        />

        <SelectedField
          control={control}
          name="size"
          options={animalSizeOptions}
          label="Porte do animal"
          placeholder="Selecione o porte do animal"
          required
        />

        <SelectedField
          control={control}
          name="gender"
          options={animalGenderOptions}
          label="Sexo do animal"
          placeholder="Informe o sexo do animal"
          required
        />

        <TextField
          {...register('color')}
          id="color"
          label="Cor"
          placeholder="Ex: Preto com manchas brancas"
          errorMessage={errors.color?.message}
        />

        <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 gap-4">
          <CheckboxField
            control={control}
            id="isVaccinated"
            label="Vacinado"
            name="isVaccinated"
          />
          <CheckboxField
            control={control}
            id="hasAllergies"
            label="Possui alergias"
            name="hasAllergies"
          />
          <CheckboxField
            control={control}
            id="needsMedication"
            name="needsMedication"
            label="Precisa de medicação"
          />
        </div>

        <Conditional condition={needsMedication} withFadeRender>
          <div className="col-span-2">
            <TextareaField
              {...register('medicationDescription')}
              id="medicationDescription"
              placeholder="Informe a medicação"
              errorMessage={errors.medicationDescription?.message}
            />
          </div>
        </Conditional>
      </div>
      <footer className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-4">
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
