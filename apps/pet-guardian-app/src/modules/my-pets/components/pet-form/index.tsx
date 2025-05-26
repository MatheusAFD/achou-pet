'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'

import {
  Button,
  Conditional,
  Loading
} from '@user-app/modules/@shared/components'
import {
  CheckboxField,
  SelectedField,
  TextareaField,
  TextField,
  ImageField
} from '@user-app/modules/@shared/components/fields'

import { animalGenderOptions, animalSizeOptions } from '../../constants'
import { uploadToR2 } from '../../utils/upload-to-r2'
import { PetFormData, PetFormProps, PetFormSchema } from './types'

export const PetForm = (props: PetFormProps) => {
  const { actionText = 'Cadastrar', defaultValues, onSubmit } = props

  const defaultFormValues =
    defaultValues ||
    ({
      name: '',
      species: '',
      breed: '',
      color: '',
      isVaccinated: false,
      hasAllergies: false,
      needsMedication: false,
      medicationDescription: ''
    } as PetFormData)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid, isLoading }
  } = useForm<PetFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValues,
    resolver: zodResolver(PetFormSchema),
    resetOptions: {
      keepErrors: true
    }
  })

  const needsMedication = watch('needsMedication') || watch('hasAllergies')

  const handleFormSubmit = async (data: PetFormData) => {
    let photoUrl = ''
    if (data.photo instanceof File) {
      photoUrl = await uploadToR2(data.photo)
    } else if (typeof data.photo === 'string' && data.photo) {
      photoUrl = data.photo
    }
    if (!data.photo) {
      photoUrl = ''
    }
    const payload = {
      ...data,
      photoUrl,
      photo: undefined
    }
    await onSubmit(payload)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col justify-between h-full gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <ImageField
            name="photo"
            control={control}
            label="Inserir foto"
            errorMessage={errors.photo?.message as string}
            required
            accept="image/png, image/jpeg, image/jpg"
            maxSizeMB={5}
            onDelete={() => {
              setValue('photo', null)
            }}
          />
        </div>
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
          <Button variant="outline" size="lg">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          size="lg"
          disabled={!isValid || isLoading}
          isLoading={isSubmitting}
        >
          {actionText}
        </Button>
      </footer>

      <Loading isGlobal isLoading={isLoading} />
    </form>
  )
}
