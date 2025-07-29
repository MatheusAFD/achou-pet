'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  Button,
  DialogClose,
  Loading
} from '@user-app/modules/@shared/components'
import {
  MaskField,
  TextField
} from '@user-app/modules/@shared/components/fields'
import { getAddressByCep } from '@user-app/modules/@shared/services'

import { AddressFormData, AddressFormProps, addressFormSchema } from './types'

export const AddressForm = (props: AddressFormProps) => {
  const { actionText = 'Cadastrar', onSubmit, defaultValues } = props

  const [isPending, startTransition] = useTransition()

  const defaultFormValues =
    defaultValues ||
    ({
      address: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      complement: '',
      reference: ''
    } as AddressFormData)

  const {
    register,
    control,
    setFocus,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting, isLoading }
  } = useForm<AddressFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValues,
    resolver: zodResolver(addressFormSchema),
    resetOptions: {
      keepErrors: true
    },
    disabled: isPending
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-4"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MaskField
          control={control}
          name="zipCode"
          label="CEP"
          id="zipCode"
          pattern="00000-000"
          inputMode="numeric"
          placeholder="Ex: 00000-000"
          errorMessage={errors.zipCode?.message}
          isLoading={isPending || isLoading}
          required
          onValidate={(value) => {
            startTransition(async () => {
              const [error, response] = await getAddressByCep(value)

              if (error) {
                toast.info('Ateção', {
                  description:
                    'Não foi possível encontrar o endereço, preencha os dados manualmente.'
                })

                reset({
                  address: '',
                  neighborhood: '',
                  city: '',
                  state: '',
                  zipCode: value
                })
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
          id="address"
          placeholder="Ex: Rua Chico da Silva"
          isLoading={isLoading}
          errorMessage={errors.address?.message}
          required
        />

        <TextField
          {...register('number')}
          label="Número"
          id="number"
          placeholder="Ex: 029"
          errorMessage={errors.number?.message}
          required
        />

        <TextField
          {...register('neighborhood')}
          label="Bairro"
          id="neighborhood"
          placeholder="Bairro"
          isLoading={isLoading}
          errorMessage={errors.neighborhood?.message}
          required
        />

        <TextField
          {...register('reference')}
          label="Ponto de referência"
          id="reference"
          placeholder="Ex: Próximo ao mercado"
          isLoading={isLoading}
          errorMessage={errors.reference?.message}
          required
        />

        <TextField
          {...register('complement')}
          label="Complemento"
          placeholder="Ex: Apartamento 101"
          isLoading={isLoading}
          errorMessage={errors.complement?.message}
        />

        <TextField
          {...register('state')}
          label="Estado"
          id="state"
          placeholder="Ex: CE"
          isLoading={isLoading}
          errorMessage={errors.state?.message}
          disabled={isPending}
          required
        />

        <TextField
          {...register('city')}
          label="Cidade"
          id="city"
          placeholder="Ex: Fortaleza"
          isLoading={isLoading}
          errorMessage={errors.city?.message}
          disabled={isPending}
          required
        />
      </div>

      <footer className="mt-4 flex flex-col-reverse justify-end gap-2 md:flex-row">
        <DialogClose asChild>
          <Button variant="outline" size="lg">
            Cancelar
          </Button>
        </DialogClose>

        <Button
          type="submit"
          size="lg"
          data-testid="submit-button"
          disabled={!isValid}
          isLoading={isSubmitting || isPending || isLoading}
        >
          {actionText}
        </Button>
      </footer>

      <Loading isGlobal isLoading={isLoading || isPending} />
    </form>
  )
}
