import Image from 'next/image'

import { Edit, Settings2 } from 'lucide-react'
import { toast } from 'sonner'

import { AddressMap } from '@user-app/modules/@shared/assets'
import {
  Badge,
  Button,
  ChildTooltip,
  Conditional,
  CustomCard
} from '@user-app/modules/@shared/components'
import { zipCodeMask } from '@user-app/modules/@shared/utils'

import { setPrimaryAddress } from '../../services'
import { Address } from '../../services/get-address/types'

interface AddressCardProps {
  address: Address
  onEdit?: VoidFunction
}

export const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  const {
    id,
    address: street,
    number,
    neighborhood,
    city,
    state,
    zipCode
  } = address

  const isPrimary = address.type === 'PRIMARY'

  const handleSetPrimaryAddress = async () => {
    const [error] = await setPrimaryAddress(id)

    if (error) {
      toast.error('Erro!', {
        description: 'Não foi possível tornar o endereço padrão.'
      })

      return
    }

    toast.success('Sucesso!', {
      description: 'Endereço padrão atualizado com sucesso!'
    })
  }

  return (
    <CustomCard
      as="li"
      className="relative p-8 w-fit border border-border/80 hover:border-primary/50 transition-all duration-200 ease-in-out"
    >
      <section className="flex flex-col items-center gap-4">
        <Image
          src={AddressMap}
          quality={100}
          width={256}
          height={256}
          alt="Imagem ilustrada de uma carta com icone de localização."
          priority
        />

        <div className="flex flex-col items-center gap-4 w-full">
          <address className="not-italic font-medium text-sm text-gray-700">
            <p>
              {street} {number}
            </p>
            <p>{neighborhood}</p>
            <p>
              {city}, {state} {zipCodeMask(zipCode)}
            </p>
          </address>
          <footer className="flex items-center gap-2 ">
            <ChildTooltip content="Editar endereço">
              <Button
                variant="outline"
                onClick={onEdit}
                data-testid={address.id}
              >
                <Edit />
                Editar
              </Button>
            </ChildTooltip>
            <Conditional condition={!isPrimary}>
              <Button variant="outline" onClick={handleSetPrimaryAddress}>
                <Settings2 /> Tornar padrão
              </Button>
            </Conditional>
          </footer>
        </div>
      </section>

      <Conditional condition={isPrimary}>
        <ChildTooltip content="O endereço padrão é o que será mostrado na página de visualização do pet, caso você permita.">
          <Badge variant="default" className="absolute top-4 right-4">
            Padrão
          </Badge>
        </ChildTooltip>
      </Conditional>
    </CustomCard>
  )
}
