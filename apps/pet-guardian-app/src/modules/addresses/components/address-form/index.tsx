'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button, DialogClose } from '@user-app/modules/@shared/components'
import {
  MaskField,
  TextField
} from '@user-app/modules/@shared/components/fields'
import { getAddressByCep } from '@user-app/modules/@shared/services'

import { AddressFormData, AddressFormProps, addressFormSchema } from './types'

export const AddressForm = (props: AddressFormProps) => {
  const { onSubmit } = props

  const [isLoading, startTransition] = useTransition()

  const {
    register,
    control,
    setFocus,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting }
  } = useForm<AddressFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resetOptions: {
      keepDefaultValues: true,
      keepValues: true
    },
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      complement: '',
      reference: ''
    }
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MaskField
          control={control}
          name="zipCode"
          label="CEP"
          pattern="00000-000"
          inputMode="numeric"
          placeholder="Ex: 00000-000"
          errorMessage={errors.zipCode?.message}
          required
          onValidate={(value) => {
            startTransition(async () => {
              const [error, response] = await getAddressByCep(value)

              if (error) {
                return
              }

              reset({
                address: response?.address,
                neighborhood: response?.neighborhood,
                city: response?.city,
                state: response?.state,
                zipCode: value
              })

              setFocus('number')
            })
          }}
        />

        <TextField
          {...register('address')}
          label="Endereço"
          placeholder="Ex: Rua Chico da Silva"
          errorMessage={errors.address?.message}
          required
        />

        <TextField
          {...register('number')}
          label="Número"
          placeholder="Ex: 029"
          errorMessage={errors.number?.message}
          required
        />

        <TextField
          {...register('neighborhood')}
          label="Bairro"
          placeholder="Bairro"
          errorMessage={errors.neighborhood?.message}
          required
        />

        <TextField
          {...register('reference')}
          label="Ponto de referência"
          placeholder="Ex: Próximo ao mercado"
          errorMessage={errors.reference?.message}
          required
        />

        <TextField
          {...register('complement')}
          label="Complemento"
          placeholder="Ex: Apartamento 101"
          errorMessage={errors.complement?.message}
        />

        <TextField
          {...register('city')}
          label="Cidade"
          placeholder="Ex: Fortaleza"
          errorMessage={errors.city?.message}
          disabled={isLoading}
          required
        />

        <TextField
          {...register('state')}
          label="Estado"
          placeholder="Ex: CE"
          errorMessage={errors.state?.message}
          disabled={isLoading}
          required
        />
      </div>

      <footer className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>

        <Button
          type="submit"
          disabled={!isValid}
          isLoading={isSubmitting || isLoading}
        >
          Cadastrar
        </Button>
      </footer>
    </form>
  )
}
